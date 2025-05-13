"use client";

import UserList from "@app/admin/users/components/UserList";

export default function UsersPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Users Management</h1>
            <UserList/>
        </div>
    );
}