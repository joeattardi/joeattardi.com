<div class="main">
  <div class="hero">
    <h1>Joe Attardi</h1>
    <h2>Software Engineer and Author</h2>
    <img src="/joe.jpg" alt="Joe Attardi">
  </div>
</div>

<style>
  .main {
    background: #f0f9ff;
    height: 100%;
  }

  .hero {
    padding: 5rem 2rem;
    display: grid;
    grid-template-areas: 
      "title    photo"
      "subtitle photo";
    justify-content: center;
    column-gap: 2rem;
  }

  h1 {
    grid-area: title;
    /* font-size: 5rem; */
    font-size: clamp(3rem, 10vw, 5rem);
    font-weight: 900;
    align-self: end;
    margin: 0;
    background-image: linear-gradient(to right, #fc5c7d, #6a82fb);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    align-self: start;
    grid-area: subtitle;
    margin: 0;
  }

  img {
    grid-area: photo;
    width: clamp(150px, 30vw, 300px);
    border-radius: 50%;
    border: 3px solid #082f49;
  }

  @media (max-width: 800px) {
    .hero {
      grid-template-areas:
        "photo"
        "title"
        "subtitle";

      justify-items: center;
    }

    h1 {
      text-align: center;
    }
  }
</style>