import React, { FC } from "react";
// Types and constants
import { ChevronProps } from "@/config/types";

const ChevronLeftIcon: FC<ChevronProps> = ({ size = "1.3em" }): JSX.Element => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		height={size}
		width={size}
		data-testid="ChevronLefticon"
	>
		<path d="M13.293 6.293L7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
	</svg>
);

export default ChevronLeftIcon;
