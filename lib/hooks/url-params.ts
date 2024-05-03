import { useCallback } from "react";
// Next
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const scrollToAboveElement = () => {
	setTimeout(() => {
		const element = document.getElementById("product-overview");
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

const useFilterChange = (): ((
	filterName: string,
	value: string | null,
	scroll?: boolean,
) => void) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const handleFilterChange = useCallback(
		(filterName: string, value: string | null, scroll?: boolean) => {
			const params = new URLSearchParams(searchParams.toString());

			if (value === null) {
				params.delete(filterName);
			} else {
				params.set(filterName, value);
			}
			router.push(`${pathname}?${params.toString()}`, { scroll: false });

			if (scroll) {
				scrollToAboveElement();
			}
		},
		[searchParams, pathname, router],
	);

	return handleFilterChange;
};

export default useFilterChange;
