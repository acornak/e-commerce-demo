// eslint-disable-next-line camelcase
import { Dancing_Script, Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["100", "400", "500", "700", "900"],
});
const dancing = Dancing_Script({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export { dancing, montserrat };
