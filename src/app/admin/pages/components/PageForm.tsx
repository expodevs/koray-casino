"use client";

import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { pageCreateSchema, pageUpdateSchema } from "@app/admin/pages/validation";
import React, {useCallback, useEffect, useState} from "react";
import {BuildPage as BuildPageResponse, Casino, Faq, IconCardSelect, Option, Page} from "@/@types/response";
import CustomInput from "@components/CustomInput";
import {useRequestData} from "@lib/request";
import {Builder, BuildType, CategoryCard, Card} from "@prismaClient";
import {routeAdminApiBuilders, routeAdminApiCategoryCards, routeAdminApiFaqs, routeAdminApiCasinos, routeAdminApiCasinoOptions, routeAdminApiCards, routeAdminApiIconCards} from "@lib/adminRoute";
import TinyMCE from "@components/TinyMCE";
import { TabContainer, Tab, TabContent } from "@components/Tabs";
import FaqBuilder, {FaqItem} from "@components/FaqBuilder";
import BuilderCasinoTop, { CasinoTopData } from "@app/admin/pages/components/BuilderCasinoTop";
import CategoryCardBuilder from '@app/admin/pages/components/categoryCard/CategoryCardBuilder';
import CartBuilder, {CartItem} from '@app/admin/pages/components/CartBuilder';
import BtnBlock, { BtnBlockData, BtnBlockType } from '@app/admin/pages/components/btnBlock';







