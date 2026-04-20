import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import { IServiceResource } from "../../types/projectService.type";

export function ResourceTabs({ resources }: { resources: IServiceResource[] }) {
    if (!resources?.length) return null;

    return (
        <TabsList className="flex w-full justify-start overflow-x-auto">
            {resources.map((resource) => (
                <TabsTrigger key={resource.key} value={resource.key}>
                    {resource.label}
                </TabsTrigger>
            ))}
        </TabsList>
    );
}
