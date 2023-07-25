const API_KEY = process.env.API_KEY
const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { background_image, background_image_additional, name, rating, rating_top, released, description, developers, parent_platforms, publishers, genres, tags, stores } = gameData;
      const storesNames = stores.map(store => store.store.name)
      const types = genres.map(genre => genre.name);
      const platforms = parent_platforms.map(item => item.platform.name)
      const tagsNames = tags.map(tag => tag.name)
      const articleDOM = document.querySelector(".page-detail .article");
      const articleBanner = articleDOM.querySelector(".article-banner");
      const imageElement = articleBanner.querySelector('img');
      const video = articleDOM.querySelector(".video");
      const videoThumbnail = video.querySelector('img')
      imageElement.src = background_image
      videoThumbnail.src = background_image_additional
      articleDOM.querySelector("h2.title").innerHTML = name;
      articleDOM.querySelector("h3.rating").innerHTML = `${rating}/${rating_top}`
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector(".release-date").innerHTML = released;
      articleDOM.querySelector(".developer").innerHTML = developers[0].name;
      articleDOM.querySelector(".platforms").innerHTML = platforms.join(", ");
      articleDOM.querySelector(".publisher").innerHTML = publishers[0].name;
      articleDOM.querySelector(".genre").innerHTML = types.join(", ");
      articleDOM.querySelector(".tags").innerHTML = tagsNames.join(", ");
      articleDOM.querySelector(".buy").innerHTML += `<p>${storesNames.join("<br>")}</p>`
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <div class="article-banner">
            <img src="">
          </div>
          <div class="article-head row">
            <div class="article-title col-10">
              <h2 class="title"></h2>
            </div>
            <div class="article-rating col-2">
              <h3 class="rating"></h3>
            </div>
          </div>
          <p class="description"></p>

          <div class="article-infos row">
            <div class="info col-3">
              <div class="info-title">Release date</div>
              <div class="info-content release-date"></div>
            </div>
            
            <div class="info col-3">
              <div class="info-title">Developer</div>
              <div class="info-content developer"></div>
            </div>
            
            <div class="info col-3">
              <div class="info-title">Platforms</div>
              <div class="info-content platforms"></div>
            </div>
            
            <div class="info col-3">
              <div class="info-title">Publisher</div>
              <div class="info-content publisher"></div>
            </div>
          </div>

          <div class="article-infos row">
            <div class="info col-6">
              <div class="info-title">Genre</div>
              <div class="info-content genre"></div>
            </div>

            <div class="info col-6">
              <div class="info-title">Tags</div>
              <div class="info-content tags"></div>
            </div>
          </div>

          <div class="buy">
            <h3>BUY</h3>
            <p class="store"></p>
          </div

          <div class="trailer">
            <h3>TRAILER</h3>
            <div class="video">
              <img src="" alt="">
              <object class="overlay hoverable" type="image/svg+xml" data="src/assets/images/play.svg">
            </div>
          </div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};
export default PageDetail;
