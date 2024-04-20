import React from "react";

const BarsIcon = (): JSX.Element => (
	<svg
		viewBox="0 0 64 64"
		fill="currentColor"
		height="2.5em"
		width="2.5em"
		data-testid="Barsicon"
	>
		<path
			fill="none"
			stroke="currentColor"
			strokeMiterlimit={10}
			strokeWidth={2.5}
			d="M12 21h40M12 33h40M12 45h40"
		/>
	</svg>
);

export default BarsIcon;
