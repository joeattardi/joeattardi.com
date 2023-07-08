<script>
  import HeaderLink from './HeaderLink.svelte';
</script>

<header>
  <h1>
    <a href="/">
      <span class="letter-j">J</span>
      <span class="letter-a">A</span>
    </a>
  </h1>
  <nav>
    <ul>
      <HeaderLink href="/books">Books</HeaderLink>
      <HeaderLink href="/projects">Projects</HeaderLink>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #1e293b;
    padding: 0.5em 2em;
  }

  header h1 {
    font-weight: 400;
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    transform: skewX(-12deg);
    border: 2px solid #bae6fd;
    transition: transform 250ms;
  }

  header h1 a {
    text-decoration: none;
    padding: 0.25em 0.5em;
    font-weight: 900;
    color: #ecfeff;
    display: block;
    transform: skew(12deg);
    letter-spacing: -2px;
  }

  header h1:hover {
    background: #334155;
    transform: skew(-12deg) scale(1.1) rotate(-8deg);
  }

  nav ul {
    display: grid;
    gap: 0.5em;
    grid-auto-flow: column;
    list-style-type: none;
    align-items: center;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .letter-j {
    color: #a5b4fc;
  }

  .letter-a {
    color: #818cf8;
  }
</style>