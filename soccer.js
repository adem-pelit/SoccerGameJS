var cvs = document.getElementById("canvas");
var yazilim = document.getElementById("yazilim");
var ctx = cvs.getContext("2d");

var saha = new Image();
var red = new Image();
var blue = new Image();
var topResmi = new Image();

saha.src = "images/saha.png";
red.src = "images/red.png";
blue.src = "images/blue.png";
topResmi.src = "images/top.png";

var touch = new Audio();
var goalSound = new Audio();

goalSound.src = "sounds/goal-sound.mp3";
touch.src = "sounds/fly.mp3";
touch.volume = 0.1;
goalSound.volume = 0.1;
var i = 0;
function draw() {
    loop();
    ctx.drawImage(saha, 0, 0);
    drawObject(redPlayer);
    drawObject(bluePlayer);
    drawObject(ball);
    requestAnimationFrame(draw);
}

function drawObject(nesne) {
    ctx.drawImage(nesne.img, nesne.konumx - nesne.centerx, nesne.konumy - nesne.centery, nesne.cap * 2, nesne.cap * 2);
    
}

var keys = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,

    "5": false,
    "2": false,
    "1": false,
    "3": false,

    "g": false,
    "p": false,
}

var redPlayer = {
    name: "red",
    konumx: cvs.clientWidth * 0.25,
    konumy: cvs.clientHeight / 2,
    hizx: 0,
    hizy: 0,
    cap: 25,
    centerx: 25,
    centery: 25,
    img: red
}

var bluePlayer = {
    name: "blue",
    konumx: cvs.clientWidth * 0.75,
    konumy: cvs.clientHeight / 2,
    hizx: 0,
    hizy: 0,
    cap: 25,
    centerx: 25,
    centery: 25,
    img: blue
}

var ball = {
    name: "ball",
    konumx: cvs.clientWidth / 2,
    konumy: cvs.clientHeight / 2,
    hizx: 0,
    hizy: 0,
    cap: 20,
    centerx: 20,
    centery: 20,
    img: topResmi,
}

function magnitude(x, y) {
    return Math.sqrt(x * x + y * y);
}

function coll(nesne1, nesne2) {
    var mesafex = nesne2.konumx - nesne1.konumx;
    var mesafey = nesne2.konumy - nesne1.konumy;
    if (magnitude(mesafex, mesafey) < (nesne1.cap + nesne2.cap)) {
        averagex = nesne1.hizx - nesne2.hizx;
        averagey = nesne1.hizy - nesne2.hizy;
        nesne1.hizx -= mesafex * 0.01;
        nesne1.hizy -= mesafey * 0.01;
        nesne2.hizx += mesafex * 0.01;
        nesne2.hizy += mesafey * 0.01;

        touch.play();
    }
}

function ekrandaKal(nesne, deger) {
    if (deger) {
        if (nesne.konumx - nesne.cap < 0) {
            nesne.hizx = -nesne.hizx;
            nesne.konumx = nesne.cap;
        }
        if (nesne.konumx + nesne.cap > cvs.clientWidth) {
            nesne.hizx = -nesne.hizx;
            nesne.konumx = -nesne.cap + cvs.clientWidth;
        }

        if (nesne.konumy - nesne.cap < 0) {
            nesne.hizy = -nesne.hizy;
            nesne.konumy = nesne.cap;
        }
        if (nesne.konumy + nesne.cap > cvs.clientHeight) {
            nesne.hizy = -nesne.hizy;
            nesne.konumy = -nesne.cap + cvs.clientHeight;
        }
    } else {
        if (nesne.konumx - nesne.cap < 0) {
            nesne.hizx = 0
            nesne.konumx = nesne.cap;
        }
        if (nesne.konumx + nesne.cap > cvs.clientWidth) {
            nesne.hizx = 0
            nesne.konumx = -nesne.cap + cvs.clientWidth;
        }

        if (nesne.konumy - nesne.cap < 0) {
            nesne.hizy = 0
            nesne.konumy = nesne.cap;
        }
        if (nesne.konumy + nesne.cap > cvs.clientHeight) {
            nesne.hizy = 0
            nesne.konumy = -nesne.cap + cvs.clientHeight;
        }
    }
}

