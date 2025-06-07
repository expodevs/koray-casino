'use client'

import React, { useState } from 'react';
import { ListCardType } from '@app/api/front/types/card'
import CardSlotSimpleLastUpdate from '@components/desktop/section/cards/CardSlotSimpleLastUpdate';
import CardSlotSimple from '@components/desktop/section/cards/CardSlotSimple';
import CardSlotFull from '@components/desktop/section/cards/CardSlotFull';
import CardSlotOnlyOptions from '@components/desktop/section/cards/CardSlotOnlyOptions';
import CardCasinoWithOption from '@components/desktop/section/cards/CardCasinoWithOption';
import CardCasinoWithFaq from '@components/desktop/section/cards/CardCasinoWithFaq';
import CardGameCompare from '@components/desktop/section/cards/CardGameCompare';
import CardGameFull from '@components/desktop/section/cards/CardGameFull';
import CardGameShortPlay from '@components/desktop/section/cards/CardGameShortPlay';
import CardGameShort from '@components/desktop/section/cards/CardGameShort';


import styles from './CardsList.module.scss';

export default function CardsList( { cards, listType } ) {

    const [visibleCount, setVisibleCount] = useState(1);
    const renderCard = (card, idx) => {
        switch (listType) {
            case ListCardType.SimpleLastUpdate:
                return <CardSlotSimpleLastUpdate key={idx} card={card} />
            case ListCardType.SlotSimple:
                return <CardSlotSimple key={idx} card={card} />
            case ListCardType.SlotFull:
                return <CardSlotFull key={idx} card={card} />
            case ListCardType.SlotOnlyOptions:
                return <CardSlotOnlyOptions key={idx} card={card} />
            case ListCardType.CasinoWithOptions:
                return <CardCasinoWithOption key={idx} card={card} />
            case ListCardType.CasinoWithFaq:
                return <CardCasinoWithFaq key={idx} card={card} />
            case ListCardType.GameCompare:
                return <CardGameCompare key={idx} card={card} />
            case ListCardType.GameFull:
                return <CardGameFull key={idx} card={card} />
            case ListCardType.GameShortPlay:
                return <CardGameShortPlay key={idx} card={card} />
            case ListCardType.GameShort:
                return <CardGameShort key={idx} card={card} />
            default:
                return <CardSlotSimple key={idx} card={card} />
        }
    };

    const visibleCards = cards.slice(0, visibleCount);

    const shouldShowButton = visibleCount < cards.length;

    const handleShowMore = () => {
        setVisibleCount(cards.length);
    };

    return (
        <section className={styles['cards-list']}>
            {visibleCards.map(renderCard)}

            {shouldShowButton && (
                <button onClick={handleShowMore} className="btn light">
                    Show more
                    <span className="ico">
                        <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              d="M6.00011 4.97668L10.1251 0.851685L11.3034 2.03002L6.00011 7.33335L0.696777 2.03002L1.87511 0.851685L6.00011 4.97668Z"
                              fill="black"
                          />
                        </svg>
                    </span>
                </button>
            )}
        </section>
    );
}
