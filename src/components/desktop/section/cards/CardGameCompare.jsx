import React from 'react';

import styles from './Card.module.scss';
import Link from "next/link";

export default function CardSlot({card}) {

    return (
        <article className={`${styles['item-card']} ${styles['slot-compare']}`}>
            <figure className={styles['thumb-wrap']}>
                <img src={card.images[0].src} alt={card.images[0].alt} />
            </figure>

            <div className={styles.name}>{card.label}</div>

            <div className={styles.excerpt}>{card.description}</div>
            <div className="text-center">
                <div className={styles['checkbox-style']}>
                    <input type="checkbox" />
                    <span className={styles['name-checkbox']}>Add to compare</span>
                </div>
            </div>
            <section className={styles['list-actions']}>
                <Link
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/${card.referral_btn_1_link}`}
                    legacyBehavior
                >
                    <a className="btn primary" target="_blank" rel="noopener noreferrer">
                        Play for free
                    </a>
                </Link>
            </section>

        </article>
    );
}
