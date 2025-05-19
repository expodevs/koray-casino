import React from "react";
import { Casino, Option } from "@/@types/response";
import { CasinoTopData } from "./types";

interface BuilderCasinoTopProps {
    label: string;
    data: CasinoTopData;
    casinos: Casino[] | undefined;
    casinoOptions: Option[] | undefined;
    onChange: (data: CasinoTopData) => void;
}

export default function BuilderCasinoTop({ 
    label, 
    data, 
    casinos, 
    casinoOptions, 
    onChange 
}: BuilderCasinoTopProps) {
    const displayCasinos = data.table_show_casinos.length > 0 
        ? data.table_show_casinos.sort((a, b) => a.position - b.position) 
        : [{ id: '', position: 1 }];
    const displayOptions = data.table_show_options.length > 0
        ? data.table_show_options.sort((a, b) => a.position - b.position)
        : [{ id: '', position: 1, static_field: '' }];

    const addNewOption = () => {
        const newOptions = [
            ...displayOptions,
            { id: '', position: displayOptions.length + 1 }
        ];
        onChange({
            ...data,
            table_show_options: newOptions
        });
    };

    const addNewStaticOption = () => {
        const newOptions = [
            ...displayOptions,
            { position: displayOptions.length + 1, static_field: 'name' }
        ];
        onChange({
            ...data,
            table_show_options: newOptions
        });
    };

    const updateOptionValue = (optionIndex: number, value: string, field: 'id' | 'static_field' = 'id') => {
        const newOptions = [...displayOptions];
        newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
        onChange({
            ...data,
            table_show_options: newOptions
        });
    };

    const removeOption = (optionIndex: number) => {
        if (displayOptions.length <= 1) {
            onChange({
                ...data,
                table_show_options: [{ id: '', position: 1, static_field: '' }]
            });
            return;
        }

        const newOptions = [...displayOptions];
        newOptions.splice(optionIndex, 1);

        newOptions.forEach((item, index) => {
            item.position = index + 1;
        });

        onChange({
            ...data,
            table_show_options: newOptions
        });
    };

    const moveOptionUp = (optionIndex: number) => {
        if (optionIndex === 0) return;

        const newOptions = [...displayOptions];
        const temp = newOptions[optionIndex].position;
        newOptions[optionIndex].position = newOptions[optionIndex - 1].position;
        newOptions[optionIndex - 1].position = temp;

        onChange({
            ...data,
            table_show_options: newOptions.sort((a, b) => a.position - b.position)
        });
    };

    const moveOptionDown = (optionIndex: number) => {
        if (optionIndex === displayOptions.length - 1) return; // Already at the bottom

        const newOptions = [...displayOptions];
        const temp = newOptions[optionIndex].position;
        newOptions[optionIndex].position = newOptions[optionIndex + 1].position;
        newOptions[optionIndex + 1].position = temp;

        onChange({
            ...data,
            table_show_options: newOptions.sort((a, b) => a.position - b.position)
        });
    };

    const addNewCasino = () => {
        const newCasinos = [
            ...displayCasinos,
            { id: '', position: displayCasinos.length + 1 }
        ];
        onChange({
            ...data,
            table_show_casinos: newCasinos
        });
    };

    const updateCasinoValue = (casinoIndex: number, value: string) => {
        const newCasinos = [...displayCasinos];
        newCasinos[casinoIndex] = { ...newCasinos[casinoIndex], id: value };
        onChange({
            ...data,
            table_show_casinos: newCasinos
        });
    };

    const removeCasino = (casinoIndex: number) => {
        if (displayCasinos.length <= 1) {
            onChange({
                ...data,
                table_show_casinos: [{ id: '', position: 1 }]
            });
            return;
        }

        const newCasinos = [...displayCasinos];
        newCasinos.splice(casinoIndex, 1);

        newCasinos.forEach((item, index) => {
            item.position = index + 1;
        });

        onChange({
            ...data,
            table_show_casinos: newCasinos
        });
    };

    const moveCasinoUp = (casinoIndex: number) => {
        if (casinoIndex === 0) return;

        const newCasinos = [...displayCasinos];
        const temp = newCasinos[casinoIndex].position;
        newCasinos[casinoIndex].position = newCasinos[casinoIndex - 1].position;
        newCasinos[casinoIndex - 1].position = temp;

        onChange({
            ...data,
            table_show_casinos: newCasinos.sort((a, b) => a.position - b.position)
        });
    };

    const moveCasinoDown = (casinoIndex: number) => {
        if (casinoIndex === displayCasinos.length - 1) return; // Already at the bottom

        const newCasinos = [...displayCasinos];
        const temp = newCasinos[casinoIndex].position;
        newCasinos[casinoIndex].position = newCasinos[casinoIndex + 1].position;
        newCasinos[casinoIndex + 1].position = temp;

        onChange({
            ...data,
            table_show_casinos: newCasinos.sort((a, b) => a.position - b.position)
        });
    };

    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <div className="space-y-4">
                <div className="border p-4 rounded">
                    <h3 className="font-semibold mb-2">Table Columns</h3>
                    <div className="space-y-2">
                        {displayOptions.map((item, optionIdx) => (
                            <div key={`option-select-${optionIdx}`} className="flex items-center gap-2">
                                <div className="flex-grow">
                                    {!item.static_field && (
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={item.id || ''}
                                            onChange={(e) => updateOptionValue(optionIdx, e.target.value, 'id')}
                                            required={true}
                                        >
                                            <option value="">Select Option</option>
                                            {(casinoOptions || [])
                                                .filter(option => 
                                                    // Show if it's the current option or not selected yet
                                                    option.id.toString() === item.id || 
                                                    !displayOptions.some(o => o.id === option.id.toString() && o !== item)
                                                )
                                                .map(option => (
                                                    <option key={option.id} value={option.id.toString()}>
                                                        {option.label}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    )}
                                    {item.static_field && (
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={item.static_field}
                                            onChange={(e) => updateOptionValue(optionIdx, e.target.value, 'static_field')}
                                            required={true}
                                        >
                                            <option value="">Select Static Field</option>
                                            <option value="rank">Rank</option>
                                            <option value="name">Name</option>
                                            <option value="name_tooltip">Name with Tooltip</option>
                                            <option value="image">Image</option>
                                            <option value="full_review">Full Review</option>
                                            <option value="btn_play">Button Play</option>
                                            <option value="btn_play_now">Button Play Now</option>
                                        </select>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <button 
                                        type="button"
                                        onClick={() => moveOptionUp(optionIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={optionIdx === 0}
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => moveOptionDown(optionIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={optionIdx === displayOptions.length - 1}
                                    >
                                        ↓
                                    </button>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => removeOption(optionIdx)}
                                    className="p-2 text-red-600 rounded hover:bg-red-100"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={addNewOption}
                                className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                            >
                                + Add Option
                            </button>
                            <button
                                type="button"
                                onClick={addNewStaticOption}
                                className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                            >
                                + Add Option (Static Field)
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border p-4 rounded">
                    <h3 className="font-semibold mb-2">Casinos</h3>
                    <div className="space-y-2">
                        {displayCasinos.map((item, casinoIdx) => (
                            <div key={`casino-select-${casinoIdx}`} className="flex items-center gap-2">
                                <select
                                    className="w-full p-2 border rounded"
                                    value={item.id}
                                    onChange={(e) => updateCasinoValue(casinoIdx, e.target.value)}
                                    required={true}
                                >
                                    <option value="">Select Casino</option>
                                    {(casinos || [])
                                        .filter(casino => 
                                            // Show if it's the current casino or not selected yet
                                            casino.id.toString() === item.id || 
                                            !displayCasinos.some(c => c.id === casino.id.toString() && c !== item)
                                        )
                                        .map(casino => (
                                            <option key={casino.id} value={casino.id.toString()}>
                                                {casino.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                <div className="flex flex-col">
                                    <button 
                                        type="button"
                                        onClick={() => moveCasinoUp(casinoIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={casinoIdx === 0}
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => moveCasinoDown(casinoIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={casinoIdx === displayCasinos.length - 1}
                                    >
                                        ↓
                                    </button>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => removeCasino(casinoIdx)}
                                    className="p-2 text-red-600 rounded hover:bg-red-100"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addNewCasino}
                            className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                        >
                            + Add Casino
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
