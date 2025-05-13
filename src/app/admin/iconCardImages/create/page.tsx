"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EntityForm from '@app/admin/iconCardImages/components/EntityForm';
import React from "react";
import {IconCardSelect} from "@/@types/response";
import { useQuery } from '@tanstack/react-query';




export default function CreateEntity() {
    const router = useRouter();

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
            const response = await fetch('/api/admin/iconCardImages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create entity');
            }

            router.push(`/admin/iconCardImages`);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create Icon card image</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && <EntityForm onSubmit={handleSubmit} iconCards={iconCards} />}
        </div>
    );
}
