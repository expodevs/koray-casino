import React from "react";
import { Option } from "@/@types/response";

export interface OptionItem {
    id: string;
    position: number;
}

interface ShowOptionCardProps {
    label: string;
    optionItems: OptionItem[];
    casinoOptions: Option[] | undefined;
    onChange: (value: string) => void;
}

export default function ShowOptionCard({ label, optionItems, casinoOptions, onChange }: ShowOptionCardProps) {
    const displayItems = optionItems.length > 0 ? optionItems.sort((a, b) => a.position - b.position) : [{ id: '', position: 1 }];

    const saveOptionItems = (items: OptionItem[]) => {
        onChange(JSON.stringify(items));
    };

    const addNewSelect = () => {
        const newItems = [
            ...displayItems,
            { id: '', position: displayItems.length + 1 }
        ];
        saveOptionItems(newItems);
    };

    const updateSelectValue = (selectIndex: number, value: string) => {
        const newItems = [...displayItems];
        newItems[selectIndex] = { ...newItems[selectIndex], id: value };
        saveOptionItems(newItems);
    };

    const removeSelect = (selectIndex: number) => {
        if (displayItems.length <= 1) {
            saveOptionItems([{ id: '', position: 1 }]);
            return;
        }

        const newItems = [...displayItems];
        newItems.splice(selectIndex, 1);

        newItems.forEach((item, index) => {
            item.position = index + 1;
        });

        saveOptionItems(newItems);
    };

    const moveItemUp = (selectIndex: number) => {
        if (selectIndex === 0) return;

        const newItems = [...displayItems];
        const temp = newItems[selectIndex].position;
        newItems[selectIndex].position = newItems[selectIndex - 1].position;
        newItems[selectIndex - 1].position = temp;

        saveOptionItems(newItems.sort((a, b) => a.position - b.position));
    };

    const moveItemDown = (selectIndex: number) => {
        if (selectIndex === displayItems.length - 1) return;

        const newItems = [...displayItems];
        const temp = newItems[selectIndex].position;
        newItems[selectIndex].position = newItems[selectIndex + 1].position;
        newItems[selectIndex + 1].position = temp;

        saveOptionItems(newItems.sort((a, b) => a.position - b.position));
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <div className="space-y-2">
                {displayItems.map((item, selectIdx) => (
                    <div key={`option-select-${selectIdx}`} className="flex items-center gap-2">
                        <select
                            required={true}
                            className="w-full p-2 border rounded"
                            value={item.id}
                            onChange={(e) => updateSelectValue(selectIdx, e.target.value)}
                        >
                            <option value="">Select Option</option>
                            {(casinoOptions || []).map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
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
                    + Add Option
                </button>
            </div>
        </div>
    );
}
