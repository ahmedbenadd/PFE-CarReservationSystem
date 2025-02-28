const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    carModel: String,
    pickupDate: Date,
    dropoffDate: Date,
    message: String
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;