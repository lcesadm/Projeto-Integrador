const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f8600ee8504b461daaa7aa623d07f265');


function getNoticias() {

    



    fetch("http://newsapi.org/v2/everything?q=bitcoin&from=2020-04-22&sortBy=publishedAt&apiKey=fd67ec332bed40ecab3e342590423cc7",{
        headers:{
            'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
            'Alt-Used':'newsapi.org:443',
            'Connection':'keep-alive',
            'Host':'newsapi.org',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0',
        }
    })
    .then(function (resultado){
        return resultado.json()
    })
    .then(function (resultadoNews){
        let cardNews = document.getElementById("listaDeNoticias");


        cardNews.innerHTML="";



        resultadoNews.itenm.forEach(noticia => {
            cardNews.innerHTML += `
            <div class="container news">
            <div class="row"><a href="${noticia.url}">
                <img src="${noticia.urlToImage}" alt="Notícias enem">
                <div>
                    <h2>
                    ${noticia.titulo}
                    </h2>
                    <h4>
                    ${noticia.data_publicacao}
                    </h4>
                </a>
                </div>
            </div>
        </div>
        `

        }); 

    })
}


