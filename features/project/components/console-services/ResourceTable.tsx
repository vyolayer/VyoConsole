"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";

import { IServiceResource } from "../../types/projectService.type";

import { ResourceCell } from "./ResourceCell";
import { ResourcePagination } from "./ResourcePagination";
import { ResourceTableHeader } from "./ResourceTableHeader";
import { ResourceRowActions } from "./ResourceRowActions";

interface Props {
    resource: IServiceResource;
    rows: unknown[];
}

export function ResourceTable({ resource, rows }: Props) {
    const [page, setPage] = useState(1);

    const pageSize = 10;

    const visibleColumns = resource.columns?.filter((col) => col.visible) ?? [];

    const rowActions = resource.actions?.filter((a) => a.scope === "row") ?? [];

    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));

    const paginatedRows = useMemo(() => {
        const start = (page - 1) * pageSize;

        return rows.slice(start, start + pageSize);
    }, [rows, page]);

    return (
        <Card>
            <ResourceTableHeader resource={resource} />

            <CardContent className="space-y-4">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {visibleColumns.map((column) => (
                                    <TableHead key={column.key}>{column.label}</TableHead>
                                ))}

                                {rowActions.length > 0 && <TableHead />}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedRows.map((row, index) => (
                                <TableRow key={index}>
                                    {visibleColumns.map((column) => (
                                        <TableCell key={column.key}>
                                            <ResourceCell
                                                row={row as Record<string, unknown>}
                                                column={column}
                                            />
                                        </TableCell>
                                    ))}

                                    {rowActions.length > 0 && (
                                        <TableCell className="w-15">
                                            <ResourceRowActions actions={rowActions} />
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <ResourcePagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </CardContent>
        </Card>
    );
}
