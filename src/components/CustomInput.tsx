import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import {useMemo} from "react";

interface CustomInputProps {
    label: string;
    field: string;
    type?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

function CustomInput({
                         label,
                         field,
                         type = 'text',
                         register,
                         errors,
                     }: CustomInputProps) {

    const renderField = useMemo(() => {
        if (type === 'textarea') {
            return <textarea
                {...register(field)}
                className="w-full p-2 border rounded"
            />
        }
        return <input
            type={type}
            {...register(field)}
            className="w-full p-2 border rounded"
        />
    }, [type, register])


    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            {renderField}
            {errors?.[field] && <p className="text-red-500">{errors?.[field]?.message as string}</p>}
        </div>
    );
}

export default CustomInput;
