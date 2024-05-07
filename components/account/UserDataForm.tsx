"use client";

import React, { FC, useEffect, useState } from "react";
// Components
import {
	StyledSubmitButton,
	StyledTextInput,
} from "@/components/styled/Inputs";
// Types and constants
import { User, updateUser } from "@/lib/models/user";

type UserDataFormProps = {
	userData: User | null;
	email: string;
};

const UserDataForm: FC<UserDataFormProps> = ({
	userData,
	email,
}): JSX.Element => {
	const [firstName, setFirstName] = useState<string>(
		userData?.firstName || "",
	);
	const [lastName, setLastName] = useState<string>(userData?.lastName || "");
	const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (userData) {
			setFirstName(userData.firstName || "");
			setLastName(userData.lastName || "");
			setPhoneNumber(userData.phoneNumber || "");
		}
	}, [userData]);

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const phone = e.target.value;
		const cleanedPhone = phone.replace(/\D/g, "");
		const match = cleanedPhone.match(/^(\d{3})(\d{3})(\d{4})$/);

		if (match) {
			const formattedPhone = `(${match[1]}) ${match[2]}-${match[3]}`;
			setPhoneNumber(formattedPhone);
		} else {
			setPhoneNumber(phone);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await updateUser({
				firstName,
				lastName,
				phoneNumber,
			});
		} catch (err: any) {
			setError(err.message);
		}

		setLoading(false);
	};

	return (
		<form className="space-y-4">
			<StyledTextInput
				label="First Name"
				id="firstName"
				handleChange={(e) => setFirstName(e.target.value)}
				value={firstName}
				placeholder="John"
				disabled={loading}
			/>
			<StyledTextInput
				label="Last Name"
				id="lastName"
				handleChange={(e) => setLastName(e.target.value)}
				value={lastName}
				placeholder="Doe"
				disabled={loading}
			/>
			<StyledTextInput
				type="email"
				label="Email"
				id="email"
				handleChange={() => {}}
				value={email}
				disabled
			/>
			<StyledTextInput
				label="Phone Number"
				id="phoneNumber"
				handleChange={handlePhoneChange}
				value={phoneNumber}
				pattern="\\d{3}-\\d{3}-\\d{4}"
				placeholder="123-456-7890"
				disabled={loading}
			/>

			<div className="flex items-center justify-center">
				<StyledSubmitButton onSubmit={handleSubmit}>
					Save Changes
				</StyledSubmitButton>
			</div>
			{error && <p className="text-red-500 text-center">{error}</p>}
		</form>
	);
};

export default UserDataForm;
