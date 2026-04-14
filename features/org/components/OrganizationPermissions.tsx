"use client";

import { KeyIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrganizationPermission } from "../types/rabc.types";

type OrganizationPermissionsProps = {
    permissions: IOrganizationPermission[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

export const OrganizationPermissions = ({
    isLoading,
    isError,
    error,
    permissions,
}: OrganizationPermissionsProps) => {
    // ---------------- Loading ----------------
    if (isLoading) {
        return <Loading />;
    }

    // ---------------- Error ----------------
    if (isError) {
        return <Error error={error} />;
    }

    // ---------------- Empty ----------------
    if (!permissions || permissions.length === 0) {
        return (
            <div className="flex justify-center py-10 text-muted-foreground">
                No permissions found
            </div>
        );
    }

    // ---------------- Grouping ----------------
    const grouped = permissions.reduce((acc: any, perm) => {
        if (!acc[perm.group]) acc[perm.group] = [];
        acc[perm.group].push(perm);
        return acc;
    }, {});

    // ---------------- Main UI ----------------
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-semibold">Permissions</h1>
                <p className="text-sm text-muted-foreground">
                    Manage system and custom permissions
                </p>
            </div>

            {/* Groups */}
            <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(grouped).map(([group, perms]: any) => (
                    <Card key={group}>
                        <CardHeader>
                            <CardTitle className="capitalize">{group}</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {perms.map((perm: any) => (
                                <div
                                    key={perm.id}
                                    className="flex items-center justify-between rounded-md border p-3"
                                >
                                    {/* Left */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <KeyIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">
                                                {perm.resource}.{perm.action}
                                            </span>
                                        </div>

                                        <span className="text-xs text-muted-foreground">
                                            {perm.code}
                                        </span>
                                    </div>

                                    {/* Right */}
                                    <div className="flex items-center gap-2">
                                        {perm.is_system && (
                                            <Badge variant="secondary">System</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const Loading = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                    <CardHeader>
                        <div className="h-4 w-32 bg-muted rounded" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-3 w-full bg-muted rounded mb-2" />
                        <div className="h-3 w-2/3 bg-muted rounded" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

const Error = ({ error }: { error: Error | null }) => {
    if (error) return <div className="text-sm text-destructive">{error.message}</div>;

    return <div className="text-sm text-destructive">Failed to load permissions</div>;
};
