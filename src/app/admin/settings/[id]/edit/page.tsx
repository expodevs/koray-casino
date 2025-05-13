'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import SettingForm from "@app/admin/settings/components/SettingForm";
import { Setting } from "@/@types/response";

export default function EditSettingPage() {
    const { id } = useParams<{ id: string }>();
    const [setting, setSetting] = useState<Setting | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const response = await fetch(`/api/admin/settings/${id}`);
                if (!response.ok) throw new Error('Setting item not found');
                const data = await response.json();
                setSetting(data);
            } catch (error) {
                toast.error('Failed to load setting item');
                router.push('/admin/settings');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSetting();
        }
    }, [id, router]);


    const handleSubmit = async (data: any) => {
        try {

            const response = await fetch(`/api/admin/settings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update setting item');
            }

            router.push('/admin/settings');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Setting Item</h1>
            <SettingForm setting={setting} onSubmit={handleSubmit} />
        </div>
    );
}