interface PageFormProps {
  page?: Page;
  onSubmit: (data: FormData) => void;
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
      published: Boolean(page?.published),
      slug: page?.slug || '',
      meta_title: page?.meta_title || '',
      meta_description: page?.meta_description || '',
      meta_keywords: page?.meta_keywords || '',
      meta_noindex_nofollow: Boolean(page?.meta_noindex_nofollow),
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
          };
          return buildPage;
      }));
    }
  }, [page, setValue]);


    const {data:builders, isLoading} = useRequestData<Builder[]>({url: routeAdminApiBuilders.all, queryKey: 'builders'});
    const {data:categoryCards, isLoading:isLoadingCategoryCards} = useRequestData<CategoryCard[]>({url: routeAdminApiCategoryCards.pageBuilder, queryKey: 'categoryCards'});
    const {data:faqs, isLoading:isLoadingFaqs} = useRequestData<Faq[]>({url: routeAdminApiFaqs.pageBuilder, queryKey: 'faqs'});
    const {data:casinos, isLoading:isLoadingCasinos} = useRequestData<Casino[]>({url: routeAdminApiCasinos.pageBuilder, queryKey: 'casinos'});
    const {data:casinoOptions, isLoading:isLoadingCasinoOptions} = useRequestData<Option[]>({url: routeAdminApiCasinoOptions.list, queryKey: 'casinoOptions'});
    const {data:cards, isLoading:isLoadingCards} = useRequestData<Card[]>({url: routeAdminApiCards.pageBuilder, queryKey: 'cards'});
    const {data:iconCards, isLoading:isLoadingIconCards} = useRequestData<IconCardSelect[]>({url: routeAdminApiIconCards.select, queryKey: 'iconCards'});
    const [selectedBuilderId, setSelectedBuilderId] = useState<number>(0);
    const [buildsPage, setBuildsPage] = useState<BuildPageResponse[]>([]);

    const handleAddBuilderField = async (e: React.FormEvent) => {
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
        data.buildsPage = (buildsPage||[]);
      await onSubmit(data);
    } catch  {
        toast.error('Failed to save page item');
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
            const parseFaqItems = (): FaqItem[] => {
                if (!buildPage.field_values) {
                    return [];
                }

                let result: FaqItem[] = [];
                try {
                    result = JSON.parse(buildPage.field_values);
                } catch {
                    const oldValues = buildPage.field_values.split(',').filter(Boolean);
                    result = oldValues.map((id, index) => ({
                        id,
                        position: index + 1
                    }));
                }
                return result;
            };

            const faqItems = parseFaqItems();

            return (
                <FaqBuilder
                    key={`builder-${buildPage.build_id}-${idx}`}
                    label={builder.label}
                    faqItems={faqItems}
                    faqs={faqs}
                    onChange={(value) => handleFieldValueChange(idx, value)}
                />
            )
        }

        if (builder.build_type === BuildType.cart) {
            const parseCartItems = (): CartItem[] => {
                if (!buildPage.field_values) {
                    return [];
                }

                let result: CartItem[] = [];
                try {
                    result = JSON.parse(buildPage.field_values);
                } catch {
                    const oldValues = buildPage.field_values.split(',').filter(Boolean);
                    result = oldValues.map((id, index) => ({
                        id,
                        position: index + 1
                    }));
                }
                return result;
            };

            const cartItems = parseCartItems();

            return (
                <CartBuilder
                    key={`builder-${buildPage.build_id}-${idx}`}
                    label={builder.label}
                    cartItems={cartItems}
                    cards={cards}
                    onChange={(value) => handleFieldValueChange(idx, value)}
                />
            )
        }


        if (builder.build_type === BuildType.slotCard) {
            const buildValue = (() => {
                if (!buildPage.field_values) {
                    return {
                        label: '',
                        description: '',
                        category_id: '',
                        type: ''
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
                        type: ''
                    };
                }
            })();

            return (
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <CategoryCardBuilder
                        value={buildValue}
                        categoryCards={categoryCards || []}
                        casinoOptions={casinoOptions}
                        iconCards={iconCards}
                        onChange={(value) => handleFieldValueChange(idx, JSON.stringify(value))}
                    />
                </div>
            );
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

        if (builder.build_type === BuildType.casinoTop) {
            const parseCasinoTopData = (): CasinoTopData => {
                if (!buildPage.field_values) {
                    return {
                        table_show_options: [],
                        table_show_casinos: []
                    };
                }

                const result: CasinoTopData = {
                    table_show_options: [],
                    table_show_casinos: []
                };

                try {
                    const parsedData = JSON.parse(buildPage.field_values);

                    if (Array.isArray(parsedData.table_show_options)) {
                        if (parsedData.table_show_options.length > 0) {
                            // Check if the first item is a string (old format) or an object (new format)
                            if (typeof parsedData.table_show_options[0] === 'string') {
                                // Convert from old format (string[]) to new format (OptionItem[])
                                result.table_show_options = parsedData.table_show_options.map((id: number, index: number) => ({
                                    id,
                                    position: index + 1
                                }));
                            } else {
                                result.table_show_options = parsedData.table_show_options;
                            }
                        }
                    }

                    if (Array.isArray(parsedData.table_show_casinos)) {
                        result.table_show_casinos = parsedData.table_show_casinos;
                    }
                } catch {
                    return {
                        table_show_options: [],
                        table_show_casinos: []
                    };
                }
                return result;
            };

            const casinoTopData = parseCasinoTopData();

            return (
                <div key={`builder-${buildPage.build_id}-${idx}`}>
                    <BuilderCasinoTop
                        label={builder.label}
                        data={casinoTopData}
                        casinos={casinos}
                        casinoOptions={casinoOptions}
                        onChange={(data) => handleFieldValueChange(idx, JSON.stringify(data))}
                    />
                </div>
            );
        }

        if (builder.build_type === BuildType.btnBlock) {
            const parseBtnBlockData = (): BtnBlockData => {
                if (!buildPage.field_values) {
                    return {
                        buttons: [],
                        type: BtnBlockType.button
                    };
                }

                try {
                    const parsedData = JSON.parse(buildPage.field_values);
                    return {
                        buttons: Array.isArray(parsedData.buttons) ? parsedData.buttons : [],
                        type: parsedData.type || BtnBlockType.button
                    };
                } catch {
                    return {
                        buttons: [],
                        type: BtnBlockType.button
                    };
                }
            };

            const btnBlockData = parseBtnBlockData();

            return (
                <div key={`builder-${buildPage.build_id}-${idx}`}>
                    <BtnBlock
                        label={builder.label}
                        data={btnBlockData}
                        onChange={(data) => handleFieldValueChange(idx, JSON.stringify(data))}
                    />
                </div>
            );
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
    }, [builders, categoryCards, faqs, casinos, casinoOptions, cards, iconCards, handleFieldValueChange]);

    if (isLoading||isLoadingCategoryCards||isLoadingFaqs||isLoadingCasinos||isLoadingCasinoOptions||isLoadingCards||isLoadingIconCards) return <div>Loading...</div>;

    return (
      <div className="max-w-6xl mx-auto p-4">
        <TabContainer defaultTab="general" className="w-full">
          {/* Tab Headers */}
          <div className="flex space-x-4 border-b border-gray-200">
            <Tab id="general" label="General" />
            <Tab id="content" label="Content" />
            <Tab id="seo" label="SEO" />
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
            {/* Tab Content */}
            <div className="pt-4">
              <TabContent id="general">
                <div className="space-y-4">
                  <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />
                  <CustomInput field={'slug'} label={'Slug'} register={register} errors={errors} />
                  <CustomInput field={'published'} label={'Published'} register={register} errors={errors} type="checkbox" />
                </div>
              </TabContent>

              <TabContent id="content">
                <>
                  {buildsPage.map((buildPage, idx) => (
                    <div key={`build-container-${idx}`} className="mb-4 flex items-center gap-4">
                      <div className={'w-full p-2 border rounded'}>
                        {memoizedRenderBuildPageField(idx, buildPage)}
                      </div>
                      <div>
                        <a
                          onClick={() => moveItemUp(idx)}
                          className={' p-2 rounded flex items-center gap-2 hover:bg-blue-100'}
                        >↑</a>
                        <a
                          onClick={() => moveItemDown(idx)}
                          className={' p-2 rounded flex items-center gap-2 hover:bg-blue-100'}
                        >↓</a>
                        <a
                          onClick={() => removeItem(idx)}
                          className={' p-2 text-red-600 rounded flex items-center gap-2 hover:bg-red-100'}
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
                        <option>Select Builder Field</option>
                        {(builders||[]).map(builder=><option key={builder.id} value={builder.id}>{builder.label}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <button
                        onClick={handleAddBuilderField}
                        className={'bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600'}
                      >
                        Add Field
                      </button>
                    </div>
                  </div>
                </>
              </TabContent>

              <TabContent id="seo">
                <div className="space-y-4">
                  <CustomInput field={'meta_title'} label={'Meta title'} register={register} errors={errors} />
                  <CustomInput field={'meta_description'} label={'Meta description'} register={register} errors={errors} type="textarea" />
                  <CustomInput field={'meta_keywords'} label={'Meta keywords'} register={register} errors={errors} />
                  <CustomInput field={'meta_noindex_nofollow'} label={'noindex/nofollow'} register={register} errors={errors} type="checkbox" />
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
