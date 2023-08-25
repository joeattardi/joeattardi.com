<script>
  import PageTitle from '../../lib/PageTitle.svelte';
  import BookCard from './BookCard.svelte';
</script>

<svelte:head>
  <title>Books | Joe Attardi</title>
</svelte:head>
<main>
  <PageTitle title="Books by Joe Attardi" />

  <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
    <BookCard
      href="https://learning.oreilly.com/library/view/web-browser-api/9781098150686/"
      coverUrl="/books/web-browser-cookbook.png"
      title="Web Browser API Cookbook"
      publisher="O'Reilly Media"
      year="2025"
    >
      <p>
        With this hands-on cookbook, explore the powerful APIs available in modern browsers and guides you through the specific tasks that they unlock.
      </p>
    </BookCard>

    <BookCard
      href="https://www.amazon.com/Modern-CSS-Master-Concepts-Development/dp/148426293X"
      coverUrl="/books/modern-css.png" 
      title="Modern CSS" 
      publisher="Apress"
      year="2020"
    >
      <p>
        Come on a tour of “modern” CSS in 2020. This example-driven book demonstrates the concepts by showing code examples, 
        screenshots, and diagrams to help clearly communicate the information.
      </p>
    </BookCard>

    <BookCard
      href="https://www.amazon.com/Using-Gatsby-Netlify-CMS-JAMstack/dp/1484262964"
      coverUrl="/books/using-gatsby-and-netlify-cms.png" 
      title="Using Gatsby and Netlify CMS" 
      publisher="Apress"
      year="2020"
    >
      <p>
        Leverage the powerful combination of Gatsby and Netlify CMS, a free open source content management solution, 
        to build blazing fast apps.
      </p>
    </BookCard>
  </div>
</main>
