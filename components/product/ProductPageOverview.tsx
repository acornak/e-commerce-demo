"use client";

import React, { FC, useEffect, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Stripe
import Stripe from "stripe";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Stores
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { useModalsStore } from "@/lib/stores/modals-store";
import { updateCartStore, useCartStore } from "@/lib/stores/cart-store";
// Functions
import {
	fetchProductById,
	fetchProductImage,
} from "@/lib/functions/product-fetcher";
import { fetchAllCategories } from "@/lib/functions/category-fetcher";
import generateOrderId from "@/lib/functions/orders";
import { createOrder } from "@/lib/models/orders";
// Types and Constants
import { auth } from "@/lib/config/firebase";
import { colors } from "@/lib/config/constants";
import { Product, Size, Category } from "@/lib/config/types";
// Images
import fireImage from "@/public/misc/fire.webp";
// Components
import StyledLoading from "../styled/Loading";
import { StyledSectionHeading } from "../styled/Heading";
import ProductPageDescription from "./ProductPageDescription";
import ProductPageAdditional from "./ProductPageAdditional";
import ProductPageReviews from "./ProductPageReviews";
import RelatedProducts from "./RelatedProducts";
import SizePicker from "../common/SizePicker";
// Icons
import ChevronRightIcon from "../icon/ChevronRight";
import HeartIcon from "../icon/Heart";
import CheckmarkRoundIcon from "../icon/CheckmarkRound";
import PlaneIcon from "../icon/Plane";
import ReturnsPadIcon from "../icon/ReturnsPad";
import WarrantyIcon from "../icon/Warranty";
import ShieldIcon from "../icon/Shield";
import FacebookIcon from "../icon/Facebook";
import { InstagramIconFilled } from "../icon/Instagram";
import LinkedInIcon from "../icon/LinkedIn";
// Styles
import "./candystripe.css";

type ProductInfoProps = {
	product: Product;
	showTooltip: boolean;
	setShowTooltip: (value: boolean) => void;
};

const ProductInfo: FC<ProductInfoProps> = ({
	product,
	showTooltip,
	setShowTooltip,
}): JSX.Element => {
	// Wishlist store
	const wishlistItems = useWishlistStore((state) => state.items);
	const addWishlistItem = useWishlistStore((state) => state.addItem);
	const removeWishlistItem = useWishlistStore((state) => state.removeItem);

	const itemAlreadyInWishlist = wishlistItems.some(
		(item) => item.productId === product.id,
	);

	const handleAddToWishlist = () => {
		if (product) {
			if (itemAlreadyInWishlist) {
				removeWishlistItem({
					productId: product.id,
				});
			} else {
				addWishlistItem({
					productId: product.id,
				});
			}
		}
	};

	return (
		<>
			<div className="flex justify-between items-center pb-4">
				<p className="font-medium text-xl tracking-widest">
					{product.name}
				</p>
				<div className="relative">
					<button
						type="button"
						onMouseEnter={() => {
							setShowTooltip(true);
						}}
						onMouseLeave={() => setShowTooltip(false)}
						onTouchStart={() => {
							setShowTooltip(false);
						}}
						onTouchEnd={() => {
							setShowTooltip(false);
						}}
						className="hover:text-secondary transition-colors duration-200 ease-in-out"
						onClick={handleAddToWishlist}
					>
						{itemAlreadyInWishlist ? (
							<CheckmarkRoundIcon />
						) : (
							<HeartIcon />
						)}
					</button>

					<motion.span
						className="absolute bottom-full mb-2 w-auto min-w-[160px] p-3 bg-black text-white text-xs rounded z-50 -translate-x-1/2 right-1/2 text-center"
						initial="hidden"
						animate={showTooltip ? "visible" : "hidden"}
						variants={{
							hidden: {
								opacity: 0,
								y: -10,
								scale: 0.5,
							},
							visible: { opacity: 1, y: 0, scale: 1 },
						}}
						style={{ whiteSpace: "nowrap" }}
					>
						{itemAlreadyInWishlist
							? "Item added to wishlist"
							: "Add to wishlist"}
					</motion.span>
				</div>
			</div>
			<div className="flex items-center border-b border-gray-300 pb-6 mb-4">
				<p className="font-medium text-lg tracking-widest text-secondary">
					${product.price.toFixed(2)}
				</p>
				{product.previousPrice &&
					product.previousPrice > product.price && (
						<span className="pl-2 line-through text-gray-400">
							${product.previousPrice.toFixed(2)}
						</span>
					)}
			</div>
			<div className="pb-4">
				<p className="text-sm leading-7 text-justify text-gray-500">
					{product.perex}
				</p>
			</div>
		</>
	);
};

const SpecialOffer = (): JSX.Element => (
	<div className="border border-gray-200 relative mt-4">
		<p className="font-medium text-green-600 uppercase tracking-widest bg-white absolute -top-4 left-1/4 text-xl">
			Special Offer
		</p>
		<ul className="pt-2 text-green-600">
			<li className="flex items-center justify-between py-1 px-4">
				<p className="text-sm">Free Shipping</p>
				<p className="text-sm text-green-600">+$0.00</p>
			</li>
			<li className="flex items-center justify-between py-1 px-4">
				<p className="text-sm">Free Returns</p>
				<p className="text-sm">+$0.00</p>
			</li>
			<li className="flex items-center justify-between py-1 px-4">
				<p className="text-sm">Money Back Guarantee</p>
				<p className="text-sm">+$0.00</p>
			</li>
		</ul>
	</div>
);

// TODO: Implement real-time selling info
const SellingInfo = (): JSX.Element => {
	return (
		<>
			<div className="my-3 font-medium tracking-wider text-center md:text-start">
				<span className="text-secondary text-lg">16</span> sold in the
				last <span className="text-secondary text-lg">24</span> hours
			</div>
			<div className="my-3 font-medium tracking-wider text-secondary uppercase flex items-center justify-center md:justify-start">
				<Image
					src={fireImage.src}
					width={20}
					height={20}
					alt="fire icon"
					className="inline mr-2"
				/>
				<span>
					Hurry! only <span className="text-lg font-bold">24</span>{" "}
					left in stock!
				</span>
			</div>
			<div className="meter">
				<span style={{ width: `${50}%` }} />
			</div>
		</>
	);
};

const ProductModals = (): JSX.Element => {
	const setSizeGuideModalOpen = useModalsStore(
		(state) => state.setSizeGuideModalOpen,
	);
	const setDeliveryInfoModalOpen = useModalsStore(
		(state) => state.setDeliveryInfoModalOpen,
	);
	const setAskQuestionModalOpen = useModalsStore(
		(state) => state.setAskQuestionModalOpen,
	);

	return (
		<div className="flex pb-2 justify-between w-full sm:px-10 md:w-96 md:px-0">
			<motion.button
				className="text-sm leading-8 text-justify font-semibold"
				onClick={() => setSizeGuideModalOpen(true)}
			>
				Size Guide
			</motion.button>
			<motion.button
				className="text-sm leading-8 text-justify font-semibold"
				onClick={() => setDeliveryInfoModalOpen(true)}
			>
				Delivery & Return
			</motion.button>
			<motion.button
				className="text-sm leading-8 text-justify font-semibold"
				onClick={() => setAskQuestionModalOpen(true)}
			>
				Ask a Question
			</motion.button>
		</div>
	);
};

type BuyingSectionProps = {
	product: Product;
};

const BuyingSection: FC<BuyingSectionProps> = ({ product }): JSX.Element => {
	const [quantity, setQuantity] = useState<number>(1);
	const [selectedSize, setSelectedSize] = useState<Size | null>(null);
	const addItem = useCartStore((state) => state.addItem);
	const setProductAddedModalOpen = useModalsStore(
		(state) => state.setProductAddedModalOpen,
	);
	const setCartProduct = useModalsStore((state) => state.setCartProduct);

	useEffect(() => {
		document.addEventListener("visibilitychange", updateCartStore);
		window.addEventListener("focus", updateCartStore);
		return () => {
			document.removeEventListener("visibilitychange", updateCartStore);
			window.removeEventListener("focus", updateCartStore);
		};
	}, []);

	const handleAddToCart = () => {
		if (product && selectedSize) {
			addItem({
				productId: product.id,
				price: product.price,
				quantity,
				sizeId: selectedSize.id,
			});
			setCartProduct(product, selectedSize);
			setProductAddedModalOpen(true);
			setQuantity(1);
		}
	};

	const handleBuytItNow = async () => {
		const orderId = generateOrderId();
		try {
			await createOrder({
				id: orderId,
				email: auth.currentUser?.email || "",
				items: [
					{
						productId: product.id,
						sizeId: selectedSize?.id || 0,
						price: product.price,
						quantity,
					},
				],
				createdAt: new Date(),
				status: "pending",
				paid: false,
			});
		} catch (error) {
			console.error("Error:", error);
			alert(error); // TODO: replace with toast
			return;
		}

		const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: `${product.name} Size:${selectedSize?.name}`,
						// images: [imageUrl?.replace("blob:", "") || ""],
					},
					unit_amount: product.price * 100,
				},
				quantity,
			},
		];

		fetch("/api/checkout-session", {
			method: "POST",
			body: JSON.stringify({
				lineItems,
				orderId,
				email: auth.currentUser?.email || "",
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.sessionUrl) {
					window.location.href = data.sessionUrl;
				} else {
					throw new Error("No session URL returned");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				alert(error); // TODO: replace with toast
			});
	};

	return (
		<>
			<hr className="border-t border-gray-300" />
			<SizePicker
				product={product}
				selectedSize={selectedSize}
				setSelectedSize={setSelectedSize}
			/>
			<div className="py-4 grid grid-cols-3 gap-4 w-full">
				<div className="flex items-center justify-start">
					<button
						type="button"
						className={`p-2 border ${
							quantity === 1
								? "border-gray-200 text-gray-300"
								: "border-gray-300 text-black"
						}`}
						onClick={() => {
							setQuantity((prev) => prev - 1);
						}}
						disabled={quantity === 1}
					>
						-
					</button>
					<div className="w-12 text-center select-none">
						{quantity}
					</div>
					<button
						type="button"
						className={`p-2 border ${
							quantity === 10
								? "border-gray-200 text-gray-300"
								: "border-gray-300 text-black"
						}`}
						onClick={() => {
							setQuantity((prev) => prev + 1);
						}}
						disabled={quantity === 10}
					>
						+
					</button>
				</div>
				<div className="flex flex-col col-span-2">
					<button
						type="button"
						className={`bg-black px-4 py-2 uppercase tracking-widest font-semibold ${
							selectedSize != null
								? "hover:bg-secondary text-white"
								: "bg-white text-gray-300 border border-gray-300"
						}`}
						onClick={handleAddToCart}
						disabled={selectedSize === null}
					>
						Add to cart
					</button>
				</div>
			</div>
			<div className="flex flex-col col-span-2">
				<button
					type="button"
					className={`bg-black px-4 py-2 uppercase tracking-widest font-semibold ${
						selectedSize != null
							? "hover:bg-secondary text-white"
							: "bg-white text-gray-300 border border-gray-300"
					}`}
					onClick={handleBuytItNow}
					disabled={selectedSize === null}
				>
					Buy it now
				</button>
			</div>
		</>
	);
};

