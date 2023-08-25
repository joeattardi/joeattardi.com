<script>
  export let href;
</script>

<a 
  class="inline-block text-lg bg-slate-500 text-white px-6 py-4 rounded-md text-center"
  href={href}
>
  <slot></slot>
</a>