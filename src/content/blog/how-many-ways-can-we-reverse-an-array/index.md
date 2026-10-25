---
title: 'How many ways can we reverse an Array?'
summary: "There's a Stage 3 proposal to add several array methods including Array.prototype.toReversed, which will create a reversed copy of the array."
publishedDate: 2022-11-23T03:43:27.694Z
cover: ./cover.png
tags: ['JavaScript', 'Array Methods']
---

There's a [Stage 3 proposal](https://github.com/tc39/proposal-change-array-by-copy) to add several array methods including `Array.prototype.toReversed`, which will create a reversed _copy_ of the array. This will be a welcome addition since `Array.prototype.reverse` mutates the array, which often is _not_ what we want.

I thought it might be fun to explore some of the ways we can implement this new method using currently available language features. Of course, there is [already a package on npm](https://www.npmjs.com/package/array.prototype.toreversed) that polyfills this function, so this is mostly an exercise for learning purposes only.

## Reversing a copy of the array

The most straightforward way to do this is make a copy of the array, and then call [`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) on it. This has the end result of not mutating the original array, but it does mutate the copy, so this is a bit of a cheat.

### Using `slice`

[`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) will create a shallow copy of the array. This means that the references to each array element is copied into a new array. Reversing this copy mutates the new array by reordering items, but won't affect the ordering of the original array, or modify any of its elements.

```javascript
const reversed = originalArray.slice().reverse();
```

### Using array spread

We can use the [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax to create a copy of the array, then reverse it.

This is essentially doing the same thing as the `slice` approach. Make sure the `.reverse` call is outside the brackets, otherwise we'll be mutating the array _then_ copying it.

```javascript
// ✅ Copies the array, then mutates the copy
const reversed = [...originalArray].reverse();

// ❌ Mutates the original array, then copies
const reversed = [...originalArray.reverse()];
```

## Using `map`

We can build the reversed array by mapping each element to the corresponding element at the other end of the array:

- element 0 becomes element _n - 1_
- element 1 becomes element _n - 2_
- etc.

The new element is calculated by subtracting the current index from the last index. For this we can call [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on the array:

```javascript
const reversed = originalArray.map(
  (el, index) => originalArray[originalArray.length - 1 - index],
);
```

## Building the array in reverse order

This one, again, is a partial cheat if we want to avoid mutation since we are mutating the new array on each turn of the loop. In most cases, this is probably acceptable as long as the original array remains unchanged.

```javascript
const reversed = [];
originalArray.forEach((el) => reversed.unshift(el));
```

## Using `reduce`

If we want to be purists and not mutate anything, we can use `reduce` to reverse the array. For small arrays it probably doesn't matter, but keep in mind that we are going to increase memory usage, since a new array is created each time through.

This is a good exercise for understanding how `reduce` works but probably not an ideal version to use in a production app.

```javascript
const reversed = originalArray.reduce((result, el) => [el, ...result], []);
```

We start with an empty array. For each element in the array, we create a new array with that element at the beginning, and spread the previous result, creating a new array. When the loop is complete, we'll have the new reversed array.

## Which to use?

For smaller arrays, analyzing differences between these approaches is probably an exercise in premature optimization. In such cases I usually prefer a more readable approach, such as the spread syntax:

```javascript
const reversed = [...originalArray].reverse();
```
