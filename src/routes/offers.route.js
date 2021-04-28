const express = require('express');
const router = express.Router();
const offer = require('../controllers/offers.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');

router.post('/offers',verifyToken , offer.create);
router.get('/offers', verifyToken, offer.read);
router.get('/offers/product/:product', offer.readProductOffers);
router.get('/offers/user/:user', verifyTokenAdmin, offer.readUserOffers);
router.get('/offers/status/:status', verifyToken, offer.readMyOffers);
router.get('/offers/:id', offer.readOne);
router.put('/offers/:id', offer.update);
router.delete('/offers/:id', verifyTokenAdmin, offer.delete);

module.exports = router;