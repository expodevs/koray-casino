'use client'

import React, { useState, useMemo } from 'react';

import CardsList from "@components/desktop/section/CardsList";
import FilterGame from '@components/desktop/section/FilterGame';
import FilterGameGrouped from '@components/desktop/section/FilterGameGrouped';

export default function CardsListSimple( { items } ) {
    const {
        type: listType,
        cards,
        label,
        description,
        show_filter,
        filter_mode,
        is_slider,
    } = items.props;

    const flatFilters = useMemo(() => {
        const setOfLabels = new Set();

        for (const card of cards) {
            if (!Array.isArray(card.options)) continue;

            card.options.forEach(opt => {
                if (
                    opt.entity &&
                    typeof opt.entity.label === 'string' &&
                    opt.entity.use_for_filter
                ) {
                    setOfLabels.add(opt.entity.label);
                }
            });
        }

        return Array.from(setOfLabels);
    }, [cards]);

    const groupedFilters = useMemo(() => {
        const groupsMap = new Map();

        for (const card of cards) {
            if (!Array.isArray(card.options)) continue;

            for (const opt of card.options) {
                const entity = opt.entity;
                if (!entity?.use_for_filter) continue;

                const groupLabel = String(entity.label || '').trim();

                const rawValue =
                    opt.value ??
                    entity.value ??
                    entity.tooltip ??
                    entity.label ??
                    '';

                const itemValue = String(rawValue).trim();

                if (!groupLabel || !itemValue) continue;

                if (!groupsMap.has(groupLabel)) {
                    groupsMap.set(groupLabel, new Map());
                }

                const itemsMap = groupsMap.get(groupLabel);

                if (!itemsMap.has(itemValue)) {
                    itemsMap.set(itemValue, {
                        value: itemValue,
                        label: itemValue,
                        position: entity.position ?? 0,
                    });
                }
            }
        }

        return Array.from(groupsMap.entries())
            .map(([label, itemsMap]) => ({
                label,
                items: Array.from(itemsMap.values()).sort((a, b) => a.label.localeCompare(b.label)),
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [cards]);

    const [currentFilter, setCurrentFilter] = useState(null);
    const [selectedGroupedFilters, setSelectedGroupedFilters] = useState({});

    const toggleFilter = (filterLabel) => {
        if (currentFilter === filterLabel) {
            setCurrentFilter(null);
        } else {
            setCurrentFilter(filterLabel);
        }
    };

    const toggleGroupedFilter = (groupLabel, itemValue) => {
        setSelectedGroupedFilters(prev => {
            const prevGroup = Array.isArray(prev[groupLabel]) ? prev[groupLabel] : [];
            const exists = prevGroup.includes(itemValue);

            const nextGroup = exists
                ? prevGroup.filter(v => v !== itemValue)
                : [...prevGroup, itemValue];

            const next = { ...prev };

            if (nextGroup.length) {
                next[groupLabel] = nextGroup;
            } else {
                delete next[groupLabel];
            }

            return next;
        });
    };

    const filteredCards = useMemo(() => {
        if (filter_mode === 'grouped') {
            const activeGroups = Object.entries(selectedGroupedFilters);

            if (!activeGroups.length) {
                return cards;
            }

            return cards.filter(card => {
                if (!Array.isArray(card.options)) return false;

                return activeGroups.every(([groupLabel, selectedValues]) => {
                    if (!selectedValues.length) return true;

                    const cardValuesInGroup = card.options
                        .filter(opt => opt.entity?.use_for_filter && opt.entity?.label === groupLabel)
                        .map(opt => String(opt.value || opt.entity?.value || '').trim())
                        .filter(Boolean);

                    return selectedValues.some(v => cardValuesInGroup.includes(v));
                });
            });
        }

        if (!currentFilter) {
            return cards;
        }

        return cards.filter(card =>
            Array.isArray(card.options) &&
            card.options.some(
                opt => opt.entity?.use_for_filter && opt.entity.label === currentFilter
            )
        );
    }, [cards, currentFilter, filter_mode, selectedGroupedFilters]);

    return (
        <>
            <h2 className="title-section">{label}</h2>
            <section className="text">{description}</section>

            {show_filter && filter_mode !== 'grouped' && (
                <FilterGame
                    filters={flatFilters}
                    selected={currentFilter}
                    onChange={toggleFilter}
                />
            )}

            {show_filter && filter_mode === 'grouped' && (
                <FilterGameGrouped
                    groups={groupedFilters}
                    selected={selectedGroupedFilters}
                    onChange={toggleGroupedFilter}
                />
            )}

            <section className="card-games">
                <CardsList cards={filteredCards} listType={listType} isSlider={Boolean(is_slider)}/>
            </section>
        </>
    )
}
