import { useOrganizationBySlug } from "./useOrganization";
export const useCurrentOrganization = () => {
    const res = useOrganizationBySlug();

    return res;
};
