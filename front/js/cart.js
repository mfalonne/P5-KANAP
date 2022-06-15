

var addArticle = JSON.parse(localStorage.getItem("panier"));

main() // fonction qui contien le code de la base
/*
 * getArticles : la fonction qui va nous permettre de recuperer tout les articles
 *displayArticles : la fonction qui va permettre d'afficher tout les articles
 */
async function main(){
    const articles = await getArticles() // on declare la fonction getArticles 
    
    for(article of articles){ // on prend chaque article de la liste articles
        panierDisplay(article)
    }

}

//var addArticle = JSON.parse(localStorage.getItem("panier"));


async function getArticles(){ // on cree ou appel de la fonction getArticle
    let response = await fetch("http://localhost:3000/api/products");
    if(response.ok){
        return response.json();
    } else {
        return response.error;
    }
}



async function panierDisplay(article){

    var bArticle = document.createElement("article");
    bArticle.className = "cart__item";

    var bDiv = document.createElement("div");
    bDiv.className = "cart__item__img"

    bArticle.appendChild(bDiv);
    
    var bImg = document.createElement("a");
    bImg.setAttribute("src", article.imageUrl);
    bImg.setAttribute("alt", article.altTxt);

    
    document.getElementById("cart__items").appendChild(bArticle);


    

    // if (addArticle) {
    //     await addArticle;
    //     console.log(addArticle);
        
        
    // }
}
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
}
