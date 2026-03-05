const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.post('/register', businessController.registerBusiness);
router.get('/profile/:id', businessController.getBusinessProfile); // get full record

module.exports = router;
