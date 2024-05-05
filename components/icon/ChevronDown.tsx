import React, { FC } from "react";
// Types and constants
import { ChevronProps } from "@/lib/config/types";

const ChevronDownIcon: FC<ChevronProps> = ({ size = "1.3em" }): JSX.Element => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		height={size}
		width={size}
		data-testid="ChevronDownicon"
	>
		<path d="M16.293 9.293L12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
	</svg>
);

export default ChevronDownIcon;
