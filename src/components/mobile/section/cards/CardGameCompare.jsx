import React from 'react';
import styles from './Card.module.scss';
import Link from "next/link";
import Image from "next/image";

export default function CardGameCompare({card}) {

    return (
        <article className={`${styles['item-card']} ${styles['slot-compare']}`}>
            <figure className={styles['thumb-wrap']}>
                <Image
                    src={card.images[0].src}
                    alt={card.images[0].alt}
                    fill
                />
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
                <Link className="btn primary" target="_blank" rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/${card.referral_btn_1_link}`}
                >
                    Play for free
                </Link>
            </section>

        </article>
    );
}
