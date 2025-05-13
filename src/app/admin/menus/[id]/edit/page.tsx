'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import MenuForm from "@app/admin/menus/components/MenuForm";
import { Menu } from "@/@types/response";

export default function EditMenuPage() {
    const { id } = useParams<{ id: string }>();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [menuParents, setMenuParents] = useState<Menu[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(`/api/admin/menus/${id}`);
                if (!response.ok) throw new Error('Menu item not found');
                const data = await response.json();
                setMenu(data);
            } catch (error) {
                toast.error('Failed to load menu item');
                router.push('/admin/menus');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMenu();
        }
    }, [id, router]);

    useEffect(() => {
        const fetchMenuParents = async () => {
            try {
                const res = await fetch(`/api/admin/menus/parent`);
                const data = await res.json();
                setMenuParents(data.data);
            } catch (error: unknown| {message: string}) {
                toast.error('Failed to load menu parents');
            }
        };

        if (id) {
            fetchMenuParents();
        }
    }, [id]);

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(`/api/admin/menus/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update menu item');
            }

            router.push('/admin/menus');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Menu Item</h1>
            <MenuForm menu={menu} menuParents={menuParents || []} onSubmit={handleSubmit} />
        </div>
    );
}
