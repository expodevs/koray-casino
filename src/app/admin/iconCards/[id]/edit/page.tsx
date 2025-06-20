'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/iconCards/components/EntityForm";
import { IconCard } from "@/@types/response";
import { useRequestData } from '@lib/request';
import {routeAdminApiIconCards, routeAdminPageIconCards} from "@lib/adminRoute";
import {z} from "zod";
import {iconCardCreateSchema} from "@app/admin/iconCards/validation";

export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const {data:entity, isLoading} = useRequestData<IconCard>({url: routeAdminApiIconCards.one(id)});


    const handleSubmit = async (data: z.infer<typeof iconCardCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiIconCards.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity');
            }

            router.push(routeAdminPageIconCards.all);
        } catch {
            toast.error('Failed to update entity');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Category Card</h1>
            <EntityForm entity={entity} onSubmit={handleSubmit} />
        </div>
    );
}
