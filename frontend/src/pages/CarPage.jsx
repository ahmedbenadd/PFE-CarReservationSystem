import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import styles from "../styles/CarPage.module.css";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
import hpImg from "../images/carPage/hp.png";
import engineSizeImg from "../images/carPage/engineSize.png";
import gearImg from "../images/carPage/gears.png";
import bodyImg from "../images/carPage/carBody.png";
import fuelImg from "../images/carPage/fuel.png";
import LoginPrompt from "../components/LoginPrompt.jsx";
import { AppContext } from "../context/AppContext.jsx";
import {toast} from "react-toastify";
import reactRefresh from "eslint-plugin-react-refresh";

function CarPage() {
    const {isLoggedIn, userData, backendUrl} = useContext(AppContext);
    const [showPrompt, setShowPrompt] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];
    const minDropoffDate = pickupDate
        ? new Date(new Date(pickupDate).getTime() + 86400000).toISOString().split("T")[0]
        : today;

    const fetchCar = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`http://localhost:5000/api/car/${id}`);
            if(data.success){
                setCar(data.car);
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(data.message);
                navigate("/");
            }
        } catch (err) {
            console.error('Failed to fetch car:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCar();
    }, [id]);

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        setPickupDate(selectedStartDate);

        if (dropoffDate && selectedStartDate >= dropoffDate) {
            setDropoffDate("");
            showAlert("End date should be after the start date!");
        } else {
            setAlert(null);
        }
    };

    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        setDropoffDate(selectedEndDate);

        if (selectedEndDate <= pickupDate) {
            showAlert("End date should be after the start date!");
        } else {
            setAlert(null);
        }
    };

    const handleReserve = async () => {
        if (!isLoggedIn) {
            setMessage("You need to log in to perform this action.");
            setType("login");
            return setShowPrompt(true);
        }
        if (!userData.isVerified) {
            setMessage("You need to verify your email address to perform this action.");
            setType("verify");
            return setShowPrompt(true);
        }
        if (!pickupDate || !dropoffDate) {
            showAlert("Please select both start and end dates.");
            return;
        }

        const startDate = new Date(pickupDate);
        const endDate = new Date(dropoffDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            showAlert("Invalid dates selected.");
            return;
        }

        const diffTime = endDate.getTime() - startDate.getTime();
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalPrice = totalDays * car.price;

        const reservation = {
            pickupDate: startDate.toISOString(),
            dropoffDate: endDate.toISOString(),
            carId: car._id,
            totalDays,
            totalPrice,
        };

        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/reservation`, reservation);
            if(data.success){
                toast.success(data.message);
                setDropoffDate("");
                setPickupDate("");
                await setCar(null);
                await fetchCar();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Failed to reserve.");
        } finally {
            setLoading(false);
        }

    };

    const showAlert = (message) => {
        setAlert(message);
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <section id="car-page" className={styles.section}>
            <LoginPrompt showPrompt={showPrompt} setShowPrompt={setShowPrompt} message={message} type={type} />
            <div className={styles.container}>
                <div className={`${styles.row} ${styles.carName}`}>
                    <h2>{`${car.brand} ${car.model}`}</h2>
                </div>
                <div className={`${styles.row} ${styles.carDetails}`}>
                    <div className={`${styles.col} ${styles.imgContainer}`}>
                        <img src={car.imgUrl} alt={`${car.brand} ${car.model}`} className={styles.carImage} />
                    </div>
                    <div className={`${styles.col} ${styles.carDetailsUl}`}>
                        <ul className={styles.detailsList}>
                            <li>
                                <img src={hpImg} alt="horsepower" />
                                &nbsp;&nbsp;HP: &nbsp;<strong>{car.hp} hp</strong>
                            </li>
                            <li>
                                <img src={engineSizeImg} alt="enginesize" />
                                &nbsp;&nbsp;Engine Size: &nbsp;<strong>{car.engineSize} cc</strong>
                            </li>
                            <li>
                                <img src={gearImg} alt="gear" />
                                &nbsp;&nbsp;Gear Box: &nbsp;<strong>{car.gear}</strong>
                            </li>
                            <li>
                                <img src={bodyImg} alt="carbody" />
                                &nbsp;&nbsp;Body Type: &nbsp;<strong>{car.body}</strong>
                            </li>
                            <li>
                                <img src={fuelImg} alt="fuel" />
                                &nbsp;&nbsp;Fuel: &nbsp;<strong>{car.fuel}</strong>
                            </li>
                        </ul>
                        <div className={styles.priceContainer}>
                            <span>{car.price} DH <span>/ Day</span></span>
                            {car.availability ?
                                <p className={`${styles.availability} ${styles.available}`}><CheckCircleIcon />&nbsp;Currently Available</p> :
                                <p className={`${styles.availability} ${styles.notAvailable}`}><DoNotDisturbIcon />&nbsp;Currently Unavailable</p>}
                        </div>

                    </div>
                </div>
                <div className={`${styles.row} ${styles.dateRow}`}>
                    <div className={styles.col}>
                        <div className={styles.inputGroup}>
                            <span>Start Date</span>
                            <input
                                type="date"
                                value={pickupDate}
                                min={today}
                                onChange={handleStartDateChange}
                            />
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.inputGroup}>
                            <span>End Date</span>
                            <input
                                type="date"
                                value={dropoffDate}
                                min={minDropoffDate}
                                disabled={!pickupDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.dateRow}`}>
                    <div className={styles.col}>
                       <button disabled={!pickupDate || !dropoffDate || !car.availability} className={styles.reserveButton} onClick={handleReserve}>{car.availability ? "Reserve Now!" : "Car Unavailable!"}</button>
                    </div>
                </div>
            </div>

            <Snackbar
                open={!!alert}
                autoHideDuration={5000}
                onClose={() => setAlert(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                className={styles.snackbar}
            >
                <Alert variant="filled" severity="warning" onClose={() => setAlert(null)}>
                    {alert}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default CarPage;