import React from 'react';
import CardSlotCompare from '@/src/components/mobile/section/cards/CardSlotCompare';
import CardGame from "@/src/components/mobile/section/cards/CardGame";
import CardGameEasiest from "@/src/components/mobile/section/cards/CardGameEasiest";

import CardSlotSimpleLastUpdate from '@/src/components/mobile/section/cards/CardSlotSimpleLastUpdate';
import CardSlotSimple from '@/src/components/mobile/section/cards/CardSlotSimple';
import CardSlotFull from '@/src/components/mobile/section/cards/CardSlotFull';
import CardSlotOnlyOptions from '@/src/components/mobile/section/cards/CardSlotOnlyOptions';
import CardCasinoWithOption from "@components/mobile/section/cards/CardCasinoWithOption";

import styles from './CardsList.module.scss';


export default function CardsList( { cards, listType } ) {
    console.log(cards, listType);
    const renderCard = (card, index) => {
        switch (listType) {
            case 'card-slot_simple_last-update':
                return (
                    <CardSlotSimpleLastUpdate key={index} card={card}/>
                );
            case 'card-slot_simple':
                return (
                    <CardSlotSimple key={index} card={card}/>
                );
            case 'card-slot_full':
                return (
                    <CardSlotFull key={index} card={card}/>
                );
            case 'card-slot_only-options':
                return (
                    <CardSlotOnlyOptions key={index} card={card}/>
                );
            case 'card-casino_with-options':
                return (
                    <CardCasinoWithOption key={index} card={card}/>
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
            case 'game-easy':
                return (
                    <CardGameEasiest
                        key={index}
                        name={card.name}
                        image={card.image}
                        options={card.options}
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
        <section className={styles['cards-list']}>
            {cards.map(renderCard)}

            <button className="btn light">
                Show more
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
