const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f8600ee8504b461daaa7aa623d07f265');


function getNoticias() {

    



    fetch("http://newsapi.org/v2/everything?q=bitcoin&from=2020-04-25&sortBy=publishedAt&apiKey=fd67ec332bed40ecab3e342590423cc7")
    .then(function (resultado){
        return resultado.json()
    })
    .then(function (resultadoNews){
        let cardNews = document.getElementById("listaDeNoticias");


        cardNews.innerHTML="";



        resultadoNews.articles.forEach(noticia => {
            cardNews.innerHTML += `
            <div class="container news">
            <div class="row"><a href="${noticia.url}">
                <img src="${noticia.urlToImage}" alt="Notícias enem">
                <div>
                    <h2>
                    ${noticia.title}
                    </h2>
                    <h4>
                    ${noticia.description}
                    </h4>
                </a>
                </div>
            </div>
        </div>
        `

        }); 

    })
}


