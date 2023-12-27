import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/typefuels.module.css";
import Header from "./components/Header";

const TypeFuels = () => {
    const [typeFuels, setTypeFuels] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.0.102:8000/api/fueltypes/");
                setTypeFuels(response.data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchData();
    }, []);


    const handleFilterByBrand = (type) => {
        setFilterType(type === "" ? null : type);
    };

    const handleClearFilter = () => {
        setFilterType(null);
    };

    const filteredFuels = filterType
        ? typeFuels.filter((typeFuel) => typeFuel.fuel_type === filterType)
        : typeFuels;

    const searchedFuel = searchTerm
        ? filteredFuels.filter((typeFuel) =>
            typeFuel.octane_rating.toString().includes(searchTerm.toLowerCase())
        )
        : filteredFuels;

    return (
        <>
        <Header />
        <main className={styles.main}>
            <section className={styles.blocks}>
                <article className={styles.type}>
                    {searchedFuel.map((typeFuel) => (
                        <article className={styles.block} key={typeFuel.id}>
                            <header className={styles["block-header"]}>
                               <h2>Топливо {typeFuel.fuel_type} {typeFuel.octane_rating}</h2>
                            </header>
                            <footer>
                                <p>
                                    Бензин {typeFuel.fuel_type}-{typeFuel.octane_rating} - {typeFuel.description}
                                </p>
                            </footer>
                        </article>
                    ))}
                </article>
                <aside className={styles.panel}>
                    <h3 className={styles["header-panel"]}>Фильтры и поиск</h3>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Поиск по октановому числу"
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                    />
                    <h4 className={styles["desc-panel"]}>Фильтр по марке</h4>
                    <ul>
                        {Array.from(new Set(typeFuels.map((typeFuel) => typeFuel.fuel_type))).map(
                            (typeFuel) => (
                                <li key={typeFuel} className={styles.li}>
                                    <label>
                                        <input
                                        
                                            type="checkbox"
                                            checked={filterType === typeFuel}
                                            onChange={() =>
                                                handleFilterByBrand(
                                                    filterType === typeFuel ? null : typeFuel
                                                )
                                            }
                                        />
                                        {typeFuel}
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

export default TypeFuels;