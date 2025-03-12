import bestOffers from '../images/chooseUs/bestOffers.png'
import online from '../images/chooseUs/online.png'
import support from '../images/chooseUs/support.png'
import styles from "../styles/ChooseUs.module.css";

function ChooseUs() {
    return (
        <>
            <section className={styles.chooseSection}>
                <div className={styles.container}>
                    <div className={styles.chooseContainer}>
                        <div className={styles.chooseTitle}>
                            <h2>Why Choose Us</h2>
                        </div>
                        <div className={styles.chooseBoxes}>
                            <div className={styles.box}>
                                <img src={online} alt="online reservation"/>
                                <h2>Online Reservation</h2>
                                <p>
                                    Book your car in minutes! Our simple online reservation system lets you choose,
                                    compare, and confirm your rental anytime, anywhere. Fast, easy, and hassle-free.
                                </p>
                            </div>
                            <div className={styles.box}>
                                <img src={support} alt="support"/>
                                <h2>24/7 Customer Support</h2>
                                <p>
                                    We’re here for you, 24/7! Whether you need help with your booking or roadside
                                    assistance, our friendly team is always ready to assist.
                                </p>
                            </div>
                            <div className={styles.box}>
                                <img src={bestOffers} alt="best offers"/>
                                <h2>Best Offers</h2>
                                <p>
                                    Get the best deals on car rentals! Enjoy exclusive discounts, seasonal promotions,
                                    and flexible packages designed to save you money.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChooseUs;