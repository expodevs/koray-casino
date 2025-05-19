"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { cardCreateSchema, cardUpdateSchema } from "@app/admin/cards/card/validation";
import React, { useEffect, useState } from "react";
import {Card, CategoryCard, Faq, IconCardSelect, Option} from "@/@types/response";
import CustomInput from "@components/CustomInput";
import { useRequestData } from "@lib/request";
import { CardType } from "@prismaClient";
import { routeAdminApiCategoryCards, routeAdminApiOptions, routeAdminApiIconCards, routeAdminApiFaqs } from "@lib/adminRoute";
import CustomSelect from "@components/CustomSelect";
import { TabContainer, Tab, TabContent } from "@components/Tabs";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";
import Image from "next/image";
import FaqBuilder, { FaqItem } from "@components/FaqBuilder";

interface CardFormProps {
  card?: Card;
  onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof cardCreateSchema>;

export default function CardForm({ card, onSubmit }: CardFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(card ? cardUpdateSchema : cardCreateSchema),
    defaultValues: {
      label: card?.label || '',
      published: card?.published || false,
      category_card_id: card?.category_card_id?.toString() || '',
      description: card?.description || '',
      referral_key: card?.referral_key || '',
      referral_btn_1_link: card?.referral_btn_1_link || '',
      referral_btn_2_link: card?.referral_btn_2_link || '',
      position: card?.position?.toString() || '',
    },
  });

  useEffect(() => {
    if (card) {
      setValue('label', card.label);
      setValue('published', card.published);
      setValue('category_card_id', card.category_card_id?.toString() || '');
      setValue('description', card.description || '');
      setValue('referral_key', card.referral_key);
      setValue('referral_btn_1_link', card.referral_btn_1_link || '');
      setValue('referral_btn_2_link', card.referral_btn_2_link || '');
      setValue('position', card.position?.toString() || '');
    }
  }, [card, setValue]);

  // Fetch data for form fields
  const { data: categoryCards, isLoading: isLoadingCategoryCards } = useRequestData<CategoryCard[]>({
    url: routeAdminApiCategoryCards.pageBuilder,
    queryKey: 'categoryCards'
  });

  // Fetch data for Options tab
  const { data: options, isLoading: isLoadingOptions } = useRequestData<Option[]>({
    url: routeAdminApiOptions.list,
    queryKey: 'options'
  });

  // Fetch data for IconCard tab
  const { data: iconCards, isLoading: isLoadingIconCards } = useRequestData<IconCardSelect[]>({
    url: routeAdminApiIconCards.select,
    queryKey: 'iconCards'
  });

  // Fetch data for FAQ tab
  const { data: faqs, isLoading: isLoadingFaqs } = useRequestData<Faq[]>({
    url: routeAdminApiFaqs.pageBuilder,
    queryKey: 'faqs'
  });

  // State for managing card options
  const [cardOptions, setCardOptions] = useState<{option_id: number, value: string}[]>([]);
  // State for managing card icon images
  const [cardIconImages, setCardIconImages] = useState<{icon_card_image_id: number}[]>([]);
  // State for managing card FAQs
  const [cardFaqs, setCardFaqs] = useState<{faq_id: number, position: number}[]>([]);

  // Convert cardFaqs to FaqItem format for FaqBuilder
  const getFaqItems = (): FaqItem[] => {
    return cardFaqs.map(faq => ({
      id: faq.faq_id.toString(),
      position: faq.position
    }));
  };

  // Handle FaqBuilder onChange event
  const handleFaqBuilderChange = (value: string) => {
    try {
      const faqItems: FaqItem[] = JSON.parse(value);
      const newCardFaqs = faqItems.map(item => ({
        faq_id: parseInt(item.id),
        position: item.position
      }));
      setCardFaqs(newCardFaqs);
    } catch (error) {
      console.error('Failed to parse FAQ items:', error);
    }
  };
  // State for managing card images
  const [cardImages, setCardImages] = useState<{src: string, newImage?: string, alt: string, position: number}[]>([]);

  // State for file upload
  const [image, setImage] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState<string>('');

  // Initialize state from card data if available
  useEffect(() => {
    if (card) {
      if (card.options && Array.isArray(card.options)) {
        setCardOptions(card.options);
      }
      if (card.icon_card_images && Array.isArray(card.icon_card_images)) {
        setCardIconImages(card.icon_card_images);
      }
      if (card.faqs && Array.isArray(card.faqs)) {
        setCardFaqs(card.faqs);
      }
      if (card.images && Array.isArray(card.images)) {
        setCardImages(card.images);
      }
    }
  }, [card]);

  // Handle adding a new option to the card
  const handleAddOption = (optionId: string, value: string) => {
    if (!optionId || !value) return;

    // Check if option already exists
    const exists = cardOptions.some(opt => opt.option_id === parseInt(optionId));
    if (exists) {
      toast.error('This option is already added');
      return;
    }

    setCardOptions([...cardOptions, {
      option_id: parseInt(optionId),
      value
    }]);
  };

  // Handle removing an option from the card
  const handleRemoveOption = (index: number) => {
    setCardOptions(cardOptions.filter((_, idx) => idx !== index));
  };

  // Handle adding a new icon card image to the card
  const handleAddIconCardImage = (iconCardImageId: string) => {
    if (!iconCardImageId) return;

    // Check if icon card image already exists
    const exists = cardIconImages.some(img => img.icon_card_image_id === parseInt(iconCardImageId));
    if (exists) {
      toast.error('This icon card image is already added');
      return;
    }

    setCardIconImages([...cardIconImages, {
      icon_card_image_id: parseInt(iconCardImageId)
    }]);
  };

  // Handle removing an icon card image from the card
  const handleRemoveIconCardImage = (index: number) => {
    setCardIconImages(cardIconImages.filter((_, idx) => idx !== index));
  };

  // FAQ management is now handled by the FaqBuilder component

  // Handle file selection for image upload
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      setImage(file);
    }
  };

  // Handle adding a new image to the card
  const handleAddImage = (src: string, alt: string) => {
    if (!src) return;

    setCardImages([...cardImages, {
      src: '', // Don't store in src, only in newImage
      newImage: src, // Include the newImage field with the base64 data
      alt: alt || '',
      position: cardImages.length + 1
    }]);

    // Reset the form fields
    setNewImage(null);
    setImage(null);
    setImageAlt('');
  };

  // Handle removing an image from the card
  const handleRemoveImage = (index: number) => {
    const newImages = cardImages.filter((_, idx) => idx !== index);
    // Update positions after removal
    const updatedImages = newImages.map((img, idx) => ({
      ...img,
      position: idx + 1
    }));
    setCardImages(updatedImages);
  };

  // Handle moving an image up in the list
  const moveImageUp = (index: number) => {
    if (index === 0) return; // Already at the top

    const newImages = [...cardImages];
    const temp = newImages[index].position;
    newImages[index].position = newImages[index - 1].position;
    newImages[index - 1].position = temp;

    setCardImages(newImages.sort((a, b) => a.position - b.position));
  };

  // Handle moving an image down in the list
  const moveImageDown = (index: number) => {
    if (index === cardImages.length - 1) return; // Already at the bottom

    const newImages = [...cardImages];
    const temp = newImages[index].position;
    newImages[index].position = newImages[index + 1].position;
    newImages[index + 1].position = temp;

    setCardImages(newImages.sort((a, b) => a.position - b.position));
  };

  // Handle form submission
  const handleFormSubmit = async (data: FormData) => {
    try {
      // Set the type to CardType.card before submitting
      const formData = {
        ...data,
        type: CardType.card,
        options: cardOptions,
        icon_card_images: cardIconImages,
        faqs: cardFaqs,
        images: cardImages
      };

      await onSubmit(formData);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error && 
          error.response && typeof error.response === 'object' && 'data' in error.response) {
        const responseData = error.response.data as Record<string, { message: string }>;
        Object.values(responseData).forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error('Failed to save card item');
      }
    }
  };

  if (isLoadingCategoryCards || isLoadingOptions || isLoadingIconCards || isLoadingFaqs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <TabContainer defaultTab="form" className="w-full">
        {/* Tab Headers */}
        <div className="flex space-x-4 border-b border-gray-200">
          <Tab id="form" label="Form" />
          <Tab id="options" label="Options" />
          <Tab id="faq" label="FAQ" />
          <Tab id="images" label="Images" />
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
          {/* Tab Content */}
          <div className="pt-4">
            <TabContent id="form">
              <div className="space-y-4">
                <CustomInput field={'published'} label={'Published'} register={register} errors={errors} type="checkbox" />

                <CustomSelect
                  label={'Category Card'}
                  field={'category_card_id'}
                  options={(categoryCards || [])}
                  registerAttr={{valueAsNumber: true}}
                  register={register}
                  errors={errors}
                />

                <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />
                <CustomInput field={'description'} label={'Description'} register={register} errors={errors} type="textarea" />
                <CustomInput field={'referral_key'} label={'Referral Key'} register={register} errors={errors} />
                <CustomInput field={'referral_btn_1_link'} label={'Referral Button 1 Link'} register={register} errors={errors} />
                <CustomInput field={'referral_btn_2_link'} label={'Referral Button 2 Link'} register={register} errors={errors} />
                <CustomInput field={'position'} label={'Position'} register={register} errors={errors} type="number" />
              </div>
            </TabContent>

            <TabContent id="options">
              <div className="space-y-6">
                <div className="border p-4 rounded">
                  <h3 className="font-semibold mb-4">Card Options</h3>

                  {/* List of added options */}
                  {cardOptions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Added Options:</h4>
                      <div className="space-y-2">
                        {cardOptions.map((opt, index) => (
                          <div key={`option-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <span className="font-medium">
                                {options?.find(o => o.id === opt.option_id)?.label || 'Unknown Option'}
                              </span>
                              <span className="ml-2 text-gray-500">Value: {opt.value}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add new option form */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Option</label>
                      <select
                        className="w-full p-2 border rounded"
                        id="new-option-id"
                      >
                        <option value="">Select Option</option>
                        {(options || []).map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Value</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        id="new-option-value"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          const optionId = (document.getElementById('new-option-id') as HTMLSelectElement).value;
                          const value = (document.getElementById('new-option-value') as HTMLInputElement).value;
                          handleAddOption(optionId, value);
                          (document.getElementById('new-option-id') as HTMLSelectElement).value = '';
                          (document.getElementById('new-option-value') as HTMLInputElement).value = '';
                        }}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded">
                  <h3 className="font-semibold mb-4">Icon Card Images</h3>

                  {/* List of added icon card images */}
                  {cardIconImages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Added Icon Card Images:</h4>
                      <div className="space-y-2">
                        {cardIconImages.map((img, index) => (
                          <div key={`icon-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <span className="font-medium">
                                Icon Card Image ID: {img.icon_card_image_id}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveIconCardImage(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add new icon card image form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Icon Card Image</label>
                      <select
                        className="w-full p-2 border rounded"
                        id="new-icon-card-image-id"
                      >
                        <option value="">Select Icon Card Image</option>
                        {(iconCards || []).map(icon => (
                          <option key={icon.id} value={icon.id}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          const iconCardImageId = (document.getElementById('new-icon-card-image-id') as HTMLSelectElement).value;
                          handleAddIconCardImage(iconCardImageId);
                          (document.getElementById('new-icon-card-image-id') as HTMLSelectElement).value = '';
                        }}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                      >
                        Add Icon Card Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabContent>

            <TabContent id="faq">
              <div className="space-y-6">
                <div className="border p-4 rounded">
                  <h3 className="font-semibold mb-4">Card FAQs</h3>

                  <FaqBuilder
                    label="Select FAQs"
                    faqItems={getFaqItems()}
                    faqs={faqs}
                    onChange={handleFaqBuilderChange}
                  />
                </div>
              </div>
            </TabContent>

            <TabContent id="images">
              <div className="space-y-6">
                <div className="border p-4 rounded">
                  <h3 className="font-semibold mb-4">Card Images</h3>

                  {/* List of added images */}
                  {cardImages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Added Images:</h4>
                      <div className="space-y-2">
                        {cardImages.map((image, index) => (
                          <div key={`image-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <span className="font-medium">
                                <Image 
                                  src={image.newImage || image.src} 
                                  alt={image.alt || ''} 
                                  width={100} 
                                  height={60} 
                                  className="object-cover"
                                />
                              </span>
                              {image.alt && (
                                <span className="ml-2 text-gray-500">Alt: {image.alt}</span>
                              )}
                              <span className="ml-2 text-gray-500">Position: {image.position}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col">
                                <button 
                                  type="button"
                                  onClick={() => moveImageUp(index)}
                                  className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                  disabled={index === 0}
                                >
                                  ↑
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => moveImageDown(index)}
                                  className="p-1 text-blue-600 rounded hover:bg-blue-100"
                                  disabled={index === cardImages.length - 1}
                                >
                                  ↓
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="p-2 text-red-600 rounded flex items-center gap-2 hover:bg-red-100"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add new image form */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Upload Image</label>
                      <CustomFileSelector
                        accept="image/*"
                        onChange={handleFileSelected}
                      />
                      {image && (
                        <div className="mt-2">
                          <ImagePreview images={[image]} />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium">Alt Text (optional)</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeholder="Image description"
                      />
                    </div>

                    {newImage && (
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => {
                            handleAddImage(newImage, imageAlt);
                          }}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                          Add Image Field
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabContent>

            <hr className="my-6"/>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600 mt-4"
            >
              <FaSave/> Save
            </button>
          </div>
        </form>
      </TabContainer>
    </div>
  );
}
