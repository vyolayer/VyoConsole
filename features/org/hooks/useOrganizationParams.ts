"use client";

import { useParams } from "next/navigation";

export const useOrganizationParams = (): string => {
    const { slug } = useParams();

    if (slug === undefined) {
        throw new Error("Slug is undefined");
    }

    return Array.isArray(slug) ? slug[0] : slug;
};
