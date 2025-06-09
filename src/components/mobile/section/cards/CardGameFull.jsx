'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import FaqGroup from '@/src/components/mobile/section/FaqGroup';

import styles from './Card.module.scss';
import Link from "next/link";
import Image from "next/image";

export default function CardGameFull({card}) {

    return (
        <article className={`${styles['item-card']} ${styles.game}`}>
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
            <div className={styles['list-options']}>
                {card.options.map((option, index) => (
                    <div className={styles['item-option']} key={index}>
                        <div className={styles['label-option']}>
                            <div className={styles['name-option']}>{option.entity.label}</div>
                        </div>
                        <div className={styles['label-value']}>
                            {(option.entity.input_type === 'image') ? (
                                <Image
                                    src={option.value}
                                    alt={''}
                                    fill
                                />
                            ) : (
                                <span>{option.value}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles['list-actions']}>
                <Link className="btn primary" target="_blank" rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/btn_1_link`}
                >
                    Play with Real Money
                </Link>
                <Link className="btn light" target="_blank" rel="noopener noreferrer"
                    href={`/redirect/card/${encodeURIComponent(card.referral_key)}/btn_2_link`}
                >
                    Play for free
                </Link>
            </section>

            <FaqGroup items={card.faqs} variant="faq-group" />
        </article>
    );
}
