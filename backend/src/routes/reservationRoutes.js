const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reservations', reservationController.createReservation);
router.delete('/reservations', )

module.exports = router;