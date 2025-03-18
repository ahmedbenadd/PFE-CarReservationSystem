import styles from '../styles/testimonials.module.css';

const testimonialsData = [
    {
        id: 1,
        name: "Yassin Nassir",
        image: "data:image/jpeg;base64,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",
        message: "Ce service est impeccable ! Je le recommande à tout le monde.",
        rating: "★★★★★",
    },
    {
        id: 2,
        name: "Amal Bader",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2qPBwFDmYiA2UIee3Lxf4kFlocWGGlNru9hIWUyN1-8Q5da_xzKlWoA&usqp=CAE&s",
        message: "Service client exceptionnel et produit de haute qualité.",
        rating: "★★★★☆",
    },
];


function Testimonials() {
    return (
        <div className={styles.div}>

            <h1 className={styles.h1}>Ce que nos clients disent de nous</h1>
            {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className={styles.testimonial}>
                    <img src={testimonial.image}  alt={testimonial.name} />
                    <p>{testimonial.message}</p>
                    <div className={styles.rating}>{testimonial.rating}</div>
                    <p>
                        <strong>- {testimonial.name}</strong>
                    </p>
                </div>

            ))}
        </div>

        )
}

export default Testimonials;