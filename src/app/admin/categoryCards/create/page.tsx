"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/categoryCards/components/EntityForm';
import {routeAdminApiCategoryCards, routeAdminPageCategoryCards} from "@lib/adminRoute";
import {z} from "zod";
import {categoryCardCreateSchema} from "@app/admin/categoryCards/validation";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof categoryCardCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiCategoryCards.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity');
            }

            router.push(routeAdminPageCategoryCards.all);
        } catch  {
            toast.error('Failed to create entity');
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Category card</h1>
            <EntityForm onSubmit={handleSubmit}  />
        </div>
    );
}
