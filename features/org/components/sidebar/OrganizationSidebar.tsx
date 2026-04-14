"use client";

import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";

import {
    ChevronRightIcon,
    FolderKanbanIcon,
    LayoutDashboardIcon,
    Loader2,
    PlusCircleIcon,
    SettingsIcon,
    ShieldIcon,
    UsersIcon,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavUser } from "@org/components/sidebar/NavUser";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { useUser } from "@/hooks/useUser";
import { useOrganizations } from "@org/hooks/useOrganizations";
import { useOrganizationBySlug, useSelectCurrentOrganization } from "@org/hooks/useOrganization";

import { PolicyGuard } from "@org/guards/PolicyGuard";

export function OrganizationSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const user = useUser();
    const { data, isLoading } = useOrganizations();
    const { orgSlug, setOrgSlug } = useSelectCurrentOrganization();
    const { isLoading: isOrgLoading } = useOrganizationBySlug();

    function onChangeOrg(orgSlug: string) {
        setOrgSlug(orgSlug);
        router.push(`/org/${orgSlug}`);
    }

    const organizations = data?.organizations || [];

    if (isLoading || isOrgLoading)
        return (
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader>
                    <div>
                        <OrganizationSwitcher
                            organizations={organizations}
                            currOrgSlug={orgSlug}
                            onChangeOrg={onChangeOrg}
                        />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Loader2 className="animate-spin" />
                </SidebarContent>
            </Sidebar>
        );

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div>
                    <OrganizationSwitcher
                        organizations={organizations}
                        currOrgSlug={orgSlug}
                        onChangeOrg={onChangeOrg}
                    />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarSeparator />
                {/* Platform Group */}
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>

                    {/* Overview */}
                    <PolicyGuard policy="can_read_organization">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={`/org/${orgSlug}`}>
                                    <LayoutDashboardIcon />
                                    <span>Overview</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </PolicyGuard>

                    {/* Members */}
                    <PolicyGuard policy="can_view_members">
                        <Collapsible asChild defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip="Organization Members">
                                        <UsersIcon />
                                        <span>Members</span>
                                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {/* All Members */}
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={`/org/${orgSlug}/members`}>
                                                    <span>All Members</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        {/* All Invitations */}
                                        <PolicyGuard policy="can_invite_member">
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link
                                                        href={`/org/${orgSlug}/members/invitations`}
                                                    >
                                                        <span>Invitations</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </PolicyGuard>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </PolicyGuard>

                    {/* Roles & Permissions */}
                    <PolicyGuard policy="can_manage_roles">
                        <Collapsible asChild defaultOpen={false} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip="Organization Members">
                                        <ShieldIcon />
                                        <span>Roles & Permissions</span>
                                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {/* All Roles */}
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={`/org/${orgSlug}/roles`}>
                                                    <span>All Roles</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        {/* All Permissions */}
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={`/org/${orgSlug}/permissions`}>
                                                    <span>All Permissions</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </PolicyGuard>

                    {/* Settings */}
                    <PolicyGuard policy="can_update_organization">
                        <Collapsible asChild defaultOpen={false} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip="Organization Members">
                                        <SettingsIcon />
                                        <span>Settings</span>
                                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {/* General */}
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={`/org/${orgSlug}/settings`}>
                                                    <span>General</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </PolicyGuard>
                </SidebarGroup>

                <SidebarSeparator className="my-4" />

                {/* Projects Group */}
                <PolicyGuard policy="can_create_project">
                    <SidebarGroup>
                        <SidebarGroupLabel>Projects</SidebarGroupLabel>

                        {/* All Projects */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={`/org/${orgSlug}/projects`}>
                                    <FolderKanbanIcon />
                                    <span>All Projects</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* Create Project */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href={`/org/${orgSlug}/projects/create`}>
                                    <PlusCircleIcon />
                                    <span>Create Project</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarGroup>

                    <SidebarSeparator className="my-4" />
                </PolicyGuard>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
