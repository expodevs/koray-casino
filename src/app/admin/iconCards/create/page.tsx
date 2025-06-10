"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/iconCards/components/EntityForm';
import {routeAdminApiIconCards, routeAdminPageIconCards} from "@lib/adminRoute";
import {z} from "zod";
import {iconCardCreateSchema} from "@app/admin/iconCards/validation";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof iconCardCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiIconCards.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity');
            }

            router.push(routeAdminPageIconCards.all);
        } catch  {
            toast.error('Failed to create entity');
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Icon card</h1>
            <EntityForm onSubmit={handleSubmit}  />
        </div>
    );
}
