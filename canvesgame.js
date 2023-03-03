
var canvas = document.getElementById("myCanvas");
var bounce = document.getElementById("audio")
var ctx = canvas.getContext("2d");
let score = 0;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
let gameEnd;
///////////////////////////
let lives = 3;
function drawLives() {
    ctx.font = "14px Verdana ";
    ctx.fillStyle = "red";
    ctx.fillText(`Lives: ${lives}`, 730, 20);
  }
  function gameOver(){
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.fillText('Game Over', canvas.width/2, canvas.height/2); 
    gameEnd=requestAnimationFrame(gameOver);
    }
    function drawScore(){
        ctx.font ='14px Verdana';
        ctx.fillStyle = 'red';
        ctx.fillText(`Score: ${score}`,60,20)
    }
    //////////////////////////////////////
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
paddleImg.src = "Pictures/paddle11.jpeg";

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
    drawScore();
    drawLives();
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
        blocks[c][r] = { x: blockX, y: blockY, status: 2, img : new Image() };
    }
}

function drawBlocks() {
    for (var c = 0; c < blockColumnCount; c++) {
        for (var r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].status == 2) {   
                blocks[c][r].img.src = 'Pictures/blocksbg.jpg';
                ctx.drawImage(blocks[c][r].img, blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
                // Reset shadow properties to default
            } else if(blocks[c][r].status == 1){
                blocks[c][r].img.src = 'Pictures/Paddle.jpg';
                ctx.drawImage(blocks[c][r].img, blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
            }
        }
    }
}
var ball = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    radius: 10,

};
let xDirection = -3 * Math.random()
let yDirection = 3


function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";

    ctx.fill();
    ctx.closePath();

   // requestAnimationFrame(drawBall)
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
    else if (ball.y + yDirection > canvas.height - ball.radius - paddleHeight) {
        bounce.play()
        if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
            yDirection = -yDirection;
        }
        else {
            // alert("GAME OVER");
            lives--;
            if(lives==0){
                lives=0;
                gameOver();
                cancelAnimationFrame(animation)
                cancelAnimationFrame(gameEnd)

            }
            resetBall();
            resetpaddle();

        }

    }
    
    ball.x += xDirection
    ball.y += yDirection
    let animation= requestAnimationFrame(moveBall)
    blocksCollision();
}
function blocksCollision() {
    let ballInBlocks = (block) => 
                 ball.x + ball.radius > block.x &&
                 ball.x < block.x + blockWidth &&
                 ball.y +  ball.radius > block.y &&
                 ball.y < block.y + blockHeight;
        for (var c = 0; c < blockColumnCount; c++) {
            for (var r = 0; r < blockRowCount; r++) {       
        if (blocks[c][r].status > 0 && ballInBlocks(blocks[c][r])){
            bounce.play()
            blocks[c][r].status--;
            if (blocks[c][r].status == 0){
                score += 10;
            }
            ballTouchBlock(blocks[c][r])
            

        }
            }
        }
}
    function ballTouchBlock(block) {
            let fromLeft = () => ball.x +  ball.radius - xDirection <= block.x;
            let fromRight = () => ball.x  - xDirection >= blockWidth + block.x;
            if (fromLeft() || fromRight())
                xDirection = -xDirection
            else
                yDirection = -yDirection
        }
        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 40;
             xDirection = 3 * Math.random()
             yDirection = -3
          } 
          function resetpaddle(){
            paddleX = (canvas.width - paddleWidth) / 2;
          }     
moveBall()