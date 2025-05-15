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

            const casinoData = await response.json();
            toast.success('Casino created successfully');

            // Check if options were added
            const hasOptions = data && typeof data === 'object' && 'options' in data && Array.isArray(data.options) && data.options.length > 0;

            // Redirect to the casino options page if options were added, otherwise to the casino list page
            if (hasOptions && casinoData && casinoData.id) {
                router.push(routeAdminPageCasinos.edit(casinoData.id.toString()));
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

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Casino</h1>
            <EntityForm onSubmit={handleSubmit} />
        </div>
    );
}
