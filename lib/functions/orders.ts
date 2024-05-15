import { v4 as uuidv4 } from "uuid";

export default function generateOrderId() {
	const date = new Date();
	const formattedDate = [
		date.getDate().toString().padStart(2, "0"),
		(date.getMonth() + 1).toString().padStart(2, "0"),
		date.getFullYear(),
	].join("-");
	const uuid = uuidv4().replace(/-/g, "");
	const sixDigitUuid = uuid.substring(0, 6);

	const orderId = `${formattedDate}/${sixDigitUuid}`;
	return orderId;
}
