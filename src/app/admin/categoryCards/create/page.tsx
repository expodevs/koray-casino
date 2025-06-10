"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/categoryCards/components/EntityForm';
import {routeAdminApiCategoryCards, routeAdminPageCategoryCards} from "@lib/adminRoute";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: FormData) => {
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
        } catch (error: unknown) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Category card</h1>
            <EntityForm onSubmit={handleSubmit}  />
        </div>
    );
}
