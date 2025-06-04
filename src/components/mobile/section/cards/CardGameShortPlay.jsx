"use client";
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Card.module.scss';
import Link from "next/link";

export default function CardGameShortPlay({card}) {

    return (
        <article className={`${styles['item-card']} ${styles.game}`}>
            <figure className={styles['thumb-wrap']}>
                <img src={card.images[0].src} alt={card.images[0].alt} />
            </figure>

            <div className={`${styles.name} ${styles.shadow}`}>{card.label}</div>

            <div className={styles.excerpt}>{card.description}</div>
            <div className={styles['list-options']}>
                {card.options.map((option, index) => (
                    <div className={`${styles['item-option']} ${option.entity.label.includes('Easiness') ? styles.row : ''}`} key={index}>
                        <div className={styles['label-option']}>
                            <div className={styles['name-option']}>{option.entity.label}</div>
                        </div>
                        <div className={styles['label-value']}>
                            <span>{option.entity.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles['list-actions']}>
                <Link
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/${card.referral_btn_1_link}`}
                    legacyBehavior
                >
                    <a className="btn primary" target="_blank" rel="noopener noreferrer">
                        Play now
                    </a>
                </Link>
            </section>

        </article>
    );
}
