import React, { useState } from 'react';
import Image from 'next/image';
import { CategoryCardType, CategoryCardValue, BaseCategoryCard, ExtendedCategoryCard, SlotCardSource } from './types';
import { CategoryCard, Card } from '@prismaClient';
import ShowOptionCard, { OptionItem } from './ShowOptionCard';
import IconCardSelector, { IconCardItem } from './IconCardSelector';
import { Option, IconCardSelect } from '@/@types/response';

interface TemplateOption {
    type: CategoryCardType;
    image: string;
    preview: string;
}

const templates: TemplateOption[] = [
    { type: CategoryCardType.CARD_SLOT_SIMPLE_LAST_UPDATE, image: '/assets/images/templates/casinos/card-slot_simple.webp', preview: '/assets/images/templates/casinos/card-slot_simple.webp' },
    { type: CategoryCardType.CARD_CASINO_WITH_FAQ, image: '/assets/images/templates/casinos/card-casino_with-faq.webp', preview: '/assets/images/templates/casinos/card-casino_with-faq.webp' },
    { type: CategoryCardType.CARD_CASINO_WITH_OPTIONS, image: '/assets/images/templates/casinos/card-casino_with-options.webp', preview: '/assets/images/templates/casinos/card-casino_with-options.webp' },
    { type: CategoryCardType.CARD_GAME_COMPARE, image: '/assets/images/templates/casinos/card-game_compare.webp', preview: '/assets/images/templates/casinos/card-game_compare.webp' },
    { type: CategoryCardType.CARD_GAME_FULL, image: '/assets/images/templates/casinos/card-game_full.webp', preview: '/assets/images/templates/casinos/card-game_full.webp' },
    { type: CategoryCardType.CARD_GAME_SHORT_PLAY, image: '/assets/images/templates/casinos/card-game_short-play.webp', preview: '/assets/images/templates/casinos/card-game_short-play.webp' },
    { type: CategoryCardType.CARD_GAME_SHORT, image: '/assets/images/templates/casinos/card-game_short.webp', preview: '/assets/images/templates/casinos/card-game_short.webp' },
    { type: CategoryCardType.CARD_SLOT_FULL_WITH_MORE_OPTIONS, image: '/assets/images/templates/casinos/card-slot_full-with-more-options.webp', preview: '/assets/images/templates/casinos/card-slot_full-with-more-options.webp' },
    { type: CategoryCardType.CARD_SLOT_FULL, image: '/assets/images/templates/casinos/card-slot_full.webp', preview: '/assets/images/templates/casinos/card-slot_full.webp' },
    { type: CategoryCardType.CARD_SLOT_ONLY_OPTIONS_REVIEW, image: '/assets/images/templates/casinos/card-slot_only-options-review.webp', preview: '/assets/images/templates/casinos/card-slot_only-options-review.webp' },
    { type: CategoryCardType.CARD_SLOT_ONLY_OPTIONS, image: '/assets/images/templates/casinos/card-slot_only-options.webp', preview: '/assets/images/templates/casinos/card-slot_only-options.webp' },
    { type: CategoryCardType.CARD_SLOT_OPTIONS_AND_DESCRIPTION, image: '/assets/images/templates/casinos/card-slot_options-and-description.webp', preview: '/assets/images/templates/casinos/card-slot_options-and-description.webp' },
    { type: CategoryCardType.CARD_SLOT_SIMPLE, image: '/assets/images/templates/casinos/card-slot_simple.webp', preview: '/assets/images/templates/casinos/card-slot_simple.webp' },
    { type: CategoryCardType.CARD_SLOT_WITHOUT_FAQ, image: '/assets/images/templates/casinos/card-slot_without-faq.webp', preview: '/assets/images/templates/casinos/card-slot_without-faq.webp' },
];

interface Props {
    value: CategoryCardValue;
    categoryCards: CategoryCard[];
    casinoOptions?: Option[];
    iconCards?: IconCardSelect[];
    cards?: Card[];
    onChange: (value: CategoryCardValue) => void;
}

type BuilderValue = CategoryCardValue & Partial<Pick<ExtendedCategoryCard, 'source' | 'card_ids' | 'iconCardItems' | 'show_filter'>>;

const getSource = (v: BuilderValue): SlotCardSource => v.source ?? 'category';
const getCardIds = (v: BuilderValue): Array<number | string> => (Array.isArray(v.card_ids) ? v.card_ids : []);


