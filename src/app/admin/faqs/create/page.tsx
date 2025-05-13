"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/faqs/components/EntityForm';

export default function CreateFaqPage() {

    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch('/api/admin/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity');
            }

            router.push('/admin/faqs');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create FAQ</h1>
            <EntityForm onSubmit={handleSubmit}  />
        </div>
    );
}
