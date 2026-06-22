const { body } = require('express-validator');

const createLinkRules = [
  body('originalUrl')
    .trim()
    .notEmpty()
    .withMessage('Original URL is required')
    .isURL()
    .withMessage('Please provide a valid URL'),
];

module.exports = { createLinkRules };