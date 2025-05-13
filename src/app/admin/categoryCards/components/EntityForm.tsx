"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaSave} from "react-icons/fa";
import {categoryCardCreateSchema, categoryCardUpdateSchema} from "@app/admin/categoryCards/validation";
import {useEffect} from "react";
import {CategoryCard} from "@/@types/response";
import CustomInput from "@components/CustomInput";

interface EntityFormProps {
    entity?: CategoryCard;
    onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof categoryCardCreateSchema>;

export default function EntityForm({entity, onSubmit}: EntityFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(entity ? categoryCardUpdateSchema : categoryCardCreateSchema),
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
        } catch (error: any) {
            if (error.response?.data) {
                Object.values(error.response.data).forEach((err: any) => {
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



