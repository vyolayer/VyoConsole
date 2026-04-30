import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { organizationApi } from "@org/api";
import { useLocalStorage } from "@/lib/storage/useLocalStorage";
import { useOrganizationParams } from "./useOrganizationParams";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { toast } from "sonner";
import { UpdateOrganizationInput } from "../schemas/CreateOrganizationSchema";

export const organizationQueryBySlugOptions = (slug: string) => ({
    queryKey: ORGANIZATION_QUERY_KEYS.bySlug(slug),
    queryFn: () => organizationApi.getBySlug(slug),
});

const useOrganizationBySlugQueryFn = (slug: string) => {
    return useSuspenseQuery(organizationQueryBySlugOptions(slug));
};

export const useOrganizationBySlug = () => {
    const slug = useOrganizationParams();

    const { data, ...rest } = useOrganizationBySlugQueryFn(slug);

    return {
        ...data,
        ...rest,
    };
};

export const useSelectCurrentOrganization = () => {
    const [orgSlug, setOrgSlug, remove] = useLocalStorage<string>("current_organization_slug", "");

    return {
        orgSlug,
        setOrgSlug,
        remove,
    };
};

// update

export const useUpdateOrganization = (id: string, slug: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateOrganizationInput) => organizationApi.update(id, data),

        onSuccess: () => {
            toast.success("Organization updated");
            queryClient.invalidateQueries({ queryKey: ORGANIZATION_QUERY_KEYS.list() });
            queryClient.invalidateQueries({ queryKey: ORGANIZATION_QUERY_KEYS.detail(id) });
            queryClient.invalidateQueries({ queryKey: ORGANIZATION_QUERY_KEYS.bySlug(slug) });
        },

        onError: (err: Error) => {
            toast.error(err.message);
        },
    });
};
