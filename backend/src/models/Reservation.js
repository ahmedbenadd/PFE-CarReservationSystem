const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: [true, 'CarPage reference is required'],
    },
    pickupDate: {
        type: Date,
        required: [true, 'Pickup date is required'],
    },
    dropoffDate: {
        type: Date,
        required: [true, 'Dropoff date is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;