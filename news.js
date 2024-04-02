const countries = ["us", "in", "gb", "se"];
const url = `https://newsdata.io/api/1/news?apikey=pub_40951b3dfdef003f3645cfd336d57f5007875&q=weather&country=us&category=environment`;

const newsContainer = document.getElementsByClassName("news-container");

let content = "<h2>Today's News</h2>";
fetchNews = async () => {
  try{

    const newsdata = await fetch(url);
    const data = await newsdata.json();
    renderNews(data);
  }
  catch( e) {

  }
};

renderNews = (data) => {
  console.log(data.results);
  // Example: Using matchMedia to apply JavaScript based on media queries
  const mq = window.matchMedia("(max-width: 470px)");
  if (mq.matches) {
    data.results.map((article) => {
      content += `
            <div class="news">
            
            <div class="news-details">
            
            <h3><a href="${article.link}" target="_blank">${article.title} </a>
            </h3>
            <div class="article-image">
    
                <img
                  src="${article.image_url}"
                  alt="image"
                />
            </div>
                <p class="desc">
                  ${article.description} <span><a target="_blank" href="${article.link}">Read More</a></span>
                </p>
            </div>
          </div>
          <hr/>
            `;
    });
  } else {

    data.results.map((article, index) => {
      if (article.image_url === null || article.description === null) return;
      if (index % 2 == 0) {
        content += `
            <div class="news">
            <div class="article-image">
    
                <img
                  src="${article.image_url}"
                  alt="image"
                />
            </div>
    
            <div class="news-details">
    
            <h3><a href="${article.link}" target="_blank">${article.title} </a>
                </h3>
                <p class="desc">
                  ${article.description} <span><a target="_blank" href="${article.link}">Read More</a></span>
                </p>
            </div>
          </div>
          <hr/>
            `;
      } else {
        content += `
            <div class="news">
            
    
            <div class="news-details">
    
                <h3><a href="${article.link}" target="_blank">${article.title} </a>
                </h3>
                <p class="desc">
                  ${article.description} <span><a target="_blank" href="${article.link}">Read More</a></span>
                </p>
            </div>
            <div class="article-image">
    
                <img
                  src="${article.image_url}"
                  alt="image"
                />
            </div>
          </div>
          <hr/>
            `;
      }
    });
  }
  newsContainer[0].innerHTML = content;
};
fetchNews();
