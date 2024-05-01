import React, { FC } from "react";
// Types and constants
import { ChevronProps } from "@/lib/config/types";

const ChevronRightDoubleIcon: FC<ChevronProps> = ({
	size = "1.3em",
}): JSX.Element => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		height={size}
		width={size}
		data-testid="ChevronRightDoubleicon"
	>
		<path d="M13.061 4.939l-2.122 2.122L15.879 12l-4.94 4.939 2.122 2.122L20.121 12z" />
		<path d="M6.061 19.061L13.121 12l-7.06-7.061-2.122 2.122L8.879 12l-4.94 4.939z" />
	</svg>
);

export default ChevronRightDoubleIcon;
