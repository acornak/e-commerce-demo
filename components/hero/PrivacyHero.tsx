import React from "react";
// Next
import Image from "next/image";
// Image
import heroImage from "@/public/misc/privacy.webp";

const PrivacyHero = (): JSX.Element => {
	return (
		<section className="flex flex-col items-center justify-center h-[50%]">
			<div className="flex justify-center items-center relative w-full h-full">
				<Image
					src={heroImage.src}
					alt="Privacy Hero"
					fill
					style={{
						objectFit: "cover",
					}}
					priority
				/>
			</div>
		</section>
	);
};

export default PrivacyHero;
