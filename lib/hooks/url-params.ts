import { useCallback } from "react";
// Next
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import scrollToAboveElement from "../functions/scroll";

const useFilterChange = (): ((
	changes: Record<string, string | null>,
	scroll?: boolean,
) => void) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const handleFilterChange = useCallback(
		(changes: Record<string, string | null>, scroll?: boolean) => {
			const params = new URLSearchParams(searchParams.toString());

			Object.entries(changes).forEach(([param, value]) => {
				if (value === null) {
					params.delete(param);
				} else {
					params.set(param, value);
				}
			});

			router.push(`${pathname}?${params.toString()}`, { scroll: false });

			if (scroll) {
				scrollToAboveElement("product-overview");
			}
		},
		[searchParams, pathname, router],
	);

	return handleFilterChange;
};

export default useFilterChange;
