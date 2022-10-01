/* Desenvolva sua lógica aqui ... */
let globalVars = {
    activatedFilter: 0 ,
    priceFilter: 0,
}


function createButtonsFilters(){

    let container = document.querySelector(".box-musical-genres")

    categories.forEach(function(element,index, array){
    
    let button = document.createElement("button")
    container.appendChild(button)
    button.innerText=element
    button.value = index
    button.classList = "btn-standard bg-color-grey-8 bg-border-color-grey-8 text-color-grey-2"
    button.id = "btn-standard-genres-musical"

    button.addEventListener("click", function(){
        globalVars.activatedFilter = button.value
         deleteListAlbums()
         createListCards()
    })

})
}

function createInputRange(){
    
    let container = document.querySelector(".set-price-box-inferior")
    let p         = document.querySelector(".value-filter-price")
    
    let soma=0

    let rangeMaxInputRange = products.reduce(function(acc, cur, index, arr){
        soma +=  cur.price
        return soma
    },0)
    

    globalVars.priceFilter =rangeMaxInputRange
 
    let inputRange = document.createElement("input")
    container.appendChild(inputRange)
    inputRange.classList = "input-range"
    inputRange.type ="range"
    inputRange.min = "0"
    inputRange.max = `${maxValueProduct()+100}`
    inputRange.step = "1"

        inputRange.addEventListener("mousemove", function(){
            p.innerText = `Até R$ ${inputRange.value},00`
            globalVars.priceFilter =inputRange.value
            deleteListAlbums()
            createListCards()
        })
}

function createCard(element){
    
    
    let ul = document.querySelector(".list-cards")

    let li = document.createElement("li")
    ul.appendChild(li)
    li.classList = "card flex flex-col "

    let containerImg = document.createElement("div")
    li.appendChild(containerImg)
    containerImg.classList = "card-container-img"

        let img = document.createElement("img")
        containerImg.appendChild(img)
        img.src= element.img
        img.classList = "card-img"

    let containerInfos = document.createElement("div")
    li.appendChild(containerInfos)
    containerInfos.classList = "card-container-infos flex flex-col  justify-between "

        let divHigher = document.createElement("div")
        containerInfos.appendChild(divHigher)
        divHigher.classList = "div-higher flex text-color-grey-2"

            let bandAlbum = document.createElement("h5")
            divHigher.appendChild(bandAlbum)
            bandAlbum.innerText = element.band
            bandAlbum.classList = ""

            let yearAlbum = document.createElement("h5")
            divHigher.appendChild(yearAlbum)
            yearAlbum.innerText = element.year
            yearAlbum.classList = ""

        let titleAlbum = document.createElement("h3")
        containerInfos.appendChild(titleAlbum)
        titleAlbum.innerText = element.title
        titleAlbum.classList = "card-album-title text-color-grey-1"

        let divBottom = document.createElement("div")
        containerInfos.appendChild(divBottom)
        divBottom.classList = "flex justify-between items-center"

            let price = document.createElement("h5")
            divBottom.appendChild(price)
            price.innerText = element.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            price.classList = "card-price  text-color-grey-1"

            let btnBuy = document.createElement("button")
            divBottom.appendChild(btnBuy)
            btnBuy.innerText = "Comprar"
            btnBuy.classList = "btn-standard bg-color-grey-7 bg-border-color-grey-7 text-color-grey-2"
            btnBuy.id = "btn-buy"
}

function createListCards(){
   
if (localStorage.darkMode === "true"){
    
    let arr = filterCards()
    arr.forEach(function(element){
        createCard(element)
    })
    darkModeCards()
    
} else {
    let arr = filterCards()
    arr.forEach(function(element){
        createCard(element)
    })
}
}

function filterCards(){

let arr

arr = products.filter(function (element,index, array){

if (globalVars.activatedFilter == 0){
   if(element.price <= globalVars.priceFilter){
    return element
   }
    
}

return (element.category == globalVars.activatedFilter) && ( element.price <= globalVars.priceFilter)
    
})

return arr

}

function deleteListAlbums(){
    let ul = document.querySelector(".list-cards")
    ul.innerHTML=""
}

function maxValueProduct(){
    let maxValue=0
    products.forEach(function(element, index, arr){
       if(element.price>=maxValue){
           maxValue = element.price
       }
    })
    return maxValue
}


function darkModeBody(){
    let body = document.querySelector(".body")
    body.classList.toggle("body-dark-mode")

    let buttonsGenresMusical = document.querySelectorAll("#btn-standard-genres-musical")  
    buttonsGenresMusical.forEach(function(element){
        element.classList.toggle("btn-standard-dark-mode")
    })

    let navbarLogo = document.querySelector(".navbar-logo")
    navbarLogo.classList.toggle("text-color-grey-8")

    let titles = document.querySelectorAll(".sections-title")
    titles.forEach(function(element){
        element.classList.toggle("text-color-grey-4")
    })

    let valueFilterPrice = document.querySelector(".value-filter-price")
    valueFilterPrice.classList.toggle("text-color-grey-3")

}

function darkModeCards (){
    let cardContainerInfos = document.querySelectorAll(".card-container-infos")
        cardContainerInfos.forEach(function(element){
            element.classList.toggle("card-container-infos-dark-mode")
        })

        let divHigher = document.querySelectorAll(".div-higher")
        divHigher.forEach(function(element){
            element.classList.toggle("text-color-grey-3")
        })
        
        let titleAlbum = document.querySelectorAll(".card-album-title")
        titleAlbum.forEach(function(element){
            element.classList.toggle("text-color-grey-8")
        })

        let cardPrice = document.querySelectorAll(".card-price")
        cardPrice.forEach(function(element){
            element.classList.toggle("text-color-grey-8")
        })

        let buttonsBuy = document.querySelectorAll("#btn-buy")  
        buttonsBuy.forEach(function(element){
            element.classList.toggle("btn-buy-dark-mode")

        })
}

function createEventButtonDarkMode(){
    let btnDarkMode = document.querySelector("#btn-dark-mode")
    let imgBtnDarkMode = document.querySelector(".img-brt-dark-mode")
    btnDarkMode.addEventListener("click",function(){
        
        if (localStorage.darkMode === "true"){
            localStorage.darkMode = "false"
            darkModeBody()
            darkModeCards()
            imgBtnDarkMode.src = "/assets/img/moon.svg"
            btnDarkMode.classList.toggle("btn-activate-darkMmode-dark-mode")  
        } else{
            localStorage.darkMode = "true"
            darkModeBody()
            darkModeCards()
            imgBtnDarkMode.src = "/assets/img/sun.svg"
            btnDarkMode.classList.toggle("btn-activate-darkMmode-dark-mode") 
        }
    })
}


function controlLocalStorage(){
    let btnDarkMode = document.querySelector("#btn-dark-mode")
    let imgBtnDarkMode = document.querySelector(".img-brt-dark-mode")

    if (localStorage.darkMode === "true"){
        darkModeBody()
         imgBtnDarkMode.src = "/assets/img/sun.svg"
         btnDarkMode.classList.toggle("btn-activate-darkMmode-dark-mode") 
    } else{

        localStorage.darkMode = "false"
        imgBtnDarkMode.src = "/assets/img/moon.svg"
    
    }

}




// ========================================================
window.addEventListener("DOMContentLoaded", function(){
    createButtonsFilters ()
    createInputRange()
    controlLocalStorage()
    createListCards()
    
    createEventButtonDarkMode()
})


