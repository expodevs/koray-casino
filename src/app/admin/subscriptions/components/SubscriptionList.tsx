'use client';

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Pagination from '@components/Pagination';
import { useRequestData } from '@lib/request';
import { routeAdminApiSubscriptions } from '@lib/adminRoute';

type Subscription = {
    id: number;
    email: string;
    source: string | null;
    is_active: boolean;
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

export default function SubscriptionList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [active, setActive] = useState('');
    const limit = 25;

    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (search.trim()) query.set('q', search.trim());
    if (active) query.set('active', active);

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useRequestData<ApiResponse<Subscription>>({
        url: `${routeAdminApiSubscriptions.all}?${query.toString()}`,
        queryKey: ['subscriptions', String(page), String(limit), search, active],
    });

    const toggleActive = async (item: Subscription) => {
        try {
            const response = await fetch(routeAdminApiSubscriptions.one(String(item.id)), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_active: !item.is_active }),
            });

            if (!response.ok) throw new Error();

            toast.success(item.is_active ? 'Subscription deactivated' : 'Subscription activated');
            await refetch();
        } catch {
            toast.error('Failed to update subscription');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this subscription?')) return;

        try {
            const response = await fetch(routeAdminApiSubscriptions.one(String(id)), {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error();

            toast.success('Subscription deleted');
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
                    placeholder="Search email or source..."
                    className="w-full border rounded px-3 py-2"
                />

                <select
                    value={active}
                    onChange={(event) => {
                        setActive(event.target.value);
                        setPage(1);
                    }}
                    className="w-full border rounded px-3 py-2 bg-white"
                >
                    <option value="">All statuses</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>

            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-red-500">Failed to load subscriptions</p>}

            {!isLoading && data && (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white shadow-md rounded">
                            <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3">ID</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Source</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Created</th>
                                <th className="p-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.data.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{item.id}</td>
                                    <td className="p-3 font-medium">{item.email}</td>
                                    <td className="p-3">{item.source || '-'}</td>
                                    <td className="p-3">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                                                item.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            {item.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        {new Date(item.created_at).toLocaleString()}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => toggleActive(item)}
                                                className="text-blue-600 hover:underline whitespace-nowrap"
                                            >
                                                {item.is_active ? 'Deactivate' : 'Activate'}
                                            </button>
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
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No subscriptions found.
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
