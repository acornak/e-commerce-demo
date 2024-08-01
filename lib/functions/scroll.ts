/**
 * Scrolls to the element with the given ID
 * @param id - ID of the element to scroll to
 */
const scrollToAboveElement = (id: string): void => {
	setTimeout(() => {
		const element = document.getElementById(id);
		if (element) {
			const offset = 150;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}, 300);
};

export default scrollToAboveElement;
