"use client";
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Card.module.scss';
import Image from "next/image";

export default function CardGameShort({card}) {

    return (
        <article className={`${styles['item-card']} ${styles.game}`}>
            <figure className={styles['thumb-wrap']}>
                <Image
                    src={card.images[0].src}
                    alt={card.images[0].alt}
                    fill
                />
            </figure>

            <div className={`${styles.name} ${styles.shadow}`}>{card.label}</div>

            <div className={styles.excerpt}>{card.description}</div>
            <div className={styles['list-options']}>
                {card.options
                    .filter(option => !option.entity.use_for_filter && !option.entity.hash_tag)
                    .map((option, index) => (
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
        </article>
    );
}
