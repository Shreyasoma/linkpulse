const { validationResult } = require('express-validator');
const { nanoid } = require('nanoid');

const pool = require('../db');
const {
    CREATE_LINK,
    GET_USER_LINKS,
    GET_USER_LINK_BY_ID,
    UPDATE_LINK,
    DELETE_LINK,
    FIND_LINK_BY_SHORT_CODE,
    CREATE_CLICK,
    GET_TOTAL_CLICKS,
    GET_DAILY_CLICKS,
    GET_REFERRERS,
} = require('./queries');

const createLink = async (req, res) => {
  try {
    // Validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { originalUrl } = req.body;

    // Logged in user from middleware
    const userId = req.user.userId;

    // Generate short code
    const shortCode = nanoid(6);

    // Save link
    const result = await pool.query(CREATE_LINK, [
      userId,
      originalUrl,
      shortCode,
    ]);

    return res.status(201).json({
      message: 'Short link created successfully',
      link: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Get links
const getLinks = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(GET_USER_LINKS, [userId]);

        return res.status(200).json({
            links: result.rows,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get single link
const getLinkById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const result = await pool.query(
            GET_USER_LINK_BY_ID,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        return res.status(200).json({
            link: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Update link
const updateLink = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const {
            title,
            expires_at,
        } = req.body;

        const result = await pool.query(
            UPDATE_LINK,
            [
                title,
                expires_at,
                id,
                userId,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        return res.status(200).json({
            message: 'Link updated successfully',
            link: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Delete link
const deleteLink = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const result = await pool.query(
            DELETE_LINK,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        return res.status(200).json({
            message: 'Link deleted successfully',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const result = await pool.query(
            FIND_LINK_BY_SHORT_CODE,
            [shortCode]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Link not found',
            });
        }

        const link = result.rows[0];

        if (
            link.expires_at &&
            new Date(link.expires_at) < new Date()
        ) {
            return res.status(410).json({
                message: 'This link has expired',
            });
        }

        // Analytics Collection
        const ipAddress = req.ip;

        const userAgent =
            req.get('User-Agent');

        const referrer =
            req.get('Referer') || 'Direct';

        const country = 'Unknown';

        await pool.query(
            CREATE_CLICK,
            [
                link.id,
                ipAddress,
                userAgent,
                referrer,
                country,
            ]
        );

        return res.redirect(link.original_url);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const getAnalytics = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // 1. check ownership (important)
        const linkResult = await pool.query(
            GET_USER_LINK_BY_ID,
            [id, userId]
        );

        if (linkResult.rows.length === 0) {
            return res.status(404).json({
                message: "Link not found",
            });
        }

        // 2. total clicks
        const totalClicksResult = await pool.query(
            GET_TOTAL_CLICKS,
            [id]
        );

        // 3. daily clicks
        const dailyClicksResult = await pool.query(
            GET_DAILY_CLICKS,
            [id]
        );

        // 4. referrers
        const referrersResult = await pool.query(
            GET_REFERRERS,
            [id]
        );

        return res.status(200).json({
            totalClicks: parseInt(totalClicksResult.rows[0].count),
            dailyClicks: dailyClicksResult.rows,
            referrers: referrersResult.rows,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = {
    createLink,
    getLinks,
    getLinkById,
    updateLink,
    deleteLink,
    redirectToOriginalUrl,
    getAnalytics,
};