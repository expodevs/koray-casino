import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Card.module.scss';

const defaultOptions = [
    { label: 'Win rate', value: '97.50%' },
    { label: 'Payout', value: '1-2 days' },
    { label: 'Min deposit', value: '$20' },
    { label: 'Jackpot', value: '11.01 m' },
    { label: 'Software', value: 'NetEnt' },
    { label: 'Casino', value: 'Spin Casino' },
];

export default function CardSlot({
             type = '',
             name = '',
             image = '',
             excerpt = '',
             options = [],
         }) {
    const finalOptions = options && options.length > 0 ? options : defaultOptions;

    return (
        <article className={`${styles['item-card']} ${styles.game}`}>
            <figure className={styles['thumb-wrap']}>
                <img src={image} alt="Game Image" />
            </figure>

            <div className={`${styles.name} ${styles.shadow}`}>{name}</div>

            <div className={styles.excerpt}>{excerpt}</div>
            <div className={styles['list-options']}>
                {finalOptions.map((option, index) => (
                    <div className={`${styles['item-option']} ${option.label.includes('Easiness') ? styles.row : ''}`} key={index}>
                        <div className={styles['label-option']}>
                            <div className={styles['name-option']}>{option.label}</div>
                        </div>
                        <div className={styles['label-value']}>
                            <span>{option.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles['list-actions']}>
                <a href="components/section" className="btn primary">Play now</a>
            </section>

        </article>
    );
}
