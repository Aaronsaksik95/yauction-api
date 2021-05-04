const { Router } = require('express');
const express = require('express');
const router = express.Router();
const checkout = require('../controllers/checkout.controller');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');


router.post('/create-checkout-session', verifyTokenAdmin, checkout.checkout);



module.exports = router; 