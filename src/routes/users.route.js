const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');
const validateCreateUser = require('../middlewares/validators/users.validator')

router.post('/users', validateCreateUser, user.create);
router.post('/users/login', user.login);
router.get('/users/:id', verifyToken, user.readOne);
router.get('/users', verifyTokenAdmin, user.read);
router.put('/users/:id', verifyToken, user.update);
router.delete('/users/:id', verifyTokenAdmin, user.delete);

module.exports = router;