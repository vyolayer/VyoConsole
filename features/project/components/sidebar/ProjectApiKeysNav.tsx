import { KeyRound } from "lucide-react";
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { ProjectSidebarItem } from "./ProjectSidebarItem";

export function ProjectApiKeysNav({ base }: { base: string }) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <ProjectSidebarItem
                        href={`${base}/api-keys`}
                        icon={KeyRound}
                        label="API Keys"
                    />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
