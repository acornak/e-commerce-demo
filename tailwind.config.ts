import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		letterSpacing: {
			tightest: "-.075em",
			tighter: "-.05em",
			tight: "-.025em",
			normal: "0",
			wide: ".025em",
			wider: ".05em",
			widest: ".10em",
			xl: ".25em",
			"2xl": ".35em",
			"3xl": ".5em",
		},
		extend: {
			colors: {
				secondary: "#FF6347",
				"secondary-red": "#df393a",
				"secondary-blue": "#1c2d49",
			},
			margin: {
				"96": "25rem",
				"128": "32rem",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
