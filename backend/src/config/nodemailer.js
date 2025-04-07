const nodemailer = require("nodemailer");
const env = require("../config/env");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: env.SMTP_EMAIL,
        pass: env.SMTP_PASSWORD,
    },
});

module.exports = transporter;


