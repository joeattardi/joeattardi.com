---
title: 'Using Animations with Tailwind CSS'
summary: "Tailwind CSS is awesome. Animations are awesome. So let's combine them! It's really easy to define your own custom animations with Tailwind."
publishedDate: 2020-11-26T04:14:55.552Z
updatedDate: 2024-10-04T03:21:56.405Z
cover: ./cover.jpg
tags: ['Tailwind CSS', 'CSS Animations']
---

Tailwind CSS is awesome. Animations are awesome. So let's combine them! It's really easy to define your own custom animations with Tailwind.

## Quick CSS animation refresher

A CSS animation is defined by creating a set of _keyframes_. These keyframes define what CSS properties are applied at different points during the animation. When the animation is performed, the browser gradually transitions these properties between keyframes, creating an animation. Here's a simple example that makes an element spin:

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

These keyframes define the animation, and they are applied by using the `animation` CSS property on an element. This is a shorthand property that allows you to set multiple animation-related properties, such as `animation-name` and `animation-duration`, in a single line.

Let's apply the `spin` animation to an element:

```css
.box {
  margin: 50px;
  width: 200px;
  height: 200px;
  background: red;
  animation: spin 1s infinite;
}
```

Here is the result:

<figure class="embed">
  <iframe src="https://codepen.io/thinksInCode/embed/jOMOOVB?default-tab=result" title="CodePen demo: spinning box CSS animation" loading="lazy" allowfullscreen></iframe>
  <figcaption><a href="https://codepen.io/thinksInCode/pen/jOMOOVB">Open this demo on CodePen</a></figcaption>
</figure>
## Animating with Tailwind

Now that we remember how animation works with CSS, let's do it the Tailwind way. Tailwind ships with a few built-in animations, such as:

- `spin`
- `ping`
- `pulse`
- `bounce`

These animations can then be applied to an element by adding the class `animate-<animation name>`, e.g. `animate-spin`.

Let's say we want to do a fancier animation than the ones that are built in. Let's add a `roll` animation that moves and rotates the element. We can extend Tailwind to add new animation classes to do whatever we want.

To do this, you will need to edit your Tailwind configuration file. This is where the custom keyframes and animations are defined. These are set by specifying or extending the `keyframes` and `animations` properties in the theme.

First, let's define the keyframes:

```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        roll: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateX(20rem) rotate(385deg)' },
        },
      },
    },
  },
};
```

As you can see, Tailwind lets you combine keyframes if they have the same CSS properties. The keyframes we've defined here have the element in its original position with no rotation at the beginning and the end of the animation. At the halfway point of the animation, the element is moved `20rem` to the right and rotated 385 degrees.

Next, we have to define an animation that uses these keyframes, under the `animations` property:

```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        roll: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateX(20rem) rotate(385deg)' },
        },
      },
      animations: {
        roll: 'roll 3s ease-in-out infinite',
      },
    },
  },
};
```

These changes will cause Tailwind to define a new class called `animate-roll`. All we have to do now is apply that class to an element, along with a little extra Tailwind styling, and we're done!

```html
<div class="p-20">
  <div
    class="animate-roll w-40 rounded-md border-2 border-blue-700 bg-blue-600 px-8 py-2 text-center text-xl font-bold text-white"
  >
    Hello Tailwind!
  </div>
</div>
```

The final result can be seen in [this Tailwind Play playground](https://play.tailwindcss.com/xSgo2Ah8fI?layout=horizontal).

![A blue "Hello Tailwind!" card rolling across the screen](./image-1.gif)
