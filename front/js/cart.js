
//fetch tout les articles
async function getArticle(articleId){ // on cree ou appel de la fonction getArticle
    let response = await fetch(`http://localhost:3000/api/products/${articleId}`);
    if(response.ok){
        return response.json();
    } else {
        return response.error;
    }    
}

/* Obtenir la valeur de la clé "panier"  dans localstorage */

var panier = JSON.parse(localStorage.getItem("panier"));

// fonction d'affichage

async function panierDisplay(){

    panier.forEach(async function(article) {
        const infoArticle = await getArticle(article.id)
        var bSection = document.getElementById("cart__items");
    
    // creation de la balise article 

    var bArticle = document.createElement("article");
    bArticle.className = "cart__item";
    bArticle.setAttribute("data-id", article.id);
    bArticle.setAttribute("data-color", article.color);

    //création de la div image, ainsi que l'image qu'elle contient

    var divImg = document.createElement("div")
    divImg.className = "cart__item__img"
    var img = document.createElement("img")
    img.src = infoArticle.imageUrl;
    img.alt = infoArticle.altTxt;

    divImg.appendChild(img);
    bArticle.appendChild(divImg);

    // creation de la div content

    var divContent = document.createElement("div");
    divContent.className = "cart__item__content";

    // creation de la div content_description

    var divContentDescription = document.createElement("div");
    divContentDescription.className = "cart__item__content__description";

    var baliseH2 = document.createElement("h2");
    baliseH2.innerText = infoArticle.name;

    var baliseP1 = document.createElement("p");
    baliseP1.innerText = article.color;

    var baliseP2 = document.createElement("p");
    baliseP2 .innerText = infoArticle.price;

    divContentDescription.appendChild(baliseH2);
    divContentDescription.appendChild(baliseP1);
    divContentDescription.appendChild(baliseP2);

    divContent.appendChild(divContentDescription);

    bArticle.appendChild(divContent)

    // creation de la div content-setting

    var divContentSettings = document.createElement("div");
    divContentSettings.className = "cart__item__content__settings";

    divContent.appendChild(divContentSettings);

    // creation de la div settings__quantity

    var divSettingsQuantity = document.createElement("div");
    divSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    var baliseP3 = document.createElement("p");
    baliseP3.innerText = "Qté :";

    var baliseInput = document.createElement("input");
    baliseInput.className = "itemQuantity";
    baliseInput.type = "number";
    baliseInput.name = "itemQuantity";
    baliseInput.min = 1;
    baliseInput.max = 100;
    baliseInput.value = article.qte;
    
    //Update la quantité total et le prix total
       
    baliseInput.addEventListener("input",function(e) {
       totalQuantity();
       totalPrice();
        
    });

    divSettingsQuantity.appendChild(baliseP3);
    divSettingsQuantity.appendChild(baliseInput);

    divContentSettings.appendChild(divSettingsQuantity);


   // creation de la balise div settings__delete

   var divSettingsDelete = document.createElement("div");
   divSettingsDelete.className = "cart__item__content__settings__delete";

   var baliseP4 = document.createElement("p");
   baliseP4.className = "deleteItem";
   baliseP4.innerText = "Supprimer";

     // suppression de l'article au clic
   divSettingsDelete.addEventListener("click", function(event){
    var target = event.target;
    var article = target.closest("article")
    var id = article.dataset.id;
    var color = article.dataset.color;
    removeFromCart(id, color);
    
   })

   divSettingsDelete.appendChild(baliseP4);
   divContentSettings.appendChild(divSettingsDelete);

   divContent.appendChild(divContentSettings)
   bArticle.appendChild(divContent); 
   bSection.appendChild(bArticle); 

    });  
}
panierDisplay();

//Calcule la quantité totale des produits dans le panier
function totalQuantity() {
    let totalQty = 0;
    let numbers = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < numbers.length; i++) {
        let value = numbers[i].value;
        totalQty += parseInt(value);
    };

    document.querySelector("#totalQuantity").textContent = totalQty;
}

//Calcule le prix total des produits dans le panier
function totalPrice() {
    let cartProducts = document.querySelectorAll(".cart__item");
    let totalPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        let price = document.querySelectorAll(".cart__item__content__description")[i].lastChild.textContent;
        let qty = document.querySelectorAll(".itemQuantity")[i].value;
        totalPrice += parseInt(price) * parseInt(qty);
    }
    document.querySelector("#totalPrice").textContent = totalPrice;
}


// supression des articles dans le panier

function removeFromCart(id,color){
    if (confirm("Vous êtes sur le point de supprimer un article de votre panier. Voulez-vous continuer ?")) {
        panier.forEach((element, index) => {
            if (element.id == id && element.color == color) {
                panier.splice(index, 1);
            }
        });
        localStorage.setItem("panier", JSON.stringify(panier));
        window.location.reload();
    }
    else if (color != undefined && color.value == 0) {
        color.value = 1;
    }
}

