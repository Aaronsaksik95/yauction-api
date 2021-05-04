const express = require('express');
const router = express.Router();
const model = require('../controllers/model.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');

router.post('/models', verifyTokenAdmin, model.create);
router.get('/models/', model.read);
router.get('/models/brand/:brand', model.readWithBrand);
router.get('/models/:id/', model.readOne);
router.get('/models/title/:title', model.readOneTitle);
router.put('/models/:id', verifyTokenAdmin, model.update);


module.exports = router;