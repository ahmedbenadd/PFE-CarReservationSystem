const express = require('express');
const router = express.Router();
const {
    getUserData, updateUser, updatePassword
} = require('../controllers/userController');
const userAuth = require("../middlewares/authMiddleware");

router.get('/data', userAuth, getUserData);
router.post('/data', userAuth, updateUser);
router.post('/password', userAuth, updatePassword);

module.exports = router;

