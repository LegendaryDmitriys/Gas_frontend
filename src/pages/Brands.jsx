import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./styles/cars.module.css";

import Header from "./components/Header";

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [filterCountry, setFilterCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.0.102:8000/api/brands/");
                setBrands(response.data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterByBrand = (brand) => {
        setFilterCountry(brand === "" ? null : brand);
    };

    const handleClearFilter = () => {
        setFilterCountry(null);
    };

    const filteredBrand = filterCountry
        ? brands.filter((brand) => brand.country_of_origin.toLowerCase().includes(filterCountry.toLowerCase()))
        : brands;

    return (
        <>
        <Header/>
        <main className={styles.main}>
            <section className={styles.blocks}>
                <article className={styles.cars}>
                    {filteredBrand.map((brand) => (
                        <article className={styles.block} key={brand.id}>
                            <header>
                                <h2 className={styles.h2}>
                                    Марка <br/>
                                    {brand.brand_name}
                                </h2>
                            </header>
                            <p style={{ textAlign: 'center' }}>Cтрана производителя<br/>{brand.country_of_origin}</p>
                        </article>
                    ))}
                </article>
                <aside className={styles.panel}>
                    <h3 className={styles["header-panel"]}>Фильтры и поиск</h3>
                    <ul>
                        {Array.from(new Set(brands.map((brand) => brand.country_of_origin))).map(
                            (brand) => (
                                <li key={brand} className={styles.li}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={filterCountry === brand}
                                            onChange={() =>
                                                handleFilterByBrand(
                                                    filterCountry === brand ? null : brand
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

export default Brands;
