
var canvas = document.getElementById("myCanvas");
var bounce = document.getElementById("audio")
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
// create an image object
const paddleImg = new Image();
paddleImg.src = "Paddle.jpg";

function drawPaddle() {


    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    // draw the image onto the canvas with adjusted y coordinate
    ctx.drawImage(paddleImg, paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.stroke();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlocks();
    drawPaddle();
    if (rightPressed) {
        paddleX += 4;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 4;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
}
setInterval(draw);

var blockRowCount = 5;
var blockColumnCount = 8;
var blockWidth = 80;
var blockHeight = 20;
var blockPadding = 15;
var blockOffsetTop = 30;
var blockOffsetLeft = 30;

var blocks = [];
for (var c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for (var r = 0; r < blockRowCount; r++) {
        var blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
        var blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
        blocks[c][r] = { x: blockX, y: blockY, status: 1 };
        blocks.push(blocks[c][r]);
    }
}

function drawBlocks() {
    var img = new Image();
    img.src = "blocksbg.jpg";
    for (var c = 0; c < blockColumnCount; c++) {
        for (var r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].status == 1) {
                ctx.drawImage(img, blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
                ctx.shadowBlur = 5;
                ctx.shadowColor = "rgb(60, 60, 60)";
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 2;
                ctx.drawImage(img, blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
                // Reset shadow properties to default
            }
        }
    }
}
var ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,

};
let xDirection = 2
let yDirection = -2


function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";

    ctx.fill();
    ctx.closePath();


    requestAnimationFrame(drawBall)


}

function moveBall() {
    drawBall();

    if (ball.x + xDirection > canvas.width - ball.radius || ball.x + xDirection < ball.radius) {
        xDirection = -xDirection;
        bounce.play()
    }
    if (ball.y + yDirection < ball.radius) {
        yDirection = -yDirection
        bounce.play()
    }
    else if (ball.y + yDirection > canvas.height - ball.radius) {
        bounce.play()
        if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
            yDirection = -yDirection;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);

        }

    }

    ball.x += xDirection
    ball.y += yDirection

}

var interval = setInterval(moveBall,10)
