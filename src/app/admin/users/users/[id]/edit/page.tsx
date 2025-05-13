"use client";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {toast} from "react-toastify";
import UserForm from "../../components/UserForm";

export default function EditUserPage() {
    const {id} = useParams();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/admin/users/${id}`);
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (data: any) => {
        const response = await fetch(`/api/admin/users`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            toast.error("Failed to update user");
            return
        }
        toast.success("User updated successfully");
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit User</h1>
            <UserForm user={user} onSubmit={handleSubmit}/>
        </div>
    );
}
