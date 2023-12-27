import React, { useState } from 'react';
import axios from 'axios';

import styles from "./styles/auth.module.css"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);
            console.log('Пользователь успешно авторизован:', response.data);
        } catch (error) {
            console.error('Ошибка входа:', error.response.data);
        }
    };

    return (
        


        <main className={styles.main} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1567777176186-dfa735f1fe20?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}>
        <section className={styles.inner}>
            <article className={styles["image-holder"]}>
                <img src="https://images.unsplash.com/photo-1591179535738-0fe38055847b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="картинка" />
            </article>
            <form onSubmit={handleSubmit}>
                <h3>Авторизация</h3>
                <article className={styles["form-wrapper"]}>
                        <input type="email" name="email" onChange={handleChange} required placeholder='Почта' className={styles["form-control"]}/>
                </article>
                <article className={styles["form-wrapper"]}>
                        <input type="password" name="password" onChange={handleChange} required  placeholder='Пароль' className={styles["form-control"]}/>
                </article>
                <button type="submit">Войти</button>
            </form>
        </section>
        </main>

    );
};

export default Login;
