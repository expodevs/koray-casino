"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import MenuForm from '../components/MenuForm';

import {Menu} from "@/@types/response";
import {routeAdminApiMenus, routeAdminPageMenus} from "@lib/adminRoute";
import {useRequestData} from "@lib/request";
import {z} from "zod";
import {menuCreateSchema} from "@app/admin/menus/validation";

export default function CreateEntity() {
    const router = useRouter();
    const {data:menuParents, isLoading} = useRequestData<Menu[]>({url: routeAdminApiMenus.parents});

    const handleSubmit = async (data: z.infer<typeof menuCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiMenus.all, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create menu item');
            }

            router.push(routeAdminPageMenus.all);
        } catch  {
            toast.error('Failed to create menu item');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Menu Item</h1>
            <MenuForm onSubmit={handleSubmit} menuParents={menuParents||[]} />
        </div>
    );
}
