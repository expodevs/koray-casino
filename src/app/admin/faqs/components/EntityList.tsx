'use client';

import {  useState } from 'react';
import {ApiResponse, Faq,} from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";
import Link from "next/link";
import {routeAdminApiFaqs, routeAdminPageFaqs} from "@lib/adminRoute";
import {useRequestData} from "@lib/request";

export default function EntityList() {

    const [page, setPage] = useState(1);
    const limit = 25;

    const {
        data,
        isLoading: loading,
        isError,
        refetch
    } = useRequestData<ApiResponse<Faq>>({
        url: `${routeAdminApiFaqs.all}?page=${page}&limit=${limit}`,
        queryKey: ['faqs', page, limit]
    });

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            const res = await fetch(`/api/admin/faqs/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('entity deleted');
            await refetch();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-end items-center">
            <Link
                href={routeAdminPageFaqs.create}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
                Create Faq
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
                            <th className="p-3">Question</th>
                            <th className="p-3">Answer</th>
                            <th className="p-3">Published</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((faq) => (
                            <tr key={faq.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{faq.id}</td>
                                <td className="p-3">{faq.question}</td>
                                <td className="p-3">{faq.answer}</td>
                                <td className="p-3">{faq.published ? '✅' : '❌'}</td>
                                <td className="p-3 flex gap-2">
                                    <Link
                                        href={routeAdminPageFaqs.edit(faq.id.toString())}
                                        className="text-blue-500"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
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

