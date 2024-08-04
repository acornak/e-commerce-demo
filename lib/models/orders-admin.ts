import "server-only";
import { getFirestore } from "firebase-admin/firestore";
import { Order } from "../config/types";

/**
 * Update an order in Firestore
 * @param order - Order data to update
 * @throws Error - If order update fails
 */
export default async function updateOrder(order: Order): Promise<void> {
	const firestore = getFirestore();
	const q = firestore.collection("orders").where("id", "==", order.id);

	try {
		const querySnapshot = await q.get();
		if (!querySnapshot.empty) {
			const docRef = querySnapshot.docs[0].ref;
			await docRef.update({ ...order, updatedAt: new Date() });
		} else {
			throw new Error("No order found with the given ID");
		}
	} catch (e: any) {
		throw new Error(e.message);
	}
}
