import React, { FC } from "react";

type ProfileWrapperProps = {
	children: React.ReactNode;
	heading: string;
	width?: string;
};

const ProfileWrapper: FC<ProfileWrapperProps> = ({
	children,
	heading,
	width = "w-full md:w-2/3",
}): JSX.Element => {
	return (
		<div className={`flex flex-col items-center justify-center ${width}`}>
			<h1 className="text-xl tracking-wider border-b border-secondary mb-4">
				{heading}
			</h1>
			<div className="w-full px-10">{children}</div>
		</div>
	);
};

export default ProfileWrapper;
