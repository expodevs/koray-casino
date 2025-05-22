import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import React from "react";

interface EnumSelectProps<T extends Record<string, string>> {
    label: string;
    field: string;
    elements: T;
    excludes: Array<keyof T>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

function EnumSelect<T extends Record<string, string>>({
                                                          label,
                                                          field,
                                                          elements,
                                                          excludes = [],
                                                          register,
                                                          errors,
                                                      }: EnumSelectProps<T>) {
    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <select
                {...register(field)}
                className="w-full p-2 border rounded"
            >
                <option >Select element </option>
                {Object.values(elements).filter(el=>!excludes.includes(el)).map((type) => (
                    <option key={type} value={type}>
                        {type.replaceAll('_', ' ').toUpperCase()}
                    </option>
                ))}
            </select>
            {errors?.[field] && <p className="text-red-500">{errors?.[field]?.message as string}</p>}
        </div>
    );
}

export default EnumSelect;
