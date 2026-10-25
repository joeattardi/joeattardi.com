---
title: 'Think before you reach for that div'
subtitle: 'Using semantic HTML elements has several benefits over using plain divs.'
summary: 'In the past, web user interfaces were constructed largely using <div> and <span> elements.'
publishedDate: 2025-09-24T18:12:38.121Z
updatedDate: 2025-09-24T18:14:47.308Z
cover: ./cover.jpg
tags: ['HTML']
---

In the past, web user interfaces were constructed largely using `<div>` and `<span>` elements. These are generic block and inline elements that really were your only option other than `<p>` and a few other elements.

In 2014, when HTML5 was released as a W3C Recommendation, the day of the `<div>` as the primary building block of web interfaces was over. At least, that was the intent. This brave new world of HTML brought a slew of semantic elements that can - and should - be used over plain `<div>` elements.

A semantic element is one that provides some context about that element's role in the overall structure of the document. They provide structure, as a `<div>` does, but also provide meaning. Some examples of common semantic elements are:

- `<nav>`

- `<header>`

- `<main>`

- `<aside>`

## Why should I use semantic elements?

While your app will work perfectly fine with `<div>` elements, even in modern browsers, there are benefits of using these new semantic elements in your web applications.

### Accessibility

One of the most important reasons to use these elements is accessibility. When the document structure is better described with semantic elements, assistive technologies such as screen readers can give a more accurate outline of the document to a user, making it easier to use and navigate your app.

Using semantic elements won’t solve all of your accessibility concerns - you’ll still need to use ARIA attributes and other techniques - but it goes a long way in helping assistive technologies better understand your app’s layout and structure.

### Better SEO

When a search engine crawls your app to index it, semantic elements help the crawler understand its structure. In particular, it helps the crawler filter out the noise and find your main content, which is the important part to be indexed.

It also helps the crawler identify additional content, navigation, etc. and provides contextual relevance about the different parts of your app.

By helping the crawler identify the important, most relevant parts of your content, you can improve your search results and rankings. Be careful, though. If you use semantic tags incorrectly, this can mislead search engines and cause potential SEO issues.

### Less attribute noise

When you use semantic elements, you won’t need to use the role attribute as often. Each element has an implicit role, which is a default role that’s assigned without having to explicitly add it to the element. This lets you write, for example, `<nav>` instead of `<div role="navigation">`.

It also makes styling a little easier because you don't have to rely on adding CSS classes as much. For a header, before HTML5 you might have used something like: `<div class="header">`. Using semantic elements, this can just be `<header>` and simplifies your CSS selectors.

### Better alignment with best practices

As HTML evolves, semantic elements will likely remain important for the above reasons and others. Using them ensures your site is built with best practices in mind, and will benefit your site as HTML changes in the future.

While `<div>` elements aren't going anywhere - your site isn't suddenly going to stop working in a browser someday - following these best practices today makes for a better structured HTML document tomorrow.

## Other `div` antipatterns

Even before the introduction of HTML5 semantic elements, there have been other places where you should not - and still should not - use a `<div>`.

### Buttons

Here’s a `<div>` being used as a button, with a CSS class so that you can style it to look like a button:

```html
<div class="button">Click Me</div>
```

This has no semantic meaning at all. You can improve it somewhat by adding the `button` ARIA role:

```html
<div class="button" role="button">Click Me</div>
```

This semantically identifies the element as a button to assistive technologies, but there's still no way to activate this “button” with the keyboard. For that we have to give it a `tabindex` of `0`:

```html
<div class="button" role="button" tabindex="0">Click Me</div>
```

Why do this, when you can simply use a `<button>`:

```html
<button>Click Me</button>
```

### Lists

Avoid using `<div>` elements to define a list:

```html
<div class="list">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
</div>
```

Instead, use the proper semantic list elements:

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

You might not want the default list presentation of a bulleted list, with one item per line. However, you can use CSS to give the list any kind of layout you want, while still maintaining the semantic distinction of being a list.

## There's still a place for divs

I’m not a `<div>` hater. Far from it! I still use `<div>` and `<span>` elements all the time, and you can too. These elements are best used inside of a semantic element, where you need some separation for styling purposes. The important thing is that your document uses semantic elements to outline its structure.

You can also use a `<div>` to group related elements when there isn't a good semantic element to use. For example, if you have a set of action buttons inside of a semantic container like `<article>` or `<section>`, you can group these buttons inside a `<div>`.

As a general rule, consider the semantic meaning of your content. If there isn't a semantic element that fits your intent, it's probably okay to use a `<div>` or `<span>`.

## Summary

- Wherever possible, use semantic HTML elements such as `<header>`, `<section>`, `<nav>`, etc.

- It helps with accessibility, SEO, and spec compliance.

- Try not to recreate built-in elements like buttons and lists by using `<div>` elements. Instead, use the proper semantic element (`<button>`, `<ul>`, etc.).

- `<div>` elements still have their place, but check to see if there's a semantic element you can use first.

## Further reading

- freeCodeCamp has a great overview of [**semantic HTML5 elements**](https://www.freecodecamp.org/news/semantic-html5-elements/).

- MDN's [**reference of HTML elements**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) includes the semantic elements.
