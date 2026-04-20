"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, ChevronRight, Key, Database, Box } from "lucide-react";

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

import { IProjectManifestService } from "../../types/projectService.type";

interface ProjectServicesNavProps {
    base: string;
    services: IProjectManifestService[];
}

export function ProjectServicesNav({ base, services }: ProjectServicesNavProps) {
    const pathname = usePathname();

    const groupActive = pathname.includes("/services");

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Services</SidebarGroupLabel>

            <SidebarMenu>
                <Collapsible defaultOpen={groupActive} className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton isActive={groupActive}>
                                <Boxes className="h-4 w-4" />
                                <span>Services</span>

                                <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {/* Overview */}
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={
                                            pathname === `${base}/services` ||
                                            pathname === `${base}/services/`
                                        }
                                    >
                                        <Link href={`${base}/services`}>
                                            <span>Overview</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Dynamic Services */}
                                {services.map((service) => {
                                    const href = `${base}/services?tab=${service.key}`;

                                    const active =
                                        pathname === href || pathname.startsWith(`${href}/`);

                                    return (
                                        <SidebarMenuSubItem key={service.key}>
                                            <SidebarMenuSubButton asChild isActive={active}>
                                                <Link
                                                    href={href}
                                                    className="flex items-center gap-2"
                                                >
                                                    {/* <ServiceStatusIcon status={service.service_name} /> */}

                                                    <span className="truncate">{service.name}</span>

                                                    {/* <span
                                                        className={cn(
                                                            "ml-auto rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide",
                                                            service.plan === "free" &&
                                                                "bg-muted text-muted-foreground",
                                                            service.plan === "pro" &&
                                                                "bg-primary/10 text-primary",
                                                            service.plan === "enterprise" &&
                                                                "bg-green-500/10 text-green-600",
                                                        )}
                                                    >
                                                        {service.plan}
                                                    </span> */}
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    );
                                })}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    );
}

function ServiceStatusIcon({ status }: { status: string }) {
    switch (status) {
        case "Key":
            return <Key className="h-3.5 w-3.5 text-green-500" />;

        case "Database":
            return <Database className="h-3.5 w-3.5 text-yellow-500" />;

        case "Box":
            return <Box className="h-3.5 w-3.5 text-red-500" />;

        default:
            return <Boxes className="h-3.5 w-3.5 text-muted-foreground" />;
    }
}
