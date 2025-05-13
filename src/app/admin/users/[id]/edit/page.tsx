"use client";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {toast} from "react-toastify";
import UserForm from "../../components/UserForm";

interface User {
    id: string;
    name: string | null;
    email: string;
    role: "admin" | "user";
}

export default function EditUserPage() {
    const {id} = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/users/${id}`);
                if (!response.ok) throw new Error("User not found");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                toast.error("Failed to load user");
                router.push("/admin/users");
            }
        };

        fetchUser();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(`/api/admin/users`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update user");
            }

            toast.success("User updated successfully");
            router.push("/admin/users");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit User</h1>
            <UserForm user={user} onSubmit={handleSubmit}/>
        </div>
    );
}
