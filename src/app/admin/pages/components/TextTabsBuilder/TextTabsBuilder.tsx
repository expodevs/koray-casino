"use client";

import React from "react";
import TinyMCE from "@components/TinyMCE";


export type TextTabsItem = {
    position: number;
    label: string;
    html: string;
};

export type TextTabsData = {
    title?: string;
    items: TextTabsItem[];
};

export default function TextTabsBuilder({
        label,
        data,
        onChange,
    }: {
    label: string;
    data: TextTabsData;
    onChange: (data: TextTabsData) => void;
}) {
    const items =
        data.items && data.items.length
            ? [...data.items].sort((a, b) => a.position - b.position)
            : [{ position: 1, label: "Tab 1", html: "" }];

    const setTitle = (v: string) => onChange({ ...data, title: v });
    const addItem = () => {
        onChange({
            ...data,
            items: [...items, { position: items.length + 1, label: `Tab ${items.length + 1}`, html: "" }],
        });
    };

    const removeItem = (index: number) => {
        const next = items.filter((_, i) => i !== index).map((it, i) => ({ ...it, position: i + 1 }));
        onChange({ ...data, items: next.length ? next : [{ position: 1, label: "Tab 1", html: "" }] });
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const next = [...items];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        onChange({ ...data, items: next.map((it, i) => ({ ...it, position: i + 1 })) });
    };

    const moveDown = (index: number) => {
        if (index === items.length - 1) return;
        const next = [...items];
        [next[index], next[index + 1]] = [next[index + 1], next[index]];
        onChange({ ...data, items: next.map((it, i) => ({ ...it, position: i + 1 })) });
    };

    const updateItem = (index: number, patch: Partial<TextTabsItem>) => {
        const next = [...items];
        next[index] = { ...next[index], ...patch };
        onChange({ ...data, items: next });
    };

    return (
        <div className="space-y-3">
            <div className="font-semibold">{label}</div>

            <div className="grid grid-cols-1 gap-3">
                <div>
                    <label className="block mb-1 text-sm">Title (optional)</label>
                    <input
                        className="w-full p-2 border rounded"
                        value={data.title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

            </div>

            <div className="space-y-4">
                {items.map((it, idx) => (
                    <div key={idx} className="p-3 border rounded space-y-2">
                        <div className="flex gap-2 items-center">
                            <input
                                className="w-full p-2 border rounded"
                                value={it.label}
                                onChange={(e) => updateItem(idx, { label: e.target.value })}
                                placeholder="Tab label"
                            />
                            <button type="button" className="p-2 border rounded" onClick={() => moveUp(idx)}>
                                ↑
                            </button>
                            <button type="button" className="p-2 border rounded" onClick={() => moveDown(idx)}>
                                ↓
                            </button>
                            <button
                                type="button"
                                className="p-2 border rounded text-red-600"
                                onClick={() => removeItem(idx)}
                            >
                                ✕
                            </button>
                        </div>

                        <TinyMCE value={it.html} onChange={(html) => updateItem(idx, { html })} />
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={addItem}
            >
                Add tab
            </button>
        </div>
    );
}
