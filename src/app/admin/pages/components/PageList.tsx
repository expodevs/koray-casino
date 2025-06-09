'use client';

import {  useState } from 'react';
import {ApiResponse, Page} from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";
import {useRequestData} from "@lib/request";
import {routeAdminApiPages, routeAdminPagePages} from "@lib/adminRoute";
import Link from "next/link";

export default function PageList() {
    const [page, setPage] = useState(1);
    const limit = 25;

    const {
        data,
        isLoading: loading,
        isError,
        refetch,
    } = useRequestData<ApiResponse<Page>>({
        url: `${routeAdminApiPages.all}?page=${page}&limit=${limit}`,
        queryKey: ['pages', page, limit]
    });

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            const res = await fetch(routeAdminApiPages.one(id.toString()), {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('Page deleted');
            await refetch();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-end items-center">
            <Link
                href={routeAdminPagePages.create}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
                Create Page
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
                            <th className="p-3">Slug</th>
                            <th className="p-3">Published</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((page) => (
                            <tr key={page.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{page.id}</td>
                                <td className="p-3">{page.label}</td>
                                <td className="p-3">{page.slug}</td>
                                <td className="p-3">{page.published ? '✅' : '❌'}</td>
                                <td className="p-3 flex gap-2">
                                    <Link
                                        href={routeAdminPagePages.edit(page.id.toString())}
                                        className="text-blue-500"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(page.id)}
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

