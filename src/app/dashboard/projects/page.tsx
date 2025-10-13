
"use client";

import { useUsers } from "@/hooks/use-users";
import AssignProject from "@/components/admin/assign-project";

export default function AssignProjectPage() {
    const { users } = useUsers();
    const managers = users.filter(u => u.role === 'manager');

    return (
        <AssignProject managers={managers} />
    )
}
