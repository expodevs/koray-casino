'use client';

import { useState } from 'react';

import {ApiResponse, Casino} from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";
import {routeAdminApiCasinos, routeAdminPageCasinos} from "@lib/adminRoute";
import {useRequestData} from "@lib/request";
import Link from "next/link";
import Image from "next/image";

export default function EntityList() {
    const [page, setPage] = useState(1);
    const limit = 25;

    const {
        data,
        isLoading: loading,
        isError,
        refetch,
    } = useRequestData<ApiResponse<Casino>>({
        url: `${routeAdminApiCasinos.all}?page=${page}&limit=${limit}`,
        queryKey: ['casinos', `${page}`, `${limit}`]
    });

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            const res = await fetch(routeAdminApiCasinos.one(id.toString()), {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('Casino deleted');
            await refetch();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-end items-center">
            <Link
                href={routeAdminPageCasinos.create}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
                Create Casino
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
                            <th className="p-3">Name</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Published</th>
                            <th className="p-3">Referral Key</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((casino) => (
                            <tr key={casino.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{casino.id}</td>
                                <td className="p-3">{casino.name}</td>
                                <td className="p-3">
                                    <div className="relative h-12 w-24">
                                        {casino.image && (
                                            <Image 
                                                src={casino.image} 
                                                alt={casino.name} 
                                                fill 
                                                className="object-contain"
                                            />
                                        )}
                                    </div>
                                </td>
                                <td className="p-3">{casino.published ? '✅' : '❌'}</td>
                                <td className="p-3">{casino.referral_key}</td>
                                <td className="p-3 flex gap-2">
                                    <Link
                                        href={routeAdminPageCasinos.edit(casino.id.toString())}
                                        className="text-blue-500"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(casino.id)}
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
