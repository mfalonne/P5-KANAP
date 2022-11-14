main();

/*
 *getArticleId : fonction qui va nous permettre de recuperer url avec id de chaque article
 *hydrateArticle(article) : fonction qui nous permet d'afficher l'article
 */

async function main() {
    const articleId = getArticleId();
    const article = await getArticles(articleId);
    
    hydrateArticle(article);
  }
  /*
  URL(): interface utiliser pour analyser,construire,normaliser et encoder des URL
  searchParams: nous permet de lire l'id conternu dans l'url
  getArticleId(): nous permet de recuperer l'id decodé dans l'url de chaque article cliquer*/


  function getArticleId() {
    return new URL(location.href).searchParams.get("id");
  }
  //getArticles(articleId): recupère l'article clicker dans l'api gràce à son id en format json (texte)

  async function getArticles(articleId) {
    let response = await fetch(`http://localhost:3000/api/products/${articleId}`);
    if (response.ok) {
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
  
    article.colors.forEach((colors) => {
      // on prend une valeur une couleur dans le tableau colors et on lui rajoute à un article
      //parcourir le tableau colors
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
      if ((qte > 0 && qte <= 100) && color != "") {
        const article = {
          id: getArticleId(),
          color: select.value,
          qte: document.getElementById("quantity").value,
        };
        addkanap(article);
      } else {
        alert("Veuillez sélectionner une couleur et une quantité inferieur ou egal à 100");
      }
    });
  }

  //Fonction alerte choix après ajout au panier

function afterAdd() {
    if (confirm("Le produit a bien été ajouté a votre panier.\nVoulez-vous aller directement au panier?")) {
        window.location.href="../html/cart.html"
    } else {
        window.location.href="../html/index.html"
    }
}

// ajout de produit dans le local storage

/* localstorage: objets de stockage web
*JSON.parse() : analyse une chaîne de caractères JSON et construit la valeur JavaScript
 *localStorage.getItem : obtenir la valeur par clé
 *push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
 */

  function addkanap(article) {
    var articleTableau = JSON.parse(localStorage.getItem("panier"));
  
    if (articleTableau == null) {
      articleTableau = [];
      articleTableau.push(article);

      afterAdd();

    } else {
      var finded = false;
      articleTableau.forEach((element) => {
        if (element.id == article.id && element.color == article.color) {
          //parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
          var newQte = parseInt(element.qte, 10) + parseInt(article.qte, 10);
          finded = true;
          if (element.qte == 100) {
            alert("le panier a atteint sa quantité maximum")  
          } else if(newQte > 100){
            alert("quantité trop élevée, quantité restante : "+(100-element.qte))
          } else {
            element.qte = newQte;
            afterAdd();
          }
        }
      });
      if (!finded) {
        articleTableau.push(article);
        afterAdd();
        
      }
    }
    /* localStorage.setItem : ajout d'article dans le local storage
     *JSON.stringify : transforme les données javascript en chaine de caractères
     */
    localStorage.setItem("panier", JSON.stringify(articleTableau));
  }