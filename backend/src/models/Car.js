const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required'],
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        unique: true,
    },
    hp: {
        type: Number,
        required: [true, 'Horsepower is required'],
    },
    engineSize: {
        type: Number,
        required: [true, 'Engine size is required'],
    },
    gear: {
        type: String,
        required: [true, 'Gear type is required'],
    },
    body: {
        type: String,
        required: [true, 'Body type is required'],
    },
    imgUrl: {
        type: String,
        required: [true, 'Image is required'],
    },
    fuel: {
        type: String,
        required: [true, 'Fuel type is required'],
    },
    availability: {
        type: Boolean,
        default: true,
        required: [true, 'Availability is required'],
    },
    price: {
        type: Number,
        default: 0,
        required: [true, 'Price is required'],
    }
}, {
    timestamps: true
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;