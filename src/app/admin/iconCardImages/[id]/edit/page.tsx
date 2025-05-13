'use client';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/iconCardImages/components/EntityForm";
import {IconCardImage, IconCardSelect} from "@/@types/response";
import {useQuery} from "@tanstack/react-query";


export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: entity, isLoading: isEntityLoading } = useQuery<IconCardImage|null>({
        queryKey: ['entity'],
        queryFn: async () => {
            const res = await fetch(`/api/admin/iconCardImages/${id}`);
            if (!res.ok) throw new Error('Error loading icon cards');
            return res.json();
        }
    });

    const { data: iconCards, isLoading } = useQuery<IconCardSelect[]>({
        queryKey: ['iconCards'],
        queryFn: async () => {
            const res = await fetch('/api/admin/iconCards/select');
            if (!res.ok) throw new Error('Error loading icon cards');
            return res.json();
        }
    });


    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(`/api/admin/iconCardImages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity');
            }

            router.push('/admin/iconCardImages');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (isEntityLoading || isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Icon Card Image</h1>
            <EntityForm entity={entity} iconCards={iconCards} onSubmit={handleSubmit} />
        </div>
    );
}
