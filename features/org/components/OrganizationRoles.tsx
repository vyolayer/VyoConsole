"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ShieldIcon } from "lucide-react";
import { toast } from "sonner";
import { IOrganizationRole } from "../types/rabc.types";

type OrganizationRolesProps = {
    roles: IOrganizationRole[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

export const OrganizationRoles = ({ isLoading, isError, error, roles }: OrganizationRolesProps) => {
    function handleCreateRole() {
        toast.warning("Write now create role not available");
    }

    function handleViewPermissions() {
        toast.warning("Write now view permissions not available");
    }

    function handleEditRole() {
        toast.warning("Write now edit role not available");
    }

    // ---------------- Loading ----------------
    if (isLoading) return <OrganizationRolesSkeleton />;

    // ---------------- Error ----------------
    if (isError) return <OrganizationRolesError error={error} />;

    // ---------------- Empty ----------------
    if (!roles || roles.length === 0) {
        return <OrganizationRolesEmpty handleCreateRole={handleCreateRole} />;
    }

    // ---------------- Main UI ----------------
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Roles</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage organization roles and permissions
                    </p>
                </div>

                <Button onClick={handleCreateRole}>Create Role</Button>
            </div>

            {/* Roles Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <Card key={role.id} className="hover:shadow-sm transition">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div className="flex items-center gap-2">
                                <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-base">{role.name}</CardTitle>
                            </div>

                            {role.is_system_role && <Badge variant="secondary">System</Badge>}
                        </CardHeader>

                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {role.description || "No description"}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={handleViewPermissions}>
                                    View Permissions
                                </Button>

                                {!role.is_system_role && (
                                    <Button size="sm" variant="ghost" onClick={handleEditRole}>
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

function OrganizationRolesSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
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
}

function OrganizationRolesError({ error }: { error: Error | null }) {
    return (
        <div className="text-sm text-destructive">{error?.message || "Failed to load roles"}</div>
    );
}

function OrganizationRolesEmpty({ handleCreateRole }: { handleCreateRole: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
            <p className="text-muted-foreground">No roles found</p>
            <Button onClick={handleCreateRole}>Create Role</Button>
        </div>
    );
}
