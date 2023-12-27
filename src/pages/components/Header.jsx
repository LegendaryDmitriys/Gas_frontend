import React from 'react'

import styles from "../styles/header.module.css"
import sprite from "../../images/sprite.svg"
import { ROUTES } from '../../utils/routes'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.wrapper}>
        <section className={styles.inner}>
          <section className={styles.logo}>
            <svg className='icon' width={ 146 } height={ 210 }>
              <use xlinkHref={sprite + "#logo"} />
            </svg>
          </section>
          <nav className={styles.nav}>
            <Link to={ROUTES.Brands} className={styles.link}>Марки</Link>
            <Link to={ROUTES.Cars} className={styles.link}>Автомобили</Link>
            <Link to={ROUTES.Customers} className={styles.link}>Пользователи</Link>
            <Link to={ROUTES.TypeFuels} className={styles.link}>Типы топлива</Link>
            <Link to={ROUTES.Fuels} className={styles.link}>Заправка</Link>
          </nav>
          </section>
          <section className={styles.auth}>
          </section>
        </section>
        <section>
            <div className={styles.arrow}></div>
          </section>
    </header>
    
  )
}
