# Iterators & Generators
Custom iterators and generator functions.
## Generators
```javascript
function* rangeGenerator(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

for (const num of rangeGenerator(1, 5)) {
  console.log(num);
}
```
## Async Generators
```javascript
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = await fetch(`${url}?page=${page}`);
    if (data.length === 0) break;
    yield data;
    page++;
  }
}
```
