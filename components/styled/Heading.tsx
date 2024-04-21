import React, { FC } from "react";

type HeadingProps = {
	title: string;
};

export const StyledSectionHeading: FC<HeadingProps> = ({ title }) => {
	return (
		<div className="text-3xl uppercase tracking-widest py-6 text-center">
			{title}
			<div className="max-w-60 bg-orange-500 h-1 mx-auto mt-2" />
		</div>
	);
};

export const StyledHeroHeading: FC<HeadingProps> = ({ title }) => {
	return (
		<h1 className="text-white text-3xl sm:text-5xl md:text-6xl pb-4 tracking-widest font-semibold">
			{title}
		</h1>
	);
};
