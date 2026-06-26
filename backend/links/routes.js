const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const { createLinkRules } = require('./validation');
const {
    createLink,
    getLinks,
    getLinkById,
    updateLink,
    deleteLink,
    redirectToOriginalUrl,
    getAnalytics,
} = require('./controller');

router.post('/', authMiddleware, createLinkRules, createLink);

router.get('/', authMiddleware, getLinks);

router.get('/analytics/:id', authMiddleware, getAnalytics);

router.get('/:id', authMiddleware, getLinkById);

router.put('/:id', authMiddleware, updateLink);

router.delete('/:id', authMiddleware, deleteLink);

router.get('/:shortCode', redirectToOriginalUrl);

router.get('/:shortCode', redirectToOriginalUrl);

module.exports = router;