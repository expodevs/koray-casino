"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import FaqGroup from '@components/desktop/section/FaqGroup';

import styles from './Card.module.scss';

export default function CardSlot({ card }) {
    const handleClick = (link) => (e) => {
        e.preventDefault();
        if (typeof link === 'string' && link.startsWith('http')) {
            window.open(link, '_blank');
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

            {/*<div className={styles.badge}>Top1</div>*/}

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
                                <img src={option.value} alt="" />
                            ) : (
                                <span>{option.value}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles['list-actions']}>
                <button onClick={handleClick(card.referral_btn_1_link)} className="btn primary">Play with Real Money</button>
                <button onClick={handleClick(card.referral_btn_2_link)} className="btn light">Play for Free</button>
            </section>

            <FaqGroup items={card.faqs} variant="faq-group" />
        </article>
    );
}
