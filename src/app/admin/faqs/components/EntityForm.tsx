"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaSave} from "react-icons/fa";
import {faqCreateSchema, faqUpdateSchema} from "@app/admin/faqs/validation";
import {useEffect} from "react";
import {Faq} from "@/@types/response";
import CustomInput from "@components/CustomInput";

interface EntityFormProps {
    entity?: Faq;
    onSubmit: (data: FormData) => void;
}

type FormData = z.infer<typeof faqCreateSchema>;

export default function EntityForm({entity, onSubmit}: EntityFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(entity ? faqUpdateSchema : faqCreateSchema),
        defaultValues: {
            question: entity?.question || '',
            answer: entity?.answer || '',
            published: entity ? entity.published : false,
            position: Number(entity?.position),
        },
    });

    useEffect(() => {
        if (entity) {
            setValue('question', entity.question);
            setValue('answer', entity.answer);
            setValue('published', entity.published);
            setValue('position', Number(entity.position));
        }
    }, [entity, setValue]);

    const handleFormSubmit = async (data: FormData) => {
        try {
            await onSubmit(data);
        } catch  {
            toast.error('Failed to save entity');
        }
    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">


            <CustomInput field={'question'} label={'Question'} register={register} errors={errors} />
            <CustomInput field={'answer'} label={'Answer'} register={register} errors={errors} />
            <CustomInput field={'position'} label={'Position'} register={register} registerAttr={{valueAsNumber: true}} errors={errors} type="number"/>
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



