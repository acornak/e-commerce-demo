// types
import { Product } from "@/lib/models/Product";

const products: Product[] = [
	{
		_id: 0,
		name: "Nike Air Max 270",
		slug: "nike-air-max-270",
		image: "/images/products/nike-air-max-270.jpg",
		banner: "/images/products/nike-air-max-270-banner.jpg",
		price: 150,
		previousPrice: 200,
		brand: "Nike",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, purus sit amet volutpat.",
		category: ["shoes", "top"],
		rating: 4.5,
		countInStock: 5,
		variants: ["black", "white"],
		reviews: ["Great product", "Nice shoes"],
		features: ["Lightweight", "Comfortable", "Durable"],
		tags: ["nike", "air max", "270"],
		createdAt: "2022-01-01",
	},
	{
		_id: 1,
		name: "Round Prescription Eyewear Frames",
		slug: "round-prescription-Eyewear-Frames",
		image: "/images/products/round-prescription-Eyewear-Frames.jpg",
		banner: "/images/products/round-prescription-Eyewear-Frames.jpg",
		price: 100,
		previousPrice: 120,
		brand: "Round",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		category: ["glasses", "top"],
		rating: 4.9,
		countInStock: 5,
		variants: ["black", "white"],
		reviews: ["Great product", "Nice shoes"],
		features: ["Lightweight", "Comfortable", "Durable"],
		tags: ["nike", "air max", "270"],
		createdAt: "2022-01-01",
	},
];

export default products;
