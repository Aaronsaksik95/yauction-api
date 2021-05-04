const express = require('express');
const router = express.Router();
const brand = require('../controllers/brand.controller');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');

router.post('/brands', verifyTokenAdmin, brand.create);
router.get('/brands', brand.read);
router.get('/brands/:id', brand.readOne);
router.put('/brands/:id', verifyTokenAdmin, brand.update);


module.exports = router;