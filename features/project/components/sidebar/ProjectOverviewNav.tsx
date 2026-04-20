import { LayoutDashboard } from "lucide-react";
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { ProjectSidebarItem } from "./ProjectSidebarItem";

export function ProjectOverviewNav({ base }: { base: string }) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <ProjectSidebarItem href={base} icon={LayoutDashboard} label="Overview" />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
