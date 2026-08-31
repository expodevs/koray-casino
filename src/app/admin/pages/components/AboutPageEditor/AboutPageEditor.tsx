'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
    FaArrowDown,
    FaArrowUp,
    FaPlus,
    FaTrash,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import CustomFileSelector from '@components/file/CustomFileSelector';
import TinyMCE from '@components/TinyMCE';
import { Card } from '@prismaClient';

type AboutPageData = Record<string, any>;

function isRecord(value: unknown): value is Record<string, any> {
    return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

type SectionProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
};

type InputFieldProps = {
    label: string;
    value?: string | number | null;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
};

type TextareaFieldProps = {
    label: string;
    value?: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
};

type ImageFieldProps = {
    label?: string;
    src?: string | null;
    alt?: string;
    onChange: (src: string) => void;
};

type RowActionsProps = {
    index: number;
    length: number;
    onMove: (index: number, direction: -1 | 1) => void;
    onRemove: (index: number) => void;
};

function Section({
    title,
    description,
    children,
    actions,
}: SectionProps) {
    return (
        <section className="border rounded-lg p-5 bg-white">
            <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    {description ? (
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    ) : null}
                </div>

                {actions}
            </div>

            {children}
        </section>
    );
}

function InputField({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
}: InputFieldProps) {
    return (
        <div>
            <label className="block mb-1 text-sm font-medium">
                {label}
            </label>
            <input
                type={type}
                className="w-full border rounded px-3 py-2"
                value={value ?? ''}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
}

function TextareaField({
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
}: TextareaFieldProps) {
    return (
        <div>
            <label className="block mb-1 text-sm font-medium">
                {label}
            </label>
            <textarea
                className="w-full border rounded px-3 py-2"
                rows={rows}
                value={value ?? ''}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
}

function RowActions({
    index,
    length,
    onMove,
    onRemove,
}: RowActionsProps) {
    return (
        <div className="flex items-center gap-1">
            <button
                type="button"
                onClick={() => onMove(index, -1)}
                disabled={index === 0}
                className="p-2 rounded hover:bg-blue-100 disabled:opacity-30"
                title="Move up"
            >
                <FaArrowUp />
            </button>

            <button
                type="button"
                onClick={() => onMove(index, 1)}
                disabled={index === length - 1}
                className="p-2 rounded hover:bg-blue-100 disabled:opacity-30"
                title="Move down"
            >
                <FaArrowDown />
            </button>

            <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-2 text-red-600 rounded hover:bg-red-100"
                title="Delete"
            >
                <FaTrash />
            </button>
        </div>
    );
}

function AddButton({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
            <FaPlus />
            {children}
        </button>
    );
}

async function uploadAboutImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/about/upload', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result?.success || !result?.src) {
        throw new Error(result?.message || 'Upload failed');
    }

    return result.src;
}

async function removeAboutImage(src: string): Promise<void> {
    if (!src || !src.includes('/uploads/about/')) {
        return;
    }

    const response = await fetch('/api/admin/about/remove-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ src }),
    });

    const result = await response.json();

    if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'Remove failed');
    }
}

function ImageField({
    label = 'Image',
    src,
    alt = '',
    onChange,
}: ImageFieldProps) {
    const handleUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const uploadedSrc = await uploadAboutImage(file);
            onChange(uploadedSrc);
            toast.success('Image uploaded');
        } catch (error) {
            console.error(error);
            toast.error('Upload failed');
        } finally {
            event.target.value = '';
        }
    };

    const handleRemove = async () => {
        const currentSrc = src || '';

        try {
            await removeAboutImage(currentSrc);
            onChange('');
            toast.success('Image removed');
        } catch (error) {
            console.error(error);
            toast.error('Failed to remove image');
        }
    };

    return (
        <div>
            <label className="block mb-2 text-sm font-medium">
                {label}
            </label>

            <InputField
                label="Image URL"
                value={src || ''}
                onChange={onChange}
                placeholder="https://... or /images/..."
            />

            {src ? (
                <div className="flex items-start gap-4 mt-3 mb-3">
                    <div className="w-32 h-32 border rounded overflow-hidden bg-white">
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="text-red-600 p-2 rounded hover:bg-red-100 flex items-center gap-2"
                    >
                        <FaTrash />
                        Remove image
                    </button>
                </div>
            ) : null}

            <div className="mt-3">
                <CustomFileSelector
                    accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                    onChange={handleUpload}
                />
            </div>
        </div>
    );
}

function moveArrayItem<T>(
    items: T[],
    index: number,
    direction: -1 | 1,
): T[] {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= items.length) {
        return items;
    }

    const result = [...items];
    [result[index], result[nextIndex]] = [
        result[nextIndex],
        result[index],
    ];

    return result;
}

