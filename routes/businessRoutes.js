const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.post('/register', businessController.registerBusiness);

module.exports = router;