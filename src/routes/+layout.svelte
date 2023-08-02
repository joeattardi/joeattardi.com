<script>
  import '../app.css';
  import Header from '$lib/Header.svelte';
</script>

<div class="layout">
  <Header />
  <main>
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