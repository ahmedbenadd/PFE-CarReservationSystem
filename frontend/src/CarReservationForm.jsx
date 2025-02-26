import React, { useState } from 'react';

const CarReservationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        pickupDate: '',
        dropoffDate: '',
        pickupLocation: '',
        dropoffLocation: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
        if (!formData.phone) errors.phone = 'Phone number is required';
        if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone number must be 10 digits';
        if (!formData.pickupDate) errors.pickupDate = 'Pick-up date is required';
        if (!formData.dropoffDate) errors.dropoffDate = 'Drop-off date is required';
        if (new Date(formData.dropoffDate) <= new Date(formData.pickupDate)) {
            errors.dropoffDate = 'Drop-off date must be after Pick-up date';
        }
        if (!formData.pickupLocation) errors.pickupLocation = 'Pick-up location is required';
        if (!formData.dropoffLocation) errors.dropoffLocation = 'Drop-off location is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            try {
                const response = await fetch('http://localhost:5000/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    setSuccessMessage('Reservation submitted successfully!');
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        pickupDate: '',
                        dropoffDate: '',
                        pickupLocation: '',
                        dropoffLocation: '',
                        message: '',
                    });
                } else {
                    setSuccessMessage('Failed to submit reservation.');
                }
            } catch (error) {
                console.error('Error submitting reservation:', error);
                setSuccessMessage('Failed to submit reservation.');
            }
        } else {
            setErrors(validationErrors);
            setSuccessMessage('');
        }
    };

    return (
        <div className="car-reservation-form">
            <h2>Car Reservation Form</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <div className="form-group">
                    <label>Pick-up Date:</label>
                    <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        className={errors.pickupDate ? 'error' : ''}
                    />
                    {errors.pickupDate && <span className="error-message">{errors.pickupDate}</span>}
                </div>
                <div className="form-group">
                    <label>Drop-off Date:</label>
                    <input
                        type="date"
                        name="dropoffDate"
                        value={formData.dropoffDate}
                        onChange={handleChange}
                        className={errors.dropoffDate ? 'error' : ''}
                    />
                    {errors.dropoffDate && <span className="error-message">{errors.dropoffDate}</span>}
                </div>
                <div className="form-group">
                    <label>Pick-up Location:</label>
                    <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        className={errors.pickupLocation ? 'error' : ''}
                    />
                    {errors.pickupLocation && <span className="error-message">{errors.pickupLocation}</span>}
                </div>
                <div className="form-group">
                    <label>Drop-off Location:</label>
                    <input
                        type="text"
                        name="dropoffLocation"
                        value={formData.dropoffLocation}
                        onChange={handleChange}
                        className={errors.dropoffLocation ? 'error' : ''}
                    />
                    {errors.dropoffLocation && <span className="error-message">{errors.dropoffLocation}</span>}
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CarReservationForm;