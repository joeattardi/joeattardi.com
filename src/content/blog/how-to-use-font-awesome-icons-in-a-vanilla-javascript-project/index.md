---
title: 'How to use Font Awesome icons in a vanilla JavaScript project'
summary: 'I was working on a vanilla JavaScript project recently and wanted to add some Font Awesome icons. Previously I have used Font Awesome icons in React or Angular projects, but never plain JavaScript.'
publishedDate: 2019-09-10T02:07:51.000Z
tags: ['JavaScript', 'Font Awesome']
---

I was working on a vanilla JavaScript project recently and wanted to add some Font Awesome icons. Previously I have used Font Awesome icons in React or Angular projects, but never plain JavaScript. It turned out to be pretty easy.

## Install packages

First, install the packages needed. The `fontawesome-svg-core` package is required. Beyond that, you only need to install the icon packages containing the icons you want to use. For this example, we'll install both the regular and the solid icons.

```shell
npm install --save @fortawesome/fontawesome-svg-core \
                   @fortawesome/free-regular-svg-icons \
                   @fortawesome/free-solid-svg-icons
```

## Use the icons

There are two things you'll need to import from `@fortawesome/fontawesome-svg-core`:

- `library`: A generic collection of icons. Icons must be added to the library before they can be used.
- `icon`: A function that generates the icon data.

```javascript
import { library, icon } from '@fortawesome/fontawesome-svg-core';
```

Next, import the icons you want and add them to the library:

```javascript
import { faCat } from '@fortawesome/free-solid-svg-icons';

library.add(faCat);
```

Now we can create the icon data that contains, among other things, the SVG markup to insert into the DOM. You'll need to pass two pieces of information to the `icon` function:

- `prefix`: The icon prefix, determined by which icon collection the icon is in (solid or regular). Usually this will be `fas` for solid or `far` for regular.
- `iconName`: The name of the icon (without the `fa` prefix).

These options are passed as an object to the `icon` function. The returned object has an `html` property that contains the markup we're looking for. We can then add this markup to the DOM:

```javascript
const iconContainer = document.createElement('span');
iconContainer.innerHTML = icon({ prefix: 'fas', iconName: 'cat' }).html;
```

Now `iconContainer` can be added to the document, and you will have a cat icon in your page!

```javascript
someDiv.appendChild(iconContainer);
```

Here's a more substantial example. In my project [emoji-button](https://github.com/joeattardi/emoji-button), I have all my icons in a single file that gets imported wherever icons are needed. My icon set includes icons from both the solid and the regular libraries.

```javascript
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
  faCat,
  faCoffee,
  faFutbol,
  faHistory,
  faMusic,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBuilding,
  faFlag,
  faFrown,
  faLightbulb,
  faSmile,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faBuilding,
  faCat,
  faCoffee,
  faFlag,
  faFrown,
  faFutbol,
  faHistory,
  faLightbulb,
  faMusic,
  faSearch,
  faSmile,
  faTimes,
);

export const building = icon({ prefix: 'far', iconName: 'building' }).html;
export const cat = icon({ prefix: 'fas', iconName: 'cat' }).html;
export const coffee = icon({ prefix: 'fas', iconName: 'coffee' }).html;
export const flag = icon({ prefix: 'far', iconName: 'flag' }).html;
export const futbol = icon({ prefix: 'fas', iconName: 'futbol' }).html;
export const frown = icon({ prefix: 'far', iconName: 'frown' }).html;
export const history = icon({ prefix: 'fas', iconName: 'history' }).html;
export const lightbulb = icon({ prefix: 'far', iconName: 'lightbulb' }).html;
export const music = icon({ prefix: 'fas', iconName: 'music' }).html;
export const search = icon({ prefix: 'fas', iconName: 'search' }).html;
export const smile = icon({ prefix: 'far', iconName: 'smile' }).html;
export const times = icon({ prefix: 'fas', iconName: 'times' }).html;
```

Now I can `import` any of these icons and add them to my UI wherever needed.
