'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/faqs/components/EntityForm";
import {Faq} from "@/@types/response";
import {routeAdminApiFaqs, routeAdminPageFaqs} from "@lib/adminRoute";
import {useRequestData} from "@lib/request";

export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const {data:entity, isLoading} = useRequestData<Faq>({url: routeAdminApiFaqs.one(id)});

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(routeAdminApiFaqs.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity');
            }

            router.push(routeAdminPageFaqs.all);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit FAQ</h1>
            <EntityForm entity={entity} onSubmit={handleSubmit} />
        </div>
    );
}
