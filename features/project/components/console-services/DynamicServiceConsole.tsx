"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { ResourceTabs } from "./ResourceTabs";
import { ResourceTable } from "./ResourceTable";
import { IProjectManifestService } from "../../types/projectService.type";

interface Props {
    manifest?: IProjectManifestService;
    data: Record<string, unknown[]>;
}

export function DynamicServiceConsole({ manifest, data }: Props) {
    if (!manifest) return null;

    if (!manifest.resources?.length) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">{manifest.name}</h1>

                    <p className="text-sm text-muted-foreground">{manifest.description}</p>
                </div>
            </div>
        );
    }

    const defaultTab = manifest?.resources?.[0]?.key ?? "";

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">{manifest.name}</h1>

                <p className="text-sm text-muted-foreground">{manifest.description}</p>
            </div>

            <Tabs defaultValue={defaultTab}>
                <ResourceTabs resources={manifest.resources} />

                {manifest.resources?.map((resource) => (
                    <TabsContent key={resource.key} value={resource.key} className="mt-4">
                        <ResourceTable resource={resource} rows={data[resource.key] ?? []} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
