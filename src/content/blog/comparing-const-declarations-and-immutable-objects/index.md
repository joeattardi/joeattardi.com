---
title: 'Comparing `const` declarations and immutable objects'
summary: 'Way back in my Java days, when interviewing candidates, I would often ask the candidate to explain the meaning of the final keyword.'
publishedDate: 2022-09-01T04:55:56.308Z
cover: ./cover.jpg
tags: ['JavaScript']
---

Way back in my Java days, when interviewing candidates, I would often ask the candidate to explain the meaning of the `final` keyword. Many times I would get an answer along the lines of "It's a constant value" or "It can't be changed once assigned".

Fast forward to today, living in JavaScript Land, we now have `const` declarations. I ask the same question to JavaScript candidates and often get the same sorts of answers.

On the surface, these answers are more or less correct, but when I would ask follow-up questions about what exactly they meant by "constant" or "can't be changed", I was sometimes surprised by the answers I received.

This appears to be a question that can sometimes trip up beginners. Let's take a deeper look.

## The `const` keyword

Back in the dark ages, we had `var` for declaring variables and that was it! ES2015 gave us two new tools: `const` and `let`.

We use `const` like this:

```javascript
const name = 'Joe';
```

I have just declared `name`, which is a reference to the string `'Joe'`. If I try to assign a new value to `name`, I get an error:

```javascript
name = 'Liz'; // TypeError: Assignment to constant variable.
```

Great, so this is a *const*ant value! I can't change the name assigned to `name`. This much, I think, is pretty clear.

### What about an array?

A string is a primitive value. What if I use `const` for, say, an array?

```javascript
const foods = ['apple', 'banana', 'pear'];
```

Indeed, I can't set a new array:

```javascript
foods = ['bacon', 'chicken', 'turkey']; // TypeError: Assignment to constant variable.
```

I want to take `banana` out of my array. I might try to do that with `Array.prototype.filter`, but I run into the same problem:

```javascript
foods = foods.filter((food) => food !== 'banana'); // TypeError: Assignment to constant variable.
```

That won't work because `foods` is declared with `const`. Of course, this will work fine if I assign the result of `foods.filter` to another variable name, but let's pretend that for whatever reason the array referenced by `foods` has to have the banana-less array.

Instead of filtering, a value can also be removed from an array with `Array.prototype.splice`. But since `foods` is a constant that can't be changed, this will fail as well, right?

```javascript
foods.splice(foods.indexOf('banana'), 1); // No error!
console.log(foods); // ['apple', 'pear']
```

This works! The array referenced by `foods` no longer contains `banana`. Why did this work if we used `const`?

### The _reference_ is the constant!

![Obi-Wan breaks the news](./image-1.gif)

As it turns out, the *const*ant is the _reference_ itself, not the value it's pointing to. We can do anything we want to the `foods` array as long as we don't try to reassign a new value to `foods`.

So you see, explaining `const` by saying "it's a constant value" or "it can't be changed" is only true from a certain point of view.

## Immutable data

What if we really, truly, want to lock down the `foods` array so we can't modify it? The reason we can still get away with this is because functions like `Array.prototype.splice` _mutate_ the thing. This is just a fancy way of saying we are modifying its internal state.

Some values, like strings, are _immutable_, so for a string, our simplified explanation of `const` is accurate. But for objects and arrays, we still have a mutation escape hatch.

It's actually easy to achieve immutability for our humble array of foods. We can _freeze_ it!

```javascript
const foods = ['apple', 'banana', 'pear']; // At this point we can still mutate the array
Object.freeze(foods); // Not anymore!
```

[`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) essentially locks down our array. We can't do anything to it now:

```javascript
foods.splice(foods.indexOf('banana'), 1); // TypeError: Cannot delete property '2' of [object Array]

foods.push('bacon'); // TypeError: Cannot add property 3, object is not extensible
```

Now our `foods` array is untouchable. Like before, we can still `filter` it as long as we assign it to a new name. Interestingly, the new filtered array is no longer frozen:

```javascript
const noBananas = foods.filter((food) => food !== 'banana');
noBananas.push('bacon'); // No error!
console.log(noBananas); // ['apple', 'pear', 'bacon'];
```

#### A note on `Object.freeze`

You may notice that the array threw exceptions when trying to add or remove elements after it was frozen. As we will see soon, this does not happen with other objects (unless in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)). When not running in strict mode, the mutation will fail silently.

### Freezing objects

Let's take one more example, an array of users, and freeze it.

```javascript
const users = [
  { username: 'obiwan', email: 'kenobi@gmail.com' },
  { username: 'yoda', email: 'yoda@coruscant.com' },
];

Object.freeze(users);

// This will fail with TypeError: Cannot add property 2, object is not extensible
users.push({ username: 'chewbacca', email: 'chewie@kashyykmail.com' });
```

![Ben Kenobi?](./image-2.gif)

To protect his identity, let's change Obi-Wan's username to `ben` (the Empire will surely think the last name is a coincidence):

```javascript
users[0].username = 'ben';
console.log(users[0]); // { username: 'ben', email: 'kenobi@gmail.com' }
```

No error was thrown, and when we check the user object, it was updated (so it did not fail silently as we discussed above!)

What happened? Isn't the array frozen? Indeed it is, the individual items in the array are not. To achieve this, we need to freeze every item in the array:

```javascript
const users = [
  { username: 'obiwan', email: 'kenobi@gmail.com' },
  { username: 'yoda', email: 'yoda@coruscant.com' },
];

Object.freeze(users);
users.forEach((user) => Object.freeze(user));

// Change Obi-Wan's name.
users[0].username = 'ben';

// No error, let's check the object
console.log(users[0]); // { username: 'obiwan', email: 'kenobi@gmail.com' }
```

Now that we've frozen each object in the array, we get the desired outcome. Array items can't be added, removed, or modified.

If we ran the same above code in strict mode, it would fail with an error:

```
TypeError: Cannot assign to read only property 'username' of object '#<Object>'
```

### Recursively freezing objects

At any given level, `Object.freeze` will only freeze the top-level properties. For deeply nested objects, you will need to traverse all the way down and freeze at each level.

Fortunately, there is a simple package called [`deep-freeze`](https://www.npmjs.com/package/deep-freeze) that will do this in a single function call:

```javascript
import deepFreeze from 'deep-freeze';

const users = [
  { username: 'obiwan', email: 'kenobi@gmail.com' },
  { username: 'yoda', email: 'yoda@coruscant.com' },
];

deepFreeze(users);
```

This will freeze the array as well as all the objects in it. If those objects had nested object properties, those would be frozen as well. Since we are in an ES module (we're using `import`), this automatically puts us in strict mode, so attempting to change Obi-Wan's username will throw an error.

## Summary

- `const` marks a _reference_ as constant; it cannot be reassigned. However, the object pointed to by the `const` can be mutated.
- To make an object truly unmodifiable, you will need to freeze it.
- `Object.freeze` does not recurse into nested properties, but the [`deep-freeze`](https://www.npmjs.com/package/deep-freeze) package will.

Now you can crush this question on your next job interview!
