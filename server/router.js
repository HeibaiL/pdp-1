const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController')
const dataService = require('./services/dataService')
const authMiddleware = require('./middlewares/authMiddleware')


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/fbLogin', userController.fbLogin);
router.get('/logout', userController.logoutUser);

router.get('/data', authMiddleware, dataService.getData);


module.exports = router;