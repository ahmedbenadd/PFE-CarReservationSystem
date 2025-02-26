const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    pickupDate: Date,
    dropoffDate: Date,
    pickupLocation: String,
    dropoffLocation: String,
    message: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;