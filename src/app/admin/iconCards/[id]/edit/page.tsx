'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/iconCards/components/EntityForm";
import { iconCard } from "@/@types/response";

export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const [entity, setEntity] = useState<iconCard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOption = async () => {
            try {
                const response = await fetch(`/api/admin/iconCards/${id}`);
                if (!response.ok) throw new Error('Category Card not found');
                const data = await response.json();
                setEntity(data);
            } catch (error) {
                toast.error('Failed to load entity item');
                router.push('/admin/iconCards');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOption();
        }
    }, [id, router]);


    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(`/api/admin/iconCards/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity');
            }

            router.push('/admin/iconCards');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Category Card</h1>
            <EntityForm entity={entity} onSubmit={handleSubmit} />
        </div>
    );
}
