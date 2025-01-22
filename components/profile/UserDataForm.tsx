"use client";

import React, { FC, useEffect, useState } from "react";
// Components
import {
	StyledSubmitButton,
	StyledTextInput,
} from "@/components/styled/Inputs";
// Types and constants
import { updateUser } from "@/lib/models/user";
import { User } from "@/lib/config/types";
import Notification from "@/components/common/Notification";

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
	const [showNotification, setShowNotification] = useState<boolean>(false);
	const [notificationType, setNotificationType] = useState<
		"success" | "error"
	>("success");
	const [notificationMessage, setNotificationMessage] = useState<string>("");

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

		try {
			await updateUser({
				firstName,
				lastName,
				phoneNumber,
			});
			setNotificationType("success");
			setNotificationMessage("Changes saved successfully!");
			setShowNotification(true);
		} catch (err: any) {
			setNotificationType("error");
			setNotificationMessage(err.message);
			setShowNotification(true);
		}

		setLoading(false);
	};

	return (
		<>
			{showNotification && (
				<Notification
					message={notificationMessage}
					type={notificationType}
					onClose={() => setShowNotification(false)}
				/>
			)}
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
			</form>
		</>
	);
};

export default UserDataForm;
