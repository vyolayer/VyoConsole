"use client";

import * as React from "react";
import { IOrganization } from "../types/organization.types";
import { IOrganizationMember } from "../types/member.types";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const OrganizationOverview: React.FC<{
    org: IOrganization;
    members: IOrganizationMember[];
}> = ({ org, members }) => {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* ---------------- Header ---------------- */}
            <OrgOverviewHeader
                slug={org.slug} //
                name={org.name}
                description={org.description}
            />

            {/* ---------------- Stats ---------------- */}
            <OrgStats
                max_projects={org.max_projects}
                max_members={org.max_members}
                member_count={org.member_count}
                is_active={org.is_active}
            />

            {/* ---------------- Quick Actions ---------------- */}
            <OrgQuickActions slug={org.slug} />

            {/* ---------------- Members Preview ---------------- */}
            <OrgMemberPreviewSection slug={org.slug} members={members} />
        </div>
    );
};

const OrgOverviewHeader: React.FC<{ slug: string; name: string; description: string }> = ({
    slug,
    name,
    description,
}) => {
    // const router = useRouter();

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {/* <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push(`/org/${slug}/settings`)}>
                    Settings
                </Button>

                <Button onClick={() => router.push(`/org/${slug}/members/invite`)}>
                    Invite Member
                </Button>
            </div> */}
        </div>
    );
};

const OrgStats: React.FC<{
    member_count: number;
    max_members: number;
    max_projects: number;
    is_active: boolean;
}> = ({ max_members, is_active, max_projects, member_count }) => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">
                        {member_count} / {max_members}
                    </p>
                    <p className="text-xs text-muted-foreground">Active members</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{max_projects}</p>
                    <p className="text-xs text-muted-foreground">Project limit</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium">{is_active ? "Active" : "Inactive"}</p>
                </CardContent>
            </Card>
        </div>
    );
};

const OrgQuickActions: React.FC<{ slug: string }> = ({ slug }) => {
    const router = useRouter();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
                <Button
                    variant="secondary"
                    onClick={() => router.push(`/org/${slug}/projects/create`)}
                >
                    Create Project
                </Button>

                <Button variant="secondary" onClick={() => router.push(`/org/${slug}/members`)}>
                    Manage Members
                </Button>

                <Button variant="secondary" onClick={() => router.push(`/org/${slug}/settings`)}>
                    Organization Settings
                </Button>
            </CardContent>
        </Card>
    );
};

const OrgMemberPreviewSection: React.FC<{
    slug: string;
    members: IOrganizationMember[];
}> = ({ slug, members }) => {
    const router = useRouter();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Members</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {members?.slice(0, 5).map((member: IOrganizationMember) => (
                    <div key={member.user_id} className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">{member.email}</p>
                            <p className="text-xs text-muted-foreground">{member.roles}</p>
                        </div>
                    </div>
                ))}

                <Button variant="ghost" onClick={() => router.push(`/org/${slug}/members`)}>
                    View all members →
                </Button>
            </CardContent>
        </Card>
    );
};
