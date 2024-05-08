"use client";

import React, { FC, ReactNode } from "react";
// Animations
import { motion } from "framer-motion";
import { colors } from "@/lib/config/constants";

type TextInputProps = {
	label: string;
	id: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	type?: "text" | "email" | "password" | "tel";
	placeholder?: string;
	pattern?: string;
	disabled?: boolean;
};

export const StyledTextInput: FC<TextInputProps> = ({
	label,
	id,
	handleChange,
	value,
	type = "text",
	placeholder = "",
	pattern,
	disabled = false,
}) => (
	<div className="flex items-center justify-between">
		<label
			htmlFor={id}
			className="block text-sm font-medium text-gray-700 w-1/5 text-end"
		>
			{label}
		</label>
		<input
			type={type}
			id={id}
			name={id}
			className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
			onChange={handleChange}
			value={value}
			placeholder={placeholder}
			pattern={pattern}
			disabled={disabled}
		/>
	</div>
);

type NumberInputProps = {
	label: string;
	id: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: number;
	min?: number;
	max?: number;
	placeholder?: string;
	disabled?: boolean;
};

export const StyledNumberInput: FC<NumberInputProps> = ({
	label,
	id,
	handleChange,
	value,
	min,
	max,
	placeholder = "",
	disabled = false,
}) => (
	<div className="flex items-center justify-between">
		<label
			htmlFor={id}
			className="block text-sm font-medium text-gray-700 w-1/3"
		>
			{label}
		</label>
		<input
			type="number"
			min={min}
			max={max}
			id={id}
			name={id}
			className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
			onChange={handleChange}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
		/>
	</div>
);

type Option = {
	value: string;
	label: string;
};

type SelectInputProps = {
	label: string;
	id: string;
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value: string;
	options: Option[];
	disabled?: boolean;
};

export const StyledSelectInput: FC<SelectInputProps> = ({
	label,
	id,
	handleChange,
	value,
	options,
	disabled = false,
}) => (
	<div className="flex items-center justify-between">
		<label
			htmlFor={id}
			className="block text-sm font-medium text-gray-700 w-1/3"
		>
			{label}
		</label>
		<select
			id={id}
			name={id}
			className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
			onChange={handleChange}
			value={value}
			disabled={disabled}
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	</div>
);

type SubmitButtonProps = {
	onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
	children?: ReactNode;
	disabled?: boolean;
};

export const StyledSubmitButton: FC<SubmitButtonProps> = ({
	onSubmit,
	children,
	disabled,
}) => (
	<motion.button
		type="submit"
		whileHover={{
			backgroundColor: colors.black,
		}}
		whileTap={{
			backgroundColor: colors.black,
		}}
		className="py-2 px-10 my-2 bg-secondary uppercase text-white font-semibold"
		disabled={disabled}
		onClick={onSubmit}
	>
		{children}
	</motion.button>
);
