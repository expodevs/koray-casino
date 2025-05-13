"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import MenuForm from '../components/MenuForm';
import {useEffect, useState} from "react";
import {Menu} from "@/@types/response";

export default function CreateEntity() {

    const [menuParents, setMenuParents] = useState<Menu[] | null>(null);

    useEffect(() => {
        const fetchMenuParents = async () => {
            try {
                const res = await fetch(`/api/admin/menus/parent`);
                const data = await res.json();
                setMenuParents(data.data);
            } catch (error) {
                toast.error('Failed to load menu parents');
            }
        };
        fetchMenuParents();
    }, []);

    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch('/api/admin/menus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create menu item');
            }

            router.push('/admin/menus');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Menu Item</h1>
            <MenuForm onSubmit={handleSubmit} menuParents={menuParents||[]} />
        </div>
    );
}
