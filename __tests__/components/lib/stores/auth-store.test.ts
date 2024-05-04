import { act, renderHook } from "@testing-library/react";
import { useAuthStore } from "@/lib/stores/auth-store";

describe("useAuthStore", () => {
	it("should handle auth state change", () => {
		const { result } = renderHook(() => useAuthStore());

		expect(result.current.loggedIn).not.toBeTruthy();

		act(() => {
			result.current.setLoggedIn(true);
		});

		expect(result.current.loggedIn).toBeTruthy();
	});
});
