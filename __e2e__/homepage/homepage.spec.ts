// Playwright
import { test, expect } from "@playwright/test";

// test cookie

test.describe("Homepage Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");

		// Wait for the page to load and be ready
		await page.waitForLoadState("networkidle");

		// Cookie consent - only click if it exists
		const declineButton = page.getByText("Decline");
		if (await declineButton.isVisible()) await declineButton.click();
	});

	test("has title and all elements", async ({ page }) => {
		// Check title with a more flexible regex
		await expect(page).toHaveTitle(/Glassify/);

		// Check for main sections with more flexible timing
		const sections = [
			"navbar",
			"homepage-hero",
			"homepage-collection",
			"homepage-explore",
			"homepage-top-products",
			"homepage-newsletter",
			"social-footer",
			"sitemap-footer",
			"footer",
		];

		// Use Promise.all with map instead of for...of
		await Promise.all(
			sections.map(async (section) => {
				await expect(
					page.getByTestId(section),
					`Section ${section} should be visible`,
				).toBeVisible({ timeout: 10000 });
			}),
		);
	});

	test("should have a visible and functional hero section", async ({
		page,
	}) => {
		// Wait for hero section to be ready
		const heroSection = page.getByTestId("homepage-hero");
		await expect(heroSection).toBeVisible({ timeout: 10000 });

		// Wait for the button to be ready
		const ctaButton = page.getByTestId("hero-button");
		await expect(ctaButton).toBeVisible({ timeout: 5000 });

		// Click and verify navigation
		await ctaButton.click();
		await expect(page).toHaveURL(/\/products/i);
	});

	// test("should display product collections", async ({ page }) => {
	// 	const collectionSection = page.getByTestId("homepage-collection");
	// 	await expect(collectionSection).toBeVisible();

	// 	// Check for at least one collection item
	// 	const collectionItems = collectionSection.locator(".collection-item");
	// 	await expect(collectionItems).toHaveCountGreaterThan(0);

	// 	// Click on the first collection and verify navigation
	// 	await collectionItems.first().click();
	// 	await expect(page).toHaveURL(/\/category\/.+/i);
	// });

	// test("should display top products", async ({ page }) => {
	// 	const topProductsSection = page.locator("section#top-products");
	// 	await expect(topProductsSection).toBeVisible();

	// 	// Check for product cards
	// 	const productCards = topProductsSection.locator(".product-card");
	// 	await expect(productCards).toHaveCountGreaterThan(0);

	// 	// Verify that product links navigate correctly
	// 	const firstProduct = productCards.first();
	// 	const productLink = firstProduct.locator("a", { hasText: /.+/i });
	// 	await productLink.click();
	// 	await expect(page).toHaveURL(/\/products\/.+/i);
	// });

	// test("should allow users to subscribe to the newsletter", async ({
	// 	page,
	// }) => {
	// 	const newsletterSection = page.locator("section#homepage-newsletter");
	// 	await expect(newsletterSection).toBeVisible();

	// 	const emailInput = newsletterSection.locator('input[name="email"]');
	// 	const subscribeButton = newsletterSection.locator("button", {
	// 		hasText: /subscribe/i,
	// 	});

	// 	// Enter a valid email
	// 	await emailInput.fill("testuser@example.com");
	// 	await subscribeButton.click();

	// 	// Verify success message
	// 	await expect(newsletterSection.locator(".success-message")).toHaveText(
	// 		/thank you for subscribing/i,
	// 	);
	// });

	// test("should have working social media links", async ({ page }) => {
	// 	const socialSection = page.locator("footer#social");
	// 	await expect(socialSection).toBeVisible();

	// 	const facebookLink = socialSection.locator('a[href*="facebook.com"]');
	// 	const instagramLink = socialSection.locator('a[href*="instagram.com"]');
	// 	const linkedInLink = socialSection.locator('a[href*="linkedin.com"]');

	// 	await expect(facebookLink).toHaveAttribute("href", /facebook\.com/i);
	// 	await expect(instagramLink).toHaveAttribute("href", /instagram\.com/i);
	// 	await expect(linkedInLink).toHaveAttribute("href", /linkedin\.com/i);

	// 	// Optionally, verify that clicking opens the correct URL in a new tab
	// 	await expect(facebookLink).toHaveAttribute("target", "_blank");
	// 	await expect(instagramLink).toHaveAttribute("target", "_blank");
	// 	await expect(linkedInLink).toHaveAttribute("target", "_blank");
	// });
});
