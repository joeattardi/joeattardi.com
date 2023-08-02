<script>
  export let coverUrl;
  export let title;
  export let publisher;
  export let year;
  export let href;
</script>

<div class="book">
  <a class="cover" href={href}><img src={coverUrl} alt={`Cover for ${title}`}></a>
  <h2>{title}</h2>
  <div class="meta">{publisher}, {year}</div>
  <div class="description">
    <div><slot></slot></div>
    <a class="cta" href={href}>Get {title}</a>
  </div>
</div>

<style>
  .book {
  box-sizing: border-box;
    padding: 0.5em;
    width: 50%;
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-template-rows: auto auto 1fr;
    column-gap: 2rem;
    grid-template-areas:
      "cover title"
      "cover meta"
      "cover description"
  }

  .book h2 {
    margin: 0;
    font-size: 2rem;
  }

  .book .cover {
    grid-area: cover;
  }

  .book img {
    width: 150px;
  }

  .book .description {
    grid-area: description;
    font-size: 1.1rem;
    margin-top: 1rem;
  }

  .book .meta {
    grid-area: meta;
  }

  .cta {
    text-decoration: none;
    background: #7dd3fc;
    padding: 0.5rem 1rem;
    color: #000000;
    border-radius: 5px;
  }

  @media (max-width: 1300px) {
    .book {
      width: 100%;
    }
  }

  @media (max-width: 400px) {
    .book {
      grid-template-columns: 1fr;
      margin-bottom: 2rem;
      grid-template-areas:
        "cover"
        "title"
        "meta"
        "description"
    }
  }
</style>