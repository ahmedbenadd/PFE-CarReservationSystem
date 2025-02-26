const express = require('express');
const connectToDB = require('./src/config/mongoConfig');
const consumeReservationEvents = require('./src/consumers/reservationConsumer');
const reservationRoutes = require('./src/routes/reservationRoutes');
const errorHandler = require("./src/middlewares/errorMiddleware");
const cors = require('cors');
const PORT = require('./src/config/env').PORT || 3001;


connectToDB();
consumeReservationEvents();

const app = express();

// Define allowed origins (frontend URLs)
const allowedOrigins = [
    'http://localhost:3000', // Replace with your frontend URL
    'https://your-frontend-domain.com' // Add production URL if needed
];

// Configure CORS options
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    credentials: true, // Enable cookies and authorization headers
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Apply the CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', reservationRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});