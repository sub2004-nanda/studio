
"use client";

import PerformanceOverview from "@/components/admin/performance-overview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PerformancePage() {

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
            <PerformanceOverview />
        </div>
    )
}
