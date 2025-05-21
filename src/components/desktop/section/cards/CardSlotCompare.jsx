import React from 'react';

import styles from './Card.module.scss';

export default function CardSlot() {

    return (
        <article className={`${styles['item-card']} ${styles['slot-compare']}`}>
            <figure className={styles['thumb-wrap']}>
                <img src="/images/slot-compare.png" alt="Game Image" />
            </figure>

            <div className={styles.name}>Outsourced Online Slot</div>

            <div className={styles.excerpt}>A simple card game where players aim to get rid of all their cards first.</div>
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
