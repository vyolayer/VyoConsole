"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Settings, ChevronRight, KeyRound, ShieldAlert } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function ProjectSettingsNav({ base }: { base: string }) {
    const pathname = usePathname();

    const active = pathname.includes("/settings");

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>

            <SidebarMenu>
                <Collapsible defaultOpen={active} className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                <Settings />
                                <span>Settings</span>

                                <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild>
                                        <Link href={`${base}/settings`}>General</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild>
                                        <Link href={`${base}/settings?tab=api-keys`}>
                                            <KeyRound className="h-4 w-4" />
                                            API Keys
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild className="text-destructive">
                                        <Link href={`${base}/settings?tab=danger-zone`}>
                                            <ShieldAlert className="h-4 w-4" />
                                            Danger Zone
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    );
}
