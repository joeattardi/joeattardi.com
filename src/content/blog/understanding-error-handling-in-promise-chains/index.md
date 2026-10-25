---
title: 'Understanding error handling in Promise chains'
summary: 'How errors propagate through a chain of Promises, and where your catch handlers should go.'
publishedDate: 2023-07-07T16:13:44.479Z
updatedDate: 2023-07-07T16:15:29.383Z
cover: ./cover.jpg
tags: ['JavaScript', 'Promises', 'Error Handling']
---

## Promise chains

You can create a chain of `Promise`s by returning new `Promise`s from a `then` handler. Here's a simple example that chains 3 promises together:

```javascript
Promise.resolve(1)
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.resolve(2);
  })
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.resolve(3);
  })
  .then((id) => {
    console.log(`Success: ${id}. Done!`);
  });
```

The output of this chain will be:

```plaintext
Success: 1
Success: 2
Success: 3. Done!
```

To handle any errors that may occur in the chain, you can add a call to `catch` at the end of the chain. If any of the `Promise`s are rejected, this `catch` handler will run, and the rest of the chain is skipped.

```javascript
Promise.resolve(1)
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.reject(2);
  })
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.resolve(3);
  })
  .then((id) => {
    console.log(`Success: ${id}. Done!`);
  })
  .catch((id) => {
    console.log(`Error: ${id}`);
  });
```

The output of this chain will be:

```plaintext
Success: 1
Error: 2
```

## The weird parts

If you add more `then` calls after the `catch`, they will run!

```javascript
Promise.resolve(1)
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.reject(2);
  })
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.resolve(3);
  })
  .then((id) => {
    console.log(`Success: ${id}. Done!`);
  })
  .catch((id) => {
    console.log(`Error: ${id}`);
  })
  .then(() => {
    console.log('Another then!');
  });
```

You'll get this output:

```plaintext
Success: 1
Error: 2
Another then!
```

Why does the chain continue after the `catch`? As it turns out, you can return another `Promise` from a `catch` handler. Here, the `catch` handler just prints to the console. The handler function, then, returns `undefined`. This actually returns a new `Promise`, fulfilled with the value `undefined`. You can verify this by adding the `id` argument to the last `then`:

```javascript
Promise.resolve(1)
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.reject(2);
  })
  .then((id) => {
    console.log(`Success: ${id}`);
    return Promise.resolve(3);
  })
  .then((id) => {
    console.log(`Success: ${id}. Done!`);
  })
  .catch((id) => {
    console.log(`Error: ${id}`);
  })
  .then((id) => {
    console.log(`Success: ${id}`);
  });
```

And the output:

```plaintext
Success: 1
Error: 2
Success: undefined
```

### Re-rejecting

This is a contrived scenario, but consider a function that does some asynchronous work and returns a `Promise`. Maybe it's a function that wraps the Fetch API, to return the JSON content. It has a `catch` for centralized request error logging:

```javascript
function getJSON(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log('Fetch error:', error));
}
```

What happens if there's an error with the Fetch call? Before reading this post, the result might surprise you!

```javascript
getJSON('http://invalid.fake')
  .then((data) => console.log('Success!', data))
  .catch(() => console.log('Error!'));
```

Logically you might expect that `Error!` will be printed. But what actually happens is that `getJSON` logs the Fetch error but returns a _fulfilled_ `Promise`. Your `then` handler will be executed and print:

```plaintext
Success! undefined
```

In order to get the result you want, the `catch` handler inside `getJSON` has to return a _rejected_ `Promise`. You have to "re-reject" it:

```javascript
function getJSON(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log('Fetch error:', error);
      return Promise.reject(error);
    });
}
```

You could also `throw` the error, which will implicitly return a rejected `Promise` as well:

```javascript
function getJSON(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log('Fetch error:', error);
      throw error;
    });
}
```

Either way, now when you call `getJSON` and an error occurs, it will correctly return a rejected `Promise`.

## Summary

`Promise` chains actually work a lot like `try`/`catch` blocks in JavaScript. If an exception is thrown within a `try` block, it jumps right to the `catch` block and skips the rest of the `try` - just like how `catch()` skips the rest of the `Promise` chain.

Also, if you have a function that catches an exception, you'll need to re-throw it if you want it to propagate back up to the calling function.
