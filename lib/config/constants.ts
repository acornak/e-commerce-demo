// Types and constants
import { collection } from "firebase/firestore";
import {
	sortProductsByNameAsc,
	sortProductsByNameDesc,
	sortProductsByPriceAsc,
	sortProductsByPriceDesc,
	sortProductsDefault,
} from "../functions/sort-products";
import { Color, FaqQuestion, SortOption } from "./types";
import { db } from "./firebase";

export const colors: Color = {
	white: "#ffffff",
	gray300: "#E0E0E0",
	gray400: "#BDBDBD",
	gray500: "#9E9E9E",
	black: "#000000",
	secondary: "#FF6347",
	secondaryRed: "#df393a",
	secondaryBlue: "#1c2d49",
};

export const location = {
	address: "1600 Amphitheatre Parkway, Mountain View, california.",
	lat: 37.42216,
	lng: -122.08427,
};

export const usersCollName = "users";
export const usersColl = collection(db, usersCollName);
export const ordersCollName = "orders";
export const ordersColl = collection(db, ordersCollName);

export const sortOptions: SortOption[] = [
	{
		label: "Default Sorting",
		value: "default",
		sortFunc: sortProductsDefault,
	},
	{
		label: "Alphabetical, A-Z",
		value: "az",
		sortFunc: sortProductsByNameAsc,
	},
	{
		label: "Alphabetical, Z-A",
		value: "za",
		sortFunc: sortProductsByNameDesc,
	},
	{
		label: "Price, low - high",
		value: "price_asc",
		sortFunc: sortProductsByPriceAsc,
	},
	{
		label: "Price, high - low",
		value: "price_desc",
		sortFunc: sortProductsByPriceDesc,
	},
];

export const faqQuestions: FaqQuestion[] = [
	{
		question: "How long does it take for home delivery?",
		answer: "We use Royal mail and DHL to send most of our UK orders.Euro Car Parts reserves the right to use discretion in any circumstance where it makes more sense to use an alternative delivery method.",
	},
	{
		question: "What courier do you use for deliveries?",
		answer: "We use Royal mail and DHL to send most of our UK orders.Euro Car Parts reserves the right to use discretion in any circumstance where it makes more sense to use an alternative delivery method.",
	},
	{
		question:
			"Why am I being charged for delivery on my order when it states standard delivery is free?",
		answer: "All our delivery charges are pre-set by our courier company. We sell some oversized items which require a specialist courier company to fulfil the delivery, there is an additional charge for these. Also, our courier company consider some surcharge postcodes 'Out of area'. There is an additional charge for these also.",
	},
	{
		question: "I haven't received a dispatch email/email confirmation?",
		answer: "Please be aware an automated email is sent to you to the given email address when your order is dispatched. Please check all folders including you junk as it will come from a noreply email address. To ensure emails reach you, add the domain eurocarparts.com to your safe senders list.",
	},
	{
		question:
			"Why does it not tell us on the website that the parts will be delivered by the branch?",
		answer: "Due to the delicacy of some parts we take extra care in the delivery of the item. These could include body panels and large bulky items. These are either available for collection from our branches or will be delivered to you through our branch network vehicles.",
	},
	{
		question: "Can I collect from a local store?",
		answer: "We offer a reserve and collect service. This is available on the checkout page. Please be aware, if the product is not available in a local store, you are unable to reserve it.",
	},
	{
		question: "Do you deliver on Weekend?",
		answer: "No, our courier company do not offer the service to deliver on weekends currently.",
	},
	{
		question: "Can you confirm you have received my return?",
		answer: "We aim to process returns within 5-7 working days of receiving them. You will be notified by email once the return is complete.We suggest you make a note of the shipping reference given when you sent the item back. This will allow you to track your parcel at every stage of delivery, including when we receive it.Should you have any queries about your return, please feel free to contact our Customer Service team via email.",
	},
	{
		question: "How long will it be before I get a refund?",
		answer: "Once we receive your item(s) back, our returns department will inspect and restock the goods. Once our returns department have done this, an automated refund is generated on our system. Your outstanding refund is then processed by our accounts department back to your original payment method. This process typically takes 5-7 working days. When returning your products please remember to include your original invoice, without this it may delay your refund.",
	},
	{
		question: "Who pays for return postage?",
		answer: "If you are returning an unsuitable item for a refund we will refund the cost of the item only and not the original delivery cost.Should you be returning a faulty item for a refund we will refund both the original shipping costs and the return delivery costs.",
	},
	{
		question: "Why have you not refunded the original delivery charge?",
		answer: "If you are returning an unsuitable item for a refund we will refund the cost of the item only and not the original delivery cost. Should you be returning a faulty item for a refund we will refund both the original shipping costs and the return delivery costs.",
	},
	{
		question: "Do you offer a VAT discount to non EU customers?",
		answer: "Customer's ordering from outside the European Union can contact us via telephone, live chat, or e-mail and quote the order reference number. Our customer services team will go through the process to remove the VAT off of their order.",
	},
];
