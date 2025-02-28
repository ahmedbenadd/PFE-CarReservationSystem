module.exports = {
    PORT: 5000,
    KAFKA_BROKER: 'kafka:9092',
    MONGO_URL: 'mongodb://mongo:27017/CarReservationSystem',
    RESERVATION_TOPIC: 'reservation-topic',
    RESRVATION_CLIENT_ID: 'reservation-producer',
    RESERVATION_CONSUMER_GROUP: 'reservation-consumer-group',
};