import { useEffect, RefObject } from "react";

export default function useOutsideAlerter(
	ref: RefObject<HTMLElement>,
	closeDropdown: () => void,
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				closeDropdown();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, closeDropdown]);
}
