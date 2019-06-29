window.onload = setup;
let a;
let paused = false;
let running = false;
let jumping = false;
let obstacleCount = 0;
let score = 0;
let energy = 1;
let startDate;
let carID = 0;
let backgroundID = 0;
function setup() {
    //score = 0;
    document.getElementById("warningLabel").style.visibility = "hidden";
    document.body.addEventListener("keypress", (x) => {
        if(x.key === "Enter")toggle();
    });
    backgroundID = parseInt(sessionStorage.getItem("backgroundID"));
    chooseBackground(backgroundID);
    carID = parseInt(sessionStorage.getItem("carID"));
    chooseCar(carID);
    let multipliers = [-0.08, -0.16, -0.24, -0.32];
    let car = document.getElementById("car");
    car.style.visibility = "visible";
    car.style.left = screen.width / 100 * 10 + "px";
    window.onkeydown = function (e) {
        let key = e.key;
        if(!jumping && key < 5 && key > 0){
            let toReduce= parseInt(key) * 30;
            if(energy - toReduce > 0) {
                reduceEnergy(toReduce);
                
                up(car, multipliers[key - 1]);
            }
            else {
                //TODO
            }
        }
    }
}

function checkForEnergy(){
    let warningLevel;
    if(energy < 120){
        warningLevel = 4;
    }
    else if(energy < 90){
        warningLevel = 3;
    }
    else if(energy < 60){
        warningLevel = 2;
    }
    else if(energy < 30){
        warningLevel = 1;
    } 
    else{
        warningLevel = 0;
    }
    let el = document.getElementById("warningLabel");
    if(warningLevel != 0){
        let warningNumber = "";
        for(let i = warningLevel; i < 5; i++){
            warningNumber += ", " + warningLevel;
        }
        el.children[0].innerHTML = warningNumber.substring(1);
        el.style.visibility = "visible";
    }
    else {
        el.style.visibility = "hidden";
    }
}

function chooseBackground(index) {
    let backgrounds = ["mountains.png", "desert.png"];
    document.body.style.backgroundImage = "url(img/" + backgrounds[index] + ")";
}

function reduceEnergy(value) {
    let bar = document.getElementById("energy");
    energy -= value;
    bar.value = energy / 10;
    if(energy < 0)energy = 0;
}

function addEnergy(value) {
    let bar = document.getElementById("energy");
    energy += value;
    if(energy > 1000)energy = 1000;
    bar.value = energy / 10;
    checkForEnergy();
}

function createObstacle() {
    let obstacleHeights = [25, 50, 75, 100, 125, 150, 175];
    let obstacleWidths = [20, 30, 40, 50, 60, 70, 80, 150];
    let obstacle = document.getElementsByClassName("obstacle")[0];
    obstacle.style.right = "0px";
    obstacle.style.bottom = "50px";
    let height= obstacleHeights[Math.floor(Math.random() * obstacleHeights.length)]
    obstacle.style.height = height + "px";
    if(height > 120){
        obstacle.style.width = obstacleWidths[Math.floor(Math.random() * obstacleWidths.length - 2)] + "px";
    }
    else {
       obstacle.style.width = obstacleWidths[Math.floor(Math.random() * obstacleWidths.length)] + "px";
    
    }
    obstacle.style.position = "absolute";
    obstacle.style.background = "repeating-linear-gradient(45deg, #FFFF00, #FFFF00, 10px, #000000 10px, #000000 20px)";
    obstacle.style.border ="1px solid black";
}

function up(car, multiplier) {
    jumping = true;
    car.style.bottom = "50px";
    let x = -50;
    let interval = setInterval(function () {
        if(jumping) {
            if (x < 0) {
                x++;
                let carBottom = car.style.bottom.substr(0, car.style.bottom.length - 2);
                car.style.bottom = parseInt(carBottom) + (multiplier * x) + "px";
            }
            else {
                clearInterval(interval);
                down(car, multiplier);
            }
        }
        else clearInterval(interval);
    }, 10);
}

function down(car, multiplier) {
    let x = 0;
    const multiplierDependence = [{mul: -0.08, it: 38}, {mul: -0.16, it: 42}, {mul: -0.24, it: 45}, {mul: -0.32, it: 47}];
    let iterations = 0;
    for(let i = 0; i < multiplierDependence.length; i++){
        if(multiplierDependence[i].mul === multiplier)iterations = multiplierDependence[i].it;
    }
    let interval = setInterval(function () {
        if(jumping) {
            if (x < iterations) {
                x++;
                let carBottom = car.style.bottom.substr(0, car.style.bottom.length - 2);
                car.style.bottom = parseInt(carBottom) + (multiplier * x) + "px";
            }
            else {
                clearInterval(interval);
                car.style.bottom = "50px";
                jumping = false;
            }
        }
        else clearInterval(interval);
    }, 10);
}

