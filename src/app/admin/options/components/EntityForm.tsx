"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaCopy, FaSave, FaTrash} from "react-icons/fa";
import {optionCreateSchema, optionUpdateSchema} from "@app/admin/options/validation";
import {InputType} from "@prismaClient";
import React, {useEffect, useMemo, useState} from "react";
import {Option} from "@/@types/response";
import EnumSelect from "@components/EnumSelect";
import Image from "next/image";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";

interface EntityFormProps {
    entity?: Option;
    onSubmit: (data: FormData) => void;
}

type FormData = z.infer<typeof optionCreateSchema>;

export default function EntityForm({entity, onSubmit}: EntityFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(entity ? optionUpdateSchema : optionCreateSchema),
        defaultValues: {
            label: entity?.label || '',
            input_type: entity?.input_type || InputType.text,
            value: entity?.value || '',
            hash_tag: entity?.hash_tag || '',
            tooltip: entity?.tooltip || '',
            published: Boolean(entity?.published),
            use_for_filter: Boolean(entity?.use_for_filter),
            position: entity?.position,
        },
    });

    const selectedInputType = watch('input_type');
    const selectedValue = watch('value');
    const [image, setImage] = useState<File|null>();
    const [newImage, setNewImage] = useState<string | null>()

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const _files = Array.from(e.target.files);

            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result as string);
            };
            reader.readAsDataURL(_files[0])

            setImage(_files[0]);
        }
    };


    useEffect(() => {
        if (entity) {
            setValue('label', entity.label);
            setValue('input_type', entity.input_type);
            setValue('value', entity.value || '');
            setValue('hash_tag', entity.hash_tag);
            setValue('tooltip', entity.tooltip);
            setValue('published', entity.published);
            setValue('use_for_filter', entity.use_for_filter);
            setValue('position', entity.position);
        }
    }, [entity, entity?.id, setValue]);



    const renderValueField = useMemo(() => {
        switch (selectedInputType) {
            case InputType.textarea:
                return <textarea {...register('value')} className="w-full p-2 border rounded"/>;

            case InputType.image:
                return (
                    <>
                        {selectedValue && selectedValue?.length > 0 &&
                            <div>
                                <div className="grid grid-cols-12 gap-2 my-2">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setValue('value', '')
                                        }}
                                        className="text-red-500 bg-white p-2 zin"
                                    >
                                        <FaTrash/>
                                    </button>
                                    <div className="relative aspect-video col-span-4">
                                        <Image className="object-cover" src={selectedValue} alt={''} fill/>
                                    </div>
                                </div>
                            </div>}

                        <CustomFileSelector
                            accept="image/*"
                            onChange={handleFileSelected}
                        />
                        <ImagePreview images={image ? [image] : []}/>
                    </>
                );

            case InputType.password:
                return (
                    <input
                        type="password"
                        {...register('value')}
                        className="w-full p-2 border rounded"
                    />
                );

            default:
                return (<>
                        <input
                            type="text"
                            {...register('value')}
                            className="w-full p-2 border rounded"
                        />
                        {selectedInputType === InputType.select && <div  className="text-gray-500 flex p-2 items-center gap-2">
                            <FaCopy className="hover:cursor-pointer" onClick={e=>copySplit(e)} />
                            <p className="hover:cursor-pointer" onClick={e=>copySplit(e)} >
                                Split element
                                <span className="text-red-800" > |</span>
                            </p>
                        </div>}
                    </>
                );
        }
    }, [selectedInputType, selectedValue, image, register, setValue]);

    const handleFormSubmit = async (data: FormData) => {
        try {
            if (newImage && newImage.length) {
                data.newImage = newImage;
            }

            await onSubmit(data);
        } catch  {
            toast.error('Failed to save entity item');
        }
    };

    const copySplit = async (e: React.MouseEvent) => {
        e.preventDefault();
        await navigator.clipboard.writeText('|');
        toast.info('Copied to clipboard');
    }


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">

            {!entity && <EnumSelect label={"Input Type"} field={"input_type"} elements={InputType} excludes={[InputType.password]} register={register} errors={errors} />}


            <div className="mb-4">
                <label className="block mb-1">Label</label>
                <input
                    type="text"
                    {...register('label')}
                    className="w-full p-2 border rounded"
                />
                {errors.label && <p className="text-red-500">{errors.label.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Tooltip</label>
                <input
                    type="text"
                    {...register('tooltip')}
                    className="w-full p-2 border rounded"
                />
                {errors.tooltip && <p className="text-red-500">{errors.tooltip.message}</p>}
            </div>


            <div className="mb-4">
                <label className="block mb-1">Value</label>
                {renderValueField}
                {errors.value && <p className="text-red-500">{errors.value.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Position</label>
                <input
                    type="number"
                    {...register('position')}
                    className="w-full p-2 border rounded"
                />
                {errors.position && <p className="text-red-500">{errors.position.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Hash Tag</label>
                <input
                    type="text"
                    {...register('hash_tag')}
                    className="w-full p-2 border rounded"
                />
                {errors.hash_tag && <p className="text-red-500">{errors.hash_tag.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Published</label>
                <input
                    type="checkbox"
                    {...register('published')}
                    className="w-full p-2 border rounded"
                />
                {errors.published && <p className="text-red-500">{errors.published.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Use for filter</label>
                <input
                    type="checkbox"
                    {...register('use_for_filter')}
                    className="w-full p-2 border rounded"
                />
                {errors.use_for_filter && <p className="text-red-500">{errors.use_for_filter.message}</p>}
            </div>

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
