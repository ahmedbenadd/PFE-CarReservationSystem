const path = require("path");
const ejs = require("ejs");
const transporter = require("../config/nodemailer");
const Contact = require("../models/Contact");
const env = require("../config/env");

const sendContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.json({ success: false, message: "All fields are required." });
        }

        const newMessage = new Contact({
            name,
            email,
            message,
        });
        await newMessage.save();

        const templatePath = path.join(__dirname, "../../public/templates/contactEmail.ejs");
        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            message,
            primaryColor: "#0065a1", // Your primary color
            websiteUrl: "http://localhost:3000/", // Replace with your website URL
        });

        const adminMailOptions = {
            from: env.SMTP_EMAIL,
            to: env.SMTP_EMAIL,
            subject: "New Contact Message",
            html: html,
        };
        await transporter.sendMail(adminMailOptions);

        const userMailOptions = {
            from: env.SMTP_EMAIL,
            to: email,
            subject: "Thank You for Contacting AutoGO",
            html: html,
        };
        await transporter.sendMail(userMailOptions);

        return res.json({
            success: true,
            message: "Your message has been sent successfully!",
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "An error occurred while processing your request.",
        });
    }
};

module.exports = {
    sendContactMessage,
};