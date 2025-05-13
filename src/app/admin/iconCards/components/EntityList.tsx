'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiResponse, iconCard } from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";

export default function EntityList() {
    const [data, setData] = useState<ApiResponse<iconCard> | null>(null);
    const [page, setPage] = useState(1);
    const limit = 25;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/admin/iconCards?page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const json: ApiResponse<iconCard> = await res.json();
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
            const res = await fetch(`/api/admin/iconCards/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('Icon Card deleted');
            fetchData();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <button
                onClick={() => router.push('/admin/iconCards/create')}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
                Create Icon Card
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
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((iconCard) => (
                            <tr key={iconCard.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{iconCard.id}</td>
                                <td className="p-3">{iconCard.label}</td>
                                <td className="p-3">{iconCard.published ? '✅' : '❌'}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/iconCards/${iconCard.id}/edit`)}
                                        className="text-blue-500"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(iconCard.id)}
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

