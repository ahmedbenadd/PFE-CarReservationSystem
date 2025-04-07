import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from "../styles/CarSearch.module.css";
import {AppContext} from "../context/AppContext.jsx";

function CarSearch() {
    const [brandsData, setBrandsData] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedCarId, setSelectedCarId] = useState('');
    const [selectError, setSelectError] = useState('');
    const navigate = useNavigate();
    const {backendUrl} = useContext(AppContext);

    useEffect(() => {
        const fetchBrandsAndModels = async () => {
            try {
                const {data} = await axios.get(backendUrl + '/api/car/brands');
                if(data.success) {
                    setBrandsData(data.brandsWithModels);
                } else {
                    setSelectError('Failed to fetch car data. Please try again later.');
                }
            } catch (err) {
                console.error('Failed to fetch brands and models:', err);
                setSelectError('Failed to fetch car data. Please try again later.');
            }
        };

        fetchBrandsAndModels();
    }, []);

    const modelsForSelectedBrand = brandsData.find((item) => item.brand === selectedBrand)?.models || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectError('');
        if (!selectedBrand || !selectedModel) {
            setSelectError('Please select a car brand and model.');
            return;
        }
        window.scrollTo(0, 0);
        navigate(`/car/${selectedCarId}`);
    };

    const isModelDisabled = !selectedBrand;
    const isButtonDisabled = !selectedBrand || !selectedModel;

    return (
        <>
            <section id="car-search" className={styles.carSearch}>
                <div className={styles.container}>
                    <h2>Search for a car</h2>
                    <form className={styles.searchForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label>Choose car brand <b>*</b></label>
                            <select
                                value={selectedBrand}
                                onChange={(e) => {
                                    setSelectedBrand(e.target.value);
                                    setSelectedModel('');
                                    setSelectedCarId('');
                                }}
                            >
                                <option value="">Select a brand</option>
                                {brandsData.map((item) => (
                                    <option key={item.brand} value={item.brand}>
                                        {item.brand}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Choose car model <b>*</b></label>
                            <select
                                value={selectedModel}
                                onChange={(e) => {
                                    const selectedModelData = modelsForSelectedBrand.find(
                                        (model) => model.name === e.target.value
                                    );
                                    setSelectedModel(e.target.value);
                                    setSelectedCarId(selectedModelData?.id || '');
                                }}
                                disabled={isModelDisabled}
                            >
                                <option value="">Select a model</option>
                                {modelsForSelectedBrand.map((model) => (
                                    <option key={model.id} value={model.name}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" disabled={isButtonDisabled}>
                            Search
                        </button>
                        {selectError && <span className={styles.error}>{selectError}</span>}
                    </form>
                </div>
            </section>
        </>
    );
}

export default CarSearch;