const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactcontroller');

router.post('/', contactController.submitContactForm);

module.exports = router;