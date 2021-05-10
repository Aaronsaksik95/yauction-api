const { Router } = require('express');
const express = require('express');
const router = express.Router();
const checkout = require('../controllers/checkout.controller');
const verifyToken = require('../middlewares/verifyTokenAdmin');


router.post('/create-checkout-session', verifyToken, checkout.checkout);



module.exports = router; 