function StringListEditor({
    title,
    items,
    onChange,
    addLabel = 'Add item',
}: {
    title: string;
    items: string[];
    onChange: (items: string[]) => void;
    addLabel?: string;
}) {
    const list = Array.isArray(items) ? items : [];

    return (
        <div>
            <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="font-semibold">{title}</h3>
                <AddButton onClick={() => onChange([...list, ''])}>
                    {addLabel}
                </AddButton>
            </div>

            <div className="space-y-3">
                {list.map((item, index) => (
                    <div
                        className="flex items-center gap-3"
                        key={`${title}-${index}`}
                    >
                        <input
                            type="text"
                            className="flex-1 border rounded px-3 py-2"
                            value={item || ''}
                            onChange={(event) => {
                                const next = [...list];
                                next[index] = event.target.value;
                                onChange(next);
                            }}
                        />

                        <RowActions
                            index={index}
                            length={list.length}
                            onMove={(itemIndex, direction) =>
                                onChange(
                                    moveArrayItem(
                                        list,
                                        itemIndex,
                                        direction,
                                    ),
                                )
                            }
                            onRemove={(itemIndex) =>
                                onChange(
                                    list.filter(
                                        (_, currentIndex) =>
                                            currentIndex !== itemIndex,
                                    ),
                                )
                            }
                        />
                    </div>
                ))}

                {!list.length ? (
                    <div className="border border-dashed rounded-lg p-5 text-center text-gray-500">
                        No items yet.
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function ManualCardSelector({
    cardIds,
    cards,
    onChange,
}: {
    cardIds: number[];
    cards: Card[];
    onChange: (ids: number[]) => void;
}) {
    const ids = Array.isArray(cardIds) ? cardIds : [];
    // `cards` already comes from routeAdminApiCards.pageBuilderCard,
    // which returns only CardType.card. Do not filter again here.
    const list = cards || [];

    return (
        <div className="space-y-2">
            {ids.map((id, index) => (
                <div key={`manual-card-${index}`} className="flex gap-2 items-center">
                    <select
                        className="flex-1 p-2 border rounded"
                        value={Number(id) || 0}
                        onChange={(event) => {
                            const next = [...ids];
                            next[index] = Number(event.target.value);
                            onChange(next);
                        }}
                    >
                        <option value={0}>Select card…</option>
                        {list.map((card) => (
                            <option key={card.id} value={card.id}>
                                #{card.id} {card.label}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="px-2 py-1 border rounded disabled:opacity-40"
                        disabled={index === 0}
                        onClick={() => onChange(moveArrayItem(ids, index, -1))}
                    >
                        ↑
                    </button>

                    <button
                        type="button"
                        className="px-2 py-1 border rounded disabled:opacity-40"
                        disabled={index === ids.length - 1}
                        onClick={() => onChange(moveArrayItem(ids, index, 1))}
                    >
                        ↓
                    </button>

                    <button
                        type="button"
                        className="px-2 py-1 border rounded text-red-600"
                        onClick={() => onChange(ids.filter((_, itemIndex) => itemIndex !== index))}
                    >
                        ✕
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="px-3 py-2 border rounded"
                onClick={() => onChange([...ids, 0])}
            >
                + Add card
            </button>

            {!list.length ? (
                <p className="text-xs opacity-70">No slot cards found for selection.</p>
            ) : null}
        </div>
    );
}

void StringListEditor;

export default function AboutPageEditor({
    data,
    onChange,
    cards = [],
}: {
    data: AboutPageData;
    onChange: (data: AboutPageData) => void;
    cards?: Card[];
}) {
    const source = isRecord(data) ? data : {};

    const getSection = (section: string): Record<string, any> =>
        isRecord(source[section]) ? source[section] : {};

    const about = {
        ...source,
        hero: getSection('hero'),
        team: getSection('team'),
        media: getSection('media'),
        stats: getSection('stats'),
        trust: getSection('trust'),
        experts: getSection('experts'),
        reviews: getSection('reviews'),
        legal_nav: getSection('legal_nav'),
        faq: getSection('faq'),
        games: getSection('games'),
        final: getSection('final'),
        whatsapp: getSection('whatsapp'),
        subscribe: getSection('subscribe'),
    };

    const updateSection = (
        section: string,
        patch: Record<string, any>,
    ) => {
        onChange({
            ...source,
            [section]: {
                ...getSection(section),
                ...patch,
            },
        });
    };

    const updateListItem = (
        section: string,
        key: string,
        index: number,
        patch: Record<string, any>,
    ) => {
        const sectionData = getSection(section);
        const items = Array.isArray(sectionData[key])
            ? sectionData[key]
            : [];

        updateSection(section, {
            [key]: items.map((item: any, itemIndex: number) =>
                itemIndex === index
                    ? { ...item, ...patch }
                    : item,
            ),
        });
    };

    const removeListItem = (
        section: string,
        key: string,
        index: number,
    ) => {
        const sectionData = getSection(section);
        const items = Array.isArray(sectionData[key])
            ? sectionData[key]
            : [];

        updateSection(section, {
            [key]: items.filter(
                (_: unknown, itemIndex: number) =>
                    itemIndex !== index,
            ),
        });
    };

    const moveListItem = (
        section: string,
        key: string,
        index: number,
        direction: -1 | 1,
    ) => {
        const sectionData = getSection(section);
        const items = Array.isArray(sectionData[key])
            ? sectionData[key]
            : [];

        updateSection(section, {
            [key]: moveArrayItem(items, index, direction),
        });
    };

    const appendListItem = (
        section: string,
        key: string,
        item: Record<string, any>,
    ) => {
        const sectionData = getSection(section);
        const items = Array.isArray(sectionData[key])
            ? sectionData[key]
            : [];

        updateSection(section, {
            [key]: [...items, item],
        });
    };

    const getTabs = (section: string): any[] => {
        const sectionData = getSection(section);
        return Array.isArray(sectionData.tabs) ? sectionData.tabs : [];
    };

    const updateTab = (
        section: string,
        tabIndex: number,
        patch: Record<string, any>,
    ) => {
        const tabs = getTabs(section);
        updateSection(section, {
            tabs: tabs.map((tab, index) =>
                index === tabIndex ? { ...tab, ...patch } : tab,
            ),
        });
    };

    const appendTab = (section: string, tab: Record<string, any>) => {
        updateSection(section, { tabs: [...getTabs(section), tab] });
    };

    const removeTab = (section: string, tabIndex: number) => {
        updateSection(section, {
            tabs: getTabs(section).filter((_, index) => index !== tabIndex),
        });
    };

    const moveTab = (
        section: string,
        tabIndex: number,
        direction: -1 | 1,
    ) => {
        updateSection(section, {
            tabs: moveArrayItem(getTabs(section), tabIndex, direction),
        });
    };

    const updateTabListItem = (
        section: string,
        tabIndex: number,
        key: string,
        itemIndex: number,
        patch: Record<string, any>,
    ) => {
        const tab = getTabs(section)[tabIndex] || {};
        const list = Array.isArray(tab[key]) ? tab[key] : [];

        updateTab(section, tabIndex, {
            [key]: list.map((item: any, index: number) =>
                index === itemIndex ? { ...item, ...patch } : item,
            ),
        });
    };

    const appendTabListItem = (
        section: string,
        tabIndex: number,
        key: string,
        item: Record<string, any>,
    ) => {
        const tab = getTabs(section)[tabIndex] || {};
        const list = Array.isArray(tab[key]) ? tab[key] : [];
        updateTab(section, tabIndex, { [key]: [...list, item] });
    };

    const removeTabListItem = (
        section: string,
        tabIndex: number,
        key: string,
        itemIndex: number,
    ) => {
        const tab = getTabs(section)[tabIndex] || {};
        const list = Array.isArray(tab[key]) ? tab[key] : [];
        updateTab(section, tabIndex, {
            [key]: list.filter((_: unknown, index: number) => index !== itemIndex),
        });
    };

    const moveTabListItem = (
        section: string,
        tabIndex: number,
        key: string,
        itemIndex: number,
        direction: -1 | 1,
    ) => {
        const tab = getTabs(section)[tabIndex] || {};
        const list = Array.isArray(tab[key]) ? tab[key] : [];
        updateTab(section, tabIndex, {
            [key]: moveArrayItem(list, itemIndex, direction),
        });
    };

    const teamItems = Array.isArray(about.team?.items)
        ? about.team.items
        : [];
    const mediaLogos = Array.isArray(about.media?.logos)
        ? about.media.logos
        : [];
    const statsItems = Array.isArray(about.stats?.items)
        ? about.stats.items
        : [];
    const trustItems = Array.isArray(about.trust?.items)
        ? about.trust.items
        : [];
    const reviewTabs = getTabs('reviews');
    const legalTabs = getTabs('legal_nav');
    const faqTabs = getTabs('faq');
    const gameTabs = getTabs('games');

    return (
        <div className="space-y-8">
            <Section
                title="About Us: Hero"
                description="Main heading and description at the top of the page."
            >
                <div className="space-y-4">
                    <InputField
                        label="Title"
                        value={about.hero.title}
                        onChange={(value) =>
                            updateSection('hero', { title: value })
                        }
                    />
                    <InputField
                        label="Highlighted title"
                        value={about.hero.highlighted_title}
                        onChange={(value) =>
                            updateSection('hero', {
                                highlighted_title: value,
                            })
                        }
                    />
                    <TextareaField
                        label="Description"
                        value={about.hero.description}
                        onChange={(value) =>
                            updateSection('hero', {
                                description: value,
                            })
                        }
                    />
                </div>
            </Section>

            <Section
                title="About Us: Team"
                description="Team cards displayed below the hero section."
                actions={
                    <AddButton
                        onClick={() =>
                            appendListItem('team', 'items', {
                                name: '',
                                position: '',
                                experience: '',
                                image: '',
                            })
                        }
                    >
                        Add member
                    </AddButton>
                }
            >
                <div className="space-y-5">
                    <InputField
                        label="Experience label"
                        value={about.team.experience_label}
                        onChange={(value) =>
                            updateSection('team', {
                                experience_label: value,
                            })
                        }
                        placeholder="experience"
                    />

                    {teamItems.map((member: any, index: number) => (
                        <div
                            key={`about-team-${index}`}
                            className="border rounded-lg p-4 bg-gray-50"
                        >
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <h3 className="font-semibold">
                                    Team member #{index + 1}
                                </h3>
                                <RowActions
                                    index={index}
                                    length={teamItems.length}
                                    onMove={(itemIndex, direction) =>
                                        moveListItem(
                                            'team',
                                            'items',
                                            itemIndex,
                                            direction,
                                        )
                                    }
                                    onRemove={(itemIndex) =>
                                        removeListItem(
                                            'team',
                                            'items',
                                            itemIndex,
                                        )
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    label="Name"
                                    value={member.name}
                                    onChange={(value) =>
                                        updateListItem(
                                            'team',
                                            'items',
                                            index,
                                            { name: value },
                                        )
                                    }
                                />
                                <InputField
                                    label="Position"
                                    value={member.position}
                                    onChange={(value) =>
                                        updateListItem(
                                            'team',
                                            'items',
                                            index,
                                            { position: value },
                                        )
                                    }
                                />
                                <InputField
                                    label="Experience"
                                    value={member.experience}
                                    onChange={(value) =>
                                        updateListItem(
                                            'team',
                                            'items',
                                            index,
                                            { experience: value },
                                        )
                                    }
                                    placeholder="12 years"
                                />
                            </div>

                            <div className="mt-4">
                                <ImageField
                                    label="Member image"
                                    src={member.image}
                                    alt={member.name || ''}
                                    onChange={(value) =>
                                        updateListItem(
                                            'team',
                                            'items',
                                            index,
                                            { image: value },
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section
                title="About Us: Featured Media"
                description="Section heading and media outlet logos."
                actions={
                    <AddButton
                        onClick={() =>
                            updateSection('media', {
                                logos: [...mediaLogos, ''],
                            })
                        }
                    >
                        Add logo
                    </AddButton>
                }
            >
                <div className="space-y-5">
                    <InputField
                        label="Title"
                        value={about.media.title}
                        onChange={(value) =>
                            updateSection('media', { title: value })
                        }
                    />
                    <TextareaField
                        label="Description"
                        value={about.media.description}
                        onChange={(value) =>
                            updateSection('media', {
                                description: value,
                            })
                        }
                    />

                    <div className="space-y-4">
                        {mediaLogos.map((logo: string, index: number) => (
                            <div
                                key={`about-media-logo-${index}`}
                                className="border rounded-lg p-4 bg-gray-50"
                            >
                                <div className="flex items-center justify-between gap-4 mb-3">
                                    <h3 className="font-semibold">
                                        Logo #{index + 1}
                                    </h3>
                                    <RowActions
                                        index={index}
                                        length={mediaLogos.length}
                                        onMove={(itemIndex, direction) =>
                                            updateSection('media', {
                                                logos: moveArrayItem(
                                                    mediaLogos,
                                                    itemIndex,
                                                    direction,
                                                ),
                                            })
                                        }
                                        onRemove={(itemIndex) =>
                                            updateSection('media', {
                                                logos: mediaLogos.filter(
                                                    (_: string, currentIndex: number) =>
                                                        currentIndex !== itemIndex,
                                                ),
                                            })
                                        }
                                    />
                                </div>

                                <ImageField
                                    label="Media logo"
                                    src={logo}
                                    alt=""
                                    onChange={(value) => {
                                        const next = [...mediaLogos];
                                        next[index] = value;
                                        updateSection('media', {
                                            logos: next,
                                        });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section
                title="About Us: Statistics"
                description="Four statistic cards under Featured Media."
                actions={
                    <AddButton
                        onClick={() =>
                            appendListItem('stats', 'items', {
                                icon: '',
                                value: '',
                                label: '',
                                text: '',
                            })
                        }
                    >
                        Add statistic
                    </AddButton>
                }
            >
                <div className="space-y-4">
                    {statsItems.map((item: any, index: number) => (
                        <div
                            key={`about-stat-${index}`}
                            className="border rounded-lg p-4 bg-gray-50"
                        >
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <h3 className="font-semibold">
                                    Statistic #{index + 1}
                                </h3>
                                <RowActions
                                    index={index}
                                    length={statsItems.length}
                                    onMove={(itemIndex, direction) =>
                                        moveListItem(
                                            'stats',
                                            'items',
                                            itemIndex,
                                            direction,
                                        )
                                    }
                                    onRemove={(itemIndex) =>
                                        removeListItem(
                                            'stats',
                                            'items',
                                            itemIndex,
                                        )
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <ImageField
                                        label="Icon"
                                        src={item.icon}
                                        alt={`${item.label || 'Statistic'} icon`}
                                        onChange={(value) =>
                                            updateListItem(
                                                'stats',
                                                'items',
                                                index,
                                                { icon: value },
                                            )
                                        }
                                    />
                                </div>
                                <InputField
                                    label="Value"
                                    value={item.value}
                                    onChange={(value) =>
                                        updateListItem(
                                            'stats',
                                            'items',
                                            index,
                                            { value },
                                        )
                                    }
                                    placeholder="2.5M+"
                                />
                                <InputField
                                    label="Label"
                                    value={item.label}
                                    onChange={(value) =>
                                        updateListItem(
                                            'stats',
                                            'items',
                                            index,
                                            { label: value },
                                        )
                                    }
                                />
                                <InputField
                                    label="Bottom text"
                                    value={item.text}
                                    onChange={(value) =>
                                        updateListItem(
                                            'stats',
                                            'items',
                                            index,
                                            { text: value },
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section
                title="About Us: Why You Can Trust Us"
                description="Trust section with image and accordion items."
                actions={
                    <AddButton
                        onClick={() =>
                            appendListItem('trust', 'items', {
                                title: '',
                                text: '',
                                link_text: '',
                                link_url: '',
                            })
                        }
                    >
                        Add accordion item
                    </AddButton>
                }
            >
                <div className="space-y-5">
                    <InputField
                        label="Title"
                        value={about.trust.title}
                        onChange={(value) =>
                            updateSection('trust', { title: value })
                        }
                    />
                    <TextareaField
                        label="Description"
                        value={about.trust.description}
                        onChange={(value) =>
                            updateSection('trust', {
                                description: value,
                            })
                        }
                    />
                    <InputField
                        label="Image alt"
                        value={about.trust.image_alt}
                        onChange={(value) =>
                            updateSection('trust', {
                                image_alt: value,
                            })
                        }
                    />
                    <ImageField
                        label="Section image"
                        src={about.trust.image}
                        alt={about.trust.image_alt || ''}
                        onChange={(value) =>
                            updateSection('trust', { image: value })
                        }
                    />

                    <div className="space-y-4">
                        {trustItems.map((item: any, index: number) => (
                            <div
                                key={`about-trust-${index}`}
                                className="border rounded-lg p-4 bg-gray-50"
                            >
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <h3 className="font-semibold">
                                        Accordion item #{index + 1}
                                    </h3>
                                    <RowActions
                                        index={index}
                                        length={trustItems.length}
                                        onMove={(itemIndex, direction) =>
                                            moveListItem(
                                                'trust',
                                                'items',
                                                itemIndex,
                                                direction,
                                            )
                                        }
                                        onRemove={(itemIndex) =>
                                            removeListItem(
                                                'trust',
                                                'items',
                                                itemIndex,
                                            )
                                        }
                                    />
                                </div>

                                <div className="space-y-4">
                                    <InputField
                                        label="Title"
                                        value={item.title}
                                        onChange={(value) =>
                                            updateListItem(
                                                'trust',
                                                'items',
                                                index,
                                                { title: value },
                                            )
                                        }
                                    />
                                    <TextareaField
                                        label="Text"
                                        value={item.text}
                                        onChange={(value) =>
                                            updateListItem(
                                                'trust',
                                                'items',
                                                index,
                                                { text: value },
                                            )
                                        }
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            label="Link text"
                                            value={item.link_text}
                                            onChange={(value) =>
                                                updateListItem(
                                                    'trust',
                                                    'items',
                                                    index,
                                                    { link_text: value },
                                                )
                                            }
                                        />
                                        <InputField
                                            label="Link URL"
                                            value={item.link_url}
                                            onChange={(value) =>
                                                updateListItem(
                                                    'trust',
                                                    'items',
                                                    index,
                                                    { link_url: value },
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section
                title="About Us: Expert Q&A"
                description="Question form copy. Public answers come from Requests marked for public Q&A."
            >
                <div className="space-y-5">
                    <InputField
                        label="Section title"
                        value={about.experts.title}
                        onChange={(value) =>
                            updateSection('experts', { title: value })
                        }
                    />
                    <InputField
                        label="Form title"
                        value={about.experts.form_title}
                        onChange={(value) =>
                            updateSection('experts', {
                                form_title: value,
                            })
                        }
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Name placeholder"
                            value={about.experts.name_placeholder}
                            onChange={(value) =>
                                updateSection('experts', {
                                    name_placeholder: value,
                                })
                            }
                        />
                        <InputField
                            label="Email placeholder"
                            value={about.experts.email_placeholder}
                            onChange={(value) =>
                                updateSection('experts', {
                                    email_placeholder: value,
                                })
                            }
                        />
                        <InputField
                            label="Question placeholder"
                            value={about.experts.question_placeholder}
                            onChange={(value) =>
                                updateSection('experts', {
                                    question_placeholder: value,
                                })
                            }
                        />
                        <InputField
                            label="Submit button"
                            value={about.experts.submit_text}
                            onChange={(value) =>
                                updateSection('experts', {
                                    submit_text: value,
                                })
                            }
                        />
                    </div>

                    <div className="border-t pt-5 space-y-4">
                        <div>
                            <h3 className="font-semibold">Published answer profile</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                This profile is shown as the expert who answered requests published from Admin → Requests.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Expert name"
                                value={about.experts.answer_name}
                                onChange={(value) =>
                                    updateSection('experts', { answer_name: value })
                                }
                            />
                            <InputField
                                label="Expert position"
                                value={about.experts.answer_position}
                                onChange={(value) =>
                                    updateSection('experts', { answer_position: value })
                                }
                            />
                        </div>

                        <ImageField
                            label="Expert avatar"
                            src={about.experts.answer_avatar}
                            alt={about.experts.answer_name || ''}
                            onChange={(value) =>
                                updateSection('experts', { answer_avatar: value })
                            }
                        />
                    </div>
                </div>
            </Section>

            <Section
                title="About Us: User Reviews"
                description="Each tab has its own review list. Tabs are clickable on the frontend."
                actions={
                    <AddButton
                        onClick={() =>
                            appendTab('reviews', {
                                label: `Tab ${reviewTabs.length + 1}`,
                                items: [],
                            })
                        }
                    >
                        Add review tab
                    </AddButton>
                }
            >
                <div className="space-y-5">
                    <InputField
                        label="Title"
                        value={about.reviews.title}
                        onChange={(value) => updateSection('reviews', { title: value })}
                    />
                    <TextareaField
                        label="Description"
                        value={about.reviews.description}
                        onChange={(value) => updateSection('reviews', { description: value })}
                    />

                    <div className="space-y-5">
                        {reviewTabs.map((tab: any, tabIndex: number) => {
                            const items = Array.isArray(tab.items) ? tab.items : [];

                            return (
                                <div
                                    key={`review-tab-${tabIndex}`}
                                    className="border rounded-lg p-4 bg-gray-50"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-4">
                                        <h3 className="font-semibold">Review tab #{tabIndex + 1}</h3>
                                        <RowActions
                                            index={tabIndex}
                                            length={reviewTabs.length}
                                            onMove={(index, direction) => moveTab('reviews', index, direction)}
                                            onRemove={(index) => removeTab('reviews', index)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <InputField
                                            label="Tab label"
                                            value={tab.label}
                                            onChange={(value) => updateTab('reviews', tabIndex, { label: value })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <h4 className="font-semibold">Reviews</h4>
                                        <AddButton
                                            onClick={() =>
                                                appendTabListItem('reviews', tabIndex, 'items', {
                                                    name: '',
                                                    avatar_text: '',
                                                    rating: 5,
                                                    text: '',
                                                })
                                            }
                                        >
                                            Add review
                                        </AddButton>
                                    </div>

                                    <div className="space-y-4">
                                        {items.map((review: any, itemIndex: number) => (
                                            <div
                                                key={`review-${tabIndex}-${itemIndex}`}
                                                className="border rounded p-4 bg-white"
                                            >
                                                <div className="flex items-center justify-between gap-4 mb-4">
                                                    <strong>Review #{itemIndex + 1}</strong>
                                                    <RowActions
                                                        index={itemIndex}
                                                        length={items.length}
                                                        onMove={(index, direction) =>
                                                            moveTabListItem('reviews', tabIndex, 'items', index, direction)
                                                        }
                                                        onRemove={(index) =>
                                                            removeTabListItem('reviews', tabIndex, 'items', index)
                                                        }
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <InputField
                                                        label="Name"
                                                        value={review.name}
                                                        onChange={(value) =>
                                                            updateTabListItem('reviews', tabIndex, 'items', itemIndex, { name: value })
                                                        }
                                                    />
                                                    <InputField
                                                        label="Avatar text"
                                                        value={review.avatar_text}
                                                        onChange={(value) =>
                                                            updateTabListItem('reviews', tabIndex, 'items', itemIndex, { avatar_text: value })
                                                        }
                                                        placeholder="J"
                                                    />
                                                    <InputField
                                                        label="Rating"
                                                        type="number"
                                                        value={review.rating ?? 5}
                                                        onChange={(value) =>
                                                            updateTabListItem('reviews', tabIndex, 'items', itemIndex, {
                                                                rating: Math.max(0, Math.min(5, Number(value || 0))),
                                                            })
                                                        }
                                                    />
                                                </div>

                                                <div className="mt-4">
                                                    <TextareaField
                                                        label="Review text"
                                                        value={review.text}
                                                        onChange={(value) =>
                                                            updateTabListItem('reviews', tabIndex, 'items', itemIndex, { text: value })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        {!items.length ? (
                                            <div className="border border-dashed rounded p-5 text-center text-gray-500">
                                                No reviews in this tab.
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Section>

            <Section
                title="About Us: Legal Tabs"
                description="Each navigation tab has its own content on the frontend."
                actions={
                    <AddButton
                        onClick={() =>
                            appendTab('legal_nav', {
                                label: `Tab ${legalTabs.length + 1}`,
                                title: '',
                                content: '',
                            })
                        }
                    >
                        Add legal tab
                    </AddButton>
                }
            >
                <div className="space-y-5">
                    {legalTabs.map((tab: any, tabIndex: number) => (
                        <div
                            key={`legal-tab-${tabIndex}`}
                            className="border rounded-lg p-4 bg-gray-50"
                        >
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <h3 className="font-semibold">Legal tab #{tabIndex + 1}</h3>
                                <RowActions
                                    index={tabIndex}
                                    length={legalTabs.length}
                                    onMove={(index, direction) => moveTab('legal_nav', index, direction)}
                                    onRemove={(index) => removeTab('legal_nav', index)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <InputField
                                    label="Tab label"
                                    value={tab.label}
                                    onChange={(value) => updateTab('legal_nav', tabIndex, { label: value })}
                                />
                                <InputField
                                    label="Content title"
                                    value={tab.title}
                                    onChange={(value) => updateTab('legal_nav', tabIndex, { title: value })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Content
                                </label>
                                <TinyMCE
                                    value={typeof tab.content === 'string' ? tab.content : ''}
                                    onChange={(content) =>
                                        updateTab('legal_nav', tabIndex, { content })
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section
                title="About Us: FAQ"
                description="Each FAQ tab owns its own accordion items."
                actions={
                    <AddButton
                        onClick={() =>
                            appendTab('faq', {
                                label: `Tab ${faqTabs.length + 1}`,
                                items: [],
                            })
                        }
                    >
                        Add FAQ tab
                    </AddButton>
                }
            >
                <div className="space-y-5">
                    {faqTabs.map((tab: any, tabIndex: number) => {
                        const items = Array.isArray(tab.items) ? tab.items : [];

                        return (
                            <div
                                key={`faq-tab-${tabIndex}`}
                                className="border rounded-lg p-4 bg-gray-50"
                            >
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <h3 className="font-semibold">FAQ tab #{tabIndex + 1}</h3>
                                    <RowActions
                                        index={tabIndex}
                                        length={faqTabs.length}
                                        onMove={(index, direction) => moveTab('faq', index, direction)}
                                        onRemove={(index) => removeTab('faq', index)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Tab label"
                                        value={tab.label}
                                        onChange={(value) => updateTab('faq', tabIndex, { label: value })}
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-4 mb-3">
                                    <h4 className="font-semibold">FAQ items</h4>
                                    <AddButton
                                        onClick={() =>
                                            appendTabListItem('faq', tabIndex, 'items', {
                                                title: '',
                                                text: '',
                                                link_text: '',
                                                link_url: '',
                                            })
                                        }
                                    >
                                        Add FAQ
                                    </AddButton>
                                </div>

                                <div className="space-y-4">
                                    {items.map((item: any, itemIndex: number) => (
                                        <div
                                            key={`faq-${tabIndex}-${itemIndex}`}
                                            className="border rounded p-4 bg-white"
                                        >
                                            <div className="flex items-center justify-between gap-4 mb-4">
                                                <strong>FAQ #{itemIndex + 1}</strong>
                                                <RowActions
                                                    index={itemIndex}
                                                    length={items.length}
                                                    onMove={(index, direction) =>
                                                        moveTabListItem('faq', tabIndex, 'items', index, direction)
                                                    }
                                                    onRemove={(index) =>
                                                        removeTabListItem('faq', tabIndex, 'items', index)
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <InputField
                                                    label="Question"
                                                    value={item.title}
                                                    onChange={(value) =>
                                                        updateTabListItem('faq', tabIndex, 'items', itemIndex, { title: value })
                                                    }
                                                />
                                                <TextareaField
                                                    label="Answer"
                                                    value={item.text}
                                                    onChange={(value) =>
                                                        updateTabListItem('faq', tabIndex, 'items', itemIndex, { text: value })
                                                    }
                                                />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <InputField
                                                        label="Link text"
                                                        value={item.link_text}
                                                        onChange={(value) =>
                                                            updateTabListItem('faq', tabIndex, 'items', itemIndex, { link_text: value })
                                                        }
                                                    />
                                                    <InputField
                                                        label="Link URL"
                                                        value={item.link_url}
                                                        onChange={(value) =>
                                                            updateTabListItem('faq', tabIndex, 'items', itemIndex, { link_url: value })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {!items.length ? (
                                        <div className="border border-dashed rounded p-5 text-center text-gray-500">
                                            No FAQ items in this tab.
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section
                title="About Us: Slots"
                description="Tabs are clickable on the frontend. Slot cards are selected manually from the existing Card list, using the same source as the Page Builder manual selector."
                actions={
                    <AddButton
                        onClick={() =>
                            appendTab('games', {
                                label: `Tab ${gameTabs.length + 1}`,
                                card_ids: [],
                                cards: [],
                                legacy_items: [],
                            })
                        }
                    >
                        Add slot tab
                    </AddButton>
                }
            >
                <div className="space-y-5">
                    <InputField
                        label="Card button text"
                        value={about.games.button_text}
                        onChange={(value) => updateSection('games', { button_text: value })}
                        placeholder="Play with Real Money"
                    />

                    {gameTabs.map((tab: any, tabIndex: number) => (
                        <div
                            key={`game-tab-${tabIndex}`}
                            className="border rounded-lg p-4 bg-gray-50"
                        >
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <h3 className="font-semibold">Slot tab #{tabIndex + 1}</h3>
                                <RowActions
                                    index={tabIndex}
                                    length={gameTabs.length}
                                    onMove={(index, direction) => moveTab('games', index, direction)}
                                    onRemove={(index) => removeTab('games', index)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <InputField
                                    label="Tab label"
                                    value={tab.label}
                                    onChange={(value) => updateTab('games', tabIndex, { label: value })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Manual slot cards</label>
                                <ManualCardSelector
                                    cardIds={Array.isArray(tab.card_ids) ? tab.card_ids : []}
                                    cards={cards}
                                    onChange={(card_ids) =>
                                        updateTab('games', tabIndex, {
                                            card_ids,
                                            cards: [],
                                            legacy_items: [],
                                        })
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section
                title="About Us: Final Quote"
                description="Large quote card above the WhatsApp CTA."
            >
                <div className="space-y-4">
                    <TextareaField
                        label="Title / quote"
                        value={about.final.title}
                        onChange={(value) =>
                            updateSection('final', { title: value })
                        }
                    />
                    <TextareaField
                        label="Description"
                        value={about.final.description}
                        onChange={(value) =>
                            updateSection('final', {
                                description: value,
                            })
                        }
                    />
                    <InputField
                        label="Image alt"
                        value={about.final.image_alt}
                        onChange={(value) =>
                            updateSection('final', {
                                image_alt: value,
                            })
                        }
                    />
                    <ImageField
                        label="Final card image"
                        src={about.final.image}
                        alt={about.final.image_alt || ''}
                        onChange={(value) =>
                            updateSection('final', { image: value })
                        }
                    />
                </div>
            </Section>

            <Section
                title="About Us: WhatsApp CTA"
                description="Quick answer strip below the final quote."
            >
                <div className="space-y-4">
                    <TextareaField
                        label="Text"
                        value={about.whatsapp.text}
                        onChange={(value) =>
                            updateSection('whatsapp', { text: value })
                        }
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Button text"
                            value={about.whatsapp.button_text}
                            onChange={(value) =>
                                updateSection('whatsapp', {
                                    button_text: value,
                                })
                            }
                        />
                        <InputField
                            label="URL"
                            value={about.whatsapp.url}
                            onChange={(value) =>
                                updateSection('whatsapp', { url: value })
                            }
                        />
                    </div>
                </div>
            </Section>

            <Section
                title="About Us: Subscribe"
                description="Newsletter block before the site footer."
            >
                <div className="space-y-4">
                    <InputField
                        label="Title"
                        value={about.subscribe.title}
                        onChange={(value) =>
                            updateSection('subscribe', { title: value })
                        }
                    />
                    <TextareaField
                        label="Description"
                        value={about.subscribe.description}
                        onChange={(value) =>
                            updateSection('subscribe', {
                                description: value,
                            })
                        }
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Email placeholder"
                            value={about.subscribe.placeholder}
                            onChange={(value) =>
                                updateSection('subscribe', {
                                    placeholder: value,
                                })
                            }
                        />
                        <InputField
                            label="Button text"
                            value={about.subscribe.button_text}
                            onChange={(value) =>
                                updateSection('subscribe', {
                                    button_text: value,
                                })
                            }
                        />
                    </div>
                    <TextareaField
                        label="Bottom note"
                        value={about.subscribe.note}
                        onChange={(value) =>
                            updateSection('subscribe', { note: value })
                        }
                        rows={2}
                    />
                    <InputField
                        label="Image alt"
                        value={about.subscribe.image_alt}
                        onChange={(value) =>
                            updateSection('subscribe', {
                                image_alt: value,
                            })
                        }
                    />
                    <ImageField
                        label="Expert avatar"
                        src={about.subscribe.image}
                        alt={about.subscribe.image_alt || ''}
                        onChange={(value) =>
                            updateSection('subscribe', { image: value })
                        }
                    />
                </div>
            </Section>
        </div>
    );
}
