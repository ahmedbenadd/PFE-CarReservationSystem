import axios from "axios";
import CarCard from "../components/CarCard";
import styles from "../styles/Cars.module.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Cars() {
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/car/");
                setCars(response.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    if (loading) {
        return (
            <section className={styles.carsSection}>
                <h2>Discover our cars collection</h2>

            <div className={styles.loading}>
                <CircularProgress />
            </div>
            </section>

        );
    }

    return (
        <>
            <section className={styles.carsSection}>
                <h2>Discover our cars collection</h2>
                <div className={styles.container}>
                    <div className={styles.carsDiv}>
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <CarCard key={car._id} car={car} />
                            ))
                        ) : (
                            <p>No cars available.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cars;