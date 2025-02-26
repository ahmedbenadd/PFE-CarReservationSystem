const kafka = require('../config/kafkaConfig');

const producer = kafka.producer();

const produceReservationEvent = async (reservation) => {
    try {
        await producer.connect();
        await producer.send({
            topic: 'reservation-topic',
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