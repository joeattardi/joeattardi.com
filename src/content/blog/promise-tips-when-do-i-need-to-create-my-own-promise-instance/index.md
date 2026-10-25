---
title: 'Promise Tips: When do I need to create my own Promise instance?'
subtitle: "It's not always needed."
summary: 'Promises are pretty ubiquitous these days, but sometimes Promise based code is more complex that it needs to be.'
publishedDate: 2022-01-28T16:07:51.869Z
cover: ./cover.png
tags: ['JavaScript', 'Promises', 'Programming Tips']
---

Promises are pretty ubiquitous these days, but sometimes `Promise` based code is more complex that it needs to be.

Consider this `getUserDetails` function:

```javascript
function getUserDetails(userId) {
  return new Promise((resolve, reject) => {
    fetch(`/users/${userId}/details`)
      .then(response => response.json())
      .then(data => resolve(data));
      .catch(error => reject(error));
  });
}
```

This function returns a `Promise` that will be resolved when the fetch call is complete and the JSON response is received.

We make the `fetch` call and extract the JSON in the first `then` handler. `response.json()` also returns a `Promise`, so we call `then` on that too. Once we have the JSON result, we can resolve our returned `Promise`.

If there is an error, we reject our returned `Promise`.

Here's a somewhat rough analogy, but bear with me here. Suppose you want to buy an item listed on eBay. The above code is sort of like if you purchased the item, and the seller shipped it to eBay. Then, once eBay received it, they shipped it to you. Sounds overly complicated, right?

Client code that calls `getUserDetails` looks like this:

```javascript
getUserDetails(userId).then((details) => {
  doSomethingWith(details);
});
```

We are calling `then` on the outer `Promise` that was returned from `getUserDetails`.

We can do better! If the asynchronous thing you are doing already returns a `Promise`, as `fetch` does, you _don't need to wrap it in your own `Promise`_.

The above function can be written much more simply:

```javascript
function getUserDetails(userId) {
  return fetch(`/users/${userId}/details`).then((response) => response.json());
}
```

This function has the same net result! In both listings above, `getUserDetails` returns a `Promise` that resolves to the user details object.

To return to the eBay analogy: This approach is how eBay actually works: you purchase the item through eBay, eBay tells the seller, and the seller ships directly to you.

In the first example, we are creating our own `Promise` which wraps the asynchronous operation. The difference with the second example is that we are just returning the `Promise` that `response.json()` gives us.

## When would I want to create my own `Promise`?

There are some cases where rolling your own `Promise` is unavoidable, for example when working with a callback or event based API.

### Event based APIs

Let's make a quick and dirty image loader! This function will take an image URL and return an `img` element, but _not until the image has loaded_.

```javascript
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');

    image.addEventListener('load', () => {
      resolve(image);
    });

    image.addEventListener('error', (error) => {
      reject(error);
    });

    image.src = url;
  });
}
```

Because the image element doesn't provide a `Promise` itself, in this case we have to roll our own. Depending on which event listener is fired, we either resolve the `Promise` with the now fully loaded image, or reject it with the error encountered while loading.

This is easy to use:

```javascript
loadImage('/logo.png').then((image) => container.appendChild(image));
```

### Callback based APIs

Some older APIs are still callback based. You might want to make a "promisified" version of such an API. For this, you will need to create a `Promise`.

Consider this simplified example of an API. It follows the typical Node.js callback pattern - it takes two callback function arguments. The first will be called if there is an error, and the second will be called on success. We use such an API like this:

```javascript
db.findItem(
  123,
  (error) => {
    console.log('oops, an error:', error);
  },
  (data) => {
    console.log('got data:', data);
  },
);
```

Callbacks can be a little painful to work with, so we can wrap this API with a `Promise`:

```javascript
function findItemPromise(recordId) {
  return new Promise((resolve, reject) => {
    db.findItem(
      recordId,
      (error) => reject(error),
      (data) => resolve(data),
    );
  });
}
```

This can actually be simplified a bit more. Since the `resolve` and `reject` handlers take a single argument, which matches the arguments of the `error` and `data` callbacks, we can just specify those functions themselves as the callbacks:

```javascript
function findItemPromise(recordId) {
  return new Promise((resolve, reject) => {
    db.findItem(recordId, reject, resolve);
  });
}
```

Now we can use the `findItemPromise` API:

```javascript
findItemPromise(recordId)
  .then((data) => console.log('got data:', data))
  .catch((error) => console.log('oops, an error:', error));
```

In fact, if you are working with Node.js, you don't need to do this wrapping yourself. The Node.js API includes a [`promisify`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) utility function that does exactly this!

## Summary

- If the async API you are working with already returns a `Promise`, you most likely don't need to wrap it in your own new `Promise`. Instead, you can just utilize the existing `Promise`.
- For event and callback based APIs, you will need to create your own `Promise` which wraps the API call, and calls the `resolve` and `reject` handlers accordingly.
- Node.js has a `promisify` utility function that will convert any callback-based function (that follows the Node convention of (error, success) callbacks) into a `Promise` based one.
