"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/iconCardImages/components/EntityForm';
import React from "react";
import {IconCardSelect} from "@/@types/response";
import {useRequestData} from "@lib/request";
import {routeAdminApiIconCardImages, routeAdminApiIconCards, routeAdminPageIconCardImages} from "@lib/adminRoute";
import {z} from "zod";
import {iconCardImageCreateSchema} from "@app/admin/iconCardImages/validation";




export default function CreateEntity() {
    const router = useRouter();

    const { data: iconCards, isLoading } = useRequestData<IconCardSelect[]>({url:routeAdminApiIconCards.select});

    const handleSubmit = async (data: z.infer<typeof iconCardImageCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiIconCardImages.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity');
            }

            router.push(routeAdminPageIconCardImages.all);
        } catch  {
            toast.error('Failed to create entity');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Icon card image</h1>
            <EntityForm onSubmit={handleSubmit} iconCards={iconCards??[]} />
        </div>
    );
}
