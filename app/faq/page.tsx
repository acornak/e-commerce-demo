"use client";

import React, { FC, useState } from "react";
// Next
import { NextPage } from "next";
import Link from "next/link";
// Animations
import { AnimatePresence, motion } from "framer-motion";
// Components
import StyledHero from "@/components/hero/StyledHero";
import NewsletterBanner from "@/components/common/Newsletter";
// Images
import faqHero from "@/public/faq/faq_hero.webp";
import { StyledSectionHeading } from "@/components/styled/Heading";
// Types and constants
import { faqQuestions } from "@/lib/config/constants";
import { FaqQuestion } from "@/lib/config/types";

type QuestionItemProps = { question: FaqQuestion; index: number };

const QuestionItem: FC<QuestionItemProps> = ({
	question,
	index,
}): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<AnimatePresence>
			<div className="flex items-center">
				<button
					type="button"
					className="text-start py-4 cursor-pointer "
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<div className="flex items-center">
						<span
							className="text-2xl flex-shrink-0 inline-block text-center font-light"
							style={{ width: "20px" }}
						>
							<motion.span
								key={isOpen ? "-" : "+"}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
								data-testid="faq-icon"
							>
								{isOpen ? "-" : "+"}
							</motion.span>
						</span>
						<span className="ml-4 font-medium text-lg tracking-widest">
							{question.question}
						</span>
					</div>
				</button>
			</div>

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="text-start text-sm pb-4 px-10"
					data-testid={`faq-answer-${index}`}
				>
					<p>{question.answer}</p>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const FAQPage: NextPage = (): JSX.Element => {
	return (
		<>
			<StyledHero
				image={faqHero}
				link="faq"
				title="Frequently Asked Questions"
			/>
			<div className="text-center my-6 pb-6 mx-10 border-b border-gray-300">
				<StyledSectionHeading title="Frequently Asked Questions" />
				Here are some of the most frequently asked questions. If you
				have any other questions, please feel free to{" "}
				<Link href="/contact" className="text-secondary">
					contact us
				</Link>
				.
			</div>
			<div
				className="text-center my-6 pb-6 mx-10"
				data-testid="faq-questions"
			>
				{faqQuestions.map((question, index) => (
					<QuestionItem
						key={question.question}
						question={question}
						index={index}
					/>
				))}
			</div>
			<NewsletterBanner />
		</>
	);
};

export default FAQPage;
