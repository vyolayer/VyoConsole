import { apiClient } from "@/lib/api/client";
import { TokenManager } from "@/lib/auth/TokenManager";
import { TokenResponse } from "./types";
import { RegisterInput } from "../schemas/RegisterSchema";
import { IUser } from "../types/userType";

export function registerApi(data: RegisterInput) {
    return apiClient.post("/iam/register", data);
}

export async function loginApi(data: { email: string; password: string }) {
    const res = await apiClient.post<TokenResponse>("/iam/login", data);

    TokenManager.set(res.access_token);

    return res;
}

export function getMeApi() {
    return apiClient.get<{ user: IUser }>("/iam/me");
}

export async function logoutApi() {
    await apiClient.post("/iam/logout");
    TokenManager.clear();
}
