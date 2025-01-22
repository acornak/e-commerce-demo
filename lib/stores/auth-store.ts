import {
	User as FirebaseUser,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	sendPasswordResetEmail,
	signOut,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useCartStore } from "./cart-store";
import { useWishlistStore } from "./wishlist-store";
import { usersCollName } from "../config/constants";
import { User } from "../config/types";

// TODO:
export interface AuthStore {
	// make this logged in boolean
	// add custom user type to the AuthStore
	user: FirebaseUser | null;
	userData: User | null; // Add Firestore user data
	initialLoading: boolean;
	loading: boolean;
	error: string | null;
	signInWithEmail: (email: string, password: string) => void;
	signUpWithEmail: (email: string, password: string) => void;
	signInWithGoogle: () => void;
	resetPassword: (email: string) => void;
	// setUser: (user: FirebaseUser | null) => void;
	// setLoading: (loading: boolean) => void;
	// setInitialLoading: (loading: boolean) => void;
	// setError: (error: string | null) => void;
	logOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	userData: null, // Add Firestore user data
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
			const result = await signInWithPopup(auth, provider);
			set({ user: result.user });
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
	// setUser: (user) => set({ user }),
	// setLoading: (loading) => set({ loading }),
	// setInitialLoading: (initialLoading) => set({ initialLoading }),
	// setError: (error) => set({ error }),
	logOut: async () => {
		try {
			set({ loading: true, error: null });
			await signOut(auth);
			set({ user: null });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
			useCartStore.getState().clearCart();
			useWishlistStore.getState().clearWishlist();
		}
	},
}));

/* istanbul ignore next */
onAuthStateChanged(auth, async (user) => {
	if (user?.email) {
		try {
			const userRef = doc(db, usersCollName, user.email);
			const docSnapshot = await getDoc(userRef);
			const userData = docSnapshot.exists()
				? (docSnapshot.data() as User)
				: null;

			useAuthStore.setState({
				user,
				userData,
				initialLoading: false,
			});
		} catch (error) {
			console.error("Error fetching user data:", error);
			useAuthStore.setState({
				user,
				userData: null,
				initialLoading: false,
			});
		}
	} else {
		useAuthStore.setState({
			user: null,
			userData: null,
			initialLoading: false,
		});
	}
});
