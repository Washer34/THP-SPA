const API_KEY = process.env.API_KEY
let responseData;

// fonction filter pour trouver les jeux qui sont sur une platforme donnée
const findByPlatform = (articles, selectedPlatform) => {
    const sortedArticles = articles.filter(article => {
      const platforms = article.platforms.map(platform => platform.platform.slug);
      return platforms.includes(selectedPlatform);
    });
  displayResults(sortedArticles);
}

const getPlatformImages = (article) => {
  const platformImagesSet = new Set();
  const validSlugs = ['xbox', 'playstation', 'pc', 'android', 'nintendo']
  article.parent_platforms.forEach((element) => {
    if (validSlugs.includes(element.platform.slug)) {
      platformImagesSet.add(`<span><img src="src/assets/images/${element.platform.slug}.svg"></span>`);
    }
  });

  return Array.from(platformImagesSet).join('');
};


let displayResults = (articles) => {
  const maxArticles = 27;
  const displayedArticlesSlice = articles.slice(0, maxArticles);
  const resultsContent = displayedArticlesSlice.map((article) => (
  `
    <article class="col-md-6 col-lg-4 hidden">
      <div class="cardGame" >
        <div class="card" style="width: 22rem;">
          <a href="#pagedetail/${article.id}">
            <img src="${article.background_image}" class="card-img-top" alt="${article.name}">
            <div class="card-body">
              <h5 class="card-title">${article.name}</h5>
              <div class="platform-images">
                ${getPlatformImages(article)}
              </div>
            </div>
          </a>
        </div>
      </div>
    </article>
  `
  ));

  const resultsContainer = document.querySelector('.page-list .articles');
  resultsContainer.innerHTML = resultsContent.join("\n");

  const cards = document.querySelectorAll('article.hidden');
  const display1 = [...cards].slice(0,9)
  display1.forEach((element) => {
    element.classList.remove('hidden')
  })
};

const PageList = (argument) => {

  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
          responseData = data;
          displayResults(data.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section>
        <h2>Welcome,</h2>
        <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
        the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
        brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
        groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
        with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure
        </p>
        <select name="platform-selector" id="platform-selector">
          <option value="any">Platform : any</option>
          <option value="playstation5">Playstation 5</option>
          <option value="xbox360">Xbox 360</option>
        </select>
      </section>
      <section class="page-list ">
        <div class="articles row">Loading...</div>
        <div class="row">
          <div class="col text-center">
            <button id="showMoreButton" class="btn btn-primary">Show More</button>
          </div>
        </div>
      </section>
    `;
    const showMoreButton = document.querySelector('#showMoreButton');
    showMoreButton.addEventListener('click', showMoreArticles);

    const checkPlatformChange = () => {
      const platformSelector = document.querySelector('#platform-selector');
      platformSelector.addEventListener('change', () => {
        const selectedPlatform = platformSelector.value;
        findByPlatform(responseData.results, selectedPlatform);
      });
    };

    checkPlatformChange()

    preparePage();
  };


  const showMoreArticles = () => {
    const cards = document.querySelectorAll('article.hidden');
    const display1 = [...cards].slice(0,9)
    display1.forEach((element) => {
      element.classList.remove('hidden')
    });
    if (cards.length <= 9) {
      const showMoreButton = document.querySelector('#showMoreButton');
      showMoreButton.classList.add('hidden')
    }
  };


  render();

};


export default PageList;
