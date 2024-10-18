import React, { useState } from "react";
// Components
import {
	StyledSubmitButton,
	StyledTextInput,
} from "@/components/styled/Inputs";

const PasswordForm = (): JSX.Element => {
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [confirmPasswordError, setConfirmPasswordError] =
		useState<string>("");

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPassword(value);
		if (!value) {
			setPasswordError("Please enter your password");
		} else {
			setPasswordError("");
		}
	};

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { value } = e.target;
		setConfirmPassword(value);
		if (!value) {
			setConfirmPasswordError("Please confirm your password");
		} else if (value !== password) {
			setConfirmPasswordError("Passwords do not match");
		} else {
			setConfirmPasswordError("");
		}
	};

	return (
		<form className="space-y-4">
			<div className="flex flex-col items-center py-4">
				<p className="text-lg tracking-wider border-b border-secondary">
					Change Password
				</p>
			</div>
			<StyledTextInput
				label="Password"
				id="password"
				handleChange={handlePasswordChange}
				value={password}
				type="password"
			/>
			{passwordError && (
				<p className="text-red-500 text-sm">{passwordError}</p>
			)}
			<StyledTextInput
				label="Confirm Password"
				id="confirmPassword"
				handleChange={handleConfirmPasswordChange}
				value={confirmPassword}
				type="password"
			/>
			{confirmPasswordError && (
				<p className="text-red-500 text-sm">{confirmPasswordError}</p>
			)}
			<div className="flex items-center justify-center">
				{/* TODO */}
				<StyledSubmitButton onSubmit={() => {}}>
					Save Changes
				</StyledSubmitButton>
			</div>
		</form>
	);
};

export default PasswordForm;
