import { test, expect } from '../../fixtures/fixtures';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', () => {
  let checkout: CheckoutPage;

  test.beforeEach(async ({ inventoryPage, page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.cartLink.click();
    await new CartPage(page).checkoutButton.click();
    checkout = new CheckoutPage(page);
  });

  test('completes an order', async ({ page }) => {
    await checkout.fillDetails('Izzat', 'Zaidi', 'SE5 8AA');
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkout.finishButton.click();
    await expect(checkout.confirmation).toHaveText('Thank you for your order!');
  });

  test('requires a first name', async () => {
    await checkout.fillDetails('', 'Zaidi', 'SE5 8AA');
    await expect(checkout.errorMessage).toContainText('First Name is required');
  });

  test('requires a last name', async () => {
    await checkout.fillDetails('Izzat', '', 'SE5 8AA');
    await expect(checkout.errorMessage).toContainText('Last Name is required');
  });

  test('requires a postal code', async () => {
    await checkout.fillDetails('Izzat', 'Zaidi', '');
    await expect(checkout.errorMessage).toContainText('Postal Code is required');
  });

  test('total equals subtotal plus tax', async () => {
    await checkout.fillDetails('Izzat', 'Zaidi', 'SE5 8AA');

    const toNumber = async (locator: typeof checkout.subtotal) => {
      const text = await locator.innerText();
      return parseFloat(text.split('$')[1]);
    };

    const subtotal = await toNumber(checkout.subtotal);
    const tax = await toNumber(checkout.tax);
    const total = await toNumber(checkout.total);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });
});