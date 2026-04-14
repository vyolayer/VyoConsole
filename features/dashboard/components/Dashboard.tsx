"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { OrganizationCard } from "./OrganizationCard";
import { IOrganization } from "@org/types/organization.types";
import { useSelectCurrentOrganization } from "@org/hooks/useOrganization";

export const Dashboard: React.FC<{
    organizations: IOrganization[];
}> = ({ organizations }) => {
    const router = useRouter();
    const { setOrgSlug } = useSelectCurrentOrganization();

    function handleOpen(slug: string) {
        setOrgSlug(slug);
        router.push(`/org/${slug}`);
    }

    return (
        // {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {organizations.map((org) => (
                <OrganizationCard
                    key={org.id} // key
                    organization={org}
                    onClickOpen={handleOpen}
                />
            ))}
        </div>
    );
};
