import React from "react";

const MagnifierIcon = (): JSX.Element => (
	<svg
		fill="currentColor"
		viewBox="0 0 64 64"
		height="1.45em"
		width="1.45em"
		data-testid="Magnifiericon"
	>
		<g
			fill="none"
			stroke="currentColor"
			strokeMiterlimit={20}
			strokeWidth={4}
		>
			<path d="M41 21 A20 20 0 0 1 21 41 A20 20 0 0 1 1 21 A20 20 0 0 1 41 21 z" />
			<path d="M35 35l6 6" />
			<path strokeWidth={3.88888} d="M63 57l-5.999 6-19-19 6-6z" />
		</g>
	</svg>
);

export default MagnifierIcon;
