<script>
  import Fa from 'svelte-fa';
  import { clsx } from 'clsx';

  export let icon;
  export let title;
  export let href;
</script>

<a 
  {href} 
  {title}
  class={
    clsx(
      'bg-slate-400 aspect-square flex items-center p-2 rounded-full',
      'hover:scale-125 transition'
    )
  }
>
  <Fa size="2x" fw icon={icon} />
</a>
