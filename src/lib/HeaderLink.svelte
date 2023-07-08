<script>
  export let href;
</script>

<li>
  <a href={href}><div><slot></slot></div></a>
</li>

<style>
  a {
    color: #f3f4f6;
    display: block;
    text-decoration: none;
    border-radius: 3px;
    font-weight: normal;
    padding: 0.5em 0.75em;
    transform: skewX(-12deg);
  }

  a div {
    transform: skew(12deg);
  }

  a:hover {
    background: #475569;
  }
</style>