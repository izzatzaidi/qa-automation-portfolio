import { test, expect } from '../../fixtures/fixtures';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart', () => {
  test('shows the item that was added', async ({ inventoryPage, page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.cartLink.click();

    const cart = new CartPage(page);
    await expect(cart.items).toHaveCount(1);
    await expect(cart.itemNames).toHaveText('Sauce Labs Backpack');
  });

  test('removing an item empties the cart', async ({ inventoryPage, page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.cartLink.click();

    const cart = new CartPage(page);
    await cart.remove('sauce-labs-backpack');
    await expect(cart.items).toHaveCount(0);
  });

  test('cart keeps items after going back to products', async ({ inventoryPage, page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.cartLink.click();

    const cart = new CartPage(page);
    await cart.continueShoppingButton.click();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});