window.onload = setup;
let backgroundID = 0;
let backgrounds = ["mountains.png", "desert.png"];
let carID = 0;
let cars = ["standardCar.css", "sportsCar.css", "truckCar.css", "gasCar.css"];
let names = ["Default Car", "Sports Car", "Truck", "Gas Truck"];
function setup() {
    carID = parseInt(sessionStorage.getItem("carID"));
    chooseCar(carID);
    backgroundID = parseInt(sessionStorage.getItem("backgroundID"));
    console.log("BID: " + backgroundID);
    document.body.style.backgroundImage = "url(img/" + backgrounds[backgroundID] + ")";
    let name = backgrounds[backgroundID].charAt(0).toUpperCase() + backgrounds[backgroundID].substr(1, backgrounds[backgroundID].indexOf(".png") - 1);
    document.getElementById("changeBackground").innerHTML = "Change Background<br>" + name;
    let arrows = document.querySelectorAll("[class*=arrow]");
    let settingNames = document.querySelectorAll("[id*=change]");
    let container = document.getElementById("backgroundSettingNode");
    let containerHeight = container.clientHeight;
    for(let i = 0; i < arrows.length; i++){
        arrows[i].style.top = (containerHeight - 70) / 2 + "px";
    }
    for(let i = 0; i < settingNames.length; i++){
        settingNames[i].style.top = (containerHeight - settingNames[i].clientHeight) / 2 + "px";
    }
    document.getElementById("changeCar").innerHTML = names[carID];
}

function changeBackground(direction) {
    if(direction === "left"){
        if(backgroundID === 0)backgroundID = backgrounds.length - 1;
        else backgroundID--;
    }
    else {
        if(backgroundID === backgrounds.length - 1)backgroundID = 0;
        else backgroundID++;
    }
    document.body.style.backgroundImage = "url(img/" + backgrounds[backgroundID] + ")";
    let name = backgrounds[backgroundID].charAt(0).toUpperCase() + backgrounds[backgroundID].substr(1, backgrounds[backgroundID].indexOf(".png") - 1);
    document.getElementById("changeBackground").innerHTML = "Change Background<br>" + name;
}

function save() {
    sessionStorage.setItem("backgroundID", backgroundID);
    sessionStorage.setItem("carID", carID);
    window.open("menu.html", "_self");
}

function chooseCar(index) {
    console.log("INDEX: " + index);
    let link = document.getElementById("carFile");
    link.href = "./cars/" + cars[index];
    let car = document.getElementById("car");
    car.style.bottom = 0;
    let bodyWidth = document.body.clientWidth;
    car.style.left = ((bodyWidth - car.clientWidth) / 2).toString() + "px";
    carID = index;
}

function changeCar(direction) {
    if(direction === "left"){
        if(carID === 0)carID = cars.length - 1;
        else carID--;
    }
    else {
        if(carID === cars.length - 1)carID = 0;
        else carID++;
    }
    document.getElementById("changeCar").innerHTML = names[carID];
    console.log(carID);
    chooseCar(carID);
}