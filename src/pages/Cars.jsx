import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./styles/cars.module.css";
import sprite from "../images/sprite.svg"


import Header from "./components/Header";

import { splitLicensePlateNumber } from "../utils/utils";

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
                            {car.image ? (
                                <img src={car.image} alt={car.model} className={styles.image} />
                            ) : (
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/89/89102.png"
                                    alt="Стандартное изображение"
                                    className={styles.image}
                                />
                            )}
                            <header>
                                <h2 className={styles.h2}>
                                    Модель <br />
                                    {car.model}
                                </h2>
                            </header>
                            <p>Год выпуска : {car.year}</p>
                            <p>Марка : {car.brand.brand_name}</p>
                            <footer>
                                <h4 className={styles["header-number"]}>Регистрационный номер</h4>
                                    <section className={styles["license-plate"]}>
                                        <article className={styles.number}>
                                            {splitLicensePlateNumber(car.registration_number).map((part, index) => (
                                                    <span key={index} className={styles.number}>{part}</span>
                                                ))}
                                        </article>
                                        <article>
                                            <svg className='icon' width={ 46 } height={ 42 }>
                                                <use xlinkHref={sprite + "#flag"} />
                                            </svg>
                                        </article>
                    
                                    </section>
                               
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
