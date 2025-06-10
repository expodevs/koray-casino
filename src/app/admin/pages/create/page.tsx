"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import PageForm from '@app/admin/pages/components/PageForm';
import {routeAdminApiPages, routeAdminPagePages} from "@lib/adminRoute";
import {z} from "zod";
import {pageCreateSchema} from "@app/admin/pages/validation";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof pageCreateSchema>) => {
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
        } catch  {
            toast.error('Failed to create page item');
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Page Item</h1>
            <PageForm onSubmit={handleSubmit}  />
        </div>
    );
}
