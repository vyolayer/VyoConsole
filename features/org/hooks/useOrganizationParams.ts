"use client";

import { useParams } from "next/navigation";

export const useOrganizationParams = (): string => {
    const { orgSlug } = useParams();

    if (orgSlug === undefined) {
        throw new Error("Slug is undefined");
    }

    return Array.isArray(orgSlug) ? orgSlug[0] : orgSlug;
};
