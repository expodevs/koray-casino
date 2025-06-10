"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaSave} from "react-icons/fa";
import {iconCardCreateSchema, iconCardUpdateSchema} from "@app/admin/iconCards/validation";
import {useEffect} from "react";
import {iconCard} from "@/@types/response";
import CustomInput from "@components/CustomInput";

interface EntityFormProps {
    entity?: iconCard;
    onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof iconCardCreateSchema>;

export default function EntityForm({entity, onSubmit}: EntityFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(entity ? iconCardUpdateSchema : iconCardCreateSchema),
        defaultValues: {
            label: entity?.label || '',
            published: entity?.published || false,
        },
    });



    useEffect(() => {
        if (entity) {
            setValue('label', entity.label);
            setValue('published', entity.published);
        }
    }, [entity, setValue]);


    const handleFormSubmit = async (data: FormData) => {
        try {
            await onSubmit(data);
        } catch (error: unknown) {
            if (error.response?.data) {
                Object.values(error.response.data).forEach((err: unknown) => {
                    toast.error(err.message);
                });
            } else {
                toast.error('Failed to save entity item');
            }
        }
    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">

            <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />
            <CustomInput field={'published'} label={'Published'} register={register} errors={errors} type="checkbox"/>


            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
            >
                <FaSave/> Save
            </button>

        </form>

    )
        ;
}



