const API_KEY = process.env.API_KEY

const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const getPlatformImages = (article) => {
      const platformImages = [];
      article.platforms.forEach((element) => {
        if (element.platform.slug.includes('xbox')) {
          platformImages.push(`<span><img src="src/assets/images/xbox.svg"></span>`);
        }
        if (element.platform.slug.includes('playstation')){
          platformImages.push(`<span><img src="src/assets/images/playstation.svg"></span>`);
        }
      });
      return platformImages.join('')
    };

    const displayResults = (articles) => {

      const resultsContent = articles.map((article) => (
        `
          <article class="col-md-6 col-lg-4">
            <div class="cardGame" >
              <div class="card" style="width: 22rem;">
                <a href="#pagedetail/${article.id}"> 
                  <img src="${article.background_image}" class="card-img-top" alt="${article.name}">
                  <div class="card-body">
                    <h5 class="card-title">${article.name}</h5>
                  </div>
                  <div id="platform">
                   ${getPlatformImages(article)}
                  </div>
                </a>
              </div>
            </div>
          </article>
        `
      ));

      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list ">
        <div class="articles row">Loading...</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageList;
