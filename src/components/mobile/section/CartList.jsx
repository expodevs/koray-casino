"use client"

import React from 'react';
import styles from "./CartList.module.scss";

export default function CartList({ items }) {
    return (
        <section className={styles['list-online-casino']}>
            {items.cards.map((card, idx) => (
                <a href="" key={idx} className={styles['item-casino']}>
                    <div className={styles.title}>{card.label}</div>
                    <div className={styles.text}>{card.description}</div>
                </a>
            ))}
        </section>
    )
}
