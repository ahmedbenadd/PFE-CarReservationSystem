const kafka = require('../config/kafkaConfig');
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Car = require('../models/Car');
const env = require('../config/env');
const transporter = require("../config/nodemailer");
const ejs = require("ejs");
const path = require("path");

const consumer = kafka.consumer({ groupId: env.RESERVATION_CONSUMER_GROUP });

const consumeReservationEvents = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: env.RESERVATION_TOPIC, fromBeginning: true });

        console.log("Kafka consumer is listening for:", env.RESERVATION_TOPIC);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const reservationData = JSON.parse(message.value.toString());
                    console.log("Processing reservation data:", reservationData);

                    const car = await Car.findById(reservationData.carId);
                    if (!car) {
                        console.error("Car not found for reservation:", reservationData.carId);
                        return;
                    }

                    const user = await User.findById(reservationData.userId);
                    if (!user) {
                        console.error("User not found for reservation:", reservationData.userId);
                        return;
                    }

                    const isCarAvailable = car.availability;

                    if (isCarAvailable) {
                        const reservation = new Reservation(reservationData);
                        await reservation.save();
                        console.log("Reservation saved to MongoDB:", reservation);

                        car.availability = false;
                        await car.save();
                        console.log("Car availability updated:", car);
                    }

                    const templatePath = path.join(__dirname, "../../public/templates/reservationEmail.ejs");
                    const html = await ejs.renderFile(templatePath, {
                        name: user.name,
                        brand: car.brand,
                        model: car.model,
                        isCarAvailable: isCarAvailable,
                        primaryColor: "#0065a1",
                        websiteUrl: "http://localhost:3000/",
                    });

                    const mailOptions = {
                        from: env.SMTP_EMAIL,
                        to: user.email,
                        subject: isCarAvailable
                            ? `Your request to reserve ${car.brand} ${car.model}`
                            : `Unfortunately, the car you requested is unavailable`,
                        html: html,
                    };
                    await transporter.sendMail(mailOptions);
                    console.log("Email sent to:", user.email);
                } catch (error) {
                    console.error("Error processing reservation event:", error);
                }
            },
        });
    } catch (error) {
        console.error("Error initializing Kafka consumer:", error);
    }
};

module.exports = consumeReservationEvents;