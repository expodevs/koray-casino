import React from "react";
import { IconCardSelect } from "@/@types/response";

export interface IconCardItem {
    id: number;
    position: number;
}

interface IconCardSelectorProps {
    label: string;
    iconCardItems: IconCardItem[];
    iconCards: IconCardSelect[] | undefined;
    onChange: (value: string) => void;
}

export default function IconCardSelector({ label, iconCardItems, iconCards, onChange }: IconCardSelectorProps) {
    const displayItems = iconCardItems.length > 0 ? iconCardItems.sort((a, b) => a.position - b.position) : [];

    const saveIconCardItems = (items: IconCardItem[]) => {
        onChange(JSON.stringify(items));
    };

    const addNewSelect = () => {
        const newItems = [
            ...displayItems,
            { id: 0, position: displayItems.length + 1 }
        ];
        saveIconCardItems(newItems);
    };

    const updateSelectValue = (selectIndex: number, value: number) => {
        const newItems = [...displayItems];
        newItems[selectIndex] = { ...newItems[selectIndex], id: value };
        saveIconCardItems(newItems);
    };

    const removeSelect = (selectIndex: number) => {
        const newItems = [...displayItems];
        newItems.splice(selectIndex, 1);

        // If all items are removed, don't reset with a default item
        if (newItems.length === 0) {
            saveIconCardItems([]);
            return;
        }

        newItems.forEach((item, index) => {
            item.position = index + 1;
        });

        saveIconCardItems(newItems);
    };

    const moveItemUp = (selectIndex: number) => {
        if (selectIndex === 0) return;

        const newItems = [...displayItems];
        const temp = newItems[selectIndex].position;
        newItems[selectIndex].position = newItems[selectIndex - 1].position;
        newItems[selectIndex - 1].position = temp;

        saveIconCardItems(newItems.sort((a, b) => a.position - b.position));
    };

    const moveItemDown = (selectIndex: number) => {
        if (selectIndex === displayItems.length - 1) return;

        const newItems = [...displayItems];
        const temp = newItems[selectIndex].position;
        newItems[selectIndex].position = newItems[selectIndex + 1].position;
        newItems[selectIndex + 1].position = temp;

        saveIconCardItems(newItems.sort((a, b) => a.position - b.position));
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <div className="space-y-2">
                {displayItems.map((item, selectIdx) => (
                    <div key={`icon-card-select-${selectIdx}`} className="flex items-center gap-2">
                        <select
                            required={true}
                            className="w-full p-2 border rounded"
                            value={item.id || ""}
                            onChange={(e) => updateSelectValue(selectIdx, parseInt(e.target.value))}
                        >
                            <option value="">Select Icon Card</option>
                            {(iconCards || [])
                                .filter(icon => !displayItems.some(item => item.id === icon.id && item.position !== displayItems[selectIdx].position))
                                .map(icon => <option key={icon.id} value={icon.id}>{icon.label}</option>)}
                        </select>
                        <div className="flex flex-col">
                            <button 
                                type="button"
                                onClick={() => moveItemUp(selectIdx)}
                                className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                disabled={selectIdx === 0}
                            >
                                ↑
                            </button>
                            <button 
                                type="button"
                                onClick={() => moveItemDown(selectIdx)}
                                className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                disabled={selectIdx === displayItems.length - 1}
                            >
                                ↓
                            </button>
                        </div>
                        <button 
                            type="button"
                            onClick={() => removeSelect(selectIdx)}
                            className="p-2 text-red-600 rounded hover:bg-red-100"
                        >
                            X
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewSelect}
                    className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                >
                    + Add Icon Card
                </button>
            </div>
        </div>
    );
}
