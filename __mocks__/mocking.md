
## Mock imported component

```ts
jest.mock("@/components/styled/Loading", () => ({
	__esModule: true,
	default: () => <div data-testid="mock-loading" />,
}));
```

## Mock imported component with children

```ts
jest.mock("@/components/profile/ProfileWrapper", () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mock-profile-wrapper">{children}</div>
	),
}));
```

## Mock auth store
```ts
jest.mock("@/lib/stores/auth-store", () => ({
	useAuthStore: jest.fn(),
}));

const mockAuthStore = useAuthStore as unknown as jest.Mock;
mockAuthStore.mockImplementation((fn: any) => {
    return fn({
        initialLoading: true,
        user: { email: "me@example.com" },
    });
});
```

## Mock redirect from next/navigation
```ts
import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
	redirect: jest.fn(),
}));

expect(redirect).toHaveBeenCalledWith("/login?redirect=account");
```
Note - you have to return after redirect

## Mock useRouter
```ts
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => {
	// eslint-disable-next-line global-require
	const { useRouter } = require("next-router-mock");
	return { useRouter };
});

mockRouter.push("/");

expect(mockRouter).toMatchObject({
	asPath: "/cart",
	pathname: "/cart",
	query: {},
});
```

## Mock imported function
```ts
import { getUser } from "@/lib/models/user";

jest.mock("@/lib/models/user", () => ({
	getUser: jest.fn(),
}));

const mockGetUser = getUser as jest.Mock;
mockGetUser.mockImplementation(() => {
	throw new Error("User not found");
});
```
or
```ts
const mockGetUser = getUser as jest.Mock;
mockGetUser.mockImplementation(() => {
	return {
		firstName: "John",
	};
});
```

## Mock imported Firestore function
```ts
import { getOrders } from "@/lib/models/orders";

jest.mock("@/lib/models/orders", () => ({
	getOrders: jest.fn(),
}));

const mockGetOrders = getOrders as jest.Mock;
mockGetOrders.mockImplementation(() => {
	return Promise.reject(new Error("Orders not found"));
});
```
or
```ts
mockGetOrders.mockImplementation(() => {
	return Promise.resolve([
		{
			id: "1",
			createdAt: new Date(),
			total: 100,
			items: [],
		},
	]);
});
```

## Mocking Google Captcha
```ts
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";


jest.mock("react-google-recaptcha-v3", () => ({
	useGoogleReCaptcha: jest.fn(),
}));

(useGoogleReCaptcha as jest.Mock).mockReturnValue({
	executeRecaptcha: null,
});
```
or
```ts
(useGoogleReCaptcha as jest.Mock).mockReturnValue({
	executeRecaptcha: jest.fn().mockRejectedValue(new Error("Failed")),
});
```
or
```ts
const mockExecuteRecaptcha = jest.fn().mockResolvedValue("token");
(useGoogleReCaptcha as jest.Mock).mockReturnValue({
	executeRecaptcha: mockExecuteRecaptcha,
});
```

## Mock component with setState as props
```ts
jest.mock("@/components/login/HandleLoginForm", () => ({
	__esModule: true,
	default: ({ showRegister, setShowRegister }: any) => (
		<div>
			<button onClick={() => setShowRegister(!showRegister)}>
				Toggle Register
			</button>
			{showRegister ? <div>Register Form</div> : <div>Login Form</div>}
		</div>
	),
}));
```

## Mock console.error
```ts
const consoleErrorMock = jest
	.spyOn(console, "error")
	.mockImplementation(() => {});
```

## Running for loop with async