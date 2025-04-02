const express = require('express');
const router = express.Router();
const {
    sendContactMessage,
} = require('../controllers/contactController');
const userAuth = require("../middlewares/authMiddleware");

router.post('/', sendContactMessage);

module.exports = router;