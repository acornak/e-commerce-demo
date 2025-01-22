"use client";

import React, { FC } from "react";
// Components
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

type HandleLoginFormProps = {
	showRegister: boolean;
	setShowRegister: (show: boolean) => void;
};

const HandleLoginForm: FC<HandleLoginFormProps> = ({
	showRegister,
	setShowRegister,
}) => {
	if (showRegister) {
		return <RegisterForm setShowRegister={setShowRegister} />;
	}
	return <LoginForm setShowRegister={setShowRegister} />;
};

export default HandleLoginForm;
