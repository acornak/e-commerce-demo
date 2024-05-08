import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { usersCollName } from "../config/constants";
import { User } from "../config/types";

export async function getUser(): Promise<{
	fsUser?: User | null;
	error?: string;
}> {
	const email = auth.currentUser?.email;
	if (!email) {
		return { error: "No user logged in" };
	}

	const userRef = doc(db, usersCollName, email);

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

	const userRef = doc(db, usersCollName, email);

	try {
		const docSnapshot = await getDoc(userRef);
		if (!docSnapshot.exists()) {
			try {
				await setDoc(userRef, { ...user, createdAt: new Date() });
			} catch (e: any) {
				console.error(e.message);
				return { error: e.message };
			}
		} else {
			try {
				await updateDoc(userRef, { ...user, updatedAt: new Date() });
			} catch (e: any) {
				console.error(e.message);
				return { error: e.message };
			}
		}
	} catch (e: any) {
		return { error: e.message };
	}
	return {};
}
