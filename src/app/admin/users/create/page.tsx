"use client";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import UserForm from "@app/admin/users/components/UserForm";

export default function CreateUserPage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch("/api/admin/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create user");
            }

            toast.success("User created successfully");
            router.push("/admin/users");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create User</h1>
            <UserForm onSubmit={handleSubmit}/>
        </div>
    );
}
