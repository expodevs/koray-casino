"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Card.module.scss';


export default function CardSlot({ card }) {
    const handlePlayClick = (e) => {
        e.preventDefault();
        const url = card.referral_btn_1_link;
        if (url.startsWith('http')) {
            window.open(url, '_blank');
        }
    };

    return (
        <article className={styles['item-card']}>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={10}
                navigation
                className="image-slider"
            >
                {card.images.map((image, idx) => (
                    <SwiperSlide key={idx}>
                        <figure className={styles['thumb-wrap']}>
                            <img src={image.src} alt={image.alt} />
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.name}>{card.label}</div>

            <div className={styles.excerpt}>{card.description}</div>

            <section className={styles['list-actions']}>
                <button onClick={handlePlayClick} className="btn primary">Play with Real Money</button>
            </section>
        </article>
    );
}
