// Types and constants
import { Product } from "@/lib/models/product_1";

const products: Product[] = [
	{
		id: 1,
		name: "Rectangular Prescription",
		slug: "rectangular-prescription",
		price: 52.0,
		previousPrice: 100.0,
		brand: "Rectangular",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["rectangular", "top", "prescription"],
		rating: 4.5,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["rectangular", "prescription"],
	},
	{
		id: 2,
		name: "Double Round Sunglasses",
		slug: "double-round-sunglasses",
		price: 325,
		previousPrice: 300,
		brand: "Round",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["round", "top", "sunglasses"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["round", "sunglasses"],
	},
	{
		id: 3,
		name: "Aviator Sunglasses",
		slug: "aviator-sunglasses",
		price: 160,
		brand: "Aviator",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["aviator", "top", "sunglasses"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 4,
		name: "Cat Eye Sunglasses",
		slug: "cat-eye-sunglasses",
		price: 96,
		previousPrice: 90,
		brand: "Cat Eye",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["top", "sunglasses", "cat-eye"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 5,
		name: "Gradient Aviator Sunglasses",
		slug: "gradient-aviator-sunglasses",
		price: 212,
		previousPrice: 200,
		brand: "Gradient",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, purus sit amet volutpat.",
		categories: ["aviator", "sunglasses", "top"],
		rating: 4.5,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 6,
		name: "Square Prescription Eyeglass Frames",
		slug: "square-prescription-eyeglass-frames",
		price: 100,
		previousPrice: 120,
		brand: "Square",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["square", "top", "prescription"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 7,
		name: "Round Flat Lens Sunglasses",
		slug: "round-flat-lens-sunglasses",
		price: 368,
		previousPrice: 375,
		brand: "Round",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["round", "top", "sunglasses"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 8,
		name: "Clubmaster Square Prescription",
		slug: "clubmaster-square-prescription",
		price: 212,
		brand: "Round",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["glasses", "top"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 9,
		name: "Round Prescription Eyewear Frames",
		slug: "round-prescription-eyewear-frames",
		price: 48,
		brand: "Round",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, purus sit amet volutpat.",
		categories: ["round", "top", "prescription"],
		rating: 4.5,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 10,
		name: "Clubround Round Sunglasses",
		slug: "clubround-round-sunglasses",
		price: 100,
		previousPrice: 120,
		brand: "Clubround",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["round", "top", "sunglasses"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 11,
		name: "Round Prescription Eyeglass Frames",
		slug: "round-prescription-eyeglass-frames",
		price: 410,
		brand: "Round",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["round", "top", "prescription"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
	{
		id: 12,
		name: "Clubmaster Square Sunglasses",
		slug: "clubmaster-square-sunglasses",
		price: 430,
		brand: "Clubmaster",
		description:
			"Black Transparent UV Protection Classic sunglasses combine usefulness with the design. The perfect design will complement your face and top off any outfit. In combination with high-quality lenses, an excellent protection from harmful UV-rays is guaranteed. If you're searching forspecial protection, then polarized sunglasses are the right option for you....",
		categories: ["sunglasses", "top", "square"],
		rating: 4.9,
		countInStock: 5,
		// variants: ["gold", "white"],
		reviews: ["Great product", "Nice shoes"],
		tags: ["nike", "air max", "270"],
	},
];

export default products;
