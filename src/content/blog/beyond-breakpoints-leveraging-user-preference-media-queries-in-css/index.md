---
title: 'Beyond breakpoints: Leveraging user preference media queries in CSS'
subtitle: 'Learn how to use media queries to learn about certain device settings.'
summary: 'If you build web sites or apps, chances are you work with media queries. These handy CSS tools allow you to adjust your layout depending on the size of the device.'
publishedDate: 2024-10-22T04:00:00.000Z
cover: ./cover.jpg
tags: ['CSS']
---

If you build web sites or apps, chances are you work with media queries. These handy CSS tools allow you to adjust your layout depending on the size of the device. They are a key part of responsive design.

You can query based on the width of the device, its aspect ratio, orientation, and more. These all allow you to fine-tune your layout for the device being used.

You might not know that there are other media queries available that let you tailor your site or app based on the user's preferences rather than their device size and orientation.

## User preference media queries

There are several media queries that deal with user preferences. You can use these to fine tune your app's experience for the user.

## Automatic dark mode with `prefers-color-scheme`

Dark mode is everywhere these days. It seems like every site now has the sun/moon toggle button to switch between light mode and dark mode. You can take this one step further and use the `prefers-color-scheme` media query to automatically determine if the user's device is using a light or dark color mode.

Here's how it works: Define your CSS styles for light mode like you normally would. Then add the media query `prefers-color-scheme: dark`. In there, add CSS rules overriding your light mode colors:

```css
.content {
  background-color: white;
  color: black;
}

@media (prefers-color-scheme: dark) {
  .content {
    background-color: black;
    color: white;
  }
}
```

### Tip: Create themes with CSS variables

To make life a little easier, you can define all your colors in a theme, a set of CSS variables. Then inside your `prefers-color-scheme: dark` block, you only need to redefine the variables instead of re-adding your CSS selectors and rules:

```css
:root {
  --main-background: white;
  --text-color: black;
}

.content {
  background-color: var(--main-background);
  color: var(--text-color);
}

@media (prefers-color-scheme: dark) {
  --main-background: black;
  --text-color: white;
}
```

## Tone down animations with `prefers-reduced-motion`

Animations can enhance your app's experience, but animations may be difficult for users with vision or vestibular problems. To assist these users, some devices and operating systems have an option in the user preferences to reduce motion.

You can use the `prefers-reduced-motion` media query to detect when such an option is enabled for the user's device. You can then use alternate animations that are less intense (or turn them off altogether).

Here's an example of using `prefers-reduced-motion` to turn off an animation.

```css
.content {
  animation: my-awesome-animation 250ms ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .content {
    animation: none;
  }
}
```

One thing to note: If you turn off animations like this, make sure you don't have any code that relies on an `animationend` event. When you set `animation` to `none`, as shown above, this event will never be fired.

Keep in mind that you don't have to turn off animations when `prefers-reduced-motion: reduce` matches! Suppose you have a fancy reveal animation where the element bounces into view. When the user wants reduced motion, you could change this so it's a simple fade-in animation.

## Adaptive contrast with `prefers-contrast`

Some users with vision difficulties may have increased contrast enabled on their device. You can handle such situations with the `prefers-contrast` media query.

If this media query matches, you can adjust your contrast to make things easier to see for these users.

```css
.box {
  border: 1px solid gray;
}

@media (prefers-contrast: more) {
  .box {
    /* Make the border stand out more against the background */
    border: 2px solid black;
  }
}
```

## Checking media queries with JavaScript

Suppose you're animating with JavaScript - for example, maybe you're using the Web Animations API. Since these animations aren't defined in the CSS, you can't turn them off with the `prefers-reduced-motion` media query.

Or can you?

Yes! You can use the `window.matchMedia` method to evaluate a media query from JavaScript. The media query is passed as an argument, and the method returns something called a `MediaQueryList`.

This object has a `matches` property, which is a boolean indicating whether or not this media query currently matches. Based on the value, you can decide whether or not to animate.

Here's a simple example showing how `window.matchMedia` can be used to conditionally call `animate` on a DOM element:

```javascript
// Check to see if we should animate
const query = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!query.matches) {
  someElement.animate(...);
}
```

### Reacting to changes

A `MediaQueryList` even has a `change` event which fires if conditions change and the media query no longer applies.

Suppose you have some JavaScript code that you only want to run for large displays. If the user's screen size is small, you want to skip this code. You can do this by calling `window.matchMedia` using a `max-width` query or something similar.

Suppose that later, the user resizes the window, and now you want to run the large screen specific JavaScript code. Just listen for the `MediaQueryList`'s `change` event, and you can check the event's `matches` property to see what the new value is.

## Summary

These media queries can help you to better personalize your user's experience within your website or app. You can automatically apply a dark color scheme, and even fine-tune your animations and contrast depending on user preferences. They also help with accessibility, which is always a win.

It's still in an experimental stage, but you can also keep an eye out for the `prefers-reduced-data` query which will indicate whether the user's device has a requirement that is uses less data. This can be used to provide alternate content that uses less data. For example, you could skip non-essential images (or use lower-resolution versions).
