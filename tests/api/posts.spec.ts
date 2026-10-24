import { test, expect } from '@playwright/test';

const API = 'https://jsonplaceholder.typicode.com';

test.describe('Users API', () => {
  test('returns a list of 10 users', async ({ request }) => {
    const response = await request.get(`${API}/users`);
    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(users).toHaveLength(10);
  });

  test('returns a single user with the expected fields', async ({ request }) => {
    const response = await request.get(`${API}/users/1`);
    expect(response.ok()).toBeTruthy();

    const user = await response.json();
    expect(user).toMatchObject({
      id: 1,
      name: expect.any(String),
      email: expect.stringContaining('@'),
    });
  });

  test('returns 404 for a user that does not exist', async ({ request }) => {
    const response = await request.get(`${API}/users/9999`);
    expect(response.status()).toBe(404);
  });
});

test.describe('Posts API', () => {
  test('creates a post', async ({ request }) => {
    const newPost = { title: 'My test post', body: 'Hello', userId: 1 };
    const response = await request.post(`${API}/posts`, { data: newPost });
    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created).toMatchObject(newPost);
    expect(created.id).toBeDefined();
  });

  test('updates a post', async ({ request }) => {
    const response = await request.put(`${API}/posts/1`, {
      data: { id: 1, title: 'Updated title', body: 'Updated', userId: 1 },
    });
    expect(response.status()).toBe(200);
    expect((await response.json()).title).toBe('Updated title');
  });

  test('deletes a post', async ({ request }) => {
    const response = await request.delete(`${API}/posts/1`);
    expect(response.status()).toBe(200);
  });

  test('filters posts by user', async ({ request }) => {
    const response = await request.get(`${API}/posts`, { params: { userId: 1 } });
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });
});