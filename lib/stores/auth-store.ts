import { create } from "zustand";

export interface AuthStore {
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	loggedIn: false,
	setLoggedIn: (loggedIn: boolean) => set(() => ({ loggedIn })),
}));
