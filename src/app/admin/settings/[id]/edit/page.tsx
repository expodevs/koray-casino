'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import SettingForm from "@app/admin/settings/components/SettingForm";
import { Setting } from "@/@types/response";
import {routeAdminApiSettings, routeAdminPageSettings} from "@lib/adminRoute";
import {useRequestData} from "@lib/request";

export default function EditSettingPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const {data:setting, isLoading} = useRequestData<Setting>({url: routeAdminApiSettings.one(id)});


    const handleSubmit = async (data: any) => {
        try {

            const response = await fetch(routeAdminApiSettings.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update setting item');
            }

            router.push(routeAdminPageSettings.all);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Setting Item</h1>
            <SettingForm setting={setting} onSubmit={handleSubmit} />
        </div>
    );
}
