'use client';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from "@app/admin/iconCardImages/components/EntityForm";
import {IconCardImage, IconCardSelect} from "@/@types/response";
import {useRequestData} from "@lib/request";
import {routeAdminApiIconCardImages, routeAdminApiIconCards, routeAdminPageIconCardImages} from "@lib/adminRoute";


export default function EditEntity() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: entity, isLoading: isEntityLoading } = useRequestData<IconCardImage|null>({url: routeAdminApiIconCardImages.one(id)});
    const { data: iconCards, isLoading } = useRequestData<IconCardSelect[]>({url: routeAdminApiIconCards.select, queryKey: 'iconCards'});



    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(routeAdminApiIconCardImages.one(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update entity');
            }

            router.push(routeAdminPageIconCardImages.all);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (isEntityLoading || isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit Icon Card Image</h1>
            <EntityForm entity={entity} iconCards={iconCards??[]} onSubmit={handleSubmit} />
        </div>
    );
}
