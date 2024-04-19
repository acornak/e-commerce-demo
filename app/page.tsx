import React from "react";
// Components
import Navbar from "@/components/navbar/Navbar";

export default function Home(): JSX.Element {
	return (
		<>
			<Navbar />
			<main className="flex min-h-screen flex-col items-center justify-between p-24" />
		</>
	);
}
