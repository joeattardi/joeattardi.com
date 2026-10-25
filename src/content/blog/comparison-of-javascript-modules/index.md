---
title: 'Comparison of JavaScript modules'
summary: 'JavaScript has been around since 1995. In that time there have been several different ways to create modules.'
publishedDate: 2020-11-29T22:23:09.532Z
updatedDate: 2020-11-29T22:23:54.075Z
cover: ./cover.png
tags: ['JavaScript', 'Web Development', 'JavaScript Modules']
---

JavaScript has been around since 1995. In that time there have been several different ways to create modules. Due to browser compatibility issues and legacy codebases, all of these module types are still in use today.

## What is a module?

A module is some piece of functionality that is nicely encapsulated. A module defines a public API that is accessible from any code that uses the module. In addition, the module has some private, internal state that is _not_ accessible from outside of the module.

This means that we just need to interact with the module's public API. We don't need to know about how the module is implemented under the hood.

Modules can also have dependencies on other modules.

## The example module

For each module type, we'll look at the same module implemented in different ways. This is, simply, a counter module. The public API consists of three functions:

- `increment`: Increments the counter
- `decrement`: Decrements the counter
- `getValue`: Gets the counter's current value

Note that the counter itself is not publicly accessible. It can only be manipulated by calling the `increment` and `decrement` functions.

## Module types

Let's take a look now at the different types of modules used in JavaScript applications.

### The "Revealing Module" pattern

This is the oldest module type in use today. JavaScript had no language support for modules, so this pattern relies on a function's scope to provide the private state only accessible from inside the module. These types of modules are typically initialized with an immediately invoked function expression (IIFE). This is, essentially, a function that immediately calls itself.

The return value of the IIFE call is usually assigned to a variable, or a global variable on the browser's `window` object. Inside the IIFE call, the module's internals are set up, and an object is returned containing the module's public API.

Here's what the counter module looks like as a revealing module:

```javascript
const Counter = (function () {
  let value = 0;

  return {
    increment() {
      value++;
    },

    decrement() {
      value--;
    },

    getValue() {
      return value;
    },
  };
})();
```

The counter variable itself is defined inside the function, therefore it is not accessible outside of the module. We return an object containing the three functions of the public API.

We would use this module as follows:

```javascript
Counter.increment();
Counter.increment();
console.log(Counter.getValue());
```

### Asynchronous Module Definition (AMD) modules

AMD modules are most commonly used with tools such as RequireJS. Its name comes from the fact that modules are loaded asynchronously.

An AMD module is defined with a call to a function called `define`. The first argument to `define` is an array of other module names that the module depends on. The second is a function that takes the dependencies as arguments. The return value of this function is the module's public API.

Here is an example of an AMD module with dependencies on jQuery and Lodash:

```javascript
define(['jquery', 'lodash'], function($, _) {
  // jQuery and Lodash can be accessed here
  // via the `$` and `_` arguments to the function
}
```

If an AMD module has no dependencies, the dependency array argument can be omitted.

Here is our counter defined as an AMD module:

```javascript
define(function () {
  let value = 0;

  return {
    increment() {
      value++;
    },

    decrement() {
      value--;
    },

    getValue() {
      return value;
    },
  };
});
```

We would use our counter module from another AMD module like this.

```javascript
define(['./counter'], function (counter) {
  counter.increment();
  console.log(counter.getValue());
});
```

### CommonJS modules

CommonJS modules are typically used with Node.js. Each file is considered a module. To use functionality from another module, it is added to the current module by calling `require`, passing the module name. The module name can either be the relative path to another JavaScript file, or can be the name of a module installed from npm.

A CommonJS module's public API is declared by setting the `module.exports` property. Whatever is assigned to this will be the value returned when another module `require`s the module. There is an alternate syntax as well. CommonJS also exposes an `exports` property. Data and functions can be set on that property as well to define the module's public API.

That is, the following two are equivalent:

```javascript
module.exports = {
  functionOne() {},
  functionTwo() {},
};

exports.functionOne = function () {};
exports.functionTwo = function () {};
```

Here is our counter module implemented as a CommonJS module:

```javascript
let value = 0;

module.exports = {
  increment() {
    value++;
  },

  decrement() {
    value--;
  },

  getValue() {
    return value;
  },
};
```

The counter module can be used from another module by requiring it:

```javascript
const counter = require('./counter');

counter.increment();
console.log(counter.getValue());
```

### Universal Module Definition (UMD) modules

UMD modules are a kind of "catch-all" module. A UMD module will attempt to detect what kind of environment it's running in. The exact code varies from module to module, but the general steps are:

- The module itself is defined in a factory function which returns the module's public API.
- Check if we are running in an AMD environment, i.e. if `define` is defined and is a function. If so, call `define` and register the module, declaring its dependencies and passing the factory function.
- Check for the presence of an `exports` property. If it exists, we are probably running in a CommonJS environment. The factory function is called, and `module.exports` is set to the return value.
- Otherwise, call the factory function and assign its return value to the global scope.

We can define our counter module as a UMD module by using the following rough code, adapted from David Calhoun's excellent [blog post](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/):

```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // We're running in AMD
    define(factory);
  } else if (typeof exports === 'object') {
    // We're running in CommonJS
    module.exports = factory();
  } else {
    // Just set a property on the global object
	  root.Counter = factory();
  }
})(this, function() {
	let value = 0;

	return {
		increment() {
			value++;
		},

		decrement() {
			value--;
		},

		getValue() {
			return value;
		}
	};
}));
```

By using the UMD format, a module can have wide support across different modules and applications.

### ECMAScript (ES) modules

ES modules are the new standard, introduced in ES2015 (otherwise known as ES6). They introduce the `import` and `export` keywords to JavaScript language.

An ES module can have one _default export_ and one or more _named exports_. The only real difference between these is the syntax to import them.

#### Default export

The default export is set by using the `export default` keyword. This can be an object, function, or even a single value. A module can only have one default export, but it isn't required. A default export is not bound to a name. A name is chosen for it when it is imported from another module (see below).

```javascript
export default function add() {
  ...
}
```

#### Named exports

Named exports are bound to a name, but this name can be aliased when imported from another module. A named export is created by simply placing the `export` keyword in front of an object, function, or value.

```javascript
export const pi = 3.14;
```

#### Importing

A module is used by importing its default export or named exports.

When importing the default export, you assign it any name you want. Here's an example of the syntax:

```javascript
import add from './addModule';
```

To import a named export, the syntax is slightly different:

```javascript
import { pi } from './math';
```

You can alias the named export:

```javascript
import { pi as piValue } from './math';
```

In the above example, the `pi` named export will be bound to the name `piValue`.

You can also import multiple named exports, which can be a mix of objects, functions, and values:

```javascript
import { pi, squareRoot } from './math';

console.log(pi);
console.log(squareRoot(9));
```

Lastly, you can import all named exports together under a namespace:

```javascript
import * as math from './math';
```

#### The counter module

For completeness's sake, here is the counter as an ES module:

```javascript
let value = 0;

export function increment() {
  value++;
}

export function decrement() {
  value++;
}

export function getValue() {
  return value;
}
```

The module is used as follows:

```javascript
import { increment, getValue } from './counter';

increment();
console.log(getValue());
```

## Compatibility

Because AMD, CommonJS, UMD, and IIFE modules are all based on functions, they have very wide support. With the right tools they can be used with any runtime or browser.

Because ES modules involve the addition of new keywords, they aren't as widely supported. All modern browsers support ES modules natively, but they are not supported at all in Internet Explorer.

Fortunately, with tools like Babel or TypeScript, you can use the ES module syntax and the code will be transpiled into a form the browser will understand.

## Summary

In this article, we looked at several types of JavaScript modules:

- IIFE/Revealing Module
- AMD
- CommonJS
- UMD
- ES Module

They all have pros and cons so make sure to choose what makes the most sense for your project.

That said, for greenfield projects you should probably be using ES modules as that is where things are going.

I hope you found this helpful!
