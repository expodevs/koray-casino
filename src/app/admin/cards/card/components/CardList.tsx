'use client';

import { useState } from 'react';
import { ApiResponse, Card } from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";
import { useRequestData } from "@lib/request";
import { routeAdminApiCards, routeAdminPageCards } from "@lib/adminRoute";
import Link from "next/link";

export default function CardList() {
    const [page, setPage] = useState(1);
    const limit = 25;

    const {
        data,
        isLoading: loading,
        isError,
        refetch,
    } = useRequestData<ApiResponse<Card>>({
        url: `${routeAdminApiCards.allCard}?page=${page}&limit=${limit}`,
        queryKey: ['cards-card', page, limit]
    });

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            const res = await fetch(routeAdminApiCards.oneCard(id.toString()), {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('Card deleted');
            await refetch();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-end items-center">
                <Link
                    href={routeAdminPageCards.createCard}
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
                >
                    Create Card
                </Link>
            </div>

            {loading && <p>Loading...</p>}
            {isError && <p className="text-red-500">Failed to load data</p>}

            {!loading && data && (
                <>
                    <table className="w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3">ID</th>
                                <th className="p-3">Label</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Referral Key</th>
                                <th className="p-3">Position</th>
                                <th className="p-3">Published</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((card) => (
                                <tr key={card.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{card.id}</td>
                                    <td className="p-3">{card.label}</td>
                                    <td className="p-3">{card.category_card?.label || '-'}</td>
                                    <td className="p-3">{card.referral_key}</td>
                                    <td className="p-3">{card.position || '-'}</td>
                                    <td className="p-3">{card.published ? '✅' : '❌'}</td>
                                    <td className="p-3 flex gap-2">
                                        <Link
                                            href={routeAdminPageCards.editCard(card.id.toString())}
                                            className="text-blue-500"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(card.id)}
                                            className="text-red-500"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination page={page} total={data?.meta.totalPages || 1} setPageCallback={setPage} />
                </>
            )}
        </div>
    );
}
