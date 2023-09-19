<script>
  import IconLink from '$lib/IconLink.svelte';
  import { clsx } from 'clsx';

  import { 
    faEnvelope,
  } from '@fortawesome/free-solid-svg-icons';

  import {
    faXTwitter,
    faThreads,
    faLinkedin,

    faGithub

  } from '@fortawesome/free-brands-svg-icons';
</script>

<div
  class={clsx(
    'bg-slate-300',
    'mx-auto p-8 max-w-5xl',
    'rounded-3xl',
    'flex flex-col gap-4 items-center',
    'sm:flex-row sm:items-start',
    'text-center sm:text-left'
  )}
>
  <img
    src="/joe.png"
    alt="Joe Attardi"
    class={clsx(
      'rounded-full border-8 border-slate-500',
      'w-1/2 h-1/2',
      'sm:w-1/3 sm:h-1/3'
    )}
  />
  <div>
    <p class="text-3xl mb-4">
      Hi! I'm Joe Attardi, a software developer, author, and lifelong learner
      from Boston.
    </p>
    <p class="text-xl mb-4">
      My journey in the tech world has been a dynamic one, marked by a genuine
      love for building front-end interfaces and a relentless curiosity about
      emerging technologies.
    </p>
    <p class="text-xl mb-4">
      I've been developing software professionally since 2004. I also <a class="underline" href="https://joeattardi.dev">blog</a> and
      have written some <a class="underline" href="https://blog.logrocket.com/author/joeattardi/">freelance articles</a> and <a class="underline" href="/books">books</a>.
    </p>

    <div class="flex flex-wrap gap-3 justify-center sm:justify-start">
      <IconLink icon={faEnvelope} href="mailto:jattardi+website@gmail.com" title="Email" />
      <IconLink icon={faXTwitter} href="https://twitter.com/JoeAttardi" title="X/Twitter" />
      <IconLink icon={faThreads} href="https://threads.net/@jattardi81" title="Threads" />
      <IconLink icon={faGithub} href="https://github.com/joeattardi" title="GitHub" />
      <IconLink icon={faLinkedin} href="https://www.linkedin.com/in/joeattardi/" title="LinkedIn" />
    </div>
  </div>
</div>
