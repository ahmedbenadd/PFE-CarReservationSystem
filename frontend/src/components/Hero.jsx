import { Link } from "react-router-dom";
import BgShape from "../images/home/home_bg_shape.png";
import HeroCar from "../images/home/main-car.png";
import upArrow from "../assets/up-arrow.png";
import { useEffect, useState } from "react";
import styles from "../styles/Hero.module.css";

function Hero() {
    const [goUp, setGoUp] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const bookBtn = () => {
        document
            .querySelector("#booking-section")
            .scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const onPageScroll = () => {
            if (window.pageYOffset > 600) {
                setGoUp(true);
            } else {
                setGoUp(false);
            }
        };

        window.addEventListener("scroll", onPageScroll);

        return () => {
            window.removeEventListener("scroll", onPageScroll);
        };
    }, []);

    return (
        <>
            <section id="home" className={styles.heroSection}>
                <div className={styles.container}>
                    <img className={styles.bgShape} src={BgShape} alt="bg-shape" />
                    <div className={styles.heroContent}>
                        <div className={styles.heroContentText}>
                            <h4>Reserve Your Car Now</h4>
                            <h1>
                                Rent with confidence at <span>great</span> prices
                            </h1>
                            <p>
                                Rent the car of your dreams. Unbeatable prices, Convenient options
                                and much more.
                            </p>
                            <div className={styles.heroContentTextBtns}>
                                <Link
                                    onClick={bookBtn}
                                    className={styles.heroContentTextBtnsBookRide}
                                    to="/"
                                >
                                    Book Ride &nbsp;
                                </Link>
                                <Link
                                    className={styles.heroContentTextBtnsLearnMore}
                                    to="/"
                                >
                                    Learn More &nbsp;
                                </Link>
                            </div>
                        </div>
                        {/* img */}
                        <img
                            src={HeroCar}
                            alt="car-img"
                            className={styles.heroContentCarImg}
                        />
                    </div>
                </div>
                <div
                    onClick={scrollToTop}
                    className={`${styles.scrollToTop} ${goUp ? styles.showScrollToTop : ""}`}
                >
                    <img src={upArrow}/>
                </div>
            </section>
        </>
    );
}

export default Hero;