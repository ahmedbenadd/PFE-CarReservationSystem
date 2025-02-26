const kafka = require('../config/kafkaConfig');
const Reservation = require('../models/Reservation');
const env = require('../config/env');

const consumer = kafka.consumer({ groupId: 'reservation-consumer-group' });

const consumeReservationEvents = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: env.RESERVATION_TOPIC, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const reservationData = JSON.parse(message.value.toString());
            try {
                const reservation = new Reservation(reservationData);
                await reservation.save();
                console.log('Reservation saved to MongoDB:', reservation);
            } catch (error) {
                console.error('Error saving reservation to MongoDB:', error);
            }
        },
    });
};

module.exports = consumeReservationEvents;