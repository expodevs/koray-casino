"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/options/components/EntityForm';
import {routeAdminApiOptions, routeAdminPageOptions} from "@lib/adminRoute";
import {z} from "zod";
import {optionCreateSchema} from "@app/admin/options/validation";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof optionCreateSchema>) => {
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
        } catch  {
            toast.error('Failed to create entity item');
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Option Item</h1>
            <EntityForm onSubmit={handleSubmit}  />
        </div>
    );
}
