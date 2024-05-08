"use client";

import React, { FC, useEffect, useState } from "react";
// Components
import {
	StyledSelectInput,
	StyledSubmitButton,
	StyledTextInput,
} from "@/components/styled/Inputs";
import { updateUser } from "@/lib/models/user";
import { User, Address } from "@/lib/config/types";

type AddressFormProps = {
	address?: Address;
};

const AddressForm: FC<AddressFormProps> = ({ address }): JSX.Element => {
	const [street, setStreet] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [zipCode, setZipCode] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (address) {
			setStreet(address.street);
			setCity(address.city);
			setState(address?.state || "");
			setZipCode(address.zipCode);
			setCountry(address.country);
		}
	}, [address]);

	const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await updateUser({
				address: {
					street,
					city,
					state,
					zipCode,
					country,
				},
			} as User);
		} catch (err: any) {
			setError(err.message);
		}

		setLoading(false);
	};

	return (
		<form className="space-y-4 pb-10">
			<div className="flex flex-col items-center py-4">
				<p className="text-lg tracking-wider border-b border-secondary">
					Address
				</p>
			</div>
			<StyledTextInput
				label="Street"
				id="street"
				handleChange={(e) => setStreet(e.target.value)}
				value={street}
				disabled={loading}
			/>
			<StyledTextInput
				label="City"
				id="city"
				handleChange={(e) => setCity(e.target.value)}
				value={city}
				disabled={loading}
			/>
			<StyledTextInput
				label="State"
				id="state3"
				handleChange={(e) => setState(e.target.value)}
				value={state}
				disabled={loading}
			/>
			<StyledTextInput
				label="Zip Code"
				id="zipCode"
				handleChange={(e) => setZipCode(e.target.value)}
				value={zipCode}
				pattern="^\d{3}-\d{2}$"
				disabled={loading}
			/>
			<StyledSelectInput
				label="Country"
				id="country"
				handleChange={(e) => setCountry(e.target.value)}
				value={country}
				options={[
					{ value: "USA", label: "United States" },
					{ value: "CA", label: "Canada" },
					{ value: "MX", label: "Mexico" },
				]}
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

export default AddressForm;
