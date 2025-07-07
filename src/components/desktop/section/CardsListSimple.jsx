'use client'

import React, { useState, useMemo } from 'react';

import CardsList from "@components/desktop/section/CardsList";
import FilterGame from '@components/desktop/section/FilterGame';

export default function CardsListSimple( { items } ) {
    const {
        type: listType,
        cards,
        label,
        description,
        show_filter,
    } = items.props;

    const filters = useMemo(() => {
        const setOfLabels = new Set();
        for (const card of cards) {
            if (Array.isArray(card.options)) {
                card.options.forEach(opt => {
                    if (opt.entity && typeof opt.entity.label === 'string' && opt.entity.use_for_filter) {
                        setOfLabels.add(opt.entity.label);
                    }
                });
            }
        }
        return Array.from(setOfLabels);
    }, [cards]);

    const [currentFilter, setCurrentFilter] = useState(null)

    const toggleFilter = (label) => {
        if (currentFilter === label) {
            setCurrentFilter(null);
        } else {
            setCurrentFilter(label);
        }
    };

    const filteredCards = useMemo(() => {
        if (!currentFilter) {
            return cards;
        }
        return cards.filter(card =>
            Array.isArray(card.options) &&
            card.options.some(opt => opt.entity.label === currentFilter)
        );
    }, [cards, currentFilter]);

    return (
        <>
            <h2 className="title-section">{label}</h2>
            <section className="text">{description}</section>

            {show_filter && (
                <FilterGame
                    filters={filters}
                    selected={currentFilter}
                    onChange={toggleFilter}
                />
            )}


            <section className="card-games">
                <CardsList cards={filteredCards} listType={listType}/>
            </section>
        </>
    )
}
