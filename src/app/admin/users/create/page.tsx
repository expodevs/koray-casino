"use client";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import UserForm from "@app/admin/users/components/UserForm";
import {routeAdminApiUsers, routeAdminPageUsers} from "@lib/adminRoute";

export default function CreateUserPage() {
    const router = useRouter();

    const handleSubmit = async (data: unknown) => {
        try {
            const response = await fetch(routeAdminApiUsers.all, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create user");
            }

            toast.success("User created successfully");
            router.push(routeAdminPageUsers.all);
        } catch  {
            toast.error("Failed to create user");
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Create User</h1>
            <UserForm onSubmit={handleSubmit}/>
        </div>
    );
}
