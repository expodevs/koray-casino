'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import PageForm from "@app/admin/pages/components/PageForm";
import { Page } from "@/@types/response";
import {routeAdminApiPages, routeAdminPagePages} from "@lib/adminRoute";
import { useRequestData } from '@lib/request';

export default function EditPagePage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const {data:page, isLoading} = useRequestData<Page>({url: routeAdminApiPages.one(id)});

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(routeAdminApiPages.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update page item');
            }

            router.push(routeAdminPagePages.all);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Page Item</h1>
            <PageForm page={page} onSubmit={handleSubmit} />
        </div>
    );
}
