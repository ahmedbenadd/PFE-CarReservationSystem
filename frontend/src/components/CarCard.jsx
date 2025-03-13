import styles from '../styles/CarCard.module.css';
import {useNavigate} from "react-router-dom";

function CarCard({car}) {
    const navigate = useNavigate();

    const handleReserve = () => {
        window.scrollTo(0, 0);
        navigate(`/car/${car._id}`);
    };

    return (
        <div className={styles.card} onClick={handleReserve}>
            <div className={styles.imgContainer}>
                <img src={car.imgUrl} alt={`${car.brand} ${car.model}`} className={styles.carImage}/>
            </div>
            <h3 className={styles.carName}>{`${car.brand} ${car.model}`}</h3>
            <p className={styles.carDetails}>
                <strong>Gear:</strong> {car.gear}<br/>
                <strong>Fuel:</strong> {car.fuel}<br/>
                <strong>Price:</strong> {car.price} DH /day
            </p>
            <div className={styles.buttonContainer}>
                {car.availability ? (
                    <button className={styles.rentButton} onClick={handleReserve}>Reserve Now</button>
                ) : (
                    <button className={`${styles.rentButton} ${styles.buttonDisabled}`}>Car Unavailable</button>
                )}
            </div>
        </div>
    );
}

export default CarCard;