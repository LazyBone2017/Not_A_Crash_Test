let carHtml ="<span id=\"shellMiddle\">\n" +
    "                <span id=\"frontWindow\"></span>\n" +
    "                <span id=\"backWindow\"></span>\n" +
    "                <span id=\"middleWindow\"></span>\n" +
    "                <span id=\"brandText\">Volpak</span>\n" +
    "            </span>\n" +
    "            <span id=\"shellFront\">\n" +
    "                <span id=\"frontLight\"></span>\n" +
    "                 <span id=\"extremeFrontWindow\"></span>\n" +
    "            </span>\n" +
    "            <span id=\"shellBack\">\n" +
    "                <span id=\"backLight\"></span>\n" +
    "            </span>\n" +
    "            <span id=\"backWheel\">\n" +
    "                <img src=\"img/wheelDeco.png\" alt=\"wheelDeco.png\" class = wheelDeco>\n" +
    "                <span class=\"emblem\">\n" +
    "                    <img src=\"img/brandLogo.png\" alt=\"logo\">\n" +
    "                </span>\n" +
    "            </span>\n" +
    "            <span id=\"frontWheel\">\n" +
    "                <img src=\"img/wheelDeco.png\" alt=\"wheelDeco.png\" class = wheelDeco>\n" +
    "                <span class=\"emblem\">\n" +
    "                    <img src=\"img/brandLogo.png\" alt=\"logo\">\n" +
    "                </span>\n" +
    "            </span>\n";

window.onload = start();

function start() {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "carFile";
    document.head.appendChild(link);

    let car = document.createElement("span");
    car.id = "car";
    car.innerHTML = carHtml;
    document.body.appendChild(car);
}