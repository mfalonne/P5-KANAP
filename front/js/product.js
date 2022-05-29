main();

async function main(){
    const articleId =  getArticleId()
    const article = await getArticle(articleId)
    
    hydrateArticle(article)
}

function getArticleId(){
    return new URL(location.href).searchParams.get("id")
}

async function getArticle(articleId){ // appel de la fonction getArticle
    let response = await fetch(`http://localhost:3000/api/products/${articleId}`);
    if(response.ok){
        return response.json();
    } else {
        return response.error;
    }
}


function hydrateArticle(article){

    // affichage de l'image
    var baliseImg = document.createElement("img");
    baliseImg.setAttribute("src", article.imageUrl);
    baliseImg.setAttribute("alt", article.altTxt);
   

    var baliseDiv = document.createElement("div");
    baliseDiv.classList.add("item__img");
    baliseDiv.appendChild(baliseImg);

    document.querySelector("article").appendChild(baliseDiv);


    // affichage du nom de produit
     
    var baliseH1 = document.getElementById("title");
    baliseH1.setAttribute("id","title");
    baliseH1.innerText = article.name;


    var baliseDivItemContent = document.createElement("div");
    baliseDivItemContent.className = "item__content"

    var baliseDivItemContentTitlePrice = document.createElement("div");
    baliseDivItemContentTitlePrice.className = "item__content__titlePrice"

    baliseDivItemContent.appendChild(baliseDivItemContentTitlePrice );

    // affichage du prix

    var baliseP = document.getElementById("price");
    baliseP.setAttribute("id","price");
    baliseP.innerText = article.price;

    var baliseDivItemContentDescription = document.createElement("div");
    baliseDivItemContentDescription.className = "item__content__description"

    baliseDivItemContent.appendChild(baliseDivItemContentDescription);

    // affichage de la description

    var baliseP = document.getElementById("description");
    baliseP.setAttribute("id","description");
    baliseP.innerText = article.description;

    // selection des couleurs/option
    
    var select = document.getElementById("colors");
    
    article.colors.forEach((colors) => {
        console.log(document.createElement("option"));

        var tagOption = document.createElement("option");

        tagOption.innerHTML =`${colors}`
        tagOption.value =`${colors}`

        select.appendChild(tagOption)
    
    });    
}



