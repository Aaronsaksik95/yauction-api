const express = require('express');
const router = express.Router();

const userRouter = require('./users.route');
const productRouter = require('./products.route')
const brandRouter = require('./brand.route')
const modelRouter = require('./model.route')
const offerRouter = require('./offers.route')
const checkoutRouter = require('./checkout.route')


router.use(userRouter);
router.use(productRouter);
router.use(brandRouter);
router.use(modelRouter);
router.use(offerRouter);
router.use(checkoutRouter);

module.exports = router;