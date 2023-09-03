


// loading screen
$(document).ready(() => {
    searchByName("").then(() => {
        $(".load").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function display(x) {
    let temp = "";

    for (let i = 0; i < x.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="mealdtls('${x[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${x[i].strMealThumb}" alt="" >
                    <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${x[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    meals.innerHTML = temp
}
// open side nav
function open() {
    $(".sidenav").animate({ left: 0}, 500)

    $(".xicon").removeClass("fa-align-justify");
    $(".xicon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".navlinks li").eq(i).animate({ top: 0}, (i + 5) * 100)
    }
}
// close side nav
function close() {
    let size = $(".sidenav .navcont").outerWidth()
    $(".sidenav").animate({left: -size }, 500)

    $(".xicon").addClass("fa-align-justify");
    $(".xicon").removeClass("fa-x");


    $(".navlinks li").animate({top: 300}, 500)
}

close()
$(".sidenav i.xicon").click(() => {
    if ($(".sidenav").css("left") == "0px") {
        close()
    } else {
        open()
    }
})





// category section

let meals = document.getElementById("meals");
async function catogs() {
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)
    srch.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    showcatogs(response.categories)
    $(".spinscreeen").fadeOut(300)

}

function showcatogs(x) {
    let temp = "";

    for (let i = 0; i < x.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="catogscontent('${x[i].strCategory}')" class="meal position-relative overflow-hidden rounded-1">
                    <img class="w-100" src="${x[i].strCategoryThumb}" alt="" >
                    <div class="layer position-absolute text-center text-black p-2">
                        <h3>${x[i].strCategory}</h3>
                        <p>${x[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    meals.innerHTML = temp
}
async function catogscontent(category) {
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    display(response.meals.slice(0, 20))
    $(".spinscreeen").fadeOut(300)

}


// area section
async function area() {
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)

    srch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    showarea(respone.meals)
    $(".spinscreeen").fadeOut(300)

}


function showarea(x) {
    let temp = "";

    for (let i = 0; i < x.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="areacontent('${x[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${x[i].strArea}</h3>
                </div>
        </div>
        `
    }

    meals.innerHTML = temp
}

// ingrediants section
async function ingrds() {
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)

    srch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    showingrds(respone.meals.slice(0, 20))
    $(".spinscreeen").fadeOut(300)

}


function showingrds(x) {
    let temp = "";

    for (let i = 0; i < x.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="ingrdscontent('${x[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${x[i].strIngredient}</h3>
                        <p>${x[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    meals.innerHTML = temp
}





async function areacontent(area) {
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    display(response.meals.slice(0, 20))
    $(".spinscreeen").fadeOut(300)

}


async function ingrdscontent(ingredients) {
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    display(response.meals.slice(0, 20))
    $(".spinscreeen").fadeOut(300)

}

async function mealdtls(mealID) {
    close()
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)

    srch.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    showdtls(respone.meals[0])
    $(".spinscreeen").fadeOut(300)

}


function showdtls(meal) {
    
    srch.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let temp = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    meals.innerHTML = temp
}
// sreach
let srch = document.getElementById("srch");

function ruslt() {
    srch.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input  class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    meals.innerHTML = ""
}

async function searchByName(term) {
    close()
    meals.innerHTML = ""
    $(".spinscreeen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? display(response.meals) : display([])
    $(".spinscreeen").fadeOut(300)

}


//contact us  
function showContacts() {

    meals.innerHTML = ` <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                
                 
    <div class="col-md-6 my-3"><input type="text" class="form-control "placeholder="Enter your name" ></div>
    <div class="col-md-6 my-3"><input type="text" class="form-control "placeholder="Enter your email" ></div>
    <div class="col-md-6 my-3"><input type="text" class="form-control "placeholder="Enter your phone" ></div>
    <div class="col-md-6 my-3"><input type="text" class="form-control "placeholder="Enter your age" ></div>
    <div class="col-md-6 my-3"><input type="text" class="form-control "placeholder="Enter your password" ></div> 
    <div class="col-md-6 my-3"><input type="text" class="form-control "placeholder="repassword" ></div> 
    <div class="col-md-12 my-3 text-center"><button class="btn btn-outline-danger  ">Submit</button></div> `
}