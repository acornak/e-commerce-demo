import { getDocs, query, where } from "firebase/firestore";
// Types and constants
import { auth } from "../config/firebase";
import { ordersColl } from "../config/constants";
import { Order } from "../config/types";

// eslint-disable-next-line import/prefer-default-export
export async function getOrders(): Promise<{
	orders?: Order[];
	error?: string;
}> {
	const email = auth.currentUser?.email;
	if (!email) {
		return { error: "No user logged in" };
	}

	try {
		const q = query(ordersColl, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		const orders = querySnapshot.docs.map((doc) => ({
			...(doc.data() as Order),
			createdAt: doc.data().createdAt.toDate(),
			updatedAt: doc.data().createdAt.toDate(),
		}));
		return { orders };
	} catch (e: any) {
		console.error("Failed to fetch orders:", e);
		return { error: e.message };
	}
}
