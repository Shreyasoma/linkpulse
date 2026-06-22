const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const {
    getOverview,
    getCharts,
} = require('./controller');

router.get(
    '/overview',
    authMiddleware,
    getOverview
);
router.get(
    '/charts',
    authMiddleware,
    getCharts
);

module.exports = router;