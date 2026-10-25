---
title: 'All about `this` in JavaScript'
summary: 'What does this refer to in JavaScript? It depends on the situation. A tour of the common scenarios, from the global scope to arrow functions.'
publishedDate: 2020-08-28T00:43:06.000Z
cover: ./cover.png
tags: ['JavaScript', 'Web Development']
---

## What is `this`?

It depends on the situation. Let’s look at a few common scenarios.

### The global `this`

Outside of a function, `this` references the global object. In a browser environment, this is typically the `window` object. In this scenario, you can set properties on the global object by referencing it with this:

```javascript
this.name = 'Joe';

console.log(window.name); // Joe
console.log(name); // Joe
console.log(this.name); // Joe
```

### `this` inside a function called on an object

Suppose we have the following object:

```javascript
const joe = {
  name: 'Joe',
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  },
};
```

If we call the `sayHello` function on the `joe` object like this:

```javascript
joe.sayHello(); // prints 'Hello, I'm Joe'
```

Then `this` inside the `sayHello` function refers to the `joe` object.

When you call a function on an object using dot notation like we have done above, you could say that `this` refers to the object before the dot. This is sometimes called the _receiver_.

If, however, we save a reference to the `sayHello` function and call it via the reference, we receive a different result:

```javascript
const greet = joe.sayHello;
greet(); // prints "Hello, I'm undefined"
```

What happened? When there is no explicit receiver in a function call, `this` refers to the global object. If nothing else has set a `name` property on the `window` object, this will print `Hello, I'm undefined`.

If some other code already set a `name` property on the `window` object, it will print that instead. Consider the following code:

```javascript
name = 'Bob';

const joe = {
  name: 'Joe',
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

joe.sayHello(); // prints "Hello, I'm Joe"

const greet = joe.sayHello;
greet(); // prints "Hello, I'm Bob"

const ben = {
  name: 'Ben',
  sayHello: joe.sayHello,
};
ben.sayHello(); // prints "Hello, I'm Ben"
```

### `this` inside an event listener

Another common scenario is an event listener. When an event listener is added, a callback function is specified to handle the event. When this callback is called, `this` refers to the object that the event listener was added to.

```javascript
document
  .querySelector('button.myButton')
  .addEventListener('click', function () {
    this.style.background = 'red';
  });
```

Here we added a `click` listener to a button. When the button is clicked and the callback function is executed, `this` refers to the button.

### `this` inside a callback

There are several useful functions on `Array.prototype` such as `forEach`, `map`, `reduce`, etc. Each of these takes a callback function as an argument.

Inside the callback passed to these functions, `this` refers again to the global object.

```javascript
const arr = [1, 2, 3];
arr.forEach(function (item) {
  console.log(this);
});
```

When the above code is run in a browser, it will print the `window` object to the console three times.

Consider the following code:

```javascript
name = 'Bob';

const joe = {
  name: 'Joe',
  greet(people) {
    people.forEach(function (person) {
      console.log(`Hello ${person}, I'm ${this.name}`);
    });
  },
};

joe.greet(['Liz', 'Ben']);
```

The above code will produce the following output:

```
Hello Liz, I'm Bob
Hello Ben, I'm Bob
```

Even though the `greet` function has a `this` value of the `joe` object, inside the callback to `forEach` the value of `this.name` is `Bob`, which was set on the `window` object.

How can we change this code so that the `greet` function prints `Joe` instead of `Bob`?

One way is to save a reference to `this` and reference that from inside the callback:

```javascript
name = 'Bob';

const joe = {
  name: 'Joe',
  greet(people) {
    const self = this;
    people.forEach(function (person) {
      console.log(`Hello ${person}, I'm ${self.name}`);
    });
  },
};

joe.greet(['Liz', 'Ben']);
```

When we run this, it works as intended:

```
Hello Liz, I'm Joe
Hello Ben, I'm Joe
```

Why does this work? Because a function inherits the surrounding scope (thanks, closure), the value of `self` can be accessed from within the callback function.

This is generally frowned upon these days, as there are better ways to accomplish this, as discussed in the next section.

## Changing the value of `this`

### Using an arrow function

The easiest way to accomplish what the previous code sample does is to use an arrow function instead of the `function() { ... }` syntax.

An arrow function does not get its own `this`; rather, it inherits the `this` of its enclosing scope. We can rewrite the previous example using arrow functions:

```javascript
name = 'Bob';

