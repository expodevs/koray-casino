"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaSave, FaTrash} from "react-icons/fa";
import {casinoCreateSchema, casinoUpdateSchema} from "@app/admin/casinos/validation";
import React, {useCallback, useEffect, useState} from "react";
import {Casino, Option} from "@/@types/response";
import Image from "next/image";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";
import { TabContainer, Tab, TabContent } from "@components/Tabs";
import {useRequestData} from "@lib/request";
import {routeAdminApiCasinoOptions} from "@lib/adminRoute";
import {InputType} from "@prismaClient";

interface EntityFormProps {
    entity?: Casino;
    onSubmit: (data: unknown) => void;
}

interface CasinoOptionItem {
    id?: number;
    option_id: number;
    casino_id?: number;
    value: string;
    entity?: Option;
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
            published: Boolean(entity?.published),
            options: entity?.options || [],
        },
    });

    const {data: casinoOptions, isLoading: isLoadingCasinoOptions} = useRequestData<Option[]>({
        url: routeAdminApiCasinoOptions.list,
        queryKey: 'casinoOptions'
    });

    const [selectedOptionId, setSelectedOptionId] = useState<number>(0);
    const [casinoOptionItems, setCasinoOptionItems] = useState<CasinoOptionItem[]>([]);

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

            if (entity.options && entity.options.length > 0) {
                setCasinoOptionItems(entity.options.map(option => ({
                    id: option.id as number | undefined,
                    option_id: option.option_id as number,
                    casino_id: option.casino_id as number | undefined,
                    value: option.value as string,
                    entity: option.entity as Option | undefined
                })));
            }
        }
    }, [entity?.id, entity, setValue]);

    const handleAddOption = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!selectedOptionId) return;

        const option = (casinoOptions || []).find(option => option.id === selectedOptionId);
        if (!option) {
            setSelectedOptionId(0);
            toast.error('Option not found');
            return;
        }

        const newOption: CasinoOptionItem = {
            option_id: option.id,
            value: '',
            entity: option
        };

        setCasinoOptionItems(prev => [...prev, newOption]);
        setSelectedOptionId(0);
    }, [casinoOptions, selectedOptionId]);

    const handleOptionValueChange = useCallback((index: number, value: string) => {
        setCasinoOptionItems(prev => prev.map((item, idx) => {
            if (idx === index) {
                return { ...item, value };
            }
            return item;
        }));
    }, []);

    const removeOption = useCallback((index: number) => {
        setCasinoOptionItems(prev => prev.filter((_, idx) => idx !== index));
    }, []);

    const handleFormSubmit = async (data: FormData) => {
        try {
            data.options = casinoOptionItems;
            await onSubmit(data);
        } catch {
            toast.error('Failed to save entity item');
        }
    };

    if (isLoadingCasinoOptions) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <TabContainer defaultTab="general" className="w-full">
                {/* Tab Headers */}
                <div className="flex space-x-4 border-b border-gray-200">
                    <Tab id="general" label="General" />
                    <Tab id="options" label="Options" />
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
                    {/* Tab Content */}
                    <div className="pt-4">
                        <TabContent id="general">
                            <div className="space-y-4">
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
                            </div>
                        </TabContent>

                        <TabContent id="options">
                            <div className="space-y-4">
                                {/* Display existing options */}
                                {casinoOptionItems.map((option, idx) => (
                                    <div key={`option-${idx}`} className="mb-4 flex items-center gap-4">
                                        <div className="w-full p-2 border rounded">
                                            <div className="mb-2">
                                                <label className="block mb-1">
                                                    {option.entity?.label || `Option ${idx + 1}`}
                                                </label>
                                                {option.entity?.input_type === InputType.select ? (
                                                    <div>
                                                        <select
                                                            value={option.value}
                                                            onChange={(e) => handleOptionValueChange(idx, e.target.value)}
                                                            className="w-full p-2 border rounded"
                                                        >
                                                            <option value="">Select Option</option>
                                                            {(option?.entity?.value||'').split('|').map((item, optIdx) => (
                                                                <option key={`select-option-${optIdx}`} value={item.trim()}>
                                                                    {item.trim()}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : option.entity?.input_type === InputType.image ? (
                                                    <div>
                                                        {option.entity?.value ? (
                                                            <div className="relative aspect-video w-full h-40 mb-2">
                                                                <Image 
                                                                    src={option.entity?.value} 
                                                                    alt={option.entity?.label || ''} 
                                                                    fill 
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 bg-yellow-100 text-yellow-800 rounded mb-2">
                                                                You need to set the image in the options
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : option.entity?.input_type === InputType.text ? (
                                                    <input
                                                        type="text"
                                                        value={option.value || option.entity?.value || ''}
                                                        onChange={(e) => handleOptionValueChange(idx, e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                ) : option.entity?.input_type === InputType.textarea ? (
                                                    <textarea
                                                        value={option.value || option.entity?.value || ''}
                                                        onChange={(e) => handleOptionValueChange(idx, e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                        rows={4}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={option.value}
                                                        onChange={(e) => handleOptionValueChange(idx, e.target.value)}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeOption(idx)}
                                            className="p-2 text-red-600 rounded hover:bg-red-100"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}

                                {/* Add new option */}
                                <hr className="my-4" />
                                <div className="mb-4">
                                    <label className="block mb-1">Add Option</label>
                                    <select
                                        value={selectedOptionId || ""}
                                        onChange={(e) => setSelectedOptionId(Number(e.target.value))}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select Option</option>
                                        {(casinoOptions || [])
                                            .filter(option => !casinoOptionItems.some(item => item.option_id === option.id))
                                            .map(option => (
                                                <option key={option.id} value={option.id}>
                                                    {option.label}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <button
                                        type="button"
                                        onClick={handleAddOption}
                                        className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                                    >
                                        Add Option
                                    </button>
                                </div>
                            </div>
                        </TabContent>

                        <hr/>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600 mt-10"
                        >
                            <FaSave/> Save
                        </button>
                    </div>
                </form>
            </TabContainer>
        </div>
    );
}
