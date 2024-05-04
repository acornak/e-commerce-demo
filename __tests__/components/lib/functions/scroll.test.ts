import scrollToAboveElement from "@/lib/functions/scroll";

window.scrollTo = jest.fn();

jest.useFakeTimers();

describe("scrollToAboveElement", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should scroll to the element with the specified id", () => {
		document.body.innerHTML = `
      <div id="testElement" style="height: 1000px;"></div>
    `;

		scrollToAboveElement("testElement");

		jest.advanceTimersByTime(301);

		expect(window.scrollTo).toHaveBeenCalledWith({
			top: -150,
			behavior: "smooth",
		});
	});

	it("should do nothing if the element with the specified id does not exist", () => {
		document.body.innerHTML = `
      <div id="testElement" style="height: 1000px;"></div>
    `;

		scrollToAboveElement("nonExistentElement");

		jest.advanceTimersByTime(301);

		expect(window.scrollTo).not.toHaveBeenCalled();
	});
});
