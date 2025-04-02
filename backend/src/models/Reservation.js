const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: [true, 'Car reference is required'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
    },
    pickupDate: {
        type: Date,
        required: [true, 'Pickup date is required'],
    },
    dropoffDate: {
        type: Date,
        required: [true, 'Dropoff date is required'],
    },
    totalDays: {
        type: Number,
        required: [true, 'Total days is required'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
    },
    status: {
        type: String,
        default: 'waiting',
    }
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
