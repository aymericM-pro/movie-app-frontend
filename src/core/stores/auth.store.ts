import { defineStore } from 'pinia';

interface AuthUser {
    email: string;
    username?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: AuthUser | null;
    token: string | null;
}

const STORAGE_KEY = 'auth';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw
            ? JSON.parse(raw)
            : {
                  isAuthenticated: false,
                  user: null,
                  token: null,
              };
    },

    actions: {
        async login(payload: {
            email: string;
            password: string;
            rememberMe?: boolean;
        }) {
            this.isAuthenticated = true;
            this.user = {
                email: payload.email,
            };

            if (payload.rememberMe !== false) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
            }
        },

        async register(payload: {
            email: string;
            username: string;
            password: string;
            newsletter?: boolean;
        }) {
            const fakeToken = 'fake-jwt-token';

            this.isAuthenticated = true;
            this.user = {
                email: payload.email,
                username: payload.username,
            };
            this.token = fakeToken;

            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
        },

        logout() {
            this.isAuthenticated = false;
            this.user = null;
            this.token = null;
            localStorage.removeItem(STORAGE_KEY);
        },
    },
});
