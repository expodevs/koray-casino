"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { cartCreateSchema, cartUpdateSchema } from "@app/admin/cards/cart/validation";
import React, { useEffect } from "react";
import { Card, CategoryCard } from "@/@types/response";
import CustomInput from "@components/CustomInput";
import { useRequestData } from "@lib/request";
import { CardType } from "@prismaClient";
import { routeAdminApiCategoryCards } from "@lib/adminRoute";
import CustomSelect from "@components/CustomSelect";

interface CartFormProps {
  card?: Card;
  onSubmit: (data: unknown) => void;
}

type FormData = z.infer<typeof cartCreateSchema>;

export default function CartForm({ card, onSubmit }: CartFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(card ? cartUpdateSchema : cartCreateSchema),
    defaultValues: {
      label: card?.label || '',
      published: card?.published || false,
      category_card_id: card?.category_card_id?.toString() || '',
      description: card?.description || '',
      referral_key: card?.referral_key || '',
      referral_btn_1_link: card?.referral_btn_1_link || '',
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
      setValue('position', card.position?.toString() || '');
    }
  }, [card, setValue]);

  const { data: categoryCards, isLoading: isLoadingCategoryCards } = useRequestData<CategoryCard[]>({
    url: routeAdminApiCategoryCards.pageBuilder,
    queryKey: 'categoryCards'
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      // Set the type to CardType.cart before submitting
      const formData = {
        ...data,
        type: CardType.cart
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
        toast.error('Failed to save cart item');
      }
    }
  };

  if (isLoadingCategoryCards) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
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
          <CustomInput field={'position'} label={'Position'} register={register} errors={errors} type="number" />

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
