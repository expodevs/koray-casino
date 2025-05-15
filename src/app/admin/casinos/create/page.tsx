"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/casinos/components/EntityForm';
import {routeAdminApiCasinos, routeAdminPageCasinos} from "@lib/adminRoute";

export default function CreateEntity() {
    const router = useRouter();

    const handleSubmit = async (data: unknown) => {
        try {
            const response = await fetch(routeAdminApiCasinos.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity item');
            }

            toast.success('Casino created successfully');
            router.push(routeAdminPageCasinos.all);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Casino</h1>
            <EntityForm onSubmit={handleSubmit} />
        </div>
    );
}
