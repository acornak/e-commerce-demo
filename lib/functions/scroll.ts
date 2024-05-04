const scrollToAboveElement = (id: string) => {
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
