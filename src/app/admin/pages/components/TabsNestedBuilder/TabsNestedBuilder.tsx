'use client';

import React from 'react';
import TinyMCE from '@components/TinyMCE';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CustomFileSelector from '@components/file/CustomFileSelector';

import type {
    TabsNestedData,
    TabsNestedItem,
    TabsNestedChildItem,
} from './types';

interface TabsNestedBuilderProps {
    label: string;
    data: TabsNestedData;
    onChange: (data: TabsNestedData) => void;
}

const createDefaultChild = (position: number): TabsNestedChildItem => ({
    position,
    label: `Inner Tab ${position}`,
    image: '',
    contentTitle: '',
    content: '',
    note: '',
});

const createDefaultItem = (position: number): TabsNestedItem => ({
    position,
    label: `Tab ${position}`,
    hasChildren: false,
    image: '',
    contentTitle: '',
    content: '',
    note: '',
    children: [],
});

export default function TabsNestedBuilder({
                                              label,
                                              data,
                                              onChange,
                                          }: TabsNestedBuilderProps) {
    const items =
        Array.isArray(data.items) && data.items.length
            ? [...data.items].sort((a, b) => a.position - b.position)
            : [createDefaultItem(1)];

    const updateRoot = (patch: Partial<TabsNestedData>) => {
        onChange({
            ...data,
            ...patch,
            items,
        });
    };

    const updateItems = (nextItems: TabsNestedItem[]) => {
        onChange({
            ...data,
            items: nextItems.map((item, index) => ({
                ...item,
                position: index + 1,
                children: Array.isArray(item.children)
                    ? item.children.map((child, childIndex) => ({
                        ...child,
                        position: childIndex + 1,
                    }))
                    : [],
            })),
        });
    };

    const updateItem = (index: number, patch: Partial<TabsNestedItem>) => {
        const next = [...items];

        next[index] = {
            ...next[index],
            ...patch,
        };

        updateItems(next);
    };

    const addItem = () => {
        updateItems([...items, createDefaultItem(items.length + 1)]);
    };

    const removeItem = (index: number) => {
        const next = items.filter((_, i) => i !== index);
        updateItems(next.length ? next : [createDefaultItem(1)]);
    };

    const moveItemUp = (index: number) => {
        if (index === 0) return;

        const next = [...items];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        updateItems(next);
    };

    const moveItemDown = (index: number) => {
        if (index === items.length - 1) return;

        const next = [...items];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        updateItems(next);
    };

    const setItemHasChildren = (index: number, checked: boolean) => {
        const current = items[index];

        if (checked) {
            updateItem(index, {
                hasChildren: true,
                image: '',
                contentTitle: '',
                content: '',
                note: '',
                children:
                    current.children && current.children.length
                        ? current.children
                        : [createDefaultChild(1)],
            });
            return;
        }

        updateItem(index, {
            hasChildren: false,
            children: [],
        });
    };

    const updateChild = (
        itemIndex: number,
        childIndex: number,
        patch: Partial<TabsNestedChildItem>
    ) => {
        const next = [...items];
        const currentChildren = Array.isArray(next[itemIndex].children)
            ? [...next[itemIndex].children!]
            : [];

        currentChildren[childIndex] = {
            ...currentChildren[childIndex],
            ...patch,
        };

        next[itemIndex] = {
            ...next[itemIndex],
            children: currentChildren,
        };

        updateItems(next);
    };

    const addChild = (itemIndex: number) => {
        const next = [...items];
        const currentChildren = Array.isArray(next[itemIndex].children)
            ? [...next[itemIndex].children!]
            : [];

        currentChildren.push(createDefaultChild(currentChildren.length + 1));

        next[itemIndex] = {
            ...next[itemIndex],
            children: currentChildren,
            hasChildren: true,
        };

        updateItems(next);
    };

    const removeChild = (itemIndex: number, childIndex: number) => {
        const next = [...items];
        const currentChildren = Array.isArray(next[itemIndex].children)
            ? [...next[itemIndex].children!]
            : [];

        const filtered = currentChildren.filter((_, i) => i !== childIndex);

        next[itemIndex] = {
            ...next[itemIndex],
            children: filtered.length ? filtered : [createDefaultChild(1)],
            hasChildren: true,
        };

        updateItems(next);
    };

    const moveChildUp = (itemIndex: number, childIndex: number) => {
        if (childIndex === 0) return;

        const next = [...items];
        const currentChildren = Array.isArray(next[itemIndex].children)
            ? [...next[itemIndex].children!]
            : [];

        [currentChildren[childIndex - 1], currentChildren[childIndex]] = [
            currentChildren[childIndex],
            currentChildren[childIndex - 1],
        ];

        next[itemIndex] = {
            ...next[itemIndex],
            children: currentChildren,
        };

        updateItems(next);
    };

    const moveChildDown = (itemIndex: number, childIndex: number) => {
        const next = [...items];
        const currentChildren = Array.isArray(next[itemIndex].children)
            ? [...next[itemIndex].children!]
            : [];

        if (childIndex === currentChildren.length - 1) return;

        [currentChildren[childIndex], currentChildren[childIndex + 1]] = [
            currentChildren[childIndex + 1],
            currentChildren[childIndex],
        ];

        next[itemIndex] = {
            ...next[itemIndex],
            children: currentChildren,
        };

        updateItems(next);
    };

    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/admin/tabs-nested/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (!response.ok || !result?.success || !result?.src) {
            throw new Error(result?.message || 'Upload failed');
        }

        return result.src;
    };

    const handleItemFileSelected = async (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];

        try {
            const src = await uploadFile(file);
            updateItem(index, { image: src });
            toast.success('Image uploaded');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload image');
        } finally {
            e.target.value = '';
        }
    };

    const handleChildFileSelected = async (
        itemIndex: number,
        childIndex: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files?.length) return;

        const file = e.target.files[0];

        try {
            const src = await uploadFile(file);
            updateChild(itemIndex, childIndex, { image: src });
            toast.success('Image uploaded');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload image');
        } finally {
            e.target.value = '';
        }
    };

    return (
        <div className="mb-6">
            <label className="block mb-2 font-medium">{label}</label>

            <div className="border rounded-lg p-4 space-y-6">
                <div>
                    <label className="block mb-1 text-sm font-medium">Block title</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={data.title || ''}
                        onChange={(e) => updateRoot({ title: e.target.value })}
                        placeholder="Enter block title"
                    />
                </div>

                <div className="space-y-6">
                    {items.map((item, idx) => (
                        <div key={`tabs-nested-item-${idx}`} className="border rounded-lg p-4 space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <label className="block mb-1 text-sm font-medium">Tab label</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={item.label}
                                        onChange={(e) => updateItem(idx, { label: e.target.value })}
                                        placeholder="Top tab label"
                                    />
                                </div>

                                <div className="flex gap-2 self-end">
                                    <button
                                        type="button"
                                        className="border rounded px-3 py-2"
                                        onClick={() => moveItemUp(idx)}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        className="border rounded px-3 py-2"
                                        onClick={() => moveItemDown(idx)}
                                    >
                                        ↓
                                    </button>
                                    <button
                                        type="button"
                                        className="border rounded px-3 py-2 text-red-600"
                                        onClick={() => removeItem(idx)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={Boolean(item.hasChildren)}
                                    onChange={(e) => setItemHasChildren(idx, e.target.checked)}
                                />
                                <span className="text-sm">Has nested tabs</span>
                            </label>

                            {!item.hasChildren && (
                                <div className="space-y-4 border rounded p-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Image</label>

                                        {item.image ? (
                                            <div className="grid grid-cols-12 gap-2 my-2">
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        try {
                                                            if (item.image) {
                                                                await fetch('/api/admin/tabs-nested/remove-image', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ src: item.image }),
                                                                });
                                                            }
                                                        } catch (e) {
                                                            console.error(e);
                                                        }

                                                        updateItem(idx, { image: '' });
                                                    }}
                                                    className="text-red-500 bg-white p-2"
                                                >
                                                    <FaTrash />
                                                </button>

                                                <div className="relative aspect-video col-span-4">
                                                    <Image
                                                        className="object-cover"
                                                        src={item.image}
                                                        alt=""
                                                        fill
                                                    />
                                                </div>
                                            </div>
                                        ) : null}

                                        <CustomFileSelector
                                            accept="image/*"
                                            onChange={async (e) => {
                                                if (!e.target.files?.length) return;

                                                const file = e.target.files[0];

                                                const formData = new FormData();
                                                formData.append('file', file);

                                                try {
                                                    const res = await fetch('/api/admin/tabs-nested/upload', {
                                                        method: 'POST',
                                                        body: formData,
                                                    });

                                                    const result = await res.json();

                                                    if (!result?.success) throw new Error();

                                                    updateItem(idx, { image: result.src });
                                                    toast.success('Uploaded');
                                                } catch {
                                                    toast.error('Upload failed');
                                                }

                                                e.target.value = '';
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Content title</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded px-3 py-2"
                                            value={item.contentTitle || ''}
                                            onChange={(e) => updateItem(idx, { contentTitle: e.target.value })}
                                            placeholder="Content title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Content</label>
                                        <TinyMCE
                                            value={item.content || ''}
                                            onChange={(html: string) => updateItem(idx, { content: html })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-sm font-medium">Note</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded px-3 py-2"
                                            value={item.note || ''}
                                            onChange={(e) => updateItem(idx, { note: e.target.value })}
                                            placeholder="Short highlighted note"
                                        />
                                    </div>
                                </div>
                            )}

                            {item.hasChildren && (
                                <div className="space-y-4 border rounded p-4">
                                    {(item.children || []).map((child, childIdx) => (
                                        <div
                                            key={`tabs-nested-child-${idx}-${childIdx}`}
                                            className="border rounded p-4 space-y-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1">
                                                    <label className="block mb-1 text-sm font-medium">
                                                        Inner tab label
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full border rounded px-3 py-2"
                                                        value={child.label}
                                                        onChange={(e) =>
                                                            updateChild(idx, childIdx, { label: e.target.value })
                                                        }
                                                        placeholder="Inner tab label"
                                                    />
                                                </div>

                                                <div className="flex gap-2 self-end">
                                                    <button
                                                        type="button"
                                                        className="border rounded px-3 py-2"
                                                        onClick={() => moveChildUp(idx, childIdx)}
                                                    >
                                                        ↑
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="border rounded px-3 py-2"
                                                        onClick={() => moveChildDown(idx, childIdx)}
                                                    >
                                                        ↓
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="border rounded px-3 py-2 text-red-600"
                                                        onClick={() => removeChild(idx, childIdx)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block mb-2 text-sm font-medium">Image</label>

                                                {child.image ? (
                                                    <div className="grid grid-cols-12 gap-2 my-2">
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                try {
                                                                    if (child.image) {
                                                                        await fetch('/api/admin/tabs-nested/remove-image', {
                                                                            method: 'POST',
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            body: JSON.stringify({ src: child.image }),
                                                                        });
                                                                    }
                                                                } catch (e) {
                                                                    console.error(e);
                                                                }

                                                                updateChild(idx, childIdx, { image: '' });
                                                            }}
                                                            className="text-red-500 bg-white p-2"
                                                        >
                                                            <FaTrash />
                                                        </button>

                                                        <div className="relative aspect-video col-span-4">
                                                            <Image
                                                                className="object-cover"
                                                                src={child.image}
                                                                alt=""
                                                                fill
                                                            />
                                                        </div>
                                                    </div>
                                                ) : null}

                                                <CustomFileSelector
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        if (!e.target.files?.length) return;

                                                        const file = e.target.files[0];

                                                        const formData = new FormData();
                                                        formData.append('file', file);

                                                        try {
                                                            const res = await fetch('/api/admin/tabs-nested/upload', {
                                                                method: 'POST',
                                                                body: formData,
                                                            });

                                                            const result = await res.json();

                                                            if (!result?.success) throw new Error();

                                                            updateChild(idx, childIdx, { image: result.src });
                                                            toast.success('Uploaded');
                                                        } catch {
                                                            toast.error('Upload failed');
                                                        }

                                                        e.target.value = '';
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1 text-sm font-medium">
                                                    Content title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded px-3 py-2"
                                                    value={child.contentTitle || ''}
                                                    onChange={(e) =>
                                                        updateChild(idx, childIdx, { contentTitle: e.target.value })
                                                    }
                                                    placeholder="Content title"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Content</label>
                                                <TinyMCE
                                                    value={child.content || ''}
                                                    onChange={(html: string) =>
                                                        updateChild(idx, childIdx, { content: html })
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Note</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded px-3 py-2"
                                                    value={child.note || ''}
                                                    onChange={(e) =>
                                                        updateChild(idx, childIdx, { note: e.target.value })
                                                    }
                                                    placeholder="Short highlighted note"
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="border rounded px-4 py-2"
                                        onClick={() => addChild(idx)}
                                    >
                                        + Add inner tab
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        className="border rounded px-4 py-2"
                        onClick={addItem}
                    >
                        + Add top tab
                    </button>
                </div>
            </div>
        </div>
    );
}