const joe = {
  name: 'Joe',
  greet(people) {
    people.forEach((person) =>
      console.log(`Hello ${person}, I'm ${this.name}`),
    );
  },
};

joe.greet(['Liz', 'Ben']);
```

The output is the same as before:

```
Hello Liz, I'm Joe
Hello Ben, I'm Joe
```

The value of `this` inside the arrow callback function is the `joe` object.

### Use `Function.prototype.bind`

There are several handy functions on the prototype of `Function`. One of these is `bind`. With this function you can change what `this` refers to in a given function.

```javascript
const joe = {
  name: 'Joe',
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

const greet = joe.sayHello;
greet();
```

As we have already seen, the above code will not print `Hello, I'm Joe` because we are calling the `sayHello` function without an explicit receiver. However, we can fix this by calling `bind`:

```javascript
const joe = {
  name: 'Joe',
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

const greet = joe.sayHello.bind(joe);
greet(); // prints "Hello, I'm Joe"
```

Here's what `bind` does: Calling `bind` on a function like we did above returns a _new function_ whose `this` value is bound to the first argument passed to `bind`.

`joe.sayHello` is a reference to the `sayHello` function. We then call `bind(joe)` on that function, which returns a new function where `this` is bound to the `joe` object. So our code works as intended.

`bind` can actually take more than one argument. That's beyond the scope of this post, but essentially it allows you to do partial application of functions.

### Use `Function.prototype.call` or `Function.prototype.apply`

Two other useful functions on the `Function` prototype are `call` and `apply`. They both have the same end result, they just approach it slightly differently, as we will see in a moment.

```javascript
const joe = {
  name: 'Joe',
  greet(person) {
    console.log(`Hello ${person}, I'm ${this.name}`);
  },
};

const greet = joe.greet;

greet('Ben'); // prints "Hello Ben, I'm undefined"

greet.call(joe, 'Ben'); // prints "Hello Ben, I'm Joe"
greet.apply(joe, ['Ben']); // prints "Hello Ben, I'm Joe"
```

As you can see, `call` and `apply` both accomplish what we want. But you might notice there's a slight difference in how they're used.

First, what do they have in common? `call` and `apply` both invoke a function with the first argument bound as the `this` value. So in the above example, when we call `call` and `apply` on the function, the `joe` object is bound to `this`.

This is similar to `bind` as shown above, but with one key difference. `bind` returns a _new_ function that will always have the specified `this` value for every invocation. In contrast, `call` and `apply` operate on the original function, and their effects apply only to that single invocation.

Now, back to `call` and `apply`. What is the difference? The difference is how we specify the arguments to the function call. `Function.prototype.call` takes a variable number of arguments. Each of these arguments are passed, in order, as arguments to the original function.

`Function.prototype.apply` takes two arguments. The first, as we've seen, is the `this` value to use. The second argument is an array of the argument values to be passed to the function call. The difference is more apparent with a function call using multiple arguments. Consider the difference between these:

```javascript
// These both call the greet function with joe as the this value, and three arguments: 'Ben', 'Liz', and 'Bob'
greet.call(joe, 'Ben', 'Liz', 'Bob');
greet.apply(joe, ['Ben', 'Liz', 'Bob]);
```

### Other ways

There are yet other ways to affect the value of `this` in a function call. One example is `Array.prototype.forEach`. As we saw earlier, `forEach` takes a callback function as its argument. However, it also takes an optional second argument. If specified, this argument will become the value of `this` in the callback function:

```javascript
const joe = {
  name: 'Joe',
  greet(people) {
    people.forEach(function (person) {
      console.log(`Hello ${person}, I'm ${this.name}`);
    }, this);
  },
};

joe.greet(['Liz', 'Ben']);
```

Notice in the `forEach` call that `this` was passed as the second argument after the callback. As long as this function is invoked like this: `joe.greet(...)`, then the callback function will have the correct `this` value set.

## Summary

The rules of `this` in JavaScript can be a little tricky for beginners, but hopefully this post has helped clear up some confusion.

As we have seen, there are several ways to affect what the `this` value is during a function call. If you are using ES2015+, the easiest way is to just use an arrow function. If you can't use arrow functions, there are still several tools at your disposal such as `bind`, `call`, and `apply`.
