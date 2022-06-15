main() // fonction qui contien le code de la base
/*
 * getArticles : la fonction qui va nous permettre de recuperer tout les articles
 *displayArticles : la fonction qui va permettre d'afficher tout les articles
 */
async function main(){
    const articles = await getArticles() // on declare la fonction getArticles 
    
    for(article of articles){ // on prend chaque article de la liste articles
        displayArticle(article)
    }

}
/* fetch : va chercher les informations (articles) grace à l url indiquer
*il retourne une promesse non resolu, pour attendre que le promesse soit resolu
* on rajoute un await devant la fonction getArticles
*await peut etre executer que dans les fonctions async donc on transforme nos fonction 
*en fonction async en rajoutant async devant
*/
async function getArticles(){ // on cree ou appel de la fonction getArticle
    let response = await fetch("http://localhost:3000/api/products");
    if(response.ok){
        return response.json();
    } else {
        return response.error;
    }
}
/* appel ou cree la fonction displayArticle avec son argument article*/

function displayArticle(article){ 
    /* on cree les elts et on les attributs des valeurs */
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







