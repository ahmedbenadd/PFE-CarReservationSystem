const Kafka = require('kafkajs').Kafka;
const env = require('./env');

const kafka = new Kafka({
    clientId: 'reservation-producer',
    brokers: [env.KAFKA_BROKER],
});

module.exports = kafka;