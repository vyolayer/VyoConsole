"use client";

import Link from "next/link";
import { HeaderLayer } from "@/components/header/HeaderLayer";
import { useUser } from "@/hooks/useUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserAvatar } from "@/components/UserAvatar";
import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
    SparklesIcon,
    HelpCircleIcon,
} from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogOut";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface ConsoleOrgHeaderProps {
    breadcrumbs: BreadcrumbItem[];
}

export function ConsoleOrgHeader({ breadcrumbs }: ConsoleOrgHeaderProps) {
    const user = useUser();
    const { logout } = useLogout();

    return (
        <HeaderLayer>
            <div className="flex w-full max-w-7xl justify-between items-center">
                {/* Left: Dynamic Breadcrumbs */}
                <Breadcrumb>
                    <BreadcrumbList className="text-lg font-medium tracking-wide">
                        <BreadcrumbItem>
                            <Link
                                href="/console"
                                className="text-[#00e5ff] hover:text-[#00e5ff]/80 transition-colors"
                            >
                                Console
                            </Link>
                        </BreadcrumbItem>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {crumb.href && i < breadcrumbs.length - 1 ? (
                                        <Link
                                            href={crumb.href}
                                            className="text-[#a1a1aa] hover:text-white transition-colors capitalize"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-white font-semibold">
                                            {crumb.label}
                                        </span>
                                    )}
                                </BreadcrumbItem>
                            </span>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Right: Actions */}
                <div className="flex items-center gap-6">
                    <BellIcon className="w-5 h-5 text-[#7b7b86] cursor-pointer hover:text-white transition-colors" />
                    <HelpCircleIcon className="w-5 h-5 text-[#7b7b86] cursor-pointer hover:text-white transition-colors" />

                    <DropdownMenu>
                        <DropdownMenuTrigger className="hover:cursor-pointer outline-none">
                            <div className="rounded-full border border-[#ffffff20] p-0.5 overflow-hidden transition-colors hover:border-[#00e5ff]">
                                <UserAvatar user={user} className="w-7 h-7" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56 rounded-lg bg-[#141418] border-[#ffffff10] text-[#a1a1aa]"
                            align="end"
                            sideOffset={8}
                        >
                            <DropdownMenuLabel className="p-2 font-normal text-white">
                                <div className="flex items-center gap-3 text-sm">
                                    <UserAvatar user={user} className="w-8 h-8" />
                                    <div className="grid flex-1 text-left leading-tight">
                                        <span className="truncate font-bold text-[#00e5ff]">
                                            {user.full_name}
                                        </span>
                                        <span className="truncate text-xs text-[#7b7b86]">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#ffffff10]" />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="hover:text-white hover:bg-[#ffffff05] cursor-pointer focus:bg-[#ffffff05] focus:text-white">
                                    <SparklesIcon className="mr-2 h-4 w-4" />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="bg-[#ffffff10]" />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="hover:text-white hover:bg-[#ffffff05] cursor-pointer focus:bg-[#ffffff05] focus:text-white">
                                    <BadgeCheckIcon className="mr-2 h-4 w-4" />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:text-white hover:bg-[#ffffff05] cursor-pointer focus:bg-[#ffffff05] focus:text-white">
                                    <CreditCardIcon className="mr-2 h-4 w-4" />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:text-white hover:bg-[#ffffff05] cursor-pointer focus:bg-[#ffffff05] focus:text-white">
                                    <BellIcon className="mr-2 h-4 w-4" />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="bg-[#ffffff10]" />
                            <DropdownMenuItem onClick={() => logout()} variant="destructive">
                                <LogOutIcon className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </HeaderLayer>
    );
}
