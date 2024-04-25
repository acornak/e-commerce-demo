"use client";

import React, { FC, ReactNode, useEffect } from "react";
// Next
import { usePathname } from "next/navigation";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Store
import { useModalsStore } from "@/lib/stores/modals-store";
// Components
import Navbar from "../navbar/Navbar";
import SearchBar from "../navbar/SearchBar";
import ShoppingCart from "../navbar/Cart";
import NavbarAdmin from "../navbar/NavbarAdmin";
import Sitemap from "../footer/Sitemap";
import Footer from "../footer/Footer";
import LoginModal from "../modal/LoginModal";
import CookieConsent from "../modal/CookieConsent";
import ProductPreviewModal from "../modal/ProductPreviewModal";
import ProductAddedModal from "../modal/ProductAddedModal";

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

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (searchBarOpen) setSearchBarOpen(false);
				if (drawerMenuOpen) setDrawerMenuOpen(false);
				if (loginModalOpen) setLoginModalOpen(false);
				if (cartBarOpen) setCartBarOpen(false);
				if (productAddedModalOpen) setProductAddedModalOpen(false);
				if (productPreviewModalOpen) setProductPreviewModalOpen(false);
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
		setSearchBarOpen,
		setDrawerMenuOpen,
		setLoginModalOpen,
		setCartBarOpen,
		setProductAddedModalOpen,
		setProductPreviewModalOpen,
	]);

	const showFade = (): boolean => {
		if (
			searchBarOpen ||
			drawerMenuOpen ||
			loginModalOpen ||
			cartBarOpen ||
			productAddedModalOpen ||
			productPreviewModalOpen
		)
			return true;
		return false;
	};

	if (pathname.includes("/admin")) {
		return (
			<>
				<NavbarAdmin />
				{children}
				<div className="sticky top-[100vh]">
					<Footer />
				</div>
			</>
		);
	}

	return (
		<>
			<LoginModal />
			<SearchBar />
			<ShoppingCart />
			<ProductAddedModal />
			<ProductPreviewModal />
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
						}}
					/>
				)}
			</AnimatePresence>
			<Navbar />
			<CookieConsent />
			{children}
			<div className="sticky top-[100vh]">
				<Sitemap />
				<Footer />
			</div>
		</>
	);
};

export default LayoutWrapper;
