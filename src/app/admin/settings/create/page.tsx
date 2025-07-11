"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SettingForm from '@app/admin/settings/components/SettingForm';
import {routeAdminApiSettings, routeAdminPageSettings} from "@lib/adminRoute";
import {z} from "zod";
import {settingCreateSchema} from "@app/admin/settings/validation";

export default function CreateEntity() {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof settingCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiSettings.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create setting item');
            }

            router.push(routeAdminPageSettings.all);
        } catch  {
            toast.error('Failed to create setting item');
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Setting Item</h1>
            <SettingForm onSubmit={handleSubmit}  />
        </div>
    );
}
