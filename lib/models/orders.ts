import { addDoc, getDocs, query, where } from "firebase/firestore";
// Types and constants
import { auth } from "../config/firebase";
import { ordersColl } from "../config/constants";
import { Order } from "../config/types";

/**
 * Get all orders for the currently logged in user
 * @returns array of orders
 * @throws Error - If order fetching fails
 */
export async function getOrders(): Promise<Order[]> {
	const email = auth.currentUser?.email;
	if (!email) {
		throw new Error("No user logged in");
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
		return orders;
	} catch (e: any) {
		console.error(e);
		throw new Error(e.message);
	}
}

/**
 * Create a new order in Firestore
 * @param order - Order data
 * @throws Error - If order creation fails
 */
export async function createOrder(order: Order): Promise<void> {
	try {
		await addDoc(ordersColl, order);
	} catch (e: any) {
		throw new Error(e.message);
	}
}
