import { Badge } from "@/components/ui/badge";

import { IServiceColumn } from "../../types/projectService.type";

export function ResourceCell({
    row,
    column,
}: {
    row: Record<string, unknown>;
    column: IServiceColumn;
}) {
    const value = row[column.key];

    if (column.type === "badge") {
        return <Badge variant="secondary">{String(value)}</Badge>;
    }

    if (column.type === "datetime") {
        if (!value) return "-";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(String(value)));
    }

    if (column.type === "image") {
        return <div className="h-8 w-8 rounded-full bg-muted" />;
    }

    return value ? String(value) : "-";
}
