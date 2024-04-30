"use client";

import React, { useState } from "react";
// Next
import { NextPage } from "next";
// Components
import { StyledSectionHeading } from "@/components/styled/Heading";
import HandleLoginForm from "@/components/common/LoginForm";

const LoginPage: NextPage = (): JSX.Element => {
	const [showRegister, setShowRegister] = useState(false);

	return (
		<>
			<div className="my-3 pt-20 ">
				<StyledSectionHeading title="Login or Register" />
			</div>
			<div className="flex items-center justify-center">
				<div className="w-72">
					<HandleLoginForm
						showRegister={showRegister}
						setShowRegister={setShowRegister}
					/>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
