import React from "react";
import { Faq } from "@/@types/response";

interface FaqItem {
    id: string;
    position: number;
}

interface FaqBuilderProps {
    label: string;
    fieldValues: string;
    faqs: Faq[] | undefined;
    onChange: (value: string) => void;
}

export default function FaqBuilder({ label, fieldValues, faqs, onChange }: FaqBuilderProps) {
    const parseFaqItems = (): FaqItem[] => {
        if (!fieldValues) {
            return [];
        }

        let result: FaqItem[] = [];
        try {
            result = JSON.parse(fieldValues);
        } catch {
            const oldValues = fieldValues.split(',').filter(Boolean);
            result = oldValues.map((id, index) => ({
                id,
                position: index + 1
            }));
        }
        return result;
    };

    const faqItems = parseFaqItems();
    const displayItems = faqItems.length > 0 ? faqItems.sort((a, b) => a.position - b.position) : [{ id: '', position: 1 }];

    const saveFaqItems = (items: FaqItem[]) => {
        onChange(JSON.stringify(items));
    };

    const addNewSelect = () => {
        const newItems = [
            ...displayItems,
            { id: '', position: displayItems.length + 1 }
        ];
        saveFaqItems(newItems);
    };

    const updateSelectValue = (selectIndex: number, value: string) => {
        const newItems = [...displayItems];
        newItems[selectIndex] = { ...newItems[selectIndex], id: value };
        saveFaqItems(newItems);
    };

    const removeSelect = (selectIndex: number) => {
        if (displayItems.length <= 1) {
            saveFaqItems([{ id: '', position: 1 }]);
            return;
        }

        const newItems = [...displayItems];
        newItems.splice(selectIndex, 1);

        newItems.forEach((item, index) => {
            item.position = index + 1;
        });

        saveFaqItems(newItems);
    };

    const moveItemUp = (selectIndex: number) => {
        if (selectIndex === 0) return;

        const newItems = [...displayItems];
        const temp = newItems[selectIndex].position;
        newItems[selectIndex].position = newItems[selectIndex - 1].position;
        newItems[selectIndex - 1].position = temp;

        saveFaqItems(newItems.sort((a, b) => a.position - b.position));
    };

    const moveItemDown = (selectIndex: number) => {
        if (selectIndex === displayItems.length - 1) return; // Already at the bottom

        const newItems = [...displayItems];
        const temp = newItems[selectIndex].position;
        newItems[selectIndex].position = newItems[selectIndex + 1].position;
        newItems[selectIndex + 1].position = temp;

        saveFaqItems(newItems.sort((a, b) => a.position - b.position));
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <div className="space-y-2">
                {displayItems.map((item, selectIdx) => (
                    <div key={`faq-select-${selectIdx}`} className="flex items-center gap-2">
                        <select
                            className="w-full p-2 border rounded"
                            value={item.id}
                            onChange={(e) => updateSelectValue(selectIdx, e.target.value)}
                        >
                            <option value="">Select Faq</option>
                            {(faqs || []).map(faq => <option key={faq.id} value={faq.id}>{faq.question}</option>)}
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
                    + Add FAQ
                </button>
            </div>
        </div>
    );
}
