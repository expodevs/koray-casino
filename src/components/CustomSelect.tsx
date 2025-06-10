import {FieldErrors, FieldValues, UseFormRegister, Path} from 'react-hook-form';
import React from "react";
import {CustomSelectOption} from "@/@types/response";

interface CustomSelectProps<T extends FieldValues = FieldValues> {
    label: string;
    field: Path<T>;
    options: CustomSelectOption[];
    registerAttr?: object;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
}

function CustomSelect<T extends FieldValues = FieldValues>({
                         label,
                         field,
                          options,
                          registerAttr,
                         register,
                         errors,
                     }: CustomSelectProps<T>) {

    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <select
                {...register(field, registerAttr ? { ...registerAttr } : undefined)}
                className="w-full p-2 border rounded"
            >
                <option >Select element </option>
                {options.map((option: CustomSelectOption) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
            {errors?.[field] && <p className="text-red-500">{errors?.[field]?.message as string}</p>}
        </div>
    );
}

export default CustomSelect;
