"use client";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import {FaSave, FaTrash} from "react-icons/fa";
import { settingCreateSchema, settingUpdateSchema } from "@app/admin/settings/validation";
import {InputType} from "@prismaClient";
import React, {useEffect, useMemo, useState} from "react";
import {Setting} from "@/@types/response";
import EnumSelect from "@components/EnumSelect";
import CustomInput from "@components/CustomInput";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";
import Image from "next/image";



interface SettingFormProps {
  setting?: Setting;
  onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof settingCreateSchema>;

export default function SettingForm({ setting, onSubmit }: SettingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(setting ? settingUpdateSchema : settingCreateSchema),
    defaultValues: {
      input_type: setting?.input_type || InputType.text,
      label: setting?.label || '',
      code: setting?.code || '',
      value: setting?.value || '',
      link: setting?.link || '',
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
    if (setting) {
      setValue('input_type', setting.input_type);
      setValue('label', setting.label);
      setValue('code', setting.code);
      setValue('value', setting.value);
      setValue('link', setting.link);
    }

  }, [setting, setValue]);




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
            </>
        );
    }
  }, [selectedInputType, selectedValue, image, register]);


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
        toast.error('Failed to save setting item');
      }
    }
  };

  return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
        {!setting &&  <EnumSelect
            label={"Input Type"}
            field={"input_type"}
            elements={InputType}
            excludes={[InputType.select]}
            register={register}
            errors={errors}
        />}

        <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />

        {!setting && <CustomInput field={'code'} label={'Code'} register={register} errors={errors} />}


        <div className="mb-4">
          <label className="block mb-1">Value</label>
          {renderValueField}
          {errors.value && <p className="text-red-500">{errors.value.message}</p>}
        </div>


          <CustomInput field={'link'} label={'Link'} register={register} errors={errors} />


        <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
          <FaSave/> Save
        </button>
      </form>
  );
}



