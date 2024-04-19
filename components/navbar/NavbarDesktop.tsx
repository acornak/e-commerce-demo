import React from "react";
// Fonts
import { dancing } from "@/app/fonts";
// Styles
import "./Navbar.css";
// Icons
import BagIcon from "../icons/Bag";
import MagnifierIcon from "../icons/Magnifier";
import UserIcon from "../icons/User";
import HeartIcon from "../icons/Heart";

const NavbarDesktop = (): JSX.Element => {
	return (
		<nav className="sticky top-0 bg-white w-full shadow-md z-50 flex justify-between items-center px-12 py-8">
			<div className={`${dancing.className} text-3xl logo`}>
				Demo Project
			</div>
			<ul className="hidden md:flex justify-center items-center space-x-8 uppercase grow">
				<li>Home</li>
				<li>Shop</li>
				<li>Features</li>
				<li>Pages</li>
				<li>Blogs</li>
			</ul>
			<div className="flex space-x-4">
				<MagnifierIcon />
				<UserIcon />
				<HeartIcon />
				<BagIcon />
			</div>
		</nav>
	);
};

export default NavbarDesktop;