type CategoriesProps = {
	categories: number[];
};

const ProductCategories: FC<CategoriesProps> = ({
	categories,
}): JSX.Element => {
	const [categoriesList, setCategoriesList] = useState<Category[]>([]);
	const [filteredCategories, setFilteredCategories] = useState<Category[]>(
		[],
	);

	useEffect(() => {
		fetchAllCategories(setCategoriesList);
	}, []);

	useEffect(() => {
		setFilteredCategories(
			categoriesList.filter((category) =>
				categories.includes(category.id),
			),
		);
	}, [categories, categoriesList]);

	return (
		<div className="flex items-center text-sm uppercase font-medium">
			<div className="inline-block pr-4">Categories:</div>
			<div className="flex flex-wrap items-center py-2">
				{filteredCategories &&
					filteredCategories.map((category) => (
						<Link
							href={`/products?page=1&category=${category.id}`}
							key={category.slug}
						>
							<motion.button
								type="button"
								whileHover={{
									backgroundColor: colors.secondary,
									color: colors.white,
								}}
								className="bg-gray-200 text-gray-500 px-2 py-1 mr-2 mb-2 inline-block"
							>
								{category.name}
							</motion.button>
						</Link>
					))}
			</div>
		</div>
	);
};

type TagsProps = {
	tags: string[];
};

