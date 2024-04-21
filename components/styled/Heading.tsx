import React, { FC } from "react";

type SectionHeadingProps = {
	title: string;
};

const SectionHeading: FC<SectionHeadingProps> = ({ title }) => {
	return (
		<div className="text-3xl uppercase tracking-widest py-6 text-center">
			{title}
			<div className="max-w-60 bg-orange-500 h-1 mx-auto mt-2" />
		</div>
	);
};

export default SectionHeading;
