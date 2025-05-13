'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiResponse, Menu } from '@/@types/response';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from "@components/Pagination";

export default function MenuList() {
    const [data, setData] = useState<ApiResponse<Menu> | null>(null);
    const [page, setPage] = useState(1);
    const limit = 25;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/admin/menus?page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const json: ApiResponse<Menu> = await res.json();
            setData(json);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
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
            const res = await fetch(`/api/admin/menus/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();

            toast.success('Menu deleted');
            fetchData();
        } catch {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="p-6">
            <button
                onClick={() => router.push('/admin/menus/create')}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
            >
                Create Menu
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
                            <th className="p-3">Link</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Position</th>
                            <th className="p-3">Published</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((menu) => (
                            <tr key={menu.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{menu.id}</td>
                                <td className="p-3">{menu.label}</td>
                                <td className="p-3">{menu.link}</td>
                                <td className="p-3">{menu.type}</td>
                                <td className="p-3">{menu.position}</td>
                                <td className="p-3">{menu.published ? '✅' : '❌'}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/menus/${menu.id}/edit`)}
                                        className="text-blue-500"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(menu.id)}
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

