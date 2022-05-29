main() // fonction qui contien le code de la base

async function main(){
    const articles = await getArticles() // on declare la fonction getArticles qui nous servira à recuperer les articles
    
    for(article of articles){
        displayArticle(article) // fonction qui va affiche les articles et on lui passe tout les articles
    }

}
async function getArticles(){ // appel de la fonction getArticle
    let response = await fetch("http://localhost:3000/api/products");
    if(response.ok){
        return response.json();
    } else {
        return response.error;
    }
}
function displayArticle(article){ 
  var baliseA = document.createElement("a");
  baliseA.setAttribute("href", "./product.html?id="+article._id)

  var baliseArticle = document.createElement("article");
  baliseA.appendChild(baliseArticle);

  var baliseImg = document.createElement("img");
  baliseImg.setAttribute("src", article.imageUrl);
  baliseImg.setAttribute("alt", article.altTxt);

  var baliseH = document.createElement("h3");
  baliseH.className = "productName";
  baliseH.innerText = article.name;

  var baliseP = document.createElement("p");
  baliseP.className = "productDescription";
  baliseP.innerText = article.description;

  baliseArticle.appendChild(baliseImg);
  baliseArticle.appendChild(baliseH);
  baliseArticle.appendChild(baliseP);

  document.getElementById("items").appendChild(baliseA);
}







