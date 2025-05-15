'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/casinos/components/EntityForm";
import {Casino} from "@/@types/response";
import {useRequestData} from "@lib/request";
import {routeAdminApiCasinos, routeAdminPageCasinos} from "@lib/adminRoute";

export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const {data:entity, isLoading} = useRequestData<Casino>({url: routeAdminApiCasinos.one(id)});

    const handleSubmit = async (data: unknown) => {
        try {
            const response = await fetch(routeAdminApiCasinos.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity item');
            }

            toast.success('Casino updated successfully');

            // Check if options were added
            const hasOptions = data && typeof data === 'object' && 'options' in data && Array.isArray(data.options) && data.options.length > 0;

            // Stay on the edit page if options were added, otherwise go to the casino list page
            if (hasOptions) {
                // Refresh the current page to show the updated data
                router.refresh();
            } else {
                router.push(routeAdminPageCasinos.all);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Casino</h1>
            <EntityForm entity={entity} onSubmit={handleSubmit} />
        </div>
    );
}