// parcourir panier et modifier la ligne avec id et color identique

function updateCart(id, color, qte){
    
    for (let i = 0; i < panier.length; i++) {
    if (id === panier[i][0] && color === panier[i][1]) {
      panier[i][2] = qte;
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    window.location.reload();
  }
}

//Affichage des produits du panier
async function display() {
    if (document.getElementById("cart__items") != null && panier != null) {
        for (i in panier) {
            let data = await fetch(`http://localhost:3000/api/products/${panier[i].id}`);
            if (!data.ok) {
                throw new Error(message);
            }
            let value = await data.json();
        }
        totalQuantity();
        totalPrice();
        
    }
}
display();
//* formulaire


const regexName = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.,\d\s]+$/;
const regexAddress = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.]+$/;
const regexCity = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.\d]+$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/;

let validFirstName = false;
let validLastName = false;
let validAddress = false;
let validCity = false;
let validEmail = false;

let contact = {
    firstName : "",
    lastName : "",
    address : "",
    city : "",
    email : ""
};

let products = [];

//Gère la validité des données entrées dans le formulaire
/*
recup de panier != de vide
recup de la balise input et on lui passe un evnmt de type input, c'est en remplissant le formulaire qu'on veut declenché la fonction avec l'evnmt en question
methode test() verifie la correspondance entre le texte et le regex (si la valeur de input correspond on regex definie et la valeur de champ input !="")

*/ 
function formValidity() {
    if (document.getElementById("cart__items") != null) { 
        document.getElementById("firstName").addEventListener("input", function(e) {
            if (regexName.test(e.target.value) && e.target.value != "") {
                document.getElementById("firstNameErrorMsg").textContent = "";
                validFirstName = true
            } else {
                document.getElementById("firstNameErrorMsg").textContent = "Veuillez entrer un prénom valide";
                validFirstName = false
            }
        });
        document.getElementById("lastName").addEventListener("input", function(e) {
            if (regexName.test(e.target.value) && e.target.value != "") {
                document.getElementById("lastNameErrorMsg").textContent = "";
                validLastName = true
            } else {
                document.getElementById("lastNameErrorMsg").textContent = "Veuillez entrer un nom valide";
                validLastName = false
            }
        });
        document.getElementById("address").addEventListener("input", function(e) {
            if (regexAddress.test(e.target.value) && e.target.value != "") {
                document.getElementById("addressErrorMsg").textContent = "";
                validAddress = true
            } else {
                document.getElementById("addressErrorMsg").textContent = "Veuillez entrer une addresse valide";
                validAddress = false
            }
        });
        document.getElementById("city").addEventListener("input", function(e) {
            if (regexCity.test(e.target.value) && e.target.value != "") {
                document.getElementById("cityErrorMsg").textContent = "";
                validCity = true
            } else {
                document.getElementById("cityErrorMsg").textContent = "Veuillez entrer une ville valide";
                validCity = false
            }
        });
        document.getElementById("email").addEventListener("input", function(e) {
            if (regexEmail.test(e.target.value) && e.target.value != "") {
                document.getElementById("emailErrorMsg").textContent = "";
                validEmail = true
            } else {
                document.getElementById("emailErrorMsg").textContent = "Veuillez entrer une addresse email valide";
                validEmail = false
            }
        })
    }
}
formValidity();

//Enregistre les données contact si les champs sont bien remplis

function confirmForm() {
    if (validFirstName == true && validLastName == true && validAddress == true && validCity == true && validEmail == true) {
        contact.firstName = document.getElementById("firstName").value;
        contact.lastName = document.getElementById("lastName").value;
        contact.address = document.getElementById("address").value;
        contact.city = document.getElementById("city").value;
        contact.email = document.getElementById("email").value;
    } else {
        alert("Veuillez correctement remplir tous les champs du formulaire")
    }
}

//Liste les id des produits dans le panier
/*
La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau 
et retourne la nouvelle taille du tableau.
 */

function confirmProducts() {
    products = [];
    for (i in panier) {
        products.push(panier[i].id)
    }
}

//Envoie les détails de la commande à l'Api
function confirmApi() {
    if (contact.firstName !== "" && products.length > 0) {
        let order = {
            contact,
            products
        };
        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(order)
        })
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
        })
        .then(function(value) {
            sessionStorage.removeItem("cart");
            window.location.href=`../html/confirmation.html?order_id=${value.orderId}`
        })
        .catch(function(err) {
            console.log(err)
        });
    }
}

//Ecoute le clique du bouton commander et lance les autres fonctions
function confirmPurchase() {
    if (document.getElementById("cart__items") != null) {
        const confirm = document.getElementById("order");
        confirm.addEventListener("click", function(e) {
            e.preventDefault();
            if (panier == null) {
                alert("Le panier est vide");
                return
            }
            confirmForm();
            confirmProducts();
            confirmApi()
        })
    }
}
confirmPurchase();

