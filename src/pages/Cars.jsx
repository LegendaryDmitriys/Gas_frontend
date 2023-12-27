import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./styles/cars.module.css";
import Header from "./components/Header";

const Car = () => {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBrand, setFilterBrand] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.0.102:8000/api/cars/");
                setCars(response.data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterByBrand = (brand) => {
        setFilterBrand(brand === "" ? null : brand);
    };

    const handleClearFilter = () => {
        setFilterBrand(null);
    };

    const filteredCars = filterBrand
        ? cars.filter((car) => car.brand.brand_name.toLowerCase().includes(filterBrand.toLowerCase()))
        : cars;

    const searchedCars = searchTerm
        ? filteredCars.filter((car) =>
              car.model.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : filteredCars;

    return (
        <>
        <Header/>
        <main className={styles.main}>
            <section className={styles.blocks}>
                <article className={styles.cars}>
                    {searchedCars.map((car) => (
                        <article className={styles.block} key={car.id}>
                            <img src={car.image} alt={car.model} className={styles.image} />
                            <header>
                                <h2 className={styles.h2}>
                                    Модель <br />
                                    {car.model}
                                </h2>
                            </header>
                            <p>Год выпуска : {car.year}</p>
                            <p>Марка : {car.brand.brand_name}</p>
                            <footer>
                                <p>Регистрационный номер</p>
                                <span>{car.registration_number}</span>
                            </footer>
                        </article>
                    ))}
                </article>
                <aside className={styles.panel}>
                <h3 className={styles["header-panel"]}>Фильтры и поиск</h3>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Поиск по модели"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <h3 className={styles["header-panel"]}>Фильтры и поиск</h3>
                    <ul>
                        {Array.from(new Set(cars.map((car) => car.brand.brand_name))).map(
                            (brand) => (
                                <li key={brand} className={styles.li}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={filterBrand === brand}
                                            onChange={() =>
                                                handleFilterByBrand(
                                                    filterBrand === brand ? null : brand
                                                )
                                            }
                                        />
                                        {brand}
                                    </label>
                                </li>
                            )
                        )}
                    </ul>
                    <button onClick={handleClearFilter}>Сбросить фильтр</button>
                </aside>
            </section>
        </main>
        </>
    );
};

export default Car;
