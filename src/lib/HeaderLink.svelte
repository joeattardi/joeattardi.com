<script>
  import { clsx } from 'clsx';
  export let href;
</script>

<li>
  <a 
    href={href}
    class={clsx(
      'text-slate-100 hover:bg-slate-600',
      'py-2 px-4 rounded'
    )}
  >
    <slot></slot>
  </a>
</li>