function toggle() {
    let btn = document.getElementById("startButton");
    let car = document.getElementById("car");
    running = !running;
    btn.style.display = "none";
    if (running) {
        let music = document.getElementById("audioMusic");
        music.volume = 0.1;
        music.play();
        startDate = new Date();
       document.getElementById("frontWheel").style.animationPlayState = "running";
        document.getElementById("backWheel").style.animationPlayState = "running";
        let obstacles = document.getElementsByClassName("obstacle");
        car.style.bottom = "50px";
        createObstacle();
        a = setInterval(function () {
            let right = obstacles[0].style.right.substr(0, obstacles[0].style.right.length - 2);
            obstacles[0].style.right = parseInt(right) + 7 + "px";

            let carBottom = parseInt(car.style.bottom.substr(0, car.style.bottom.length - 2));
            let carEndLeft = parseInt(car.style.left.substr(0, car.style.left.length - 2)) + 380;
            let carStartLeft = parseInt(car.style.left.substr(0, car.style.left.length - 2));

            let obstacleWidth = parseInt(obstacles[0].style.width.substr(0, obstacles[0].style.width.length - 2));
            let obstacleStartLeft = ((screen.width) - (right) - obstacleWidth);
            let obstacleEndLeft = ((screen.width) - right);
            let obstacleHeight = parseInt(obstacles[0].style.height.substr(0, obstacles[0].style.height.length - 2));

            if (right >= screen.width){
                obstacleCount++;
                let addScore= obstacleWidth + obstacleHeight;
                score += addScore;
                let scoreLabel = document.getElementById("scoreLabel");
                scoreLabel.style.animationPlayState = "running";
                scoreLabel.onanimationiteration = function(){scoreLabel.style.animationPlayState = "paused"};
                scoreLabel.innerHTML  = "Score: " + score;
                addEnergy(Math.floor(addScore * 0.5));
                createObstacle();
            }

            if((carBottom < obstacleHeight * 0.9 + 50 && (obstacleStartLeft < carEndLeft && obstacleEndLeft > carStartLeft))){
                crashed();
            }
        }, 10);
    }
    else {
        document.getElementById("frontWheel").style.animationPlayState = "paused";
        document.getElementById("backWheel").style.animationPlayState = "paused";
        clearInterval(a);
        btn.innerHTML = "Start!";
        addEnergy(1000 - energy);
        document.getElementById("scoreLabel").innerHTML  = "Score: " + score;
    }
}

function chooseCar(index) {
    let cars = ["standardCar.css", "sportsCar.css", "truckCar.css", "gasCar.css"];
    let link = document.getElementById("carFile");
    link.href = "./cars/" + cars[index];
}

function crashed() {
    document.getElementById("car").style.visibility = "hidden";
    let time = (new Date() - startDate) / 1000;
    let sounds = document.getElementById("audioSounds");
    let music = document.getElementById("audioMusic");
    music.pause();
    music.currentTime = 0;
    sounds.volume = 0.1;
    sounds.play();
    document.getElementById("blackscreen").style.display = "block";
    let ingameOptions = document.getElementById("crashedOptions");
    ingameOptions.style.display =" table";
    ingameOptions.onanimationend = function () {
        document.getElementById("crashedOptionsContent").style.display = "table-cell";
    };
    let tableRows = document.getElementsByClassName("informationRow");
    for(let i = 0; i < tableRows.length; i++){
        switch (i) {
            case 0: {
                tableRows[i].getElementsByTagName("td")[1].innerHTML = score;
                break;
            }
            case 1: {
                tableRows[i].getElementsByTagName("td")[1].innerHTML = time + " s";
                break;
            }
            case 2: {
                tableRows[i].getElementsByTagName("td")[1].innerHTML = obstacleCount;
                break;
            }
        }
    }
    toggle();
}

function restartGame() {
    document.getElementById("blackscreen").style.display = "none";
    let ingameOptions = document.getElementById("crashedOptions");
    ingameOptions.style.display =" none";
    ingameOptions.onanimationend = function () {
        document.getElementById("crashedOptionsContent").style.display = "none";
    };
    obstacleCount = 0;
    score = 0;
    document.getElementById("scoreLabel").innerHTML  = "Score: " + score;
    setup();
    toggle();
}

function back2Menu() {
    sessionStorage.setItem("backgroundID", backgroundID);
    sessionStorage.setItem("carID", carID);
    console.log("background posted: " + backgroundID);
    window.open("menu.html", "_self");
}