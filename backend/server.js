const express = require('express');
const connectToDB = require('./src/config/mongoConfig');
const consumeReservationEvents = require('./src/consumers/reservationConsumer');
const reservationRoutes = require('./src/routes/reservationRoutes');
const carRoutes = require('./src/routes/carRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandler = require("./src/middlewares/errorMiddleware");
const cors = require('cors');
const PORT = require('./src/config/env').PORT || 3001;
const path = require('path');
const cookieParser = require('cookie-parser');


connectToDB();
consumeReservationEvents();

const app = express();

app.use(cookieParser());
app.use(cors({credentials: true}));
app.use(express.json());
app.use("/carImage",express.static(path.join(__dirname, '/public/carsImages')));
app.use('/api/car',carRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/reservation', reservationRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});