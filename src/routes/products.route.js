const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyAttribute = require('../middlewares/verifyAttribute');

router.post('/products', verifyToken, verifyAttribute, product.create);
router.get('/products', product.read);
router.get('/products/user', product.readWithUser);
router.get('/products/:id', product.readOne);
router.get('/products/filter/vehicle', product.readWithFilter);
router.get('/products/vehicle/:vehicle', product.readWithVehicle);
router.put('/products/:id', verifyToken, product.update);
router.delete('/products/:id', verifyToken, product.delete);


module.exports = router;