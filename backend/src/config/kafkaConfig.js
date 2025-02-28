const Kafka = require('kafkajs').Kafka;
const env = require('./env');

const kafka = new Kafka({
    clientId: env.RESRVATION_CLIENT_ID,
    brokers: [env.KAFKA_BROKER],
});

module.exports = kafka;