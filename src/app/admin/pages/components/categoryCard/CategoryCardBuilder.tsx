import React, { useState } from 'react';
import Image from 'next/image';
import { CategoryCardType, CategoryCardValue } from './types';
import { CategoryCard } from '@prismaClient';

interface TemplateOption {
    type: CategoryCardType;
    image: string;
    preview: string;
}

const templates: TemplateOption[] = [
    { type: CategoryCardType.BASE, image: '/assets/images/templates/category-card/base.webp', preview: '/assets/images/templates/category-card/base-preview.webp' },
    { type: CategoryCardType.BASE_OPTION, image: '/assets/images/templates/category-card/filter.webp', preview: '/assets/images/templates/category-card/filter-preview.webp' },
    { type: CategoryCardType.BASE_OPTION_FAQ, image: '/assets/images/templates/category-card/extended.webp', preview: '/assets/images/templates/category-card/extended-preview.webp' },
    { type: CategoryCardType.CASINO, image: '/assets/images/templates/category-card/casino.webp', preview: '/assets/images/templates/category-card/casino-preview.webp' },
];

interface Props {
    value: CategoryCardValue;
    categoryCards: CategoryCard[];
    onChange: (value: CategoryCardValue) => void;
}

export default function CategoryCardBuilder({ value, categoryCards, onChange }: Props) {
    const [showPreview, setShowPreview] = useState<string | null>(null);

    const getInitialValue = (type: CategoryCardType): CategoryCardValue => {
        switch (type) {
            case CategoryCardType.BASE:
                return {
                    label: '',
                    description: '',
                    category_id: '',
                    last_update: '',
                    ad_disclosure: '',
                    type: CategoryCardType.BASE
                };
            case CategoryCardType.BASE_OPTION:
                return {
                    label: '',
                    description: '',
                    category_id: '',
                    show_filter: false,
                    type: CategoryCardType.BASE_OPTION
                };
            case CategoryCardType.BASE_OPTION_FAQ:
                return {
                    label: '',
                    description: '',
                    category_id: '',
                    show_filter: false,
                    type: CategoryCardType.BASE_OPTION_FAQ
                };

            case CategoryCardType.CASINO:
                return {
                    label: '',
                    description: '',
                    category_id: '',
                    type: CategoryCardType.CASINO
                };
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
                        value={(value as any).label || ''}
                        onChange={(e) => handleChange('label', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={4}
                        value={(value as any).description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Category</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={(value as any).category_id || ''}
                        onChange={(e) => handleChange('category_id', e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categoryCards.map(card => (
                            <option key={card.id} value={card.id}>{card.label}</option>
                        ))}
                    </select>
                </div>
            </>
        );

        const renderAdditionalFields = () => {
            switch (value.type) {
                case CategoryCardType.BASE:
                    return (
                        <>
                            <div className="mb-4">
                                <label className="block mb-1">Last Update</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={(value as any).last_update || ''}
                                    onChange={(e) => handleChange('last_update', e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Ad Disclosure</label>
                                <textarea
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    value={(value as any).ad_disclosure || ''}
                                    onChange={(e) => handleChange('ad_disclosure', e.target.value)}
                                />
                            </div>
                        </>
                    );

                case CategoryCardType.BASE_OPTION:
                case CategoryCardType.BASE_OPTION_FAQ:
                    return (
                        <div className="mb-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={(value as any).show_filter || false}
                                    onChange={(e) => handleChange('show_filter', e.target.checked)}
                                />
                                <span>Show Filter</span>
                            </label>
                        </div>
                    );

                case CategoryCardType.CASINO:
                    return null;

                default:
                    return null;
            }
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
