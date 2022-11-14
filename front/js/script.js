main() // fonction qui contien le code de base

async function main(){
    // on stocke le resultat du fetch dans la variable articles
    const articles = await getArticles(); 
    // Pour chaque objet article contenat dans la variable articles,on affiche son image avec tte ses infos
    for(article of articles){ 
        displayArticle(article)
    }
}
/* fetch (): on recupère les articles (stocké dans api) en format json (càd un format textuel)
*fetch nous retourne une promesse(fournie une fonction qui sera executé lorsque le resultat sera obtenu)
*/
//getArticles : la fonction qui va nous permettre de recuperer tout les articles dans l'api
async function getArticles(){ 
    // on recupère les données dans l'api et on le stocke dans la variable response.
    let response = await fetch("http://localhost:3000/api/products");
    // si la valeur de la propriété ok de l'objet response est true
    if(response.ok){
        // on transforme le resultat en format json pour le recevoir
        return response.json();
        // sinon un message d'erreur qui apparait
    } else {
        return response.error;
    }
}


//displayArticles : la fonction qui va permettre d'afficher tout les objets articles
/* injection du html dans le Dom */

function displayArticle(article){ 
    //On cree la balise a
  var baliseA = document.createElement("a");
  // on lui affecte l'attribut href : le lien de la page + la valeur de la propriété _id de l'objet article
  baliseA.setAttribute("href", "./product.html?id="+article._id)
    // on cree la balise article
  var baliseArticle = document.createElement("article");
  // On insère la balise article dans la balise a
  baliseA.appendChild(baliseArticle);
    //on cree la balise img
  var baliseImg = document.createElement("img");
    // avec l'attribut src: la valeur de la proprieté imageUrl de l'objet article
  baliseImg.setAttribute("src", article.imageUrl);
  // avec l'attribut alt: la valeur de la proprieté altTxt de l'objet article
  baliseImg.setAttribute("alt", article.altTxt);
    //on cree la balise h3
  var baliseH = document.createElement("h3");
  // on lui ajoute un attribut class
  baliseH.className = "productName";
  // on lui ajoute du texte : la valeur de la proprieté name de l'objet article
  baliseH.innerText = article.name;
    // on cree la balise p
  var baliseP = document.createElement("p");
  // on lui ajoute une class
  baliseP.className = "productDescription";
  // on lui ajoute du texte: la valeur de la propriété description de l'objet article
  baliseP.innerText = article.description;
    // on insère les balise img,h3 et p dans la balise article
  baliseArticle.appendChild(baliseImg);
  baliseArticle.appendChild(baliseH);
  baliseArticle.appendChild(baliseP);
    // on accède à la balise section grace à son id:items puis on insere la balise a dans celui ci
  document.getElementById("items").appendChild(baliseA);
}







