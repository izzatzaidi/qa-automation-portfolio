import { test, expect } from '../../fixtures/fixtures';

test.describe('Inventory', () => {
  test('shows six products', async ({ inventoryPage }) => {
    await expect(inventoryPage.itemNames).toHaveCount(6);
  });

  test('adding an item updates the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('removing an item clears the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.removeFromCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('sorts by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const texts = await inventoryPage.itemPrices.allTextContents();
    const prices = texts.map((p) => parseFloat(p.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.itemNames.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });
});