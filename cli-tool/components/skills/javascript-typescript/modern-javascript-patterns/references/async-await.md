# Async/Await Patterns

Modern async/await syntax for cleaner asynchronous code.

## Basic Usage

```javascript
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Error handling
async function getUserData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchUserPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## Sequential vs Parallel

```javascript
// Sequential (slow)
async function sequential() {
  const user1 = await fetchUser(1);
  const user2 = await fetchUser(2);
  return [user1, user2];
}

// Parallel (fast)
async function parallel() {
  const [user1, user2] = await Promise.all([
    fetchUser(1),
    fetchUser(2)
  ]);
  return [user1, user2];
}
```

## Advanced Patterns

```javascript
// Retry logic
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Timeout wrapper
async function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}
```
