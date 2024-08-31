import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => {
	// eslint-disable-next-line global-require
	const { useRouter } = require("next-router-mock");
	// eslint-disable-next-line no-shadow
	const usePathname = jest.fn();
	return { useRouter, usePathname };
});

// TODO
describe("NavbarAdmin", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders without crashing", () => {
		render(<NavbarAdmin />);
	});

	it("handles dropdown open", () => {});

	it("handles esc key", () => {});

	it("handles esc key", () => {});
});
