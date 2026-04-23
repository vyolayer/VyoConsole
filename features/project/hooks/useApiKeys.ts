import { apikeyApi } from "@project/api/apikey.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateApiKeyInput } from "../schemas/CreateApikeySchema";
import { useProjectParams } from "./useProjectParams";
import { toast } from "sonner";

export const useCreateApiKey = () => {
    const { orgId, projectId } = useProjectParams();

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create-apikey", orgId, projectId],
        mutationFn: (input: CreateApiKeyInput) => apikeyApi.create(orgId, projectId, input),

        onSuccess: () => {
            toast.success("API key created");
        },

        onError: (err: Error) => {
            toast.error(err.message || "Failed to create API key");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["apikeys", "list", orgId, projectId] });
        },
    });
};

export const useApiKeys = () => {
    const { orgId, projectId } = useProjectParams();

    return useQuery({
        queryKey: ["apikeys", "list", orgId, projectId],
        queryFn: () => apikeyApi.list(orgId, projectId),
    });
};

export const useApiKey = (id: string) => {
    const { orgId, projectId } = useProjectParams();

    return useQuery({
        queryKey: ["apikeys", orgId, projectId, id],
        queryFn: () => apikeyApi.get(orgId, projectId, id),
    });
};

export const useRevokeApiKey = (id: string) => {
    const { orgId, projectId } = useProjectParams();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["revoke-apikey", orgId, projectId, id],
        mutationFn: () => apikeyApi.revoke(orgId, projectId, id),

        onSuccess: () => {
            toast.success("API key revoked");
        },

        onError: (err: Error) => {
            toast.error(err.message || "Failed to revoke API key");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["apikeys", "list", orgId, projectId] });
            queryClient.invalidateQueries({ queryKey: ["apikeys", orgId, projectId, id] });
        },
    });
};

export const useRotateApiKey = (id: string) => {
    const { orgId, projectId } = useProjectParams();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["rotate-apikey", orgId, projectId, id],
        mutationFn: () => apikeyApi.rotate(orgId, projectId, id),

        onSuccess: () => {
            toast.success("API key rotated");
        },

        onError: (err: Error) => {
            toast.error(err.message || "Failed to rotate API key");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["apikeys", "list", orgId, projectId] });
            queryClient.invalidateQueries({ queryKey: ["apikeys", orgId, projectId, id] });
        },
    });
};
