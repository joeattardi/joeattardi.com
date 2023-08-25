<script>
  import { clsx } from 'clsx';
  import HeaderLink from './HeaderLink.svelte';
</script>

<header class="bg-slate-500 p-4 flex justify-between">
  <h1 class="hover:scale-105 transition-all -rotate-6">
    <a
      class={clsx(
        'text-xl font-black tracking-wider',
        'bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-slate-50',
        'rounded-tl-lg rounded-br-lg',
        'py-1 px-2'
      )}
      href="/"
    >
      JA
    </a>
  </h1>
  <nav class="flex items-center">
    <ul>
      <HeaderLink href="/books">Books</HeaderLink>
      <!-- <HeaderLink href="/projects">Projects</HeaderLink> -->
    </ul>
  </nav>
</header>

<style>
</style>
