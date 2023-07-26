import API_YTB from './key.js'
const API_KEY = process.env.API_KEY;

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { background_image, name, rating, rating_top, released, description, developers, parent_platforms, publishers, genres, tags, stores } = gameData;
      const types = genres.map(genre => genre.name);
      const platforms = parent_platforms.map(item => item.platform.name);
      const tagsNames = tags.map(tag => tag.name);
      const articleDOM = document.querySelector(".page-detail .article");
      const articleBanner = articleDOM.querySelector(".article-banner");
      const imageElement = articleBanner.querySelector('img');
      imageElement.src = background_image;
      articleDOM.querySelector("h2.title").innerHTML = name;
      articleDOM.querySelector("h3.rating").innerHTML = `${rating}/${rating_top}`;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector(".release-date").innerHTML = released;
      articleDOM.querySelector(".developer").innerHTML = developers[0].name;
      articleDOM.querySelector(".platforms").innerHTML = platforms.join(", ");
      articleDOM.querySelector(".publisher").innerHTML = publishers[0].name;
      articleDOM.querySelector(".genre").innerHTML = types.join(", ");
      articleDOM.querySelector(".tags").innerHTML = tagsNames.join(", ");
      
      stores.forEach((element) => {
        articleDOM.querySelector(".buy").innerHTML += `<a href='https://${element.store.domain}'><p>${element.store.name}</p></a>`;
      });

      const getScreenshots = (argument) => {
        fetch(`https://api.rawg.io/api/games/${argument}/screenshots?key=${API_KEY}`).then((response) => response.json())
        .then((responseData) => {
          responseData.results.forEach((element) => {
            articleDOM.querySelector(".screen").innerHTML += `<div class="col-6"><img src='${element.image}' class="screenshots"></div>`
          });
        });
      }
    
      getScreenshots(gameData.id)
      
      const getYtbVideo = (argument) => {
        const gameName = argument;
        const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=trailer+${encodeURIComponent(gameName)}&key=${API_YTB}`;
        fetch(youtubeSearchUrl)
        .then(response => response.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            const youtubePlayer = `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `;
            articleDOM.querySelector(".video").innerHTML = youtubePlayer
          } else {
            console.log("Aucune vidéo trouvée pour ce jeu.");
          }
        })
        .catch(error => {
          console.error("Une erreur s'est produite lors de la récupération des vidéos :", error);
        });
      };
      getYtbVideo(name)
    }


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
          </div>

          <div class="trailer">
            <h3>TRAILER</h3>
            <div class="video">
            </div>
          </div>

          <div class="screenshots">
            <h3>SCREENSHOTS</h3>
            <div class="screen row">
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
