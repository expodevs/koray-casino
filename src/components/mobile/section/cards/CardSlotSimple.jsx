"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Card.module.scss';
import Link from "next/link";
import Image from "next/image";


export default function CardSlot({ card }) {

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
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                            />
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.name}>{card.label}</div>

            <div className={styles.excerpt}>{card.description}</div>

            <section className={styles['list-actions']}>
                <Link className="btn primary" target="_blank" rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/btn_1_link`}
                >
                    Play with Real Money
                </Link>
            </section>
        </article>
    );
}
