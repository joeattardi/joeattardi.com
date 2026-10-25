---
title: 'Fun with arrays'
summary: "In this article, we'll look at some weird quirks with JavaScript arrays to learn a little more about how they work under the hood. An array is a collection or list of values."
publishedDate: 2023-10-25T19:03:57.520Z
updatedDate: 2024-10-04T03:20:49.410Z
cover: ./cover.jpg
tags: ['JavaScript']
---

In this article, we'll look at some weird quirks with JavaScript arrays to learn a little more about how they work under the hood.

An array is a collection or list of values. It could hold just strings:

```javascript
const names = ['Luke', 'Leia', 'Han'];
```

Or a mix of different types:

```javascript
const stuff = ['Hello', 42, true, 3.14];
```

Arrays are cool because you can iterate over them with a `for` loop or one of the array utility functions like `forEach`, `map`, or `reduce`.

## What does `length` really mean?

Let's start with a normal, everyday case. If you have an array, you can check its `length` property to see how many items are in the array:

```javascript
const values = ['one', 'two', 'three'];
console.log(values.length);
```

The `console.log` above will print `3`, because there are three elements in the array.

What happens if you do this, though:

```javascript
const names = [];
names[10] = 'Joe';
console.log(names.length);
```

There's only one name in this array, but the console.log will print `11`.

Here's another one. You probably won't ever see this in real-world code, but it helps illustrate the point:

```javascript
const names = [];
names[10] = 'Joe';

// You'd never do this in real life
names[12.5] = 'Bob';

console.log(names.length);
```

What do you think will be printed now? If you guessed `11` again, you're correct. By now you can see that the `length` of an array actually does not indicate the _number of values_ in the array.

If you check the value at `names[12.5]`, you'll see that Bob is, in fact, there:

```plaintext
console.log(names[12.5]); // 'Bob'
```

### So what does `length` really mean?

The answer to this mystery lies in the [ECMAScript Language Specification](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-array-instances-length). It says:

> The "length" property of an Array instance is a data property whose value is always numerically greater than the name of every configurable own property whose name is an array index.

So what constitutes an array index? In short, [the specification](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#array-index) says that it's an integer value.

That explains why, in the second example, setting `names[12.5]` to `Bob` did not affect the `length` property. `12.5` is not an integer value!

## Array-like objects

JavaScript has a notion of _array-like objects_. These are objects that have properties indexed like an array, but aren't actually arrays. Array-like objects also have a `length` property.

Here's a contrived example of an array-like object:

```javascript
const names = {
  0: 'Joe',
  1: 'Bob',
  2: 'Bill',
  length: 3, // don't forget the length!
};
```

You can use an array-like object in a `for` loop:

```javascript
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}
```

That's cool, but you can do more. Because this object fulfills the contract of an array-like object, you can use array methods like `map` with a little JavaScript trickery:

```javascript
const uppercaseNames = Array.prototype.map.call(names, name => {
	name.toUpperCase());
});
```

In the above example, `uppercaseNames` will be an array (an actual array!) of the names uppercased: `['JOE', 'BOB', 'BILL']`.

This isn't too useful for a weird array-like object you constructed by hand, but it can come in handy when working with the DOM.

For example, consider the `document.querySelectorAll` method. You might think this returns an array, but it actually returns a `NodeList`. This is an array-like object. It even has a `forEach` method, but it's missing other array methods like `map` or `find`.

You could use `find` on a `NodeList` to search for a node that meets a certain condition. Or, maybe you want to use `map` to transform the nodes into an array of their attribute values.

## The incredible shrinking array

I'll leave you with one last array trick. Did you know that you can change an array's _length_ property? That's right, the property is writable.

If you set the `length` to a smaller value, any remaining elements are removed from the array:

```javascript
const names = ['Joe', 'Bob', 'Bill'];
names.length = 1;

console.log(names); // ['Joe']
console.log(names[1]); // undefined
console.log(names[2]); // undefined
```

Not only does this change the length of the array, but it gets rid of the extra elements, too.

## Conclusion

If you've been working with JavaScript for any length of time, this array weirdness shouldn't surprise you. And if you are new to JavaScript (welcome!) consider this a sign of interesting things to come.

I hope you found this array trivia to be interesting, and maybe even a little useful!
