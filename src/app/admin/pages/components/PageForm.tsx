"use client";

import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { pageCreateSchema, pageUpdateSchema } from "@app/admin/pages/validation";
import React, {useCallback, useEffect, useState} from "react";
import {BuildPage as BuildPageResponse, Casino, Faq, Option, Page} from "@/@types/response";
import CustomInput from "@components/CustomInput";
import {useRequestData} from "@lib/request";
import {Builder, BuildType, CategoryCard} from "@prismaClient";
import {routeAdminApiBuilders, routeAdminApiCategoryCards, routeAdminApiFaqs, routeAdminApiCasinos, routeAdminApiCasinoOptions} from "@lib/adminRoute";
import TinyMCE from "@components/TinyMCE";
import { TabContainer, Tab, TabContent } from "@components/Tabs";





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


    // Tab state is now managed by TabContainer
    const {data:builders, isLoading} = useRequestData<Builder[]>({url: routeAdminApiBuilders.all, queryKey: 'builders'});
    const {data:categoryCards, isLoading:isLoadingCategoryCards} = useRequestData<CategoryCard[]>({url: routeAdminApiCategoryCards.pageBuilder, queryKey: 'categoryCards'});
    const {data:faqs, isLoading:isLoadingFaqs} = useRequestData<Faq[]>({url: routeAdminApiFaqs.pageBuilder, queryKey: 'faqs'});
    const {data:casinos, isLoading:isLoadingCasinos} = useRequestData<Casino[]>({url: routeAdminApiCasinos.pageBuilder, queryKey: 'casinos'});
    const {data:casinoOptions, isLoading:isLoadingCasinoOptions} = useRequestData<Option[]>({url: routeAdminApiCasinoOptions.list, queryKey: 'casinoOptions'});
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
        data.buildsPage = (buildsPage||[]);
      await onSubmit(data);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error && 
          error.response && typeof error.response === 'object' && 'data' in error.response) {
        const responseData = error.response.data as Record<string, { message: string }>;
        Object.values(responseData).forEach((err) => {
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

            interface FaqItem {
                id: string;
                position: number;
            }


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
            const displayItems = faqItems.length > 0 ? faqItems.sort((a, b) => a.position - b.position) : [{ id: '', position: 1 }];


            const saveFaqItems = (items: FaqItem[]) => {
                handleFieldValueChange(idx, JSON.stringify(items));
            };

            const addNewSelect = () => {
                const newItems = [
                    ...displayItems,
                    { id: '', position: displayItems.length + 1 }
                ];
                saveFaqItems(newItems);
            };

            const updateSelectValue = (selectIndex: number, value: string) => {
                const newItems = [...displayItems];
                newItems[selectIndex] = { ...newItems[selectIndex], id: value };
                saveFaqItems(newItems);
            };

            const removeSelect = (selectIndex: number) => {
                if (displayItems.length <= 1) {
                    saveFaqItems([{ id: '', position: 1 }]);
                    return;
                }

                const newItems = [...displayItems];
                newItems.splice(selectIndex, 1);

                newItems.forEach((item, index) => {
                    item.position = index + 1;
                });

                saveFaqItems(newItems);
            };

            const moveItemUp = (selectIndex: number) => {
                if (selectIndex === 0) return;

                const newItems = [...displayItems];
                const temp = newItems[selectIndex].position;
                newItems[selectIndex].position = newItems[selectIndex - 1].position;
                newItems[selectIndex - 1].position = temp;

                saveFaqItems(newItems.sort((a, b) => a.position - b.position));
            };

            const moveItemDown = (selectIndex: number) => {
                if (selectIndex === displayItems.length - 1) return; // Already at the bottom

                const newItems = [...displayItems];
                const temp = newItems[selectIndex].position;
                newItems[selectIndex].position = newItems[selectIndex + 1].position;
                newItems[selectIndex + 1].position = temp;

                saveFaqItems(newItems.sort((a, b) => a.position - b.position));
            };

            return (
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">{builder.label}</label>
                    <div className="space-y-2">
                        {displayItems.map((item, selectIdx) => (
                            <div key={`faq-select-${selectIdx}`} className="flex items-center gap-2">
                                <select
                                    className="w-full p-2 border rounded"
                                    value={item.id}
                                    onChange={(e) => updateSelectValue(selectIdx, e.target.value)}
                                >
                                    <option value="">Select Faq</option>
                                    {(faqs || []).map(faq => <option key={faq.id} value={faq.id}>{faq.question}</option>)}
                                </select>
                                <div className="flex flex-col">
                                    <button 
                                        type="button"
                                        onClick={() => moveItemUp(selectIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={selectIdx === 0}
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => moveItemDown(selectIdx)}
                                        className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                        disabled={selectIdx === displayItems.length - 1}
                                    >
                                        ↓
                                    </button>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => removeSelect(selectIdx)}
                                    className="p-2 text-red-600 rounded hover:bg-red-100"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addNewSelect}
                            className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                        >
                            + Add FAQ
                        </button>
                    </div>
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

        if (builder.build_type === BuildType.CasinoTop) {
            interface CasinoItem {
                id: string;
                position: number;
            }

            interface OptionItem {
                id: string;
                position: number;
                static_field?: string;
            }

            interface CasinoTopData {
                table_show_options: OptionItem[];
                table_show_casinos: CasinoItem[];
            }

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

                    // Handle backward compatibility for table_show_options
                    if (Array.isArray(parsedData.table_show_options)) {
                        if (parsedData.table_show_options.length > 0) {
                            // Check if the first item is a string (old format) or an object (new format)
                            if (typeof parsedData.table_show_options[0] === 'string') {
                                // Convert from old format (string[]) to new format (OptionItem[])
                                result.table_show_options = parsedData.table_show_options.map((id, index) => ({
                                    id,
                                    position: index + 1
                                }));
                            } else {
                                // Already in new format
                                result.table_show_options = parsedData.table_show_options;
                            }
                        }
                    }

                    // Copy table_show_casinos
                    if (Array.isArray(parsedData.table_show_casinos)) {
                        result.table_show_casinos = parsedData.table_show_casinos;
                    }
                } catch {
                    // If parsing fails, return empty arrays
                    return {
                        table_show_options: [],
                        table_show_casinos: []
                    };
                }
                return result;
            };

            const casinoTopData = parseCasinoTopData();
            const displayCasinos = casinoTopData.table_show_casinos.length > 0 
                ? casinoTopData.table_show_casinos.sort((a, b) => a.position - b.position) 
                : [{ id: '', position: 1 }];
            const displayOptions = casinoTopData.table_show_options.length > 0
                ? casinoTopData.table_show_options.sort((a, b) => a.position - b.position)
                : [{ id: '', position: 1, static_field: '' }];

            const saveCasinoTopData = (data: CasinoTopData) => {
                handleFieldValueChange(idx, JSON.stringify(data));
            };

            const addNewOption = () => {
                const newOptions = [
                    ...displayOptions,
                    { id: '', position: displayOptions.length + 1 }
                ];
                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_options: newOptions
                });
            };

            const addNewStaticOption = () => {
                const newOptions = [
                    ...displayOptions,
                    { position: displayOptions.length + 1, static_field: 'name' }
                ];
                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_options: newOptions
                });
            };

            const updateOptionValue = (optionIndex: number, value: string, field: 'id' | 'static_field' = 'id') => {
                const newOptions = [...displayOptions];
                newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_options: newOptions
                });
            };

            const removeOption = (optionIndex: number) => {
                if (displayOptions.length <= 1) {
                    saveCasinoTopData({
                        ...casinoTopData,
                        table_show_options: [{ id: '', position: 1, static_field: '' }]
                    });
                    return;
                }

                const newOptions = [...displayOptions];
                newOptions.splice(optionIndex, 1);

                newOptions.forEach((item, index) => {
                    item.position = index + 1;
                });

                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_options: newOptions
                });
            };

            const moveOptionUp = (optionIndex: number) => {
                if (optionIndex === 0) return;

                const newOptions = [...displayOptions];
                const temp = newOptions[optionIndex].position;
                newOptions[optionIndex].position = newOptions[optionIndex - 1].position;
                newOptions[optionIndex - 1].position = temp;

                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_options: newOptions.sort((a, b) => a.position - b.position)
                });
            };

            const moveOptionDown = (optionIndex: number) => {
                if (optionIndex === displayOptions.length - 1) return; // Already at the bottom

                const newOptions = [...displayOptions];
                const temp = newOptions[optionIndex].position;
                newOptions[optionIndex].position = newOptions[optionIndex + 1].position;
                newOptions[optionIndex + 1].position = temp;

                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_options: newOptions.sort((a, b) => a.position - b.position)
                });
            };

            const addNewCasino = () => {
                const newCasinos = [
                    ...displayCasinos,
                    { id: '', position: displayCasinos.length + 1 }
                ];
                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_casinos: newCasinos
                });
            };

            const updateCasinoValue = (casinoIndex: number, value: string) => {
                const newCasinos = [...displayCasinos];
                newCasinos[casinoIndex] = { ...newCasinos[casinoIndex], id: value };
                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_casinos: newCasinos
                });
            };

            const removeCasino = (casinoIndex: number) => {
                if (displayCasinos.length <= 1) {
                    saveCasinoTopData({
                        ...casinoTopData,
                        table_show_casinos: [{ id: '', position: 1 }]
                    });
                    return;
                }

                const newCasinos = [...displayCasinos];
                newCasinos.splice(casinoIndex, 1);

                newCasinos.forEach((item, index) => {
                    item.position = index + 1;
                });

                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_casinos: newCasinos
                });
            };

            const moveCasinoUp = (casinoIndex: number) => {
                if (casinoIndex === 0) return;

                const newCasinos = [...displayCasinos];
                const temp = newCasinos[casinoIndex].position;
                newCasinos[casinoIndex].position = newCasinos[casinoIndex - 1].position;
                newCasinos[casinoIndex - 1].position = temp;

                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_casinos: newCasinos.sort((a, b) => a.position - b.position)
                });
            };

            const moveCasinoDown = (casinoIndex: number) => {
                if (casinoIndex === displayCasinos.length - 1) return; // Already at the bottom

                const newCasinos = [...displayCasinos];
                const temp = newCasinos[casinoIndex].position;
                newCasinos[casinoIndex].position = newCasinos[casinoIndex + 1].position;
                newCasinos[casinoIndex + 1].position = temp;

                saveCasinoTopData({
                    ...casinoTopData,
                    table_show_casinos: newCasinos.sort((a, b) => a.position - b.position)
                });
            };

            return (
                <div className="mb-4" key={`builder-${buildPage.build_id}-${idx}`}>
                    <label className="block mb-1">{builder.label}</label>
                    <div className="space-y-4">
                        <div className="border p-4 rounded">
                            <h3 className="font-semibold mb-2">Table Columns</h3>
                            <div className="space-y-2">
                                {displayOptions.map((item, optionIdx) => (
                                    <div key={`option-select-${optionIdx}`} className="flex items-center gap-2">
                                        <div className="flex-grow">
                                            {!item.static_field && (
                                                <select
                                                    className="w-full p-2 border rounded"
                                                    value={item.id || ''}
                                                    onChange={(e) => updateOptionValue(optionIdx, e.target.value, 'id')}
                                                >
                                                    <option value="">Select Option</option>
                                                    {(casinoOptions || [])
                                                        .filter(option => 
                                                            // Show if it's the current option or not selected yet
                                                            option.id.toString() === item.id || 
                                                            !displayOptions.some(o => o.id === option.id.toString() && o !== item)
                                                        )
                                                        .map(option => (
                                                            <option key={option.id} value={option.id.toString()}>
                                                                {option.label}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            )}
                                            {item.static_field && (
                                                <select
                                                    className="w-full p-2 border rounded"
                                                    value={item.static_field}
                                                    onChange={(e) => updateOptionValue(optionIdx, e.target.value, 'static_field')}
                                                >
                                                    <option value="">Select Static Field</option>
                                                    <option value="rank">Rank</option>
                                                    <option value="name">Name</option>
                                                    <option value="name_tooltip">Name with Tooltip</option>
                                                    <option value="image">Image</option>
                                                    <option value="full_review">Full Review</option>
                                                    <option value="btn_play">Button Play</option>
                                                    <option value="btn_play_now">Button Play Now</option>
                                                </select>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <button 
                                                type="button"
                                                onClick={() => moveOptionUp(optionIdx)}
                                                className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                                disabled={optionIdx === 0}
                                            >
                                                ↑
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => moveOptionDown(optionIdx)}
                                                className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                                disabled={optionIdx === displayOptions.length - 1}
                                            >
                                                ↓
                                            </button>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => removeOption(optionIdx)}
                                            className="p-2 text-red-600 rounded hover:bg-red-100"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={addNewOption}
                                        className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                                    >
                                        + Add Option
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addNewStaticOption}
                                        className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                                    >
                                        + Add Option (Static Field)
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border p-4 rounded">
                            <h3 className="font-semibold mb-2">Casinos</h3>
                            <div className="space-y-2">
                                {displayCasinos.map((item, casinoIdx) => (
                                    <div key={`casino-select-${casinoIdx}`} className="flex items-center gap-2">
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={item.id}
                                            onChange={(e) => updateCasinoValue(casinoIdx, e.target.value)}
                                        >
                                            <option value="">Select Casino</option>
                                            {(casinos || [])
                                                .filter(casino => 
                                                    // Show if it's the current casino or not selected yet
                                                    casino.id.toString() === item.id || 
                                                    !displayCasinos.some(c => c.id === casino.id.toString() && c !== item)
                                                )
                                                .map(casino => (
                                                    <option key={casino.id} value={casino.id.toString()}>
                                                        {casino.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <div className="flex flex-col">
                                            <button 
                                                type="button"
                                                onClick={() => moveCasinoUp(casinoIdx)}
                                                className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                                disabled={casinoIdx === 0}
                                            >
                                                ↑
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => moveCasinoDown(casinoIdx)}
                                                className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                                disabled={casinoIdx === displayCasinos.length - 1}
                                            >
                                                ↓
                                            </button>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => removeCasino(casinoIdx)}
                                            className="p-2 text-red-600 rounded hover:bg-red-100"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addNewCasino}
                                    className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
                                >
                                    + Add Casino
                                </button>
                            </div>
                        </div>
                    </div>
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
    }, [builders, categoryCards, faqs, casinos, casinoOptions, handleFieldValueChange]);

    if (isLoading||isLoadingCategoryCards||isLoadingFaqs||isLoadingCasinos||isLoadingCasinoOptions) return <div>Loading...</div>;

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
