---
title: 'Is vibe coding the future?'
subtitle: 'Vibe coding is a new way to code that is gaining popularity. But is it the future?'
summary: 'Andrej Karpathy coined “vibe coding” in early 2025, and it has strong supporters and detractors. Is it really the future of software development?'
publishedDate: 2025-03-23T04:00:00.000Z
cover: ./cover.jpg
tags: ['AI', 'Vibe Coding']
---

The concept of “vibe coding” was first introduced by Andrej Karpathy in an [X post](https://x.com/karpathy/status/1886192184808149383) from February 2025:

> There's a new kind of coding I call "vibe coding", where you fully give in to the [vibes](https://x.com/karpathy/status/1886192184808149383), embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard.

Since then, the concept has caught on and people have been using this technique to build all kinds of things.

There are strong opinions on both sides. It seems to be particularly popular with the “indie hacker” crowd.

Vibe coding, to me, seems like a good way to prototype something in a short period of time. I experimented with it recently, using Cursor and nothing but its agent mode to build a fully functional toast notification web component, complete with notification stacking and nice animations.

I wrote a specification of what I wanted, it built it, and fixed all the bugs that I found. I had a fully working web component with all the bells and whistles in about an hour. I didn't write any code, and just accepted all of Cursor's proposed changes. I was seriously impressed with the final product.

However, without studying and understanding the code that was generated, I don't feel comfortable publishing this component as an npm package. Some might say that taking this step would defeat the purpose of vibe coding. Maybe it does, but I wouldn't want to put work out there with my name on it without a full understanding of what it does.

There have been several incidents I've seen on X where someone built a whole app using the vibe coding approach, and deployed it without fully understanding it or its security vulnerabilities, and the app was hit with malicious attacks.

It's tempting to think you can bootstrap a SaaS in a weekend using the vibe coding approach, but as these folks found out, there's more to building an app than writing a bunch of code. You need to understand the security risks and other issues, and how to mitigate them to make sure you don't end up with a surprise $25,000 Vercel bill.

Personally, I don't think vibe coding is a practical way for a less technical person to build an app. There are too many gaps in knowledge, since the AI can only create what you ask it to. If you're in such a position, you're much better off using a no-code platform, something like [**Bubble**](https://bubble.io/), to build your full stack app.

If you are a technical person, though, I think this is a fine approach to throw together a proof of concept of something you want to build. If you really study and understand the code that's generated (and fix issues that you find!), it might even be a good starting point for a real-world app.

As AI models get more capable of writing code, I think it's only natural that we will start to use them more to build things. I think this is particularly true with front-end code (which has me a little nervous, since that's what I do!).

To answer the question posed by this post's title - no, I don't think vibe coding is the future. It's definitely another tool for the AI toolbox, but in my opinion you're asking for trouble if you use this approach to build and deploy an entire app without putting in the work to understand it, audit it, and make sure there aren't vulnerabilities.

Having said all that - it's damn impressive what I have seen Cursor's agent mode be able to do. Going back to my toast notification web component, I started with an empty directory and Cursor did the rest. If I get around to it, I might learn how it works, clean it up, and maybe I'll publish it one of these days.

Having AI generate some code based on a problem statement is impressive, but I think the real superpower is that it can iterate on the result. Found a bug, or don't like how it turned out? Just have a conversation and watch the code improve.

For another recent project I build, a tool called [**URL Scrub**](https://urlscrub.com/) (check it out!), I used Vercel's [**v0.dev**](https://v0.dev/) to design the UI. I have adopted v0 as my UI designer for most of the side projects I build now, but I usually end up still writing the code myself.

In summary - while I am a big proponent of using AI tools as part of my software development workflow, I don't see vibe coding as a good approach for building something production-ready to deploy in the real world. With time, maybe this will change, but as of now, in mid-2025, I think that's where we're at.
