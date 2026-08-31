'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Pagination from '@components/Pagination';
import { useRequestData } from '@lib/request';
import { routeAdminApiRequests, routeAdminPageRequests } from '@lib/adminRoute';

type ContactRequest = {
    id: number;
    name: string;
    email: string;
    message: string;
    status: string;
    source: string | null;
    answer: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
};

type ApiResponse<T> = {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

const statusLabel = (status: string) => {
    if (status === 'in_progress') return 'In progress';
    if (status === 'closed') return 'Closed';
    return 'New';
};

const statusClass = (status: string) => {
    if (status === 'in_progress') return 'bg-yellow-100 text-yellow-800';
    if (status === 'closed') return 'bg-gray-200 text-gray-700';
    return 'bg-green-100 text-green-700';
};

export default function RequestList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const limit = 25;

    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (search.trim()) query.set('q', search.trim());
    if (status) query.set('status', status);

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useRequestData<ApiResponse<ContactRequest>>({
        url: `${routeAdminApiRequests.all}?${query.toString()}`,
        queryKey: ['contactRequests', String(page), String(limit), search, status],
    });

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this request?')) return;

        try {
            const response = await fetch(routeAdminApiRequests.one(String(id)), {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error();

            toast.success('Request deleted');
            await refetch();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <div className="mb-5 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">
                <input
                    type="search"
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(1);
                    }}
                    placeholder="Search name, email or message..."
                    className="w-full border rounded px-3 py-2"
                />

                <select
                    value={status}
                    onChange={(event) => {
                        setStatus(event.target.value);
                        setPage(1);
                    }}
                    className="w-full border rounded px-3 py-2 bg-white"
                >
                    <option value="">All statuses</option>
                    <option value="new">New</option>
                    <option value="in_progress">In progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-red-500">Failed to load requests</p>}

            {!isLoading && data && (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white shadow-md rounded">
                            <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3">ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Message</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Created</th>
                                <th className="p-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.data.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50 align-top">
                                    <td className="p-3">{item.id}</td>
                                    <td className="p-3 font-medium">{item.name}</td>
                                    <td className="p-3">{item.email}</td>
                                    <td className="p-3 max-w-md">
                                        <div title={item.message}>
                                            {item.message.length > 140
                                                ? `${item.message.slice(0, 140)}…`
                                                : item.message}
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${statusClass(item.status)}`}>
                                            {statusLabel(item.status)}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        {new Date(item.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={routeAdminPageRequests.edit(String(item.id))}
                                                className="text-blue-500"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {!data.data.length && (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                        Total: {data.meta.total}
                    </div>

                    <Pagination
                        page={page}
                        total={data.meta.totalPages || 1}
                        setPageCallback={setPage}
                    />
                </>
            )}
        </div>
    );
}
