"use client";
import {useEffect, useState} from "react";
import {FaEdit, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import Link from "next/link";
import {ApiResponse, UserRow} from "@/@types/response";
import {useRouter} from "next/navigation";
import Pagination from "@components/Pagination";




export default function UserList() {
    const [data, setData] = useState<ApiResponse<UserRow> | null>(null);
    const [page, setPage] = useState(1);
    const limit = 25;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const json: ApiResponse<UserRow> = await res.json();
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

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;

        try {
            const res = await fetch(`/api/admin/users?id=${id}`, {method: "DELETE"});

            if (!res.ok) throw new Error();

            toast.success("User deleted successfully");
            fetchData();
        } catch (error: unknown | { message: string }) {
            toast.error(error?.message || 'Unknown error');
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-end items-center">
                <Link href="/admin/users/create">
                    <button className="ml-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create User
                    </button>
                </Link>
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">Failed to load data</div>}
            {!data?.data.length && !loading && <div>No users found</div>}

            {data?.data.length && !loading && (<>
                <table className="w-full bg-white shadow-md rounded">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Created</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.data.map((user) => (
                        <tr key={user.id} className="border-b">
                            <td className="p-3">{user.name || "-"}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 flex gap-2">
                                <Link href={`/admin/users/${user.id}/edit`}>
                                    <FaEdit className="text-blue-500 cursor-pointer"/>
                                </Link>
                                <FaTrash
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => handleDelete(user.id)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination page={page} total={data?.meta.totalPages || 1} setPageCallback={setPage} />

            </>)}
        </div>
    );
}
