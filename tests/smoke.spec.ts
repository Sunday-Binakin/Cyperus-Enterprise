import { test, expect } from '@playwright/test';

test.describe('Application Smoke Test', () => {
  const baseURL = 'http://localhost:3000';

  test('should load the homepage successfully', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Cyperus/);
    await expect(page.locator('h1')).toContainText('Discover the Power of Tigernuts');
  });

  test('should navigate to the Shop page and display products', async ({ page }) => {
    await page.goto(`${baseURL}/`);
    await page.getByRole('button', { name: 'SHOP' }).click();
    await page.getByRole('link', { name: 'Choconut' }).click();
    await expect(page).toHaveURL(`${baseURL}/choconut`);
    await expect(page.locator('h1')).toContainText('Choconut');
  });

  test('should navigate to the Contact Us page', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'CONTACT' }).click();
    await expect(page).toHaveURL(`${baseURL}/contact-us`);
    await expect(page.locator('h1')).toContainText('Contact Us');
  });

  test('should navigate to the International Distributors page', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByRole('button', { name: 'EXPORTS' }).click();
    await page.getByRole('link', { name: 'International Distributors' }).click();
    await expect(page).toHaveURL(`${baseURL}/international-distributors`);
    await expect(page.locator('h1')).toContainText('International Distributors');
  });

  test('should perform a product search', async ({ page }) => {
    await page.goto(baseURL);
    await page.getByPlaceholder('Search for products...').fill('tigernut');
    await page.keyboard.press('Enter');
    
    // Wait for the search results to appear
    await page.waitForURL('**/search?q=tigernut');
    
    // Check that search results are visible
    await expect(page.locator('h2')).toContainText(/Search results for "tigernut"/);
    await expect(page.locator('body')).toContainText('Tigernut');
  });
});
