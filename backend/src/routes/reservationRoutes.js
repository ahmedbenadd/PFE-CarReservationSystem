const express = require('express');
const router = express.Router();
const {
    createReservation,
    getReservationsByUser,
    cancelReservation,
} = require('../controllers/reservationController');
const userAuth = require("../middlewares/authMiddleware");

router.get('/', userAuth, getReservationsByUser);
router.post('/',userAuth, createReservation);
router.delete('/:id',userAuth, cancelReservation);

module.exports = router;