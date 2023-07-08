<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
</script>

<div>
  <Header />
  <main>
    <slot></slot>
  </main>
</div>

<style>
</style>