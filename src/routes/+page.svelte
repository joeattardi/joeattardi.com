<script>
  import { clsx } from 'clsx';
</script>

<div
  class={clsx(
    'bg-slate-300',
    'mx-auto p-8 max-w-5xl',
    'rounded-tl-3xl rounded-br-3xl',
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
  <!-- <img src="/joe.png" class="aspect-square w-1/3 h-1/3 rounded-full border-8 border-slate-500" alt="Joe Attardi"> -->
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
      have written some <a class="underline" href="https://blog.logrocket.com/author/joeattardi/">freelance articles</a>. More recently, I have published a
      couple of <a class="underline" href="/books">books</a> and am working on a new one!
    </p>
  </div>
</div>
