"use client"

import React from 'react';
import styles from "./CartList.module.scss";
import Link from "next/link";

export default function CartList({ items }) {
    return (
        <section className={styles['list-online-casino']}>
            {items.cards.map((card, idx) => (
                <Link key={idx} className={styles['item-casino']} target="_blank" rel="noopener noreferrer"
                      href={`/redirect/card/${encodeURIComponent(card.referral_key)}/link`}
                >
                    <div className={styles.title}>{card.label}</div>
                    <div className={styles.text}>{card.description}</div>
                </Link>
            ))}
        </section>
    )
}
