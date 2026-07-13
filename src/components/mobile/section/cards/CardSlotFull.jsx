"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import FaqGroup from '@components/desktop/section/FaqGroup';

import styles from './Card.module.scss';
import Link from "next/link";
import Image from "next/image";

export default function CardSlot({ card }) {

    return (
        <li className={styles['item-card']}>
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

            {/*<div className={styles.badge}>Top1</div>*/}

            <div className={styles.name}>{card.label}</div>

            <div className={styles.excerpt}>{card.description}</div>
            <div className={styles['list-options']}>
                {card.options
                    .filter(option => !option.entity.use_for_filter && !option.entity.hash_tag)
                    .map((option, index) => (
                        <div
                            className={styles['item-option']}
                            key={option.entity.id ?? index}
                        >
                            <div className={styles['label-option']}>
                                <div className={styles['name-option']}>
                                    <span>{option.entity.label}</span>

                                    {option.entity.tooltip && (
                                        <span
                                            className={styles['tooltip']}
                                            tabIndex={0}
                                            aria-label={option.entity.tooltip}
                                        >
                                <span className={styles['tooltip-icon']}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99992 14.6667C4.31792 14.6667 1.33325 11.682 1.33325 8.00004C1.33325 4.31804 4.31792 1.33337 7.99992 1.33337C11.6819 1.33337 14.6666 4.31804 14.6666 8.00004C14.6666 11.682 11.6819 14.6667 7.99992 14.6667ZM7.99992 13.3334C9.41441 13.3334 10.771 12.7715 11.7712 11.7713C12.7713 10.7711 13.3333 9.41453 13.3333 8.00004C13.3333 6.58555 12.7713 5.229 11.7712 4.2288C10.771 3.22861 9.41441 2.66671 7.99992 2.66671C6.58543 2.66671 5.22888 3.22861 4.22868 4.2288C3.22849 5.229 2.66659 6.58555 2.66659 8.00004C2.66659 9.41453 3.22849 10.7711 4.22868 11.7713C5.22888 12.7715 6.58543 13.3334 7.99992 13.3334V13.3334ZM7.33325 4.66671H8.66658V6.00004H7.33325V4.66671ZM7.33325 7.33337H8.66658V11.3334H7.33325V7.33337Z" fill="black" fillOpacity="0.56"/>
                                    </svg>
                                </span>

                                <span
                                    className={styles['tooltip-content']}
                                    role="tooltip"
                                >
                                    {option.entity.tooltip}
                                </span>
                            </span>
                                    )}
                                </div>
                            </div>

                            <div className={styles['label-value']}>
                                {option.entity.input_type === 'image' ? (
                                    <Image
                                        src={option.value}
                                        alt={option.entity.label || ''}
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
                    Play for Free
                </Link>
            </section>

            <FaqGroup items={card.faqs} variant="faq-group" />
        </li>
    );
}
