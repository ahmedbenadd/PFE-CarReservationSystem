const produceReservationEvent = require('../producers/reservationProducer');

exports.createReservation = async (req, res) => {
    const reservationData = req.body;
    console.log(reservationData);
    try {
        await produceReservationEvent(reservationData);
        res.status(201).send('Reservation event produced');
    } catch (error) {
        res.status(500).send('Error producing reservation event');
    }
};