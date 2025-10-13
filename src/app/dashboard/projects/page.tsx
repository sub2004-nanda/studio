
"use client";

import { useUsers } from "@/hooks/use-users";
import AssignProject from "@/components/admin/assign-project";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function AssignProjectPage() {
    const { users } = useUsers();
    const managers = users.filter(u => u.role === 'manager');

    return (
        <div className="flex min-h-screen flex-col bg-muted/40 p-4 sm:p-6">
             <div className="mb-4">
                <Link href="/dashboard" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
            <AssignProject managers={managers} />
        </div>
    )
}
