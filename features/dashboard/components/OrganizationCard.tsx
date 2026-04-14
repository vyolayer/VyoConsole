"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { IOrganization } from "@org/types/organization.types";
import { useSelectCurrentOrganization } from "@org/hooks/useOrganization";

interface OrganizationCardProps {
    organization: IOrganization;
    onClickOpen: (slug: string) => void;
}

export function OrganizationCard({ organization, onClickOpen }: OrganizationCardProps) {
    const handleOpen = () => {
        onClickOpen(organization.slug);
    };

    return (
        <Card className="hover:shadow-md transition cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div onClick={handleOpen} className="flex flex-col">
                    <CardTitle className="text-base font-semibold">{organization.name}</CardTitle>

                    <p className="text-xs text-muted-foreground">{organization.slug}</p>
                </div>

                {/* Actions */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleOpen}>Open</DropdownMenuItem>

                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent onClick={handleOpen} className="space-y-3">
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {organization.description || "No description"}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    {/* Members */}
                    <span className="text-xs text-muted-foreground">
                        {organization.member_count} / {organization.max_members} members
                    </span>

                    {/* Status */}
                    <Badge variant={organization.is_active ? "default" : "secondary"}>
                        {organization.is_active ? "Active" : "Inactive"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
