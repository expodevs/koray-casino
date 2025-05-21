import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import React from "react";
import {CustomSelectOption} from "@/@types/response";

interface CustomSelectProps {
    label: string;
    field: string;
    options: CustomSelectOption[];
    registerAttr: object
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

function CustomSelect({
                         label,
                         field,
                          options,
                          registerAttr,
                         register,
                         errors,
                     }: CustomSelectProps) {

    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <select
                {...register(field, { ...registerAttr })}
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
