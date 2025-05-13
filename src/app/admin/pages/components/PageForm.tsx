"use client";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { pageCreateSchema, pageUpdateSchema } from "@app/admin/pages/validation";
import {useEffect, useState} from "react";
import {Page} from "@/@types/response";
import CustomInput from "@components/CustomInput";




interface PageFormProps {
  page?: Page;
  onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof pageCreateSchema>;

export default function PageForm({ page, onSubmit }: PageFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(page ? pageUpdateSchema : pageCreateSchema),
    defaultValues: {
      label: page?.label || '',
      published: page?.published || false,
      slug: page?.slug || '',
      meta_title: page?.meta_title || '',
      meta_description: page?.meta_description || '',
      meta_keywords: page?.meta_keywords || '',
      meta_noindex_nofollow: page?.meta_noindex_nofollow || false,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (page) {
      setValue('label', page.label);
      setValue('published', page.published);
      setValue('slug', page.slug);
      setValue('meta_title', page.meta_title);
      setValue('meta_description', page.meta_description);
      setValue('meta_keywords', page.meta_keywords);
      setValue('meta_noindex_nofollow', page.meta_noindex_nofollow);
    }
  }, [page, setValue]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
    } catch (error: any) {
      if (error.response?.data) {
        Object.values(error.response.data).forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        toast.error('Failed to save page item');
      }
    }
  };

  const [activeTab, setActiveTab] = useState<'general' | 'seo'>('general');

  return (

      <div className="max-w-2xl mx-auto p-4">
        {/* Tab Headers */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
              onClick={() => setActiveTab('general')}
              className={`pb-3 px-1 transition-colors duration-200 ${
                  activeTab === 'general'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            General
          </button>
          <button
              onClick={() => setActiveTab('seo')}
              className={`pb-3 px-1 transition-colors duration-200 ${
                  activeTab === 'seo'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            SEO
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
          {/* Tab Content */}
          <div className="pt-4">
            {activeTab === 'general' && (
                <div className="space-y-4">

                  <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />

                  <CustomInput field={'slug'} label={'Slug'} register={register} errors={errors} />

                  <CustomInput field={'published'} label={'Published'} register={register} errors={errors} type="checkbox" />


                </div>
            )}

            {activeTab === 'seo' && (
                <div className="space-y-4">

                  <CustomInput field={'meta_title'} label={'Meta title'} register={register} errors={errors} />

                  <CustomInput field={'meta_description'} label={'Meta description'} register={register} errors={errors} type="textarea" />

                  <CustomInput field={'meta_keywords'} label={'Meta keywords'} register={register} errors={errors} />

                  <CustomInput field={'meta_noindex_nofollow'} label={'noindex/nofollow'} register={register} errors={errors} type="checkbox" />

                </div>
            )}

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
            >
              <FaSave/> Save
            </button>
          </div>
        </form>
      </div>
  );
}



