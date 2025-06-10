'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/categoryCards/components/EntityForm";
import {CategoryCard} from "@/@types/response";
import {useRequestData} from "@lib/request";
import {routeAdminApiCategoryCards, routeAdminPageCategoryCards} from "@lib/adminRoute";
import {z} from "zod";
import {categoryCardCreateSchema} from "@app/admin/categoryCards/validation";

export default function EditEntity() {
    const { id } = useParams<{ id: string }>();

    const router = useRouter();
    const {data:entity, isLoading} = useRequestData<CategoryCard>({url: routeAdminApiCategoryCards.one(id)});


    const handleSubmit = async (data: z.infer<typeof categoryCardCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiCategoryCards.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity');
            }

            router.push(routeAdminPageCategoryCards.all);
        } catch  {
            toast.error('Unknown error');
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
