'use client'

import React from 'react';
import CardSlot from '@/components/mobile/section/cards/CardSlot';
import CardSlotCompare from '@/components/mobile/section/cards/CardSlotCompare';
import CardCasino from "@/components/mobile/section/cards/CardCasino";
import CardGame from "@/components/mobile/section/cards/CardGame";

export default function CardsList({ cards = [] }) {
    const renderCard = (card, index) => {
        switch (card.type) {
            case 'casino':
                return (
                    <CardCasino key={index} />
                );
            case 'slot':
                return (
                    <CardSlot
                        key={index}
                        name={card.name}
                        images={card.images}
                        badge={card.badge}
                        options={card.options}
                        excerpt={card.excerpt}
                        faq={card.faq}
                    />
                );
            case 'slot-compare':
                return (
                    <CardSlotCompare
                        key={index}
                        name={card.name}
                        images={card.images}
                        excerpt={card.excerpt}
                    />
                );
            case 'game':
            default:
                return (
                    <CardGame
                        key={index}
                        name={card.name}
                        images={card.images}
                        badge={card.badge}
                        options={card.options}
                        excerpt={card.excerpt}
                        faq={card.faq}
                    />
                );
        }
    };

    return (
        <section className="cards-list">
            {cards.map(renderCard)}

            <button className="btn light-sm">
                Show more ({cards.length})
                <span className="ico">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.00011 4.97668L10.1251 0.851685L11.3034 2.03002L6.00011 7.33335L0.696777 2.03002L1.87511 0.851685L6.00011 4.97668Z"
                        fill="black"
                    />
                  </svg>
                </span>
            </button>
        </section>
    );
}
