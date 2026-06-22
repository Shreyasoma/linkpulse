const express = require('express');
require('dotenv').config();

const authRoutes = require('./auth/routes');
const linkRoutes = require('./links/routes');
const dashboardRoutes = require('./dashboard/routes');

const {
    redirectToOriginalUrl,
} = require('./links/controller');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'LinkPulse API is running',
    });
});

app.use('/auth', authRoutes);

app.use('/links', linkRoutes);

app.use('/dashboard', dashboardRoutes);

app.get(
    '/:shortCode',
    redirectToOriginalUrl
);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

module.exports = app;