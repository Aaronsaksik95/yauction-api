const { Router } = require('express');
const express = require('express');
const router = express.Router();
const checkout = require('../controllers/checkout.controller');


router.post('/create-checkout-session', checkout.checkout);



module.exports = router; 