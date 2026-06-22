const pool = require('../db');

const {
    GET_TOTAL_LINKS,
    GET_TOTAL_CLICKS,
    GET_TOP_LINK,
    GET_RECENT_LINKS,
    GET_DAILY_CLICKS,
    GET_TRAFFIC_SOURCES,
    GET_COUNTRIES,
} = require('./queries');

const getOverview = async (req, res) => {
    try {
        const userId = req.user.userId;

        const totalLinksResult = await pool.query(
            GET_TOTAL_LINKS,
            [userId]
        );

        const totalClicksResult = await pool.query(
            GET_TOTAL_CLICKS,
            [userId]
        );

        const topLinkResult = await pool.query(
            GET_TOP_LINK,
            [userId]
        );

        const recentLinksResult = await pool.query(
            GET_RECENT_LINKS,
            [userId]
        );

        const totalLinks = parseInt(
            totalLinksResult.rows[0].count
        );

        const totalClicks = parseInt(
            totalClicksResult.rows[0].count
        );

        const averageClicksPerLink =
            totalLinks === 0
                ? 0
                : Number(
                      (
                          totalClicks /
                          totalLinks
                      ).toFixed(2)
                  );

        return res.status(200).json({
            totalLinks,
            totalClicks,
            averageClicksPerLink,

            topLink:
                topLinkResult.rows[0] || null,

            recentLinks:
                recentLinksResult.rows,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const getCharts = async (req, res) => {
    try {
        const userId = req.user.userId;

        const dailyClicksResult = await pool.query(
            GET_DAILY_CLICKS,
            [userId]
        );

        const trafficSourcesResult = await pool.query(
            GET_TRAFFIC_SOURCES,
            [userId]
        );

        const countriesResult = await pool.query(
            GET_COUNTRIES,
            [userId]
        );

        return res.status(200).json({
            dailyClicks: dailyClicksResult.rows,

            trafficSources:
                trafficSourcesResult.rows,

            countries:
                countriesResult.rows,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getOverview,
    getCharts
};