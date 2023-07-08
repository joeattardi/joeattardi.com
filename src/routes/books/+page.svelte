<script>
  import PageTitle from '../../lib/PageTitle.svelte';
  import BookCard from './BookCard.svelte';
</script>

<svelte:head>
  <title>Books | Joe Attardi</title>
</svelte:head>
<main>
  <PageTitle title="Books" />

  <div class="books">
    <BookCard
      coverUrl="/books/web-browser-api-cookbook.png"
      title="Web Browser API Cookbook"
      publisher="O'Reilly"
      year="2025"
    >
      Still being written! Expected to be published in early 2025.
    </BookCard>

    <BookCard
      coverUrl="/books/modern-css.png" 
      title="Modern CSS" 
      publisher="Apress"
      year="2020"
    />

    <BookCard 
      coverUrl="/books/using-gatsby-and-netlify-cms.png" 
      title="Using Gatsby and Netlify CMS" 
      publisher="Apress"
      year="2020"
    />
  </div>
</main>

<style>
  main {
    padding: 1rem;
  }

  .books {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
  }
</style>