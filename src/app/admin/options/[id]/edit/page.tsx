'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/options/components/EntityForm";
import {Option} from "@/@types/response";
import {useRequestData} from "@lib/request";
import {routeAdminApiOptions, routeAdminPageOptions} from "@lib/adminRoute";
import {z} from "zod";
import {optionCreateSchema} from "@app/admin/options/validation";

export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const {data:entity, isLoading} = useRequestData<Option>({url: routeAdminApiOptions.one(id)});


    const handleSubmit = async (data: z.infer<typeof optionCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiOptions.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity item');
            }

            router.push(routeAdminPageOptions.all);
        } catch  {
            toast.error('Failed to update entity item');
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
