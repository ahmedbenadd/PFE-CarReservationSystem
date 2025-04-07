const produceReservationEvent = require('../producers/reservationProducer');
const Car = require("../models/Car");
const User = require("../models/User");
const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
    const reservationData = req.body;

    try {
        await produceReservationEvent(reservationData);
        return res.json({
            success: true,
            message: "Reservation request is placed! Check your email",
        })
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: error.message,
        })
    }
};

const getReservationsByUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const reservations = await Reservation.find({ userId })
            .populate({
                path: 'carId',
                select: '_id brand model imgUrl price availability', // Include car details
            })
            .sort({ createdAt: -1 });

        if (!reservations || reservations.length === 0) {
            return res.json({
                success: true,
                noReservation: true,
                message: "You have no reservations",
            })
        }

        const formattedReservations = reservations.map(reservation => ({
            _id: reservation._id,
            pickupDate: reservation.pickupDate,
            dropoffDate: reservation.dropoffDate,
            totalDays: reservation.totalDays,
            totalPrice: reservation.totalPrice,
            status: reservation.status,
            car: {
                _id: reservation.carId._id,
                brand: reservation.carId.brand,
                model: reservation.carId.model,
                imgUrl: reservation.carId.imgUrl,
                price: reservation.carId.price,
                availability: reservation.carId.availability,
            },
            createdAt: reservation.createdAt,
        }));

        return res.json({
            success: true,
            noReservation: false,
            formattedReservations,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        })
    }
};

// const cancelReservation = async (req, res, next) => {
//     const {reservationId, userId} = req.body;
//     try {
//         const reservation = await Reservation.findById(reservationId);
//         if (!reservation) {
//             return res.json({
//                 success: false,
//                 message: "Reservation not found",
//             })
//         }
//
//         if(reservation.userId !== userId) {
//             return res.json({
//                 success: false,
//                 message: "Unauthorized action",
//             })
//         }
//
//         if (reservation.status.toLowerCase() !== "waiting") {
//             return res.json({
//                 success: false,
//                 message: "Cannot cancel a waiting reservation",
//             })
//         }
//
//         reservation.status = "canceled";
//         reservation.save();
//         return res.json({
//             success: true,
//             message: "Reservation cancelled",
//         })
//     } catch (error) {
//         console.error(error);
//         return res.json({
//             success: false,
//             message: error.message,
//         })
//     }
// }

module.exports = {
    createReservation,
    getReservationsByUser,
    // cancelReservation,
};