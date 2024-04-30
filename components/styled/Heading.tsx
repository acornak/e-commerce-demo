import React, { FC } from "react";

type HeadingProps = {
	title: string;
	className?: string;
};

export const StyledSectionHeading: FC<HeadingProps> = ({
	title,
	className = "py-6",
}) => {
	return (
		<div
			className={`text-3xl uppercase tracking-widest text-center ${className}`}
		>
			{title}
			<div className="max-w-60 bg-orange-500 h-1 mx-auto mt-2" />
		</div>
	);
};

export const StyledHeroHeading: FC<HeadingProps> = ({
	title,
	className = "pb-4",
}) => {
	return (
		<h1
			className={`text-white text-3xl sm:text-5xl md:text-6xl tracking-widest font-semibold ${className}`}
		>
			{title}
		</h1>
	);
};
