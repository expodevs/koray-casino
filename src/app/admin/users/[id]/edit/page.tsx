"use client";

import {useParams, useRouter} from "next/navigation";
import {toast} from "react-toastify";
import UserForm from "../../components/UserForm";
import { useRequestData } from "@lib/request";
import {routeAdminPageUsers, routeAdminApiUsers} from "@lib/adminRoute";
import {z} from "zod";
import {userCreateSchema, userUpdateSchema} from "@app/admin/users/validation";
import {User} from "@/@types/response";
import {UserRole} from "@prismaClient";

interface ExtendedUser extends User {
    id: string;
    role: UserRole;
}

export default function EditUserPage() {
    const {id} = useParams<{ id: string }>();
    const router = useRouter();

    const {data:user, isLoading} = useRequestData<ExtendedUser|undefined>({url: routeAdminApiUsers.one(id)});

    const handleSubmit = async (data: z.infer<typeof userCreateSchema> | z.infer<typeof userUpdateSchema>) => {
        try {
            const response = await fetch(routeAdminApiUsers.all, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update user");
            }

            toast.success("User updated successfully");
            router.push(routeAdminPageUsers.all);
        } catch  {
            toast.error("Failed to update user");
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Edit User</h1>
            <UserForm user={user} onSubmit={handleSubmit}/>
        </div>
    );
}
