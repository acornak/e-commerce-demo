// Playwright
import { test, expect } from "@playwright/test";

test.describe("Homepage Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");

		// Cookie consent
		await page.click('text="Decline"');
	});

	test("has title and all elements", async ({ page }) => {
		await expect(page).toHaveTitle(/Glassify | E-commerce demo/);

		await expect(page.getByTestId("navbar")).toBeVisible();

		await expect(page.getByTestId("homepage-hero")).toBeVisible();
		await expect(page.getByTestId("homepage-collection")).toBeVisible();
		await expect(page.getByTestId("homepage-explore")).toBeVisible();
		await expect(page.getByTestId("homepage-top-products")).toBeVisible();
		await expect(page.getByTestId("homepage-newsletter")).toBeVisible();
		await expect(page.getByTestId("social-footer")).toBeVisible();

		await expect(page.getByTestId("sitemap-footer")).toBeVisible();
		await expect(page.getByTestId("footer")).toBeVisible();
	});

	// test("should have a visible and functional hero section", async ({
	// 	page,
	// }) => {
	// 	const heroSection = page.locator("section#homepage-hero");
	// 	await expect(heroSection).toBeVisible();

	// 	// Example: Check for a call-to-action button
	// 	const ctaButton = heroSection.locator("button", {
	// 		hasText: /shop now/i,
	// 	});
	// 	await expect(ctaButton).toBeVisible();

	// 	// Click the button and verify navigation
	// 	await ctaButton.click();
	// 	await expect(page).toHaveURL(/\/products/i);
	// });

	// test("should display product collections", async ({ page }) => {
	// 	const collectionSection = page.locator("section#collection");
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
