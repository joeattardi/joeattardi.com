---
title: 'How Emojis Work'
summary: 'In the process of writing Emoji Button, my plain JavaScript emoji picker (which turns one year old tomorrow, August 29th!), I have learned a lot about emojis!'
publishedDate: 2020-08-29T01:20:52.504Z
cover: ./cover.png
tags: ['Emoji']
---

In the process of writing [Emoji Button](https://emoji-button.js.org), my plain JavaScript emoji picker (which turns one year old tomorrow, August 29th!), I have learned a lot about emojis! Hopefully someone out there will find this information useful, or at least interesting.

Emojis are everywhere nowadays - SMS messages, Slack messages, even Git commit messages! But what makes these little smileys (and other icons) work?

## 📜 A little history

Emojis were predated by so-called "emoticons". These were sequences of characters that resembled faces with different expression, such as `:-)` for a smiley face. The emoticon first originated in electronic communications by Scott Fahlman on September 19, 1982, but their usage in printed text pre-dates even that. As early as the late 1800s (and possibly even earlier), sequences of print characters were proposed to represent different emotions.

There are several claims as to who invented the first graphical emoji characters, but they originally grew in popularity in Japan. Cell phone manufacturers began work to introduce their own emoji sets in the early 2000s.

Unicode is an industry standard for encoding of text. During the 2000s, Unicode gradually added emoji characters. Later that decade, it was suggested that Unicode consider creating a standard set of emojis that could be used across different platforms. Then, in 2009, the Unicode Technical Committee produced a proposed Unicode Emoji standard. Unicode 6.0 was the first version with a uniform set emojis.

## ⚙️ What makes an emoji?

Under the hood, emojis are just sequences of Unicode code points. For example, the "face with tears of joy" emoji (😂) is the code point `U+1F602`. The most basic emojis are single Unicode code points.

## 🎨 Why do emojis look different on different operating systems?

The Emoji standard defines what code point sequences stand for what emojis, but doesn't dictate how they should look. Each operating system vendor creates their own images for these emoji characters and puts them all into the system font as glyphs.

## 👍🏼 Skin tone variations

Unicode 8.0 added support for skin tone variations on human emojis. This is supported via a set of five modifiers based on the [Fizpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale) for measuring human skin color. These modifiers are themselves also Unicode code points, starting at `U+1F3FB` and ending at `U+1F3FF`.

To create a skin tone variant of an emoji, a sequence is used consisting of the main emoji code point followed by the skin tone modifier. So for example, a dark skinned thumbs-up emoji (👍🏿) would be represented by the sequence `U+1F44D U+1F3FF`.

## 👨‍🚀 Complex emoji sequences

Some emojis don't have a single code point, but rather are expressed as sequences of other emoji code points - compound emojis, if you will. Here's an example: the male astronaut emoji (👨‍🚀). This is actually a combination of the man emoji (👨, `U+1F468`) and the rocket emoji (🚀, `U+1F680`).

But how does the system distinguish between an astronaut and a man followed by a rocket?

Enter the Zero Width Joiner (ZWJ).

The ZWJ, sometimes pronounced "zwidge", is not an emoji itself but is used in emoji sequences. Its code point is `U+200D`. It is an invisible character with, as its name implies, zero width.

The ZWJ is used as glue to attach different emoji code points together to create compound emoji sequences. Going back to our example of the male astronaut emoji, the sequence for this emoji would be `U+1F468 U+200D U+1F680`.

This can even be combined with a skin tone modifier to create a medium-skinned male astronaut (👨🏽‍🚀): `U+1F468 U+1F3FD U+200D U+1F680`. Note that the skin tone modifier, `U+1F3FD`, does not use a ZWJ.

## 👁‍🗨 Variation Selector 16

There is another special emoji code point, called Variation Selector 16, with a code point of `U+FE0F`. Some emojis also have a plain text presentation, which means they usually appear as a solid shape. For example, the heart emoji (❤️) has a plain text presentation (❤).

By default, these emojis will appear with the plain text presentation. The heart emoji code point is `U+2764`. This code point alone will result in the solid heart (❤).

To display these characters as their colorful emoji presentation, they are followed by Variation Selector 16. So to get the red heart, you would use the sequence `U+2764 U+FE0F`.

Some emoji sequences can have one (or more!) ZWJs and Variation Selector 16 characters. Take the example of the "eye in speech bubble" emoji (👁‍🗨). This is a complex sequence, `U+1F441 U+FE0F‍ U+200D U+1F5E8 U+FE0F`:

- `U+1F441` eye
- `U+FE0F` Variation Selector 16
- `‍U+200D` Zero Width Joiner
- `U+1F5E8` left speech bubble
- `U+FE0F` Variation Selector 16

## 🖖 Wrapping up

There are some further emoji topics - additional modifiers, fully qualified vs. unqualified sequences, and more, but in the interests of time I won't cover those here. Maybe in a future post!

I hope you found this informative and that you learned something new about emojis! Think about this complexity the next time you send an emoji in a text message.
