import React from 'react';
import styles from './Card.module.scss';

export default function CardGameCompare({card}) {

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
                <a href="components/section" className="btn primary">Play for free</a>
            </section>

        </article>
    );
}
