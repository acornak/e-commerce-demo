// eslint-disable-next-line camelcase
import { Roboto, Dancing_Script, Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["100", "400", "500", "700", "900"],
});

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "400", "500", "700", "900"],
});

const dancing = Dancing_Script({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export { roboto, dancing, montserrat };