function move(nesne) {
    nesne.konumx += nesne.hizx;
    nesne.konumy += nesne.hizy;

    nesne.hizx *= 0.99;
    nesne.hizy *= 0.99;
    maks = 5;
    if (magnitude(nesne.hizx, nesne.hizy) > maks) {
        nesne.hizx *= maks / magnitude(nesne.hizx, nesne.hizy);
        nesne.hizy *= maks / magnitude(nesne.hizx, nesne.hizy);
    }
}

redGoal = 0;
blueGoal = 0;
canGoal = true;
yazilim.innerHTML = "score <br /> " + redGoal + ":" + blueGoal;
function gol(nesne) {

    if ((nesne.konumy < cvs.clientHeight * 0.69) && (nesne.konumy > cvs.clientHeight * 0.31)) {
        if (nesne.konumx - nesne.cap < 5) {
            if (canGoal) {
                goalSound.play();
                blueGoal++;
                canGoal = false;
                yazilim.innerHTML = "score <br /> " + redGoal + ":" + blueGoal;
                setTimeout(reset, 3000);
            }
        }
        if (nesne.konumx + nesne.cap > cvs.clientWidth - 5) {
            if (canGoal) {
                goalSound.play();
                redGoal++;
                canGoal = false;
                yazilim.innerHTML = "score <br /> " + redGoal + ":" + blueGoal;
                setTimeout(reset, 3000);
            }
        }
    }
}
robotMu = false;

function loop() {
    var ivmeHizi = 0.1;
    if (keys["w"]) redPlayer.hizy -= 0.1;
    if (keys["a"]) redPlayer.hizx -= 0.1;
    if (keys["s"]) redPlayer.hizy += 0.1;
    if (keys["d"]) redPlayer.hizx += 0.1;
    if(keys["g"]){
        var hedefx = ball.konumx - redPlayer.konumx;
        var hedefy = ball.konumy - redPlayer.konumy;
        var len = magnitude(hedefx, hedefy);
        hedefx /= len;
        hedefy /= len;
        redPlayer.hizx += hedefx * 0.1;
        redPlayer.hizy += hedefy * 0.1;
    }


    if (robotMu) {
        var hedefx = ball.konumx - bluePlayer.konumx;
        var hedefy = ball.konumy - bluePlayer.konumy;
        var len = magnitude(hedefx, hedefy);
        hedefx /= len;
        hedefy /= len;
        bluePlayer.hizx += hedefx * 0.1;
        bluePlayer.hizy += hedefy * 0.1;
    } else {
        if (keys["5"]) bluePlayer.hizy -= 0.1;
        if (keys["1"]) bluePlayer.hizx -= 0.1;
        if (keys["2"]) bluePlayer.hizy += 0.1;
        if (keys["3"]) bluePlayer.hizx += 0.1;
    }


    coll(redPlayer, bluePlayer);
    coll(ball, bluePlayer);
    coll(redPlayer, ball);

    ekrandaKal(redPlayer, false);
    ekrandaKal(bluePlayer, false);
    ekrandaKal(ball, true);

    move(redPlayer);
    move(bluePlayer);
    move(ball);

    gol(ball);
}
draw();

document.addEventListener("keyup", event => {
    if (typeof keys[event.key] === 'undefined') return;
    keys[event.key] = false;
});

document.addEventListener("keypress", event => {
    if (typeof keys[event.key] === 'undefined') return;
    if (keys[event.key] === true) return;
    keys[event.key] = true;
});

function func1() {
    var buton = document.getElementById("buton");
    if (robotMu) {
        robotMu = false;
        buton.innerHTML = "2. oyuncu: numpad(1,2,3,5)";
    } else {
        robotMu = true;
        buton.innerHTML = "2. oyuncu bot";
    }
}

function reset() {
    redPlayer.konumx = cvs.clientWidth * 0.25;
    redPlayer.konumy = cvs.clientHeight / 2;
    redPlayer.hizx = 0;
    redPlayer.hizy = 0;

    bluePlayer.konumx = cvs.clientWidth * 0.75;
    bluePlayer.konumy = cvs.clientHeight / 2;
    bluePlayer.hizx = 0;
    bluePlayer.hizy = 0;

    ball.konumx = cvs.clientWidth / 2;
    ball.konumy = cvs.clientHeight / 2;
    ball.hizx = 0;
    ball.hizy = 0;

    canGoal = true;
}