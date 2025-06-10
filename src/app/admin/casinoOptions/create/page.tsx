"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/casinoOptions/components/EntityForm';
import {routeAdminApiCasinoOptions, routeAdminPageCasinoOptions} from "@lib/adminRoute";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: unknown) => {
        try {
            const response = await fetch(routeAdminApiCasinoOptions.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity item');
            }

            router.push(routeAdminPageCasinoOptions.all);
        } catch (error: never) {
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
