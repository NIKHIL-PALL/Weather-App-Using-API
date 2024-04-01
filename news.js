const countries = ["us", "in", "gb", "se"];
const url = `https://newsdata.io/api/1/news?apikey=pub_40951b3dfdef003f3645cfd336d57f5007875&q=weather&country=${
  countries[Math.round(Math.random() * 3)]
}&category=environment`;
const newsContainer = document.getElementsByClassName("news-container");

fetchNews = async () => {
  const newsdata = await fetch(url);
  const data = await newsdata.json();
  renderNews(data);
};

renderNews = (data) => {
  let content = "<h2>Today's News</h2>";
  console.log(data.results)
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
  newsContainer[0].innerHTML = content;
};
fetchNews();
