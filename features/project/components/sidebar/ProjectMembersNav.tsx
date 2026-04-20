import { Users } from "lucide-react";
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { ProjectSidebarItem } from "./ProjectSidebarItem";

export function ProjectMembersNav({ base }: { base: string }) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <ProjectSidebarItem href={`${base}/members`} icon={Users} label="Members" />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
