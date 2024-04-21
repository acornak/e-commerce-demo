import React, { FC } from "react";
// Types and constants
import { ChevronProps } from "@/config/types";

const ChevronRightIcon: FC<ChevronProps> = ({
	size = "1.3em",
}): JSX.Element => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		height={size}
		width={size}
		data-testid="ChevronRighticon"
	>
		<path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
	</svg>
);

export default ChevronRightIcon;
