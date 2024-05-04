import { renderHook } from "@testing-library/react";
import useOutsideAlerter from "@/lib/hooks/outside-click";

describe("useOutsideAlerter", () => {
	it("should call closeDropdown when clicked outside the referenced element", () => {
		const ref = { current: document.createElement("div") };
		const closeDropdown = jest.fn();

		renderHook(() => useOutsideAlerter(ref, closeDropdown));

		const outsideElement = document.createElement("div");
		document.body.appendChild(outsideElement);
		outsideElement.dispatchEvent(
			new MouseEvent("mousedown", { bubbles: true }),
		);

		expect(closeDropdown).toHaveBeenCalled();

		document.body.removeChild(outsideElement);
	});
});
