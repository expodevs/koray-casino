import React from "react";
import { BtnBlockData, BtnBlockItem, BtnBlockType } from "./types";

interface BtnBlockProps {
    label: string;
    data: BtnBlockData;
    onChange: (data: BtnBlockData) => void;
}

export default function BtnBlock({ 
    label, 
    data, 
    onChange 
}: BtnBlockProps) {
    const type = data.type || BtnBlockType.button;
    const displayButtons = data.buttons && data.buttons.length > 0 
        ? data.buttons.sort((a, b) => a.position - b.position) 
        : [{ position: 1, label: '', link: '' }];

    const addNewButton = () => {
        const newButtons = [
            ...displayButtons,
            { position: displayButtons.length + 1, label: '', link: '' }
        ];
        onChange({
            ...data,
            type,
            buttons: newButtons
        });
    };

    const updateButtonValue = (buttonIndex: number, field: keyof BtnBlockItem, value: string) => {
        const newButtons = [...displayButtons];
        newButtons[buttonIndex] = { 
            ...newButtons[buttonIndex], 
            [field]: field === 'position' ? parseInt(value) : value 
        };
        onChange({
            ...data,
            type,
            buttons: newButtons
        });
    };

    const removeButton = (buttonIndex: number) => {
        if (displayButtons.length <= 1) {
            onChange({
                ...data,
                type,
                buttons: [{ position: 1, label: '', link: '' }]
            });
            return;
        }

        const newButtons = [...displayButtons];
        newButtons.splice(buttonIndex, 1);

        newButtons.forEach((item, index) => {
            item.position = index + 1;
        });

        onChange({
            ...data,
            type,
            buttons: newButtons
        });
    };

    const moveButtonUp = (buttonIndex: number) => {
        if (buttonIndex === 0) return;

        const newButtons = [...displayButtons];
        const temp = newButtons[buttonIndex].position;
        newButtons[buttonIndex].position = newButtons[buttonIndex - 1].position;
        newButtons[buttonIndex - 1].position = temp;

        onChange({
            ...data,
            type,
            buttons: newButtons.sort((a, b) => a.position - b.position)
        });
    };

    const moveButtonDown = (buttonIndex: number) => {
        if (buttonIndex === displayButtons.length - 1) return;

        const newButtons = [...displayButtons];
        const temp = newButtons[buttonIndex].position;
        newButtons[buttonIndex].position = newButtons[buttonIndex + 1].position;
        newButtons[buttonIndex + 1].position = temp;

        onChange({
            ...data,
            type,
            buttons: newButtons.sort((a, b) => a.position - b.position)
        });
    };

    const updateType = (newType: string) => {
        onChange({
            ...data,
            type: newType as BtnBlockType,
            buttons: displayButtons
        });
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <div className="space-y-4">
                <div className="border p-4 rounded">
                    <div className="mb-4">
                        <label className="block mb-1">Button Type</label>
                        <select
                            className="p-2 border rounded w-full"
                            value={type}
                            onChange={(e) => updateType(e.target.value)}
                        >
                            <option value={BtnBlockType.inline}>Inline</option>
                            <option value={BtnBlockType.button}>Button</option>
                        </select>
                    </div>
                    <h3 className="font-semibold mb-2">Buttons</h3>
                    <div className="space-y-2">
                        {displayButtons.map((button, buttonIdx) => (
                            <div key={`button-${buttonIdx}`} className="flex items-center gap-2">
                                <div className="flex-grow grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        className="p-2 border rounded"
                                        value={button.label}
                                        onChange={(e) => updateButtonValue(buttonIdx, 'label', e.target.value)}
                                        placeholder="Button Label"
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="p-2 border rounded"
                                        value={button.link}
                                        onChange={(e) => updateButtonValue(buttonIdx, 'link', e.target.value)}
                                        placeholder="Button Link"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <button 
                                        type="button"
                                        onClick={() => moveButtonUp(buttonIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={buttonIdx === 0}
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => moveButtonDown(buttonIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={buttonIdx === displayButtons.length - 1}
                                    >
                                        ↓
                                    </button>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => removeButton(buttonIdx)}
                                    className="p-2 text-red-600 rounded hover:bg-red-100"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addNewButton}
                            className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                        >
                            + Add Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
