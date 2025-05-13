'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import PageForm from "@app/admin/pages/components/PageForm";
import { Page } from "@/@types/response";

export default function EditPagePage() {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await fetch(`/api/admin/pages/${id}`);
                if (!response.ok) throw new Error('Page item not found');
                const data = await response.json();
                setPage(data);
            } catch (error) {
                toast.error('Failed to load page item');
                router.push('/admin/pages');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPage();
        }
    }, [id, router]);


    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(`/api/admin/pages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update page item');
            }

            router.push('/admin/pages');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Page Item</h1>
            <PageForm page={page} onSubmit={handleSubmit} />
        </div>
    );
}
