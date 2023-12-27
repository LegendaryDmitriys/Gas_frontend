import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./styles/cars.module.css";
import Header from "./components/Header";

const Customers = () => {
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.0.102:8000/api/customers/");
                setCustomers(response.data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchData();
    }, []);

   
    return (
        <>
        <Header/>
        <main className={styles.main}>
            <section className={styles.blocks}>
                <article className={styles.cars}>
                    {customers.map((customer) => (
                        <article className={styles.block} key={customer.id}>
                            <header>
                                <h2 className={styles.h2}>
                                    ФИО
                                </h2>
                            </header>
                            <p style={{ textAlign: 'center' }}> {customer.last_name} {customer.first_name} {customer.patronymic} </p>
                        </article>
                    ))}
                </article>
            </section>
        </main>
        </>
    );
};

export default Customers;
