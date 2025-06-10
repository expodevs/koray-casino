'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import MenuForm from "@app/admin/menus/components/MenuForm";
import { Menu } from "@/@types/response";
import {useRequestData} from "@lib/request";
import {routeAdminApiMenus, routeAdminPageMenus} from "@lib/adminRoute";
import {z} from "zod";
import {menuCreateSchema} from "@app/admin/menus/validation";

export default function EditMenuPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();


    const {data:menu, isLoading} = useRequestData<Menu>({url: routeAdminApiMenus.one(id)});
    const {data:menuParents, isLoading:isLoadingParent} = useRequestData<Menu[]>({url: routeAdminApiMenus.parents, queryKey: 'menuParents'});

    const handleSubmit = async (data: z.infer<typeof menuCreateSchema>) => {
        try {
            const response = await fetch(routeAdminApiMenus.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update menu item');
            }

            router.push(routeAdminPageMenus.all);
        } catch  {
            toast.error('Failed to update menu item');
        }
    };

    if (isLoading||isLoadingParent) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Menu Item</h1>
            <MenuForm menu={menu} menuParents={menuParents || []} onSubmit={handleSubmit} />
        </div>
    );
}
