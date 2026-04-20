import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { IServiceResource } from "../../types/projectService.type";

export function ResourceTableHeader({ resource }: { resource: IServiceResource }) {
    const pageActions = resource.actions?.filter((a) => a.scope === "page") ?? [];

    return (
        <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
                <CardTitle>{resource.label}</CardTitle>

                <CardDescription>Manage {resource.label.toLowerCase()}</CardDescription>
            </div>

            <div className="flex gap-2">
                {pageActions.map((action) => (
                    <Button
                        key={action.key}
                        size="sm"
                        variant={action.danger ? "destructive" : "default"}
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        </CardHeader>
    );
}
