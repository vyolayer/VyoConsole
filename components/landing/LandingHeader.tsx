"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { HeaderLayer } from "../header/HeaderLayer";
import { LogInIcon, UserPlus2 } from "lucide-react";

export function LandingHeader() {
    return (
        <HeaderLayer>
            <div className="flex w-full max-w-7xl justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <Logo classname="-mb-1" />
                    <h1 className="text-xl font-bold tracking-tight text-primary">VyoLayer</h1>
                </Link>

                <div className="space-x-4">
                    <Link href="/auth/register">
                        <Button size="xl">
                            <UserPlus2 className="size-3.5 mr-1" /> Create Account
                        </Button>
                    </Link>
                    <Link href="/auth/login">
                        <Button size="xl" variant="outline">
                            <LogInIcon className="size-3.5 mr-1" /> Login
                        </Button>
                    </Link>
                </div>
            </div>
        </HeaderLayer>
    );
}
