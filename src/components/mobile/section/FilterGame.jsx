'use client'

import React from 'react';
import styles from "./FilterGame.module.scss";

export default function FilterGame() {
    return (
        <section>
            <div className={styles['filter-label']}>Filter by Attributes:</div>
            <div className={styles['filters-list']}>
                <button className={styles['filter-item']}>High Volatility</button>
                <button className={`${styles['filter-item']} ${styles['active']}`}>Free Spins</button>
                <button className={styles['filter-item']}>Egyptian Theme</button>
                <button className={styles['filter-item']}>High Volatility</button>
                <button className={styles['filter-item']}>
                    <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.00011 4.97668L10.1251 0.851685L11.3034 2.03002L6.00011 7.33335L0.696777 2.03002L1.87511 0.851685L6.00011 4.97668Z"
                            fill="black"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
}
