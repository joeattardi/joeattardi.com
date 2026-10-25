---
title: 'Introduction to Custom Elements'
summary: "Custom elements have pretty good browser support. Of course, they aren't supported in Internet Explorer, but that shouldn't surprise anyone."
publishedDate: 2020-09-23T15:13:23.849Z
updatedDate: 2020-09-23T17:15:23.738Z
cover: ./cover.png
tags: ['JavaScript', 'HTML']
---

Custom elements have [pretty good browser support](https://caniuse.com/custom-elementsv1). Of course, they aren't supported in Internet Explorer, but that shouldn't surprise anyone.

If you don't need to support Internet Explorer 11, you can absolutely use Custom Elements today, as they are supported by all modern browsers.

## What is a custom element?

HTML has lots of built in elements, but Custom Elements allows you to create your own HTML elements with custom behavior. For example, I'm working on [Atomical](https://github.com/joeattardi/atomical), a custom element that displays a calendar.

In this article, we'll create a simple Click Counter element. It will render a button which displays the number of times it has been clicked.

## Anatomy of a custom element

At its core, a custom element is simply a JavaScript class that extends from the `HTMLElement` class. It contains some lifecycle callback methods, which we'll get into in a moment.

Finally, that class is registered with the browser's `CustomElementRegistry` (which you can find under the `customElements` property of the `window` object). The class is registered with a given element name. One rule: the element name _must_ contain a hyphen, to prevent it from clashing from current (and future!) HTML elements.

Another rule is when using custom elements, they must have a start and end tag, even when there is no child content - they cannot be self-closing.

## Lifecycle callbacks

There are a few lifecycle callbacks in a custom element. These are methods that are called by the browser at different points in the custom element's lifecycle. Here are the most commonly used lifecycle callbacks:

- `connectedCallback` - Called when the element is added to the DOM. Usually used to render the initial HTML, add event listeners, etc.
- `disconnectedCallback` - Called when the element is removed from the DOM. Used to perform cleanup.
- `attributeChangedCallback` - Called whenever an attribute of the custom element has changed.

## The `ClickCounter` custom element

Let's create our click counter.

### The component class

The first step is to create our component class. In the `connectedCallback`, we'll create the button and add a `click` event listener to increment the counter. This is a simplified implementation; we aren't doing any cleanup in a `disconnectedCallback`, which we'd want to do in a real-world custom element. Let's keep it simple for now.

```javascript
class ClickCounter extends HTMLElement {
  constructor() {
    super();
    this.clickCount = 0;
  }

  connectedCallback() {
    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = this.clickCount;

    buttonEl.addEventListener('click', () => {
      this.clickCount++;
      buttonEl.innerHTML = this.clickCount;
    }
  }
}
```

### Register the custom element

Now that we've created the custom element class, let's register it with the `CustomElementRegistry`:

```javascript
customElements.define('click-counter', ClickCounter);
```

### Use the element

The last step is to use the `click-counter` element in our HTML:

```html
<h1>Click Counter</h1>
<click-counter></click-counter>
```

This will render a button with a label of 0. Every time you click the button, the counter on the button's label will increment.

## Live code

Here's a CodePen containing this example code that you can play with:

<figure class="embed">
  <iframe src="https://codepen.io/thinksInCode/embed/xxVmexr?default-tab=result" title="CodePen demo: click-counter custom element" loading="lazy" allowfullscreen></iframe>
  <figcaption><a href="https://codepen.io/thinksInCode/pen/xxVmexr">Open this demo on CodePen</a></figcaption>
</figure>
