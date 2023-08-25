<script>
  import CallToAction from '$lib/CallToAction.svelte';

  export let coverUrl;
  export let title;
  export let publisher;
  export let year;
  export let href;
</script>

<div class="flex flex-col sm:flex-row space-x-4 my-6">
  <a {href}><img class="w-[40vw] md:w-[20vw] max-w-none" src={coverUrl} alt={`Cover for ${title}`} /></a>
  <div class="flex flex-col flex-grow">
    <h3 class="text-3xl"><a href={href}>{title}</a></h3>
    <div>{publisher}, {year}</div>
    <div class="my-4"><slot /></div>
    <div class="my-4"><CallToAction {href}>Get <em>{title}</em></CallToAction></div>
  </div>
</div>
