"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import FaqGroup from '@components/desktop/section/FaqGroup';

import styles from './Card.module.scss';

function isImage(val) {
    return typeof val === 'string' && val.startsWith('/images/');
}

export default function CardSlot({ card }) {
    console.log(card);

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
                    {finalOptions.map((option, index) => (
                        <div className={styles['item-option']} key={index}>
                            <div className={styles['label-option']}>
                                <div className={styles['name-option']}>{option.label}</div>
                            </div>
                            <div className={styles['label-value']}>
                                {isImage(option.value) ? (
                                    <img src={option.value} alt="" />
                                ) : (
                                    <span>{option.value}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <section className={styles['list-actions']}>
                <a href="components/section" className="btn primary">Play with Real Money</a>
                {!excerpt && (
                    <div>
                        <a href="components/section" className="btn light">Play for Free</a>
                    </div>
                )}
            </section>

            {faq && faq.length > 0 && (
                <FaqGroup items={faq} variant="faq-group" />
            )}
        </article>
    );
}
