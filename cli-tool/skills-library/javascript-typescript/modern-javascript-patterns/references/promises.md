# Promises & Async

Comprehensive guide to Promises and async patterns.

## Creating Promises

```javascript
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'John' });
      } else {
        reject(new Error('Invalid ID'));
      }
    }, 1000);
  });
};

// Using promises
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));
```

## Promise Combinators

```javascript
// Promise.all - All must succeed
const promises = [fetchUser(1), fetchUser(2), fetchUser(3)];
Promise.all(promises)
  .then(users => console.log(users))
  .catch(error => console.error('At least one failed:', error));

// Promise.allSettled - Wait for all regardless of outcome
Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.log('Error:', result.reason);
      }
    });
  });

// Promise.race - First to complete
Promise.race(promises)
  .then(winner => console.log('First:', winner));

// Promise.any - First to succeed
Promise.any(promises)
  .then(first => console.log('First success:', first))
  .catch(error => console.error('All failed'));
```

## Chaining Promises

```javascript
fetchUser(1)
  .then(user => fetchUserPosts(user.id))
  .then(posts => processPosts(posts))
  .then(result => console.log(result))
  .catch(error => console.error(error));
```
