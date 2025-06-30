"use client"

import React from 'react';
import styles from "./CartList.module.scss";
import Link from "next/link";

export default function CartList({ items }) {
    const cards = items.cards ?? items.items ?? []

    return (
        <section className={styles["list-online-casino"]}>
            {cards.map((card) => (
                <Link
                    key={card.id}
                    className={styles["item-casino"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.link ?? "")}/btn_1_link`}
                >
                    <div className={styles.title}>{card.title}</div>
                    <div className={styles.text}>{card.description}</div>
                </Link>
            ))}
        </section>
    )
}
