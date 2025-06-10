import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import {useMemo} from "react";

interface CustomInputProps<T extends FieldValues = FieldValues> {
    label: string;
    field: string;
    type?: string;
    register: UseFormRegister<T>;
    registerAttr?: object;
    errors: FieldErrors<T>;
}

function CustomInput<T extends FieldValues = FieldValues>({
                         label,
                         field,
                         type = 'text',
                         register,
                         registerAttr = undefined,
                         errors,
                     }: CustomInputProps<T>) {

    const renderField = useMemo(() => {
        if (type === 'textarea') {
            return <textarea
                {...register(field)}
                className="w-full p-2 border rounded"
            />
        }
        return <input
            type={type}
            {...register(field, registerAttr?{ ...registerAttr }:undefined)}
            className="w-full p-2 border rounded"
        />
    }, [type, register, registerAttr, field])


    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            {renderField}
            {errors?.[field] && <p className="text-red-500">{errors?.[field]?.message as string}</p>}
        </div>
    );
}

export default CustomInput;
