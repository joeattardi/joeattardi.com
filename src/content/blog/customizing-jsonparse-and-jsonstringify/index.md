---
title: 'Customizing `JSON.parse` and `JSON.stringify`'
summary: 'The JSON.stringify and JSON.parse functions are handy for converting objects to JSON strings and back again. However, not all properties of an object are serializable.'
publishedDate: 2023-04-27T03:27:44.877Z
updatedDate: 2023-07-07T16:16:30.646Z
cover: ./cover.jpg
tags: ['JavaScript', 'JSON']
---

The `JSON.stringify` and `JSON.parse` functions are handy for converting objects to JSON strings and back again.

However, not all properties of an object are serializable. Functions, regular expressions, and `Date` objects are all examples of values that can't be translated to a string and back again.

Let's create a user object containing a `Date` property.

```javascript
const user = {
  username: 'admin',
  lastLogin: new Date(),
};
```

When we stringify this object, the `Date` becomes an ISO date string:

```javascript
{
    "username": "admin",
    "lastLogin": "2023-04-27T01:46:16.100Z"
}
```

This is a good string representation. The problem is when we pass this string to `JSON.parse`, the resulting object's `lastLogin` property will still be a string - it won't be turned back into a `Date`.

## Adding a reviver function

We can provide customized deserialization logic with a _reviver_ function. This is a function that's called during the parsing process. The reviver function takes two arguments: a key and a value. It's called for each key/value pair in the object. For each invocation of the reviver, the value returned for a given key is used as the final value in the parsed object.

Finally, the reviver function is then called with an empty key, and the parsed object as its value. This allows you to make any final changes to the object before returning it from `JSON.parse`.

We can write a reviver function to convert this JSON string back to the original user object, `Date` and all.

```javascript
function reviver(key, value) {
  if (key === 'lastLogin') {
    // pass the date string to the Date constructor
    return new Date(value);
  }
}

const parsed = JSON.parse(jsonString, reviver);
```

## Adding a replacer function

What if we want to store the `lastLogin` date in a different format? Maybe instead of a human readable ISO string, we want to use a more compact timestamp format.

We can customize `JSON.stringify` by writing a replacer function. This function is similar to the reviver function for `JSON.parse`. It is called first with the object itself, then is called again for each key/value pair.

By the time it is called with the key/value pairs, the stringification of these properties has already been done. However, the original object can still be accessed via the `this` context (as long as it's not an arrow function!).

```javascript
function replacer(key, value) {
  if (key === 'lastLogin') {
    // value is already a string here, but we can access the
    // original property
    return this.lastLogin.getTime();
  }

  return value;
}

const json = JSON.stringify(user, replacer);
```

Now when we call `JSON.stringify` on the user, the `lastLogin` field will be a numeric timestamp.

### Alternative: use a `toJSON` function

If an object being stringified has a `toJSON` function, the stringification is done on the return value of that function rather than the original object.

With our user object, this might look like:

```javascript
function createUser(name) {
  return {
    name,
    lastLogin: new Date(),
    toJSON() {
      return {
        name: this.name,
        lastLogin: this.lastLogin.getTime(),
      };
    },
  };
}

JSON.stringify(createUser('admin'));
```

When we call `JSON.stringify` our `toJSON` function is called, and the return value is used for stringification.

Using replacer and reviver functions gives us greater control over the serialization of objects to JSON, and lets us persist more complex objects in local storage.
