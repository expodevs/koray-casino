"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import PageForm from '@app/admin/pages/components/PageForm';
import {routeAdminApiPages, routeAdminPagePages} from "@lib/adminRoute";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(routeAdminApiPages.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create page item');
            }

            router.push(routeAdminPagePages.all);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Page Item</h1>
            <PageForm onSubmit={handleSubmit}  />
        </div>
    );
}
