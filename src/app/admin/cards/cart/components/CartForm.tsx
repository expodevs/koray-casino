"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { cartCreateSchema, cartUpdateSchema } from "@app/admin/cards/cart/validation";
import React, { useEffect } from "react";
import { Card } from "@/@types/response";
import CustomInput from "@components/CustomInput";
import { CardType } from "@prismaClient";

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
      published: card ? Boolean(card.published) : false,
      description: card?.description || '',
      referral_key: card?.referral_key || '',
      referral_btn_1_link: card?.referral_btn_1_link || '',
    },
  });

  useEffect(() => {
    if (card) {
      setValue('label', card.label);
      setValue('published', Boolean(card.published));
      setValue('description', card.description || '');
      setValue('referral_key', card.referral_key);
      setValue('referral_btn_1_link', card.referral_btn_1_link || '');
    }
  }, [card, setValue]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      const formData = {
        ...data,
        type: CardType.cart
      };

      await onSubmit(formData);
    } catch  {
        toast.error('Failed to save cart item');
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
        <div className="space-y-4">
          <CustomInput field={'published'} label={'Published'} register={register} errors={errors} type="checkbox" />


          <CustomInput field={'label'} label={'Label'} register={register} errors={errors} />
          <CustomInput field={'description'} label={'Description'} register={register} errors={errors} type="textarea" />
          <CustomInput field={'referral_key'} label={'Referral Key'} register={register} errors={errors} />
          <CustomInput field={'referral_btn_1_link'} label={'Referral Link'} register={register} errors={errors} />

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
