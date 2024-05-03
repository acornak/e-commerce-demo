import React, { FC } from "react";

type StyledLoadingProps = {
	className?: string;
	style?: React.CSSProperties;
};

const StyledLoading: FC<StyledLoadingProps> = ({
	className = "h-48 w-48",
	style,
}) => (
	<div
		className={`animate-spin rounded-full border-t-4 border-b-4 border-secondary ${className}`}
		style={style}
	/>
);

export default StyledLoading;