export default function CategoryCardBuilder({ value, categoryCards, casinoOptions, iconCards, cards = [], onChange }: Props) {
    const v = value as BuilderValue;
    const source = getSource(v);
    const cardIds = getCardIds(v);
    const isManual = source === 'manual';

    const [showPreview, setShowPreview] = useState<string | null>(null);

    const lastUpdateTypes = [
        CategoryCardType.CARD_SLOT_SIMPLE_LAST_UPDATE
    ];

    const optionTypes = [
        CategoryCardType.CARD_SLOT_SIMPLE_LAST_UPDATE,
        CategoryCardType.CARD_CASINO_WITH_FAQ,
        CategoryCardType.CARD_CASINO_WITH_OPTIONS,
        CategoryCardType.CARD_GAME_FULL,
        CategoryCardType.CARD_GAME_SHORT_PLAY,
        CategoryCardType.CARD_GAME_SHORT,
        CategoryCardType.CARD_SLOT_FULL_WITH_MORE_OPTIONS,
        CategoryCardType.CARD_SLOT_FULL,
        CategoryCardType.CARD_SLOT_ONLY_OPTIONS_REVIEW,
        CategoryCardType.CARD_SLOT_ONLY_OPTIONS,
        CategoryCardType.CARD_SLOT_OPTIONS_AND_DESCRIPTION,
        CategoryCardType.CARD_SLOT_WITHOUT_FAQ,
    ];

    const iconCardImageTypes = [
        CategoryCardType.CARD_CASINO_WITH_FAQ,
        CategoryCardType.CARD_CASINO_WITH_OPTIONS,
        CategoryCardType.CARD_SLOT_FULL_WITH_MORE_OPTIONS,
    ];

    const filterTypes = [
        CategoryCardType.CARD_SLOT_SIMPLE,
        CategoryCardType.CARD_SLOT_FULL,
        CategoryCardType.CARD_SLOT_ONLY_OPTIONS,
        CategoryCardType.CARD_GAME_FULL
    ];

    const getInitialValue = (type: CategoryCardType): CategoryCardValue => {
        const result: ExtendedCategoryCard = {
            label: '',
            description: '',
            category_id: '',
            last_update: '',
            ad_disclosure: '',
            options: '',
            show_filter: false,
            iconCardItems: JSON.stringify([{ id: 0, position: 1 }]),
            source: 'category' as SlotCardSource,
            card_ids: [],
            type: type
        };

        return result;
    };

    const parseIconCardItems = (): IconCardItem[] => {
        if (!((value as ExtendedCategoryCard).iconCardItems)) {
            return [];
        }

        try {
            return JSON.parse((value as ExtendedCategoryCard).iconCardItems || '');
        } catch {
            return [];
        }
    };

    const renderFields = () => {
        const handleChange = (field: string, newValue: string | boolean) => {
            onChange({ ...value, [field]: newValue });
        };

        const renderBaseFields = () => (
            <>
                <div className="mb-4">
                    <label className="block mb-1">Label</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={value.label || ''}
                        onChange={(e) => handleChange('label', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={4}
                        value={value.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Source</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={source}
                        onChange={(e) => {
                            const nextSource = (e.target.value as SlotCardSource) || 'category';

                            const next: BuilderValue = { ...value, source: nextSource };

                            if (nextSource === 'manual' && !Array.isArray(next.card_ids)) {
                                next.card_ids = [];
                            }

                            onChange(next as CategoryCardValue);
                        }}
                    >
                        <option value="category">By category</option>
                        <option value="manual">Manual</option>
                    </select>
                    <p className="text-xs opacity-70 mt-1">Choose where this block should take cards from.</p>
                </div>

                {source === 'category' && (
                    <div className="mb-4">
                        <label className="block mb-1">Category</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={value.category_id || ''}
                            onChange={(e) => handleChange('category_id', e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categoryCards.map(card => (
                                <option key={card.id} value={card.id}>{card.label}</option>
                            ))}
                        </select>
                    </div>
                )}

                {source === 'manual' && (
                    <div className="mb-4">
                        <label className="block mb-1">Manual cards</label>
                        <div className="space-y-2">
                            {cardIds.map((id, idx) => {
                                const current = Number(id) || 0;
                                const list = (cards || []).filter((c) => String(c.type) === 'card');

                                return (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <select
                                            className="flex-1 p-2 border rounded"
                                            value={current}
                                            onChange={(e) => {
                                                const nextIds = [...cardIds];
                                                nextIds[idx] = Number(e.target.value);
                                                onChange({ ...value, card_ids: nextIds } as CategoryCardValue);
                                            }}
                                        >
                                            <option value={0}>Select card…</option>
                                            {list.map((c) => (
                                                <option key={c.id} value={c.id}>#{c.id} {c.label}</option>
                                            ))}
                                        </select>

                                        <button
                                            type="button"
                                            className="px-2 py-1 border rounded disabled:opacity-40"
                                            disabled={idx === 0}
                                            onClick={() => {
                                                const nextIds = [...cardIds];
                                                [nextIds[idx - 1], nextIds[idx]] = [nextIds[idx], nextIds[idx - 1]];
                                                onChange({ ...value, card_ids: nextIds } as CategoryCardValue);
                                            }}
                                        >
                                            ↑
                                        </button>

                                        <button
                                            type="button"
                                            className="px-2 py-1 border rounded disabled:opacity-40"
                                            disabled={idx === cardIds.length - 1}
                                            onClick={() => {
                                                const nextIds = [...cardIds];
                                                [nextIds[idx + 1], nextIds[idx]] = [nextIds[idx], nextIds[idx + 1]];
                                                onChange({ ...value, card_ids: nextIds } as CategoryCardValue);
                                            }}
                                        >
                                            ↓
                                        </button>

                                        <button
                                            type="button"
                                            className="px-2 py-1 border rounded"
                                            onClick={() => {
                                                onChange({ ...value, card_ids: cardIds.filter((_, i) => i !== idx) } as CategoryCardValue);
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                );
                            })}

                            <button
                                type="button"
                                className="px-3 py-2 border rounded"
                                onClick={() => {
                                    const nextIds = [...cardIds, 0];
                                    onChange({ ...value, card_ids: nextIds } as CategoryCardValue);
                                }}
                            >
                                + Add card
                            </button>

                            {(cards || []).filter((c) => String(c.type) === 'card').length === 0 && (
                                <p className="text-xs opacity-70">No cards found for selection.</p>
                            )}
                        </div>
                    </div>
                )}
            </>
        );

        const renderAdditionalFields = () => {

            const sections = [];

            if (lastUpdateTypes.includes(value.type)) {
                sections.push(
                    <React.Fragment key="last-update-section">
                        <div className="mb-4">
                            <label className="block mb-1">Last Update</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={(value as BaseCategoryCard).last_update || ''}
                                onChange={(e) => handleChange('last_update', e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Ad Disclosure</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={4}
                                value={(value as BaseCategoryCard).ad_disclosure || ''}
                                onChange={(e) => handleChange('ad_disclosure', e.target.value)}
                            />
                        </div>
                    </React.Fragment>
                );
            }

            if (optionTypes.includes(value.type) && !isManual) {
                const parseOptionItems = (): OptionItem[] => {
                    if (!((value as BaseCategoryCard).options)) {
                        return [];
                    }

                    try {
                        return JSON.parse((value as BaseCategoryCard).options || '');
                    } catch {
                        return [];
                    }
                };

                const optionItems = parseOptionItems();

                sections.push(
                    <ShowOptionCard
                        key="options-section"
                        label="Casino Options"
                        optionItems={optionItems}
                        casinoOptions={casinoOptions}
                        onChange={(optionsValue) => handleChange('options', optionsValue)}
                    />
                );
            }

            if (iconCardImageTypes.includes(value.type) && iconCards && iconCards.length > 0) {
                const iconCardItems = parseIconCardItems();

                sections.push(
                    <IconCardSelector
                        key="icon-card-selector"
                        label="Icon Cards"
                        iconCardItems={iconCardItems}
                        iconCards={iconCards}
                        onChange={(iconCardItemsValue) => handleChange('iconCardItems', iconCardItemsValue)}
                    />
                );
            }

            if (filterTypes.includes(value.type)) {
                sections.push(
                    <div className="mb-4" key="filter-section">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={(value as ExtendedCategoryCard).show_filter || false}
                                onChange={(e) => handleChange('show_filter', e.target.checked)}
                            />
                            <span>Show Filter</span>
                        </label>
                    </div>
                );
            }

            return sections.length > 0 ? <>{sections}</> : null;
        };

        return (
            <div className="space-y-4">
                {renderBaseFields()}
                {renderAdditionalFields()}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
                {templates.map((template) => (
                    <div
                        key={template.type}
                        className="relative cursor-pointer"
                        onMouseEnter={() => setShowPreview(template.preview)}
                        onMouseLeave={() => setShowPreview(null)}
                        onClick={() => onChange(getInitialValue(template.type))}
                    >
                        <div className={`${value.type === template.type ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                            <Image
                                src={template.image}
                                alt={template.type}
                                width={100}
                                height={100}
                                className="border rounded"
                            />
                        </div>
                        {showPreview === template.preview && (
                            <div className="absolute z-10 -right-[310px] top-0">
                                <Image
                                    src={template.preview}
                                    alt={`${template.type} preview`}
                                    width={300}
                                    height={400}
                                    className="border rounded shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {renderFields()}
        </div>
    );
}
