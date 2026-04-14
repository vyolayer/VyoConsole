import { TokenManager } from "../auth/TokenManager";
import { ApiError, ApiResponse } from "./types";

type RequestOptions = RequestInit & {
    params?: Record<string, string | number>;
};

class ApiClient {
    private readonly baseUrl: string;
    private version: string;
    private isRefreshing = false;
    private refreshPromise: Promise<string> | null = null;

    constructor(
        baseUrl: string,
        version = "v1",
        private getHeaders?: () => Promise<HeadersInit> | HeadersInit,
    ) {
        this.version = version;
        this.baseUrl = baseUrl;
    }

    private buildUrl(path: string, params?: RequestOptions["params"]) {
        path = `${this.version}${path}`;
        const url = new URL(path, this.baseUrl);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }

        return url.toString();
    }

    private async refreshToken(): Promise<string> {
        const currToken = TokenManager.get();

        const res = await fetch(this.buildUrl("/iam/refresh-session"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currToken}`,
            },
            credentials: "include",
        });

        if (!res.ok) {
            TokenManager.clear();
            window.dispatchEvent(new Event("auth:logout"));
            throw new Error("Session expired");
        }

        const json: ApiResponse<{ access_token: string }> = await res.json();
        const token = json.data!.access_token;
        if (token) TokenManager.set(token);

        return token;
    }

    private async request<T>(
        method: string,
        path: string,
        options: RequestOptions = {},
    ): Promise<T> {
        const makeRequest = async (token?: string): Promise<T> => {
            const headers = {
                "Content-Type": "application/json",
                ...(await this.getHeaders?.()),
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            };

            const res = await fetch(this.buildUrl(path, options.params), {
                method,
                headers,
                body: options.body,
                credentials: "include",
                cache: "no-store",
            });

            if (res.status === 204) return undefined as T;

            if (res.status === 401 && path !== "/iam/login") {
                // 🔁 refresh flow
                if (!this.isRefreshing) {
                    this.isRefreshing = true;
                    this.refreshPromise = this.refreshToken().finally(() => {
                        this.isRefreshing = false;
                    });
                }

                try {
                    const newToken = await this.refreshPromise!;
                    return makeRequest(newToken);
                } catch {
                    throw new Error("Unauthorized");
                }
            }

            const json: ApiResponse<T> = await res.json();

            if (!json.success) {
                throw new ApiError(json);
            }

            return json.data as T;
        };

        return makeRequest(TokenManager.get() || undefined);
    }

    get<T>(path: string, options?: RequestOptions) {
        return this.request<T>("GET", path, options);
    }

    post<T>(path: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>("POST", path, {
            ...options,
            body: JSON.stringify(body),
        });
    }

    patch<T>(path: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>("PATCH", path, {
            ...options,
            body: JSON.stringify(body),
        });
    }

    put<T>(path: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>("PUT", path, {
            ...options,
            body: JSON.stringify(body),
        });
    }

    delete<T>(path: string, body?: unknown, options?: RequestOptions) {
        return this.request<T>("DELETE", path, {
            ...options,
            body: JSON.stringify(body),
        });
    }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL!);
