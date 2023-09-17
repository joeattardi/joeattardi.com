<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
</script>

<svelte:head>
  <title>Joe Attardi</title>
</svelte:head>

<div class="layout bg-slate-200">
  <Header />
  <main class="p-4">
    <slot></slot>
  </main>
</div>

<style>
  .layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .layout main {
    flex-grow: 1;
  }
</style>