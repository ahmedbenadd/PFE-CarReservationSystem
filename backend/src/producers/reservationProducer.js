const kafka = require('../config/kafkaConfig');
const env = require('../config/env');

const producer = kafka.producer();

const produceReservationEvent = async (reservation) => {
    try {
        await producer.connect();
        await producer.send({
            topic: env.RESERVATION_TOPIC,
            messages: [
                {
                    value: JSON.stringify(reservation),
                },
            ],
        });
        console.log('Reservation event produced:', reservation);
    } catch (error) {
        console.error('Error producing reservation event:', error);
    } finally {
        await producer.disconnect();
    }
};

module.exports = produceReservationEvent;