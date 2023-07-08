<script>
  export let coverUrl;
  export let title;
  export let publisher;
  export let year;
</script>

<div class="book">
  <img src={coverUrl} alt={`Cover for ${title}`}>
  <h2>{title}</h2>
  <div class="meta">{publisher}, {year}</div>
  <div class="description"><slot></slot></div>
</div>

<style>
  .book {
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

  .book img {
    width: 150px;
    grid-area: cover;
  }

  .book .description {
    grid-area: description;
    font-size: 1.1rem;
    margin-top: 1rem;
  }

  .book .meta {
    grid-area: meta;
  }
</style>