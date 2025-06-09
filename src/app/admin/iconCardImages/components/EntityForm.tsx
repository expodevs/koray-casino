"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "react-toastify";
import {FaSave, FaTrash} from "react-icons/fa";
import {iconCardImageCreateSchema, iconCardImageUpdateSchema} from "@app/admin/iconCardImages/validation";
import React, {useEffect, useMemo, useState} from "react";
import {CustomSelectOption, IconCardImage, IconCardSelect} from "@/@types/response";
import CustomInput from "@components/CustomInput";
import Image from "next/image";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";
import CustomSelect from "@components/CustomSelect";

interface EntityFormProps {
    entity?: IconCardImage;
    iconCards: IconCardSelect[];
    onSubmit: (data: unknown) => void;
}


type FormData = z.infer<typeof iconCardImageCreateSchema>;

export default function EntityForm({entity, onSubmit, iconCards,}: EntityFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(entity ? iconCardImageUpdateSchema : iconCardImageCreateSchema),
        defaultValues: {
            icon_card_id: entity?.icon_card_id || undefined,
            alt: entity?.alt || '',
            label: entity?.label || '',
            image: entity?.image || '',
            position: entity?.position || null,
        },
    });

    const currentImage = watch('image');
    const renderImageField = useMemo(() => {
        if (!currentImage || !currentImage.length) {
            return null;
        }
        return (
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
                        <Image className="object-cover" src={currentImage} alt={''} fill/>
                    </div>
                </div>
            </div>
        )
    }, [currentImage, entity?.id])

    const [image, setImage] = useState<File | null>()
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
            setValue('alt', entity.alt);
            setValue('label', entity.label);
            setValue('image', entity.image);
            setValue('position', entity.position);
        }
    }, [entity?.id, setValue]);


    const handleFormSubmit = async (data: FormData) => {
        try {
            if (newImage && newImage.length) {
                data.newImage = newImage;
            }
            await onSubmit(data);
        } catch (error: any) {
            if (error.response?.data) {
                Object.values(error.response.data).forEach((err: any) => {
                    toast.error(err.message);
                });
            } else {
                toast.error('Failed to save entity');
            }
        }
    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">


            <CustomSelect
                label={'Icon Card'}
                field={'icon_card_id'}
                options={(iconCards||[]).map<CustomSelectOption>(el=>({label:el.label, value: el.id}))}
                registerAttr={{valueAsNumber: true}}
                register={register}
                errors={errors}
            />

            <CustomInput field={'alt'} label={'Alt'} register={register} errors={errors} />

            <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />

            {renderImageField}

            <CustomFileSelector
                accept="image/*"
                onChange={handleFileSelected}
            />
            <ImagePreview images={image ? [image] : []}/>

            <CustomInput field={'position'} label={'Position'} register={register} errors={errors} type="number"/>


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



