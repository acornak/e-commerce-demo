import {
	User,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithRedirect,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	sendPasswordResetEmail,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { create } from "zustand";
import { auth } from "../config/firebase";

export interface AuthStore {
	user: User | null;
	initialLoading: boolean;
	loading: boolean;
	error: string | null;
	signInWithEmail: (email: string, password: string) => void;
	signUpWithEmail: (email: string, password: string) => void;
	signInWithGoogle: () => void;
	resetPassword: (email: string) => void;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
	setInitialLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	logOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	loading: false,
	initialLoading: true,
	error: null,
	signInWithEmail: async (email, password) => {
		try {
			set({ loading: true, error: null });
			await setPersistence(auth, browserLocalPersistence);
			const { user } = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			set({ user });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
	signUpWithEmail: async (email, password) => {
		try {
			set({ loading: true, error: null });
			await setPersistence(auth, browserLocalPersistence);
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			set({ user });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
	signInWithGoogle: async () => {
		try {
			set({ loading: true, error: null });
			await setPersistence(auth, browserLocalPersistence);
			const provider = new GoogleAuthProvider();
			await signInWithRedirect(auth, provider);
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
	resetPassword: async (email) => {
		try {
			set({ loading: true, error: null });
			await setPersistence(auth, browserLocalPersistence);
			await sendPasswordResetEmail(auth, email);
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading }),
	setInitialLoading: (initialLoading) => set({ initialLoading }),
	setError: (error) => set({ error }),
	logOut: async () => {
		try {
			set({ loading: true, error: null });
			await signOut(auth);
			set({ user: null });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
}));

onAuthStateChanged(auth, (user) => {
	useAuthStore.setState({ user });
	useAuthStore.getState().setInitialLoading(false);
});
