'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import TabGroup from '@/components/mobile/section/TabGroup';

function isImage(val) {
    return typeof val === 'string' && val.startsWith('/images/');
}

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
        images = [],
        badge = '',
        excerpt = '',
        faq = [],
        options = [],
    }) {
    const finalOptions = options && options.length > 0 ? options : defaultOptions;

    return (
        <article className="item-card">
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={10}
                navigation
                className="image-slider"
            >
                {images.map((image, idx) => (
                    <SwiperSlide key={idx}>
                        <figure className="thumb-wrap">
                            <img src={image} alt="Game Image" />
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>

            {badge && <div className="badge">{badge}</div>}

            <div className="name">{name}</div>

            {excerpt ? (
                <div className="excerpt">{excerpt}</div>
            ) : (
                <div className="list-options">
                    {finalOptions.map((option, index) => (
                        <div className="item-option" key={index}>
                            <div className="label-option">
                                <div className="name-option">{option.label}</div>
                            </div>
                            <div className="label-value">
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

            <section className="list-actions">
                <a href="components/section" className="btn primary">Play with Real Money</a>
                {!excerpt && (
                    <div>
                        <a href="components/section" className="btn light">Play for Free</a>
                    </div>
                )}
            </section>

            {faq && faq.length > 0 && (
                <TabGroup items={faq} />
            )}
        </article>
    );
}
