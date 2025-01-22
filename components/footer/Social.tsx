"use client";

import React, { useState } from "react";
// Components
import { StyledSectionHeading } from "../styled/Heading";
import InstagramImages from "./InstagramImages";

const Social = (): JSX.Element => {
	const [firstImage, setFirstImage] = useState<number>(0);

	const handleNext = (): void => {
		setFirstImage((prev) => prev + 1);
	};

	const handlePrevious = (): void => {
		setFirstImage((prev) => prev - 1);
	};

	return (
		<div
			className="flex flex-col justify-center items-center text-center"
			data-testid="social-footer"
		>
			<StyledSectionHeading title="Glassify on Instagram" />
			<p className="text-2xl tracking-widest py-6 text-secondary">
				#glassify
			</p>
			<div className="flex flex-wrap justify-center items-center relative">
				<div className="hidden xl:flex">
					<InstagramImages
						firstImage={firstImage}
						imageCount={4}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
				<div className="hidden lg:flex xl:hidden">
					<InstagramImages
						firstImage={firstImage}
						imageCount={3}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
				<div className="hidden md:flex lg:hidden">
					<InstagramImages
						firstImage={firstImage}
						imageCount={2}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
				<div className="md:hidden">
					<InstagramImages
						firstImage={firstImage}
						imageCount={1}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</div>
			</div>
		</div>
	);
};

export default Social;
