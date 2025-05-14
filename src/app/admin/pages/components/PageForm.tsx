"use client";

import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { pageCreateSchema, pageUpdateSchema } from "@app/admin/pages/validation";
import React, {useCallback, useEffect, useState} from "react";
import {BuildPage as BuildPageResponse, Faq, Page} from "@/@types/response";
import CustomInput from "@components/CustomInput";
import {useRequestData} from "@lib/request";
import {Builder, BuildType, CategoryCard} from "@prismaClient";
import {routeAdminApiBuilders, routeAdminApiCategoryCards, routeAdminApiFaqs} from "@lib/adminRoute";
import TinyMCE from "@components/TinyMCE";





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



  useEffect(() => {
    if (page) {
      setValue('label', page.label);
      setValue('published', page.published);
      setValue('slug', page.slug);
      setValue('meta_title', page.meta_title);
      setValue('meta_description', page.meta_description);
      setValue('meta_keywords', page.meta_keywords);
      setValue('meta_noindex_nofollow', page.meta_noindex_nofollow);
      setBuildsPage(page.builds.map(builder=>{
          const buildPage:BuildPageResponse = {
              build_id: builder.build_id,
              position: builder?.position || 1,
              field_values: builder?.field_values || '',
              card_type: builder.card_type,
          };
          return buildPage;
      }));
    }
  }, [page, setValue]);


    const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'content'>('general');
    const {data:builders, isLoading} = useRequestData<Builder[]>({url: routeAdminApiBuilders.all, queryKey: 'builders'});
    const {data:categoryCards, isLoading:isLoadingCategoryCards} = useRequestData<CategoryCard[]>({url: routeAdminApiCategoryCards.pageBuilder, queryKey: 'categoryCards'});
    const {data:faqs, isLoading:isLoadingFaqs} = useRequestData<Faq[]>({url: routeAdminApiFaqs.pageBuilder, queryKey: 'faqs'});
    const [selectedBuilderId, setSelectedBuilderId] = useState<number>(0);
    const [buildsPage, setBuildsPage] = useState<BuildPageResponse[]>([]);

    const handleAddBuilderField = async (e) => {
        e.preventDefault();
        if (!selectedBuilderId) return;

        const builder = (builders||[]).find(builder=>builder.id === selectedBuilderId);
        if (!builder) {
            setSelectedBuilderId(0);
            toast.error('Builder not found');
            return;
        }

        const build: BuildPageResponse = {
            build_id: builder.id,
            position: buildsPage.length + 1,
            field_values: '',
            card_type: null,
        }
        setBuildsPage(prev => [...prev, build]);
        setSelectedBuilderId(0);
    }

    const moveItemUp = (index: number) => {
        setBuildsPage(prev => {
            if (index === 0) return prev;

            const updated = [...prev];
            [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

            return updated.map((item, idx) => ({ ...item, position: idx }));
        });
    }

    const moveItemDown = (index: number) => {
        setBuildsPage(prev => {
            if (index === prev.length - 1) return prev;

            const updated = [...prev];
            [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

            return updated.map((item, idx) => ({ ...item, position: idx }));
        });
    }

    const removeItem = (index: number) => {
        setBuildsPage(prev => {
            const updated = prev.filter((_, idx) => idx !== index);
            return updated.map((item, idx) => ({...item, position: idx + 1}));
        });
    }

    const handleFieldValueChange = useCallback((findIdx: number, value: string) => {
        if (findIdx < 0) return;

        setBuildsPage(prev => prev.map(((build, idx) => {
            if (idx === findIdx) {
                return { ...build, field_values: value };
            }
            return build;
        })));
    }, []);

  const handleFormSubmit = async (data: FormData) => {
    try {
        data.buildsPage = (buildsPage||[]).filter(buildPage=>buildPage.field_values);
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



    const memoizedRenderBuildPageField = useCallback((idx: number, buildPage: BuildPageResponse): React.ReactNode => {
        if (!builders) return null;
        const builder = (builders||[]).find(builder=>builder.id === buildPage.build_id);
        if (!builder) return null;

        if (builder.build_type === BuildType.htmlEditor) {
            return (
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">{builder.label}</label>
                    <div>
                        <TinyMCE
                            key={`tiny-${buildPage.build_id}-${idx}`}
                            value={buildPage.field_values}
                            onChange={(content) => handleFieldValueChange(idx, content)}
                        />
                    </div>
                </div>
            )
        }

        if (builder.build_type === BuildType.faq) {
            const selectedValues = buildPage.field_values ? buildPage.field_values.split(',') : [];

            return (
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">{builder.label}</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedValues}
                        onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions, option => option.value);
                            handleFieldValueChange(idx, values.join(','));
                        }}
                        multiple={true}
                    >
                        <option value="">Select Faq</option>
                        {(faqs || []).map(faq => <option key={faq.id} value={faq.id}>{faq.question}</option>)}
                    </select>
                </div>
            )
        }


        if (builder.build_type === BuildType.categoryCard) {
            const buildValue = (() => {
                if (!buildPage.field_values) {
                    return {
                        label: '',
                        description: '',
                        category_id: '',
                    };
                }

                try {
                    return JSON.parse(buildPage.field_values);
                } catch (e) {
                    console.error('Failed to parse field_values:', e);
                    return {
                        label: '',
                        description: '',
                        category_id: '',
                    };
                }
            })();


            const mergeFieldValues = (value: string, field: string): string => {
                const newValue = { ...buildValue, [field]: value };
                return JSON.stringify(newValue);
            }

            return (<>
                <div className="mb-4" key={`builder-header-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">Label</label>
                    <input
                        className="w-full p-2 border rounded"
                        value={buildValue.label}
                        onChange={(e) => handleFieldValueChange(idx, mergeFieldValues(e.target.value, 'label'))}
                    />
                </div>
                <div className="mb-4" key={`builder-desc-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={buildValue.description}
                        onChange={(e) => handleFieldValueChange(idx, mergeFieldValues(e.target.value, 'description'))}
                        rows={4}
                    />
                </div>
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">Category Card</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={buildValue.category_id}
                        onChange={(e) => handleFieldValueChange(idx, mergeFieldValues(e.target.value, 'category_id'))}
                    >
                        <option >Select Category</option>
                        {(categoryCards||[]).map(categoryCard=><option key={categoryCard.id} value={categoryCard.id}>{categoryCard.label}</option>)}
                    </select>
                </div>
            </>)
        }

        if (builder.build_type === BuildType.textarea) {
            return (
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">{builder.label}</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={buildPage.field_values}
                        onChange={(e) => handleFieldValueChange(idx, e.target.value)}
                        rows={4}
                    />
                </div>
            )
        }

        if (builder.build_type === BuildType.text) {
            return (
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">{builder.label}</label>
                    <input
                        className="w-full p-2 border rounded"
                        value={buildPage.field_values}
                        onChange={(e) => handleFieldValueChange(idx, e.target.value)}
                    />
                </div>
            )
        }

        return null;
    }, [builders, categoryCards, faqs, handleFieldValueChange]);

    if (isLoading||isLoadingCategoryCards||isLoadingFaqs) return <div>Loading...</div>;

    return (

      <div className="max-w-6xl mx-auto p-4">
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
                onClick={() => setActiveTab('content')}
                className={`pb-3 px-1 transition-colors duration-200 ${
                    activeTab === 'content'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                Content
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

              {activeTab === 'content' && (<>
                  {buildsPage.map((buildPage, idx) => (
                      <div key={`build-container-${idx}`} className="mb-4 flex items-center gap-4">
                          <div className={'w-full p-2 border rounded'}>
                              {memoizedRenderBuildPageField(idx, buildPage)}
                          </div>
                          <div  >
                              <a
                                  onClick={() => moveItemUp(idx)}
                                  className={' p-2 rounded flex items-center gap-2 hover:cursor-pointer'}
                              >↑</a>
                              <a
                                  onClick={() => moveItemDown(idx)}
                                  className={' p-2 rounded flex items-center gap-2 hover:cursor-pointer'}
                              >↓</a>
                              <a
                                  onClick={() => removeItem(idx)}
                                  className={' p-2 text-red-600 rounded flex items-center gap-2 hover:cursor-pointer'}
                              >X</a>
                          </div>
                      </div>
                  ))}

                  <hr className={'my-4 py-4'}/>
                  <div className="space-y-4">
                      <div className="mb-4">
                          <label className="block mb-1">Add Builder Field</label>
                          <select
                              value={selectedBuilderId?.toString()}
                              onChange={e=>setSelectedBuilderId(Number(e.target.value))}
                              className="w-full p-2 border rounded"
                          >
                              <option >Select Builder Field</option>
                              {(builders||[]).map(builder=><option key={builder.id} value={builder.id}>{builder.label}</option>)}
                          </select>
                      </div>
                      <div className="mb-4">
                          <button
                            onClick={handleAddBuilderField}
                            className={'bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600'}
                          >
                            Add
                          </button>
                      </div>
                  </div>
              </>)}

            {activeTab === 'seo' && (
                <div className="space-y-4">

                  <CustomInput field={'meta_title'} label={'Meta title'} register={register} errors={errors} />

                  <CustomInput field={'meta_description'} label={'Meta description'} register={register} errors={errors} type="textarea" />

                  <CustomInput field={'meta_keywords'} label={'Meta keywords'} register={register} errors={errors} />

                  <CustomInput field={'meta_noindex_nofollow'} label={'noindex/nofollow'} register={register} errors={errors} type="checkbox" />

                </div>
            )}

            <hr/>
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600 mt-10"
            >
              <FaSave/> Save
            </button>
          </div>
        </form>
      </div>
  );
}
