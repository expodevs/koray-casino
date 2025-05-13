'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiResponse, Option } from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";

export default function EntityList() {
    const [data, setData] = useState<ApiResponse<Option> | null>(null);
    const [page, setPage] = useState(1);
    const limit = 25;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/admin/options?page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const json: ApiResponse<Option> = await res.json();
            setData(json);
        } catch (err: unknown) {
            setError(err?.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            const res = await fetch(`/api/admin/options/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('Option deleted');
            fetchData();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <button
                onClick={() => router.push('/admin/options/create')}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
                Create Option
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && data && (
                <>
                    <table className="w-full bg-white shadow-md rounded">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3">ID</th>
                            <th className="p-3">Label</th>
                            <th className="p-3">Published</th>
                            <th className="p-3">Use For Filter</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((option) => (
                            <tr key={option.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{option.id}</td>
                                <td className="p-3">{option.label}</td>
                                <td className="p-3">{option.published ? '✅' : '❌'}</td>
                                <td className="p-3">{option.use_for_filter ? '✅' : '❌'}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/options/${option.id}/edit`)}
                                        className="text-blue-500"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(option.id)}
                                        className="text-red-500"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Pagination page={page} total={data?.meta.totalOptions || 1} setPageCallback={setPage} />
                </>
            )}
        </div>
    );
}

