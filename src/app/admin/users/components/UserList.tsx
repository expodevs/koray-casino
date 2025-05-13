"use client";
import {useState} from "react";
import {FaEdit, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import Link from "next/link";
import {ApiResponse, UserRow} from "@/@types/response";
import {useRouter} from "next/navigation";
import Pagination from "@components/Pagination";
import {useRequestData} from "@lib/request";
import {routeAdminApiUsers, routeAdminPageUsers} from "@lib/adminRoute";

export default function UserList() {
    const route = useRouter();
    const [page, setPage] = useState(1);
    const limit = 25;

    const {
        data,
        isLoading: loading,
        isError
    } = useRequestData<ApiResponse<UserRow>>({
        url: `${routeAdminApiUsers.all}?page=${page}&limit=${limit}`,
        queryKey: ['users', page, limit]
    });


    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;

        try {
            const res = await fetch(`${routeAdminApiUsers.all}?id=${id}`, {method: "DELETE"});

            if (!res.ok) throw new Error();

            toast.success("User deleted successfully");

            route.refresh()
        } catch (error: unknown | { message: string }) {
            toast.error(error?.message || 'Unknown error');
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-end items-center">
                <Link href={routeAdminPageUsers.create}>
                    <button className="ml-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create User
                    </button>
                </Link>
            </div>

            {loading && <div>Loading...</div>}
            {isError && <div className="text-red-500">Failed to load data</div>}
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
                                <Link href={routeAdminPageUsers.edit(user.id)}>
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
                <Pagination page={page} total={data?.meta.totalPages || 1} setPageCallback={setPage}/>
            </>)}
        </div>
    );
}