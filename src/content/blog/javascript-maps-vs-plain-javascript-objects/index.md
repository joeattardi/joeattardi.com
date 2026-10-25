---
title: 'JavaScript Maps vs Plain JavaScript Objects'
summary: "ES2015, also known as ES6, added lots of new things to the JavaScript language. One very useful addition was the Map. Map allows you to map keys to values. Couldn't we already do that?"
publishedDate: 2020-09-25T15:36:31.738Z
cover: ./cover.png
tags: ['JavaScript', 'Web Development', 'ES6']
---

ES2015, also known as ES6, added lots of new things to the JavaScript language. One very useful addition was the `Map`. `Map` allows you to map keys to values.

## Couldn't we already do that?

You might be thinking - we already could map keys to values in JavaScript!

```javascript
const map = {};

map[key1] = value1;
map[key2] = value2;
```

You would be correct. Prior to ES2015, you could absolutely use JavaScript objects to map keys to values. However, there was an important limitation. When mapping with a JavaScript object, only strings may be used as keys. Consider the following:

```javascript
const map = {};

const key1 = { foo: 'bar' };
const key2 = { baz: 'qux' };

map[key1] = 100;
map[key2] = 200;
```

Here we are taking two JavaScript objects and mapping them to some numbers. This is perfectly valid JavaScript; you won't get any errors when running this code. Let's see what happens when we try to retrieve these values:

```javascript
console.log(map[key2]); // prints 200
```

So far, so good. Now let's look up the first key:

```javascript
console.log(map[key1]); // also prints 200
```

Why does this print `200`, when in the above code we mapped `key1` to the value `100`? Let's investigate by looking at all the keys in the object `map`:

```javascript
console.log(Object.keys(map));
```

This will print out an array with a single key:

```javascript
['[object Object]'];
```

What's going on here?

It turns out, if you use a non-string key in a JavaScript object, the key is converted to a string by calling `toString` on it. For a plain JavaScript object, this results in the key `'[object Object]'`.

So when we set the first key in our `map` object, it was converted to that string, and everything would have worked as expected up to that point. However, when we added the second key, that was also converted to the same string value, so it overwrote the previous mapping. This is why the result will always be `200`.

## `Map` to the rescue

The ES2015 `Map` can solve this problem for us. Like a plain object, it can map keys to values. Unlike plain objects, a `Map` can have non-string keys.

### Creating a `Map`

Let's use the same example as above, only using a `Map` instead of a plain JavaScript object.

```javascript
const map = new Map();

const key1 = { foo: 'bar' };
const key2 = { baz: 'qux' };

map.set(key1, 100);
map.set(key2, 200);

console.log(map.get(key1)); // prints 100
console.log(map.get(key2)); // prints 200
```

Now the mapping works as expected, because a `Map` can use objects as keys.

For more information about `Map`, see the excellent [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
