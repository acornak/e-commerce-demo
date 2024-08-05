import DesktopItems from "@/components/navbar/DesktopItems";
import { NavItem } from "@/lib/config/types";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => {
	// eslint-disable-next-line global-require
	const { useRouter } = require("next-router-mock");
	return { useRouter };
});

const items: NavItem[] = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Shop",
		url: "/shop",
	},
	{
		title: "About",
		url: "/about",
	},
];

describe("DesktopItems", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("renders the navigation items", () => {
		render(
			<DesktopItems
				items={items}
				selected={null}
				setSelected={() => {}}
			/>,
		);
		items.forEach((item) => {
			const navItem = screen.getByText(item.title);
			expect(navItem).toBeInTheDocument();
		});
	});

	it("handles mouse enter and leave events", async () => {
		const setSelected = jest.fn();

		render(
			<DesktopItems
				selected={null}
				setSelected={setSelected}
				items={items}
			/>,
		);

		const homeItem = screen.getByText("Home");
		fireEvent.mouseEnter(homeItem);
		expect(setSelected).toHaveBeenCalledWith(0);

		fireEvent.mouseLeave(homeItem);
		expect(setSelected).toHaveBeenCalledWith(null);
	});

	test("navigates to the correct URL on click", async () => {
		const setSelected = jest.fn();

		mockRouter.push("/About");

		render(
			<DesktopItems
				selected={2}
				setSelected={setSelected}
				items={items}
			/>,
		);

		await waitFor(() => {
			expect(screen.getByText("About")).toHaveStyle(
				"color: rgb(255, 99, 71);",
			);
		});

		const homeItem = screen.getByText("Shop");
		fireEvent.click(homeItem);
		expect(mockRouter).toMatchObject({
			asPath: "/shop",
			pathname: "/shop",
			query: {},
		});
	});
});
