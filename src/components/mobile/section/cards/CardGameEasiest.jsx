'use client'

import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

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
        <article className="item-card game">
            <figure className="thumb-wrap">
                <img src={image} alt="Game Image" />
            </figure>

            <div className="name">{name}</div>

            <div className="excerpt">{excerpt}</div>
            <div className="list-options">
                {finalOptions.map((option, index) => (
                    <div className={`item-option ${option.label.includes('Easiness') ? 'row' : ''}`} key={index}>
                        <div className="label-option">
                            <div className="name-option">{option.label}</div>
                        </div>
                        <div className="label-value">
                            <span>{option.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <section className="list-actions">
                <a href="components/section" className="btn primary">Play now</a>
            </section>

        </article>
    );
}
