'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/casinoOptions/components/EntityForm";
import {Option} from "@/@types/response";
import {useRequestData} from "@lib/request";
import {routeAdminApiCasinoOptions, routeAdminPageCasinoOptions} from "@lib/adminRoute";

export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const {data:entity, isLoading} = useRequestData<Option>({url: routeAdminApiCasinoOptions.one(id)});


    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(routeAdminApiCasinoOptions.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity item');
            }

            router.push(routeAdminPageCasinoOptions.all);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Option Item</h1>
            <EntityForm entity={entity} onSubmit={handleSubmit} />
        </div>
    );
}