const ProductTags: FC<TagsProps> = ({ tags }): JSX.Element => {
	return (
		<div className="flex items-center text-sm uppercase font-medium">
			<div className="inline-block pr-4">Tags:</div>
			<div className="flex flex-wrap items-center py-2">
				{tags.map((tag) => (
					<Link href={`/products?page=1&tags=${tag}`} key={tag}>
						<motion.button
							type="button"
							whileHover={{
								backgroundColor: colors.secondary,
								color: colors.white,
							}}
							className="bg-gray-200 text-gray-500 px-2 py-1 mr-2 mb-2 inline-block"
						>
							{tag}
						</motion.button>
					</Link>
				))}
			</div>
		</div>
	);
};

type ProductPageOverviewProps = {
	productId: number;
};

const ProductPageOverview: FC<ProductPageOverviewProps> = ({
	productId,
}): JSX.Element => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);
	const setProductImageModalOpen = useModalsStore(
		(state) => state.setProductImageModalOpen,
	);
	const setProductImageModalUrl = useModalsStore(
		(state) => state.setProductImageModalUrl,
	);
	const [product, setProduct] = useState<Product>();
	const [imageUrl, setImageUrl] = useState<string | null>();

	const [productMenuSelected, setProductMenuSelected] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedProduct = await fetchProductById(productId);
				setProduct(fetchedProduct);

				const fetchedUrl = await fetchProductImage(productId);
				setImageUrl(fetchedUrl);
				setProductImageModalUrl(fetchedUrl);
			} catch (error) {
				console.error("Fetching product failed:", error);
			}
		};

		fetchData();

		document.getElementById("product-overview")?.scrollIntoView();
	}, [productId]);

	if (!product || !imageUrl) {
		return (
			<div className="flex items-center justify-center h-screen">
				<StyledLoading />
			</div>
		);
	}

	const handleContent = () => {
		switch (productMenuSelected) {
			case 0:
				return (
					<motion.div>
						<ProductPageDescription product={product} />
					</motion.div>
				);
			case 1:
				return (
					<motion.div>
						<ProductPageAdditional imageUrl={imageUrl} />
					</motion.div>
				);
			case 2:
				return (
					<motion.div>
						<ProductPageReviews product={product} />
					</motion.div>
				);
			default:
				return <></>;
		}
	};

	return (
		<>
			<section id="header-url">
				<div
					className="text-start text-xs sm:text-sm w-full px-4 flex items-center bg-gray-100 py-2 mt-16 lg:mt-24 lg:pt-4"
					id="product-overview"
				>
					<Link href="/">
						<motion.p
							whileHover={{
								color: colors.secondary,
							}}
							whileTap={{
								color: colors.secondary,
							}}
							transition={{ duration: 0.2 }}
							className="inline"
						>
							Home
						</motion.p>
					</Link>
					<ChevronRightIcon />
					<Link href="/products?page=1">
						<motion.p
							whileHover={{
								color: colors.secondary,
							}}
							whileTap={{
								color: colors.secondary,
							}}
							transition={{ duration: 0.2 }}
							className="inline"
						>
							Products
						</motion.p>
					</Link>
					<ChevronRightIcon />
					<Link href={`/products/${product.slug}`}>
						<motion.p
							whileHover={{
								color: colors.secondary,
							}}
							whileTap={{
								color: colors.secondary,
							}}
							transition={{ duration: 0.2 }}
							className="inline"
						>
							{product.name}
						</motion.p>
					</Link>
				</div>
			</section>
			<section id="product-details">
				<div className="flex flex-col md:flex-row my-10 mx-8 lg:mx-20">
					{imageUrl && (
						<button
							type="button"
							aria-label="Product image"
							className="md:flex-2/3 md:pr-10 pb-10 max-h-screen"
							onClick={() => setProductImageModalOpen(true)}
						>
							<Image
								src={imageUrl}
								alt={product.name}
								width={800}
								height={800}
								style={{
									objectFit: "cover",
									objectPosition: "center",
									maxHeight: "90vh",
								}}
								priority
							/>
						</button>
					)}
					{/* TODO: add variants here */}
					<div
						className="md:flex-1"
						onTouchStart={() => {
							setShowTooltip(false);
						}}
					>
						<div className="">
							<ProductInfo
								product={product}
								showTooltip={showTooltip}
								setShowTooltip={setShowTooltip}
							/>

							<SpecialOffer />
							<SellingInfo />
							<ProductModals />
							<BuyingSection product={product} />
							<hr className="border-gray-300 my-4" />
							<ProductCategories
								categories={product.categories}
							/>
							<ProductTags tags={product.tags} />
						</div>
					</div>
				</div>
			</section>
			<section id="product-features">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
					<div className="mx-8 border border-gray-300 p-6 flex flex-col justify-center items-center text-center">
						<p className="text-secondary">
							<PlaneIcon />
						</p>
						<h3 className="text-xs pt-4 font-medium uppercase tracking-widest">
							Worldwide shipping
						</h3>
					</div>
					<div className="mx-8 border border-gray-300 p-6 flex flex-col justify-center items-center text-center">
						<p className="text-secondary">
							<ReturnsPadIcon />
						</p>
						<h3 className="text-xs pt-4 font-medium uppercase tracking-widest">
							Free 60-day returns
						</h3>
					</div>
					<div className="mx-8 border border-gray-300 p-6 flex flex-col justify-center items-center text-center">
						<p className="text-secondary">
							<WarrantyIcon />
						</p>
						<h3 className="text-xs pt-4 font-medium uppercase tracking-widest">
							24 month warranty
						</h3>
					</div>
					<div className="mx-8 border border-gray-300 p-6 flex flex-col justify-center items-center text-center">
						<p className="text-secondary">
							<ShieldIcon />
						</p>
						<h3 className="text-xs pt-4 font-medium uppercase tracking-widest">
							100% secure checkout
						</h3>
					</div>
				</div>
			</section>

			<section id="product-description">
				<hr className="border-gray-300 my-4" />
				<div className="flex items-center justify-center px-6">
					<div className="text-xs sm:text-base w-full sm:w-3/4 lg:w-3/5 xl:w-2/5 flex justify-between uppercase">
						<motion.button
							className={`relative uppercase tracking-widest ${
								productMenuSelected === 0 && "font-semibold"
							}`}
							onClick={() => setProductMenuSelected(0)}
							whileHover={{
								color:
									productMenuSelected === 0
										? colors.black
										: colors.secondary,
							}}
							whileTap={{
								color:
									productMenuSelected === 0
										? colors.black
										: colors.secondary,
							}}
						>
							Description
							<AnimatePresence>
								{productMenuSelected === 0 && (
									<motion.div
										className="absolute left-0 bottom-0 h-0.5 bg-secondary"
										initial={{
											width: 0,
											x: 0,
										}}
										animate={{
											width: "100%",
											x: 0,
										}}
										exit={{
											width: 0,
											x: 0,
											backgroundColor: "#333",
										}}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
									/>
								)}
							</AnimatePresence>
						</motion.button>
						<motion.button
							className={`relative uppercase tracking-widest ${
								productMenuSelected === 1 && "font-semibold"
							}`}
							onClick={() => setProductMenuSelected(1)}
							whileHover={{
								color:
									productMenuSelected === 1
										? colors.black
										: colors.secondary,
							}}
							whileTap={{
								color:
									productMenuSelected === 1
										? colors.black
										: colors.secondary,
							}}
						>
							Additional Info
							<AnimatePresence>
								{productMenuSelected === 1 && (
									<motion.div
										className="absolute left-0 bottom-0 h-0.5 bg-secondary"
										initial={{
											width: 0,
											x: 0,
										}}
										animate={{
											width: "100%",
											x: 0,
										}}
										exit={{
											width: 0,
											x: 0,
											backgroundColor: "#333",
										}}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
									/>
								)}
							</AnimatePresence>
						</motion.button>
						<motion.button
							className={`relative uppercase tracking-widest ${
								productMenuSelected === 2 && "font-semibold"
							}`}
							onClick={() => setProductMenuSelected(2)}
							whileHover={{
								color:
									productMenuSelected === 2
										? colors.black
										: colors.secondary,
							}}
							whileTap={{
								color:
									productMenuSelected === 2
										? colors.black
										: colors.secondary,
							}}
						>
							Reviews
							<AnimatePresence>
								{productMenuSelected === 2 && (
									<motion.div
										className="absolute left-0 bottom-0 h-0.5 bg-secondary"
										initial={{
											width: 0,
											x: 0,
										}}
										animate={{
											width: "100%",
											x: 0,
										}}
										exit={{
											width: 0,
											x: 0,
											backgroundColor: "#333",
										}}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
									/>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</div>
				<hr className="border-gray-300 my-4" />
				<AnimatePresence>{handleContent()}</AnimatePresence>
			</section>
			<section id="product-social">
				<hr className="border-gray-300 mt-6" />
				<div className="flex items-center justify-center">
					<div className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/5 pt-4 flex flex-row gap-4 justify-between text-gray-600">
						<Link
							href="https://www.facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<motion.p
								whileHover={{
									scale: 1.1,
									color: colors.secondary,
								}}
							>
								<FacebookIcon />
							</motion.p>
						</Link>
						<Link
							href="https://www.instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<motion.p
								whileHover={{
									scale: 1.1,
									color: colors.secondary,
								}}
							>
								<InstagramIconFilled />
							</motion.p>
						</Link>
						<Link
							href="https://www.linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<motion.p
								whileHover={{
									scale: 1.1,
									color: colors.secondary,
								}}
							>
								<LinkedInIcon />
							</motion.p>
						</Link>
					</div>
				</div>
				<hr className="border-gray-300 my-4" />
			</section>
			<section id="related-products">
				<StyledSectionHeading
					title="Related products"
					className="pt-4"
				/>
				<RelatedProducts tags={product.tags} />
			</section>
		</>
	);
};

export default ProductPageOverview;
