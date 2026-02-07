import { defineStore } from 'pinia';

interface AuthState {
    isAuthenticated: boolean;
    userName?: string;
}

const STORAGE_KEY = 'auth';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw
            ? JSON.parse(raw)
            : { isAuthenticated: false, userName: undefined };
    },

    actions: {
        login(userName: string) {
            this.isAuthenticated = true;
            this.userName = userName;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
        },
        logout() {
            this.isAuthenticated = false;
            this.userName = undefined;
            localStorage.removeItem(STORAGE_KEY);
        },
    },
});
