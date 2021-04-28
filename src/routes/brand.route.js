const express = require('express');
const router = express.Router();
const brand = require('../controllers/brand.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/brands', brand.create);
router.get('/brands', brand.read);
router.get('/brands/:id', brand.readOne);
router.put('/brands/:id', verifyToken, brand.update);


module.exports = router;