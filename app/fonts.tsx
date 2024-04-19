// eslint-disable-next-line camelcase
import { Roboto, Dancing_Script } from "next/font/google";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "400", "500", "700", "900"],
});

const dancing = Dancing_Script({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export { roboto, dancing };
