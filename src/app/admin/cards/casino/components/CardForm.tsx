"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaSave, FaTrash } from "react-icons/fa";
import { cardCreateSchema, cardUpdateSchema } from "@app/admin/cards/casino/validation";
import React, {useEffect, useMemo, useState} from "react";
import {Card, CategoryCard, Faq, IconCardSelect, Option} from "@/@types/response";
import CustomInput from "@components/CustomInput";
import { useRequestData } from "@lib/request";
import {CardColor, CardType} from "@prismaClient";
import { routeAdminApiCategoryCards, routeAdminApiOptions, routeAdminApiIconCards, routeAdminApiFaqs } from "@lib/adminRoute";
import CustomSelect from "@components/CustomSelect";
import { TabContainer, Tab, TabContent } from "@components/Tabs";
import CustomFileSelector from "@components/file/CustomFileSelector";
import ImagePreview from "@components/file/ImagePreview";
import Image from "next/image";
import FaqBuilder, { FaqItem } from "@components/FaqBuilder";
import CardOptions from "@app/admin/cards/casino/components/CardOptions"
import EnumSelect from "@components/EnumSelect";

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
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(card ? cardUpdateSchema : cardCreateSchema),
    defaultValues: {
      label: card?.label || '',
      published: card ? Boolean(card.published) : false,
      category_card_id: card?.category_card_id || undefined,
      referral_key: card?.referral_key || '',
      referral_btn_1_link: card?.referral_btn_1_link || '',
      referral_btn_2_link: card?.referral_btn_2_link || '',
      position: card?.position || undefined,
      terms_and_condition: card?.terms_and_condition || '',
      good_selection_of_games: card?.good_selection_of_games || undefined,
      no_game_provider_filter: card?.no_game_provider_filter || undefined,
      live_chat_available_only_after_registration: card?.live_chat_available_only_after_registration || undefined,
      casino_image: card?.casino_image || '',
    },
  });

  useEffect(() => {
    if (card) {
      setValue('label', card.label);
      setValue('published', card.published);
      setValue('category_card_id', Number(card.category_card_id));
      setValue('referral_key', card.referral_key);
      setValue('referral_btn_1_link', card.referral_btn_1_link || '');
      setValue('referral_btn_2_link', card.referral_btn_2_link || '');
      setValue('position', card.position || undefined);
      setValue('terms_and_condition', card.terms_and_condition || '');
      setValue('good_selection_of_games', card.good_selection_of_games || undefined);
      setValue('no_game_provider_filter', card.no_game_provider_filter || undefined);
      setValue('live_chat_available_only_after_registration', card.live_chat_available_only_after_registration || undefined);
      setValue('casino_image', card.casino_image || '');
    }
  }, [card, setValue]);

  const { data: categoryCards, isLoading: isLoadingCategoryCards } = useRequestData<CategoryCard[]>({
    url: routeAdminApiCategoryCards.pageBuilder,
    queryKey: 'categoryCards'
  });

  const { data: options, isLoading: isLoadingOptions } = useRequestData<Option[]>({
    url: routeAdminApiOptions.list,
    queryKey: 'options'
  });

  const { data: iconCards, isLoading: isLoadingIconCards } = useRequestData<IconCardSelect[]>({
    url: routeAdminApiIconCards.select,
    queryKey: 'iconCards'
  });

  const { data: faqs, isLoading: isLoadingFaqs } = useRequestData<Faq[]>({
    url: routeAdminApiFaqs.pageBuilder,
    queryKey: 'faqs'
  });

  const [cardOptions, setCardOptions] = useState<{option_id: number, value: string}[]>([]);
  const [cardIconImages, setCardIconImages] = useState<{icon_card_image_id: number}[]>([]);
  const [cardFaqs, setCardFaqs] = useState<{faq_id: number, position: number}[]>([]);

  const getFaqItems = (): FaqItem[] => {
    return cardFaqs.map(faq => ({
      id: faq.faq_id.toString(),
      position: faq.position
    }));
  };

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

  // Casino image state
  const [casinoImage, setCasinoImage] = useState<File | null>(null);
  const [newCasinoImage, setNewCasinoImage] = useState<string | null>(null);

  // Watch the casino_image field
  const currentCasinoImage = watch('casino_image');

  // Function to render the current casino image with delete button
  const renderCasinoImage = useMemo(() => {
    if (!currentCasinoImage || !currentCasinoImage.length) {
      return null;
    }

    return (
      <div>
        <div className="grid grid-cols-12 gap-2 my-2">
          <button
            type="button"
            onClick={() => {
              setValue('casino_image', '');
              setNewCasinoImage(null);
              setCasinoImage(null);
            }}
            className="text-red-500 bg-white p-2"
          >
            <FaTrash/>
          </button>
          <div className="relative aspect-video col-span-4">
            <Image className="object-cover" src={currentCasinoImage} alt={'Casino Image'} fill/>
          </div>
        </div>
      </div>
    );
  }, [currentCasinoImage, setValue]);

  useEffect(() => {
    if (card) {
      if (card.options && Array.isArray(card.options)) {
        setCardOptions(card.options as {option_id: number, value: string}[]);
      }
      if (card.icon_card_images && Array.isArray(card.icon_card_images)) {
        setCardIconImages(card.icon_card_images as {icon_card_image_id: number}[]);
      }
      if (card.faqs && Array.isArray(card.faqs)) {
        setCardFaqs(card.faqs as {faq_id: number, position: number}[]);
      }
    }
  }, [card]);




  const handleCasinoImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _files = Array.from(e.target.files);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCasinoImage(reader.result as string);
      };
      reader.readAsDataURL(_files[0]);

      setCasinoImage(_files[0]);
    }
  };


  const handleFormSubmit = async (data: FormData) => {
    try {
      if (newCasinoImage && newCasinoImage.length) {
        data.newCasinoImage = newCasinoImage;
      }

      const formData = {
        ...data,
        type: CardType.casino,
        options: cardOptions,
        icon_card_images: cardIconImages,
        faqs: cardFaqs
      };

      await onSubmit(formData);
    } catch  {
        toast.error('Failed to save card item');
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
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
          {/* Tab Content */}
          <div className="pt-4">
            <TabContent id="form">
              <div className="space-y-4">

                  <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Image</label>
                      {renderCasinoImage}
                      <CustomFileSelector
                          accept="image/*"
                          onChange={handleCasinoImageSelected}
                      />
                      <ImagePreview images={casinoImage ? [casinoImage] : []} />
                      {errors?.casino_image && <p className="text-red-500">{errors?.casino_image?.message as string}</p>}
                  </div>

                <CustomInput field={'published'} label={'Published'} register={register} errors={errors} type="checkbox" />

                <CustomSelect
                  label={'Category Card'}
                  field={'category_card_id'}
                  options={(categoryCards?.map(categoryCard => ({value: categoryCard.id, label: categoryCard.label})) || [])}
                  registerAttr={{valueAsNumber: true}}
                  register={register}
                  errors={errors}
                />

                <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />
                <CustomInput field={'terms_and_condition'} label={'Terms and condition'} register={register} errors={errors} type="textarea" />
                <EnumSelect field={'good_selection_of_games'} label={'Good selection of games'} register={register} errors={errors} elements={CardColor} />
                <EnumSelect field={'no_game_provider_filter'} label={'No game provider filter'} register={register} errors={errors} elements={CardColor} />
                <EnumSelect field={'live_chat_available_only_after_registration'} label={'Live chat available only after registration'} register={register} errors={errors} elements={CardColor} />
                <CustomInput field={'referral_key'} label={'Referral Key'} register={register} errors={errors} />
                <CustomInput field={'referral_btn_1_link'} label={'Referral Button 1 Link'} register={register} errors={errors} />
                <CustomInput field={'referral_btn_2_link'} label={'Referral Button 2 Link'} register={register} errors={errors} />
                <CustomInput field={'position'} label={'Position'} register={register} registerAttr={{valueAsNumber:true}} errors={errors} type="number" />
              </div>
            </TabContent>

            <TabContent id="options">
              <CardOptions
                options={options}
                iconCards={iconCards}
                cardOptions={cardOptions}
                setCardOptions={setCardOptions}
                cardIconImages={cardIconImages}
                setCardIconImages={setCardIconImages}
              />
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
