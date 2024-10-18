"use client";

import React, { FC, ReactNode, useEffect } from "react";
// Next
import { redirect, usePathname } from "next/navigation";
// Captcha
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
// Components
import { useAuthStore } from "@/lib/stores/auth-store";
import Navbar from "../navbar/Navbar";
import SearchBar from "../navbar/SearchBar";

import NavbarAdmin from "../navbar/NavbarAdmin";
import Sitemap from "../footer/Sitemap";
import Footer from "../footer/Footer";
import LoginModal from "../modal/LoginModal";
import CookieConsent from "../modal/CookieConsent";
import ProductPreviewModal from "../modal/ProductPreviewModal";
import ProductAddedModal from "../modal/ProductAddedModal";
import DeliveryInfoModal from "../modal/DeliveryInfoModal";
import SizeGuideModal from "../modal/SizeGuideModal";
import AskQuestionModal from "../modal/AskQuestionModal";
import ProductImageModal from "../modal/ProductImageModal";
import StyledLoading from "../styled/Loading";
import ShoppingCart from "../navbar/ShoppingCart";

type LayoutWrapperProps = {
	children: ReactNode;
};

const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
	const pathname = usePathname();

	const loginModalOpen = useModalsStore((state) => state.loginModalOpen);
	const productAddedModalOpen = useModalsStore(
		(state) => state.productAddedModalOpen,
	);
	const productPreviewModalOpen = useModalsStore(
		(state) => state.productPreviewModalOpen,
	);
	const cartBarOpen = useModalsStore((state) => state.cartBarOpen);
	const searchBarOpen = useModalsStore((state) => state.searchBarOpen);
	const drawerMenuOpen = useModalsStore((state) => state.drawerMenuOpen);
	const deliveryModalOpen = useModalsStore(
		(state) => state.deliveryInfoModalOpen,
	);
	const sizeGuideModalOpen = useModalsStore(
		(state) => state.sizeGuideModalOpen,
	);
	const askQuestionModalOpen = useModalsStore(
		(state) => state.askQuestionModalOpen,
	);
	const productImageModalOpen = useModalsStore(
		(state) => state.productImageModalOpen,
	);

	const setLoginModalOpen = useModalsStore(
		(state) => state.setLoginModalOpen,
	);
	const setProductAddedModalOpen = useModalsStore(
		(state) => state.setProductAddedModalOpen,
	);
	const setProductPreviewModalOpen = useModalsStore(
		(state) => state.setProductPreviewModalOpen,
	);
	const setCartBarOpen = useModalsStore((state) => state.setCartBarOpen);
	const setDrawerMenuOpen = useModalsStore(
		(state) => state.setDrawerMenuOpen,
	);
	const setSearchBarOpen = useModalsStore((state) => state.setSearchBarOpen);
	const setDeliveryInfoModalOpen = useModalsStore(
		(state) => state.setDeliveryInfoModalOpen,
	);
	const setSizeGuideModalOpen = useModalsStore(
		(state) => state.setSizeGuideModalOpen,
	);
	const setAskQuestionModalOpen = useModalsStore(
		(state) => state.setAskQuestionModalOpen,
	);
	const setProductImageModalOpen = useModalsStore(
		(state) => state.setProductImageModalOpen,
	);
	const user = useAuthStore((state) => state.user);
	const initialLoading = useAuthStore((state) => state.initialLoading);

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (searchBarOpen) setSearchBarOpen(false);
				if (drawerMenuOpen) setDrawerMenuOpen(false);
				if (loginModalOpen) setLoginModalOpen(false);
				if (cartBarOpen) setCartBarOpen(false);
				if (productAddedModalOpen) setProductAddedModalOpen(false);
				if (productPreviewModalOpen) setProductPreviewModalOpen(false);
				if (deliveryModalOpen) setDeliveryInfoModalOpen(false);
				if (sizeGuideModalOpen) setSizeGuideModalOpen(false);
				if (askQuestionModalOpen) setAskQuestionModalOpen(false);
				if (productImageModalOpen) setProductImageModalOpen(false);
			}
		};

		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [
		searchBarOpen,
		drawerMenuOpen,
		loginModalOpen,
		cartBarOpen,
		productAddedModalOpen,
		productPreviewModalOpen,
		deliveryModalOpen,
		sizeGuideModalOpen,
		askQuestionModalOpen,
		productImageModalOpen,
		setSearchBarOpen,
		setDrawerMenuOpen,
		setLoginModalOpen,
		setCartBarOpen,
		setProductAddedModalOpen,
		setProductPreviewModalOpen,
		setDeliveryInfoModalOpen,
		setSizeGuideModalOpen,
		setAskQuestionModalOpen,
		setProductImageModalOpen,
	]);

	const showFade = (): boolean => {
		if (
			searchBarOpen ||
			drawerMenuOpen ||
			loginModalOpen ||
			cartBarOpen ||
			productAddedModalOpen ||
			productPreviewModalOpen ||
			deliveryModalOpen ||
			sizeGuideModalOpen ||
			askQuestionModalOpen ||
			productImageModalOpen
		)
			return true;
		return false;
	};

	if (pathname.includes("/admin")) {
		if (!initialLoading && !user) {
			redirect(`/login?redirect=${pathname.replace("/", "")}`);
		}

		return (
			<GoogleReCaptchaProvider
				reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
				scriptProps={{
					async: false,
					defer: false,
					appendTo: "head",
					nonce: undefined,
				}}
			>
				{initialLoading && (
					<div className="flex h-screen items-center justify-center p-10">
						<StyledLoading />
					</div>
				)}
				{user && (
					<>
						<AnimatePresence>
							{showFade() && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 0.7 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="fixed inset-0 bg-black bg-opacity-80"
									style={{
										zIndex: 30,
									}}
									onClick={() => {
										setDrawerMenuOpen(false);
									}}
								/>
							)}
						</AnimatePresence>
						<NavbarAdmin />
						{children}
						<div className="sticky top-[100vh]">
							<Footer />
						</div>
					</>
				)}
			</GoogleReCaptchaProvider>
		);
	}

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
			scriptProps={{
				async: false,
				defer: false,
				appendTo: "head",
				nonce: undefined,
			}}
		>
			<LoginModal />
			<SearchBar />
			<ShoppingCart />
			<ProductAddedModal />
			<ProductPreviewModal />
			<CookieConsent />
			<DeliveryInfoModal />
			<SizeGuideModal />
			<AskQuestionModal />
			<ProductImageModal />
			<AnimatePresence>
				{showFade() && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.7 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black bg-opacity-80"
						style={{
							zIndex: 30,
						}}
						onClick={() => {
							setSearchBarOpen(false);
							setDrawerMenuOpen(false);
							setLoginModalOpen(false);
							setCartBarOpen(false);
							setProductAddedModalOpen(false);
							setProductPreviewModalOpen(false);
							setDeliveryInfoModalOpen(false);
							setSizeGuideModalOpen(false);
							setAskQuestionModalOpen(false);
							setProductImageModalOpen(false);
						}}
					/>
				)}
			</AnimatePresence>
			<Navbar />
			<div>{children}</div>
			<div className="sticky top-[100vh]">
				<Sitemap />
				<Footer />
			</div>
		</GoogleReCaptchaProvider>
	);
};

export default LayoutWrapper;
