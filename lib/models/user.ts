import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { usersColl } from "../config/constants";

export type Address = {
	street: string;
	city: string;
	state?: string;
	zipCode: string;
	country: string;
};

export type User = {
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	address?: Address;
	createdAt?: Date;
	updatedAt?: Date;
};

export async function getUser(): Promise<{
	fsUser?: User | null;
	error?: string;
}> {
	const email = auth.currentUser?.email;
	if (!email) {
		return { error: "No user logged in" };
	}

	const userRef = doc(db, usersColl, email);

	try {
		const docSnapshot = await getDoc(userRef);
		if (docSnapshot.exists()) {
			return { fsUser: docSnapshot.data() as User };
		}
		return { fsUser: null };
	} catch (e: any) {
		return { error: e.message };
	}
}

export async function updateUser(user: User): Promise<{ error?: string }> {
	const email = auth.currentUser?.email;
	if (!email) {
		return { error: "No user logged in" };
	}

	const userRef = doc(db, usersColl, email);

	try {
		const docSnapshot = await getDoc(userRef);
		if (!docSnapshot.exists()) {
			try {
				await setDoc(userRef, { ...user, createdAt: new Date() });
			} catch (e: any) {
				return { error: e.message };
			}
		} else {
			try {
				await updateDoc(userRef, { ...user, updatedAt: new Date() });
			} catch (e: any) {
				return { error: e.message };
			}
		}
	} catch (e: any) {
		return { error: e.message };
	}
	return {};
}
