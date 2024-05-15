import { addDoc, getDocs, query, where } from "firebase/firestore";
// Types and constants
import { auth } from "../config/firebase";
import { ordersColl } from "../config/constants";
import { Order } from "../config/types";

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
		const orders = querySnapshot.docs
			.map((doc) => ({
				...(doc.data() as Order),
				createdAt: doc.data().createdAt.toDate(),
				updatedAt: doc.data().createdAt.toDate(),
			}))
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		return { orders };
	} catch (e: any) {
		console.error("Failed to fetch orders:", e);
		return { error: e.message };
	}
}

export async function createOrder(order: Order): Promise<void> {
	try {
		await addDoc(ordersColl, order);
	} catch (e: any) {
		throw new Error(e.message);
	}
}
