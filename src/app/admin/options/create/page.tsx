"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/options/components/EntityForm';
import {routeAdminApiOptions, routeAdminPageOptions} from "@lib/adminRoute";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(routeAdminApiOptions.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity item');
            }

            router.push(routeAdminPageOptions.all);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Option Item</h1>
            <EntityForm onSubmit={handleSubmit}  />
        </div>
    );
}
