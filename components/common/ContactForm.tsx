"use client";

import React, { FC, Fragment, useState } from "react";
// Form
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// Components
import StyledLoading from "../styled/Loading";
// Icons
import ErrorIcon from "../icon/Error";
import SuccessIcon from "../icon/Success";

type ContactFormProps = {
	width?: string;
};

const ContactForm: FC<ContactFormProps> = ({ width }): JSX.Element => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [submitError, setSubmitError] = useState<boolean>(false);
	const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

	const validationSchema = Yup.object({
		name: Yup.string().required("Required"),
		to: Yup.string().email("Invalid email address").required("Required"),
		message: Yup.string().required("Required"),
		subject: Yup.string(),
	});

	const formik: any = useFormik({
		initialValues: {
			name: "",
			to: "",
			message: "",
			subject: "",
		},

		validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				if (!executeRecaptcha) {
					throw new Error("Recaptcha not loaded");
				}

				const token = await executeRecaptcha("contact_form");

				setSubmitting(true);

				const response = await fetch("/api/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...values,
						"g-recaptcha-response": token,
					}),
				});

				if (!response.ok) {
					setSubmitError(true);
					throw new Error("Network response was not ok");
				}
				setSubmitSuccess(true);
			} catch (error) {
				setSubmitError(true);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const formFields: {
		id: string;
		type: string;
		placeholder: string;
		"data-testid": string;
	}[] = [
		{
			id: "name",
			type: "text",
			placeholder: "Name",
			"data-testid": "contact-form-name",
		},
		{
			id: "to",
			type: "email",
			placeholder: "Email",
			"data-testid": "contact-form-email",
		},
		{
			id: "message",
			type: "textarea",
			placeholder: "Message",
			"data-testid": "contact-form-message",
		},
		{
			id: "subject",
			type: "text",
			placeholder: "Subject",
			"data-testid": "contact-form-subject",
		},
	];

	const handleForm = (): JSX.Element => {
		const inputClasses: string =
			"appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none";

		if (formik.isSubmitting) {
			return (
				<div
					className="flex items-center justify-center"
					data-testid="contact-form-loading"
				>
					<StyledLoading />
				</div>
			);
		}
		if (submitError) {
			return (
				<div
					className="flex items-center justify-center"
					data-testid="contact-form-error"
				>
					<ErrorIcon className="w-12 h-12 text-red-500 px-2" />
					<div className="flex justify-center items-center ${className">
						<p>Something went wrong. Please try again later.</p>
					</div>
				</div>
			);
		}
		if (submitSuccess) {
			return (
				<div
					className="flex items-center justify-center"
					data-testid="contact-form-success"
				>
					<SuccessIcon className="w-12 h-12 px-2 text-green-700" />
					<div className="flex justify-center items-center">
						<p>Message sent successfully. Thank you!</p>
					</div>
				</div>
			);
		}
		return (
			<form
				onSubmit={formik.handleSubmit}
				className="text-xs flex flex-col w-full"
				data-testid="contact-form"
			>
				{formFields.map((field) =>
					field.type !== "textarea" ? (
						<Fragment key={field.id}>
							<div
								className={`flex items-center border-b border-gray-200 py-2 my-2 ${
									field.id === "subject" ? "hidden" : ""
								}`}
							>
								<input
									id={field.id}
									name={field.id}
									type={field.type}
									placeholder={field.placeholder}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values[field.id]}
									className={inputClasses}
									data-testid={field["data-testid"]}
								/>
							</div>
							{formik.touched[field.id] &&
							formik.errors[field.id] ? (
								<div className="text-red-500 text-md px-2">
									{formik.errors[field.id]}
								</div>
							) : null}
						</Fragment>
					) : (
						<Fragment key={field.id}>
							<div
								className={`flex items-center border-b border-gray-200 py-2 my-2 ${
									field.id === "subject" ? "hidden" : ""
								}`}
							>
								<textarea
									id={field.id}
									name={field.id}
									placeholder={field.placeholder}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values[field.id]}
									className={inputClasses}
									data-testid={field["data-testid"]}
								/>
							</div>
							{formik.touched[field.id] &&
							formik.errors[field.id] ? (
								<div className="text-red-500 text-md px-2">
									{formik.errors[field.id]}
								</div>
							) : null}
						</Fragment>
					),
				)}

				<div className="flex justify-end pt-6">
					<button
						type="submit"
						className={`inline-flex text-white items-center text-xs py-3 px-6 uppercase ${
							formik.isValid && formik.dirty
								? "bg-secondary"
								: "bg-gray-300 cursor-not-allowed"
						}`}
						disabled={!formik.isValid || !formik.dirty}
						data-testid="contact-form-submit"
					>
						Send Message
					</button>
				</div>
			</form>
		);
	};

	return (
		<div className="flex items-center justify-center p-6 px-10 lg:p-10 text-start">
			<div className={`w-full ${width}`}>{handleForm()}</div>
		</div>
	);
};

export default ContactForm;
