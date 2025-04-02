import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../styles/MyReservations.module.css"; // Import CSS Module
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const MyReservations = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getStatusLabel = (status) => {
        switch (status.toLowerCase()) {
            case "waiting":
                return "Awaiting Confirmation";
            case "cancelled":
                return "Cancelled by User";
            case "denied":
                return "Approval Denied";
            case "finished":
                return "Completed";
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                axios.defaults.withCredentials = true;
                const {data} = await axios.get(`${backendUrl}/api/reservation`);

                if (data.success && !data.noReservation) {
                    setReservations(data.formattedReservations);
                } else if (data.success && data.noReservation) {
                    setReservations([]);
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                setError(err.response?.data?.message || "An error occurred while fetching reservations.");
                toast.error(err.response?.data?.message || "An error occurred while fetching reservations.");
            } finally {
                setLoading(false);
            }
        };

        if (userData) {
            fetchReservations();
        } else {
            navigate("/");
        }
    }, [userData, backendUrl]);

    const handleCancelReservation = async (reservationId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${backendUrl}/api/reservation`, {
                data: { reservationId }, // Corrected to send reservationId in the body
            });

            if (response.data.success) {
                setReservations((prevReservations) =>
                    prevReservations.filter((res) => res._id !== reservationId)
                );
                toast.success("Reservation cancelled successfully");
            } else {
                toast.error(response.data.message || "Failed to cancel reservation.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while cancelling the reservation.");
            toast.error(err.response?.data?.message || "An error occurred while cancelling the reservation.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.myAccountContainer}>
                <div className={styles.loading}>
                    <CircularProgress />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.myAccountContainer}>
                <p className={styles.errorMessage}>{error}</p>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div className={styles.reservationsPage}>
                <h1 className={styles.title}>Your Reservations</h1>
                <p className={styles.noReservations}>No reservations found.</p>
            </div>
        );
    }

    return (
        <div className={styles.reservationsPage}>
            <h1 className={styles.title}>Your Reservations</h1>

            <div className={styles.reservationList}>
                {reservations.map((reservation) => (
                    <div key={reservation._id} className={styles.reservationRow}>
                        <div>
                            <img
                                src={reservation.car.imgUrl}
                                alt={`${reservation.car.brand} ${reservation.car.model}`}
                                className={styles.carImage}
                            />
                        </div>
                        <div className={styles.detail}>
                            {`${reservation.car.brand} ${reservation.car.model}`}
                        </div>
                        <div className={styles.detail}>
                            <strong>Pickup Date : </strong>{new Date(reservation.pickupDate).toLocaleDateString()}
                        </div>
                        <div className={styles.detail}>
                            <strong>Dropoff Date : </strong>{new Date(reservation.dropoffDate).toLocaleDateString()}
                        </div>
                        <div className={styles.detail}><strong>Total Days :</strong> {reservation.totalDays}</div>
                        <div className={styles.detail}><strong>Total Price :</strong> ${reservation.totalPrice}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReservations;