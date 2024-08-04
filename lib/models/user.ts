import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { usersCollName } from "../config/constants";
import { User } from "../config/types";

/**
 * Get user data from Firestore
 * @returns User | null - User data or null if user does not exist
 * @throws Error - If user is not logged in
 */
export async function getUser(): Promise<User | null> {
	const email = auth.currentUser?.email;
	if (!email) {
		throw new Error("No user logged in");
	}

	const userRef = doc(db, usersCollName, email);

	try {
		const docSnapshot = await getDoc(userRef);
		if (docSnapshot.exists()) {
			return docSnapshot.data() as User | null;
		}
		return null;
	} catch (e: any) {
		throw new Error(e.message);
	}
}

export async function updateUser(user: User): Promise<void> {
	const email = auth.currentUser?.email;
	if (!email) {
		throw new Error("No user logged in");
	}

	const userRef = doc(db, usersCollName, email);

	try {
		const docSnapshot = await getDoc(userRef);
		if (!docSnapshot.exists()) {
			await setDoc(userRef, { ...user, createdAt: new Date() });
		} else {
			await updateDoc(userRef, { ...user, updatedAt: new Date() });
		}
	} catch (e: any) {
		throw new Error(e.message);
	}
}
