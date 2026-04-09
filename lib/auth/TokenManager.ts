export class TokenManager {
    private static accessToken: string | null = null;

    static get(): string | null {
        return this.accessToken;
    }

    static set(token: string) {
        this.accessToken = token;
    }

    static clear() {
        this.accessToken = null;
    }
}
