'use client';

import React, {  useState } from 'react';
import {ApiResponse, IconCardImage,} from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";
import Image from "next/image";
import {useRequestData} from "@lib/request";
import {routeAdminApiIconCardImages, routeAdminPageIconCardImages} from "@lib/adminRoute";
import Link from "next/link";

export default function EntityList() {


    const [page, setPage] = useState(1);
    const limit = 25;

    const {
        data,
        isLoading: loading,
        isError,
        refetch
    } = useRequestData<ApiResponse<IconCardImage>>({
        url: `${routeAdminApiIconCardImages.all}?page=${page}&limit=${limit}`,
        queryKey: ['settings', page, limit]
    });

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            const res = await fetch(routeAdminApiIconCardImages.one(id.toString()), {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('Option deleted');
            await refetch();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-end items-center">
            <Link
                href={routeAdminPageIconCardImages.create}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
                Create Icon Card
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
                            <th className="p-3">Card</th>
                            <th className="p-3">Alt</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Position</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((iconCardImage) => (
                            <tr key={iconCardImage.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{iconCardImage.id}</td>
                                <td className="p-3">{iconCardImage.icon_card.label}</td>
                                <td className="p-3">{iconCardImage.alt}</td>
                                <td className="p-3">
                                    {(iconCardImage && iconCardImage.image.length > 0) &&
                                        <div>
                                            <div className="grid grid-cols-12 gap-2 my-2">
                                                <div className="relative aspect-video col-span-4">
                                                    <Image className="object-cover" src={iconCardImage.image}
                                                           alt={iconCardImage?.alt || ''} fill/>
                                                </div>
                                            </div>
                                        </div>}
                                </td>
                                <td className="p-3">{iconCardImage.position}</td>
                                <td className="p-3 flex gap-2">
                                    <Link
                                        href={routeAdminPageIconCardImages.edit(iconCardImage.id.toString())}
                                        className="text-blue-500"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(iconCardImage.id)}
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

