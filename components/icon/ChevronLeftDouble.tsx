import React, { FC } from "react";
// Types and constants
import { ChevronProps } from "@/lib/config/types";

const ChevronLeftDoubleIcon: FC<ChevronProps> = ({
	size = "1.3em",
}): JSX.Element => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		height={size}
		width={size}
		data-testid="ChevronLeftDoubleicon"
	>
		<path d="M8.121 12l4.94-4.939-2.122-2.122L3.879 12l7.06 7.061 2.122-2.122z" />
		<path d="M17.939 4.939L10.879 12l7.06 7.061 2.122-2.122L15.121 12l4.94-4.939z" />
	</svg>
);

export default ChevronLeftDoubleIcon;
