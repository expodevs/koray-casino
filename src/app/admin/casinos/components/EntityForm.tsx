"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaSave, FaTrash} from "react-icons/fa";
import {casinoCreateSchema, casinoUpdateSchema} from "@app/admin/casinos/validation";
import React, {useEffect, useState} from "react";
import {Casino} from "@/@types/response";
import Image from "next/image";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";

interface EntityFormProps {
    entity?: Casino;
    onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof casinoCreateSchema>;

export default function EntityForm({entity, onSubmit}: EntityFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(entity ? casinoUpdateSchema : casinoCreateSchema),
        defaultValues: {
            name: entity?.name || '',
            tooltip: entity?.tooltip || '',
            image: entity?.image || '',
            referral_key: entity?.referral_key || '',
            referral_link: entity?.referral_link || '',
            full_review_label: entity?.full_review_label || '',
            full_review_link: entity?.full_review_link || '',
            published: entity?.published || false,
        },
    });

    const selectedImage = watch('image');
    const [image, setImage] = useState<File|null>();
    const [, setNewImage] = useState<string | null>()

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const _files = Array.from(e.target.files);

            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result as string;
                setNewImage(imageData);
                setValue('newImage', imageData);
            };
            reader.readAsDataURL(_files[0])

            setImage(_files[0]);
        }
    };

    useEffect(() => {
        if (entity) {
            setValue('name', entity.name);
            setValue('tooltip', entity.tooltip);
            setValue('image', entity.image);
            setValue('referral_key', entity.referral_key);
            setValue('referral_link', entity.referral_link);
            setValue('full_review_label', entity.full_review_label);
            setValue('full_review_link', entity.full_review_link);
            setValue('published', entity.published);
        }
    }, [entity?.id]);

    const handleFormSubmit = async (data: FormData) => {
        try {
            await onSubmit(data);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error && 
                error.response && typeof error.response === 'object' && 'data' in error.response) {
                const responseData = error.response.data as Record<string, { message: string }>;
                Object.values(responseData).forEach((err) => {
                    toast.error(err.message);
                });
            } else {
                toast.error('Failed to save entity item');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
            <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    {...register('name')}
                    className="w-full p-2 border rounded"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
                <label className="block mb-1">Image</label>
                {selectedImage && selectedImage?.length > 0 &&
                    <div>
                        <div className="grid grid-cols-12 gap-2 my-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setValue('image', '')
                                }}
                                className="text-red-500 bg-white p-2 zin"
                            >
                                <FaTrash/>
                            </button>
                            <div className="relative aspect-video col-span-4">
                                <Image className="object-cover" src={selectedImage} alt={''} fill/>
                            </div>
                        </div>
                    </div>}

                <CustomFileSelector
                    accept="image/*"
                    onChange={handleFileSelected}
                />
                <ImagePreview images={image ? [image] : []}/>
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Referral Key</label>
                <input
                    type="text"
                    {...register('referral_key')}
                    className="w-full p-2 border rounded"
                />
                {errors.referral_key && <p className="text-red-500">{errors.referral_key.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Referral Link</label>
                <input
                    type="text"
                    {...register('referral_link')}
                    className="w-full p-2 border rounded"
                />
                {errors.referral_link && <p className="text-red-500">{errors.referral_link.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Full Review Label</label>
                <input
                    type="text"
                    {...register('full_review_label')}
                    className="w-full p-2 border rounded"
                />
                {errors.full_review_label && <p className="text-red-500">{errors.full_review_label.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1">Full Review Link</label>
                <input
                    type="text"
                    {...register('full_review_link')}
                    className="w-full p-2 border rounded"
                />
                {errors.full_review_link && <p className="text-red-500">{errors.full_review_link.message}</p>}
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

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
            >
                <FaSave/> Save
            </button>
        </form>
    );
}
