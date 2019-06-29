window.onload = setup;
let backgroundID = 0;
let carID = 0;
let backgrounds = ["mountains.png", "desert.png"];
function startGame() {
    sessionStorage.setItem("carID", carID);
    sessionStorage.setItem("backgroundID", backgroundID);
    window.open("index.html", "_self");
}

function setup() {
    let el = document.createElement("link");
    let carString = "standard";
    switch (carID) {
        case 1: {
            carString = "sports";
            break;
        }
        case 2: {
            carString = "truck";
            break;
        }
        case 3: {
            carString = "gas"
            break;
        }
    }
    if(!isNaN(parseInt(sessionStorage.getItem("carID")))){
        carID = parseInt(sessionStorage.getItem("carID"));
    }
    if(!isNaN(parseInt(sessionStorage.getItem("backgroundID")))){
        backgroundID = parseInt(sessionStorage.getItem("backgroundID"));
    }
    console.log("THE_ID:" + backgroundID + ":END");
    document.body.style.backgroundImage = "url(img/" + backgrounds[backgroundID] + ")";
}

function openSettings() {
    sessionStorage.setItem("backgroundID", backgroundID);
    sessionStorage.setItem("carID", carID);
    window.open("settings.html", "_self");
}