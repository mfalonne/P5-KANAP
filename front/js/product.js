main();
/* 
*main : fonction où va s'exeter le techargement de la page
*getArticleId : fonction qui va nous permettre de recuperer l'id dans notre url
*getArticle(articleId): fonction qui vas nous permettre de faire la requette http (pour recuperer chaque article/son id)
*hydrateArticle(article) : fonction qui nous permet d'afficher l'article
*/
async function main(){
    const articleId = getArticleId(); 
    const article = await getArticles(articleId); 

    hydrateArticle(article);
}

//searchparams nous permet de recuperer url avec id de chaque article 

function getArticleId() {
    return new URL(location.href).searchParams.get("id"); 
    
}
/*
 * on fait appel à la fonction getArticle avec comme argument la fonction getarticleId
 * fetch : va chercher l'inforlation de chaque article grace à son id
 * on recupère la reponse en json
 */

async function getArticles(articleId){ // on cree ou appel de la fonction getArticle
    let response = await fetch(`http://localhost:3000/api/products/${articleId}`);
    if(response.ok){
        return response.json();
    } else {
        return response.error;
    }
}

// insertion de l'article et ses details dans la page produit

function hydrateArticle(article) {
    // creation de la balise img pour afficher l'image de l'article
    var baliseImg = document.createElement("img");
    baliseImg.setAttribute("src", article.imageUrl);
    baliseImg.setAttribute("alt", article.altTxt);

    document.querySelector(".item__img").appendChild(baliseImg);

    // selection de la balise h1 grace à son id pour afficher le tire de l'article

    var baliseH1 = document.getElementById("title");
    baliseH1.innerText = article.name;

    // selection de la balise p grace à son id pour afficher le paragraphe

    var baliseP = document.getElementById("price");
    baliseP.innerText = article.price;

    // selection de la balise p grace à son id pour afficher la description de l'article

    var baliseP = document.getElementById("description");
    baliseP.innerText = article.description;

    // selection de la balise select grace à son id color 

    var select = document.getElementById("colors");

    /*foreach: permet d'executer la fonction pour chaque article du tableau
    * colors: le tableau sur lequel la methode foreach est appliquer
    */

    article.colors.forEach((colors) => { // on prend une valeur (colors) dans le tableau colors et on lui rajoute à un article
        var tagOption = document.createElement("option");

        tagOption.innerHTML = `${colors}`;
        tagOption.value = `${colors}`;

        select.appendChild(tagOption);
    });

    var bouton = document.getElementById("addToCart");
    /** lorsqu'on clic sur le bouton on execute la fonction addkanap */
    bouton.addEventListener("click", (event) => {
        var qte = document.getElementById("quantity").value;
        var color = select.value;
        if (qte>0 && qte<=100) {
           console.log("autoriser");
        }else{
            console.log("commande non autoriser");
        }
        /* vérifier si qte >0 et <= 100
        vérifier si color !="" */
        const article = {
            id: getArticleId(),
            color: select.value,
            qte: document.getElementById("quantity").value
        };
        addkanap(article);
    });
}

// ajout de produit dans le local storage

/*JSON.parse() : analyse une chaîne de caractères JSON et construit la valeur JavaScript
*localStorage.getItem : permet de récupérer une donnée
*push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
 */

 function addkanap(article) {
    var articleTableau = JSON.parse(localStorage.getItem("panier"));

    if (articleTableau == null) {
        articleTableau = [];
        articleTableau.push(article);
               
    } else {
        var finded = false;
        articleTableau.forEach(element => {
            if(element.id == article.id && element.color == article.color){
                element.qte = parseInt(element.qte, 10) + parseInt(article.qte, 10);
                finded = true;
            }
        });
        if(!finded){
           articleTableau.push(article); 
        }
    }
    /* localStorage.setItem : permet de stocker les données (qui sont dans articleTableau) sous forme de chaine de caractères
    *JSON: nous permet de stocker les données plus complexe
    *stringify : transforme les données en chaine de caractères
    */
    localStorage.setItem("panier", JSON.stringify(articleTableau));
}
