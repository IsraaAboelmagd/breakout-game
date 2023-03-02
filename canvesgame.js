
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
///////////////////////////
let lives = 3;
function drawLives() {
    ctx.font = "14px Verdana ";
    ctx.fillStyle = "red";
    ctx.fillText(`Lives: ${lives}`, 750, 20);
  }
  function gameOver(){
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.fillText('Game Over', canvas.width/2, canvas.height/2); 
    }requestAnimationFrame(gameOver);
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
        blocks.push(blocks[c][r]);
    }
}

function drawBlocks() {
    for (var c = 0; c < blockColumnCount; c++) {
        for (var r = 0; r < blockRowCount; r++) {
            // var img = new Image();
            // img.src = "blocksbg.jpg";
            // ctx.shadowBlur = 5;
            // ctx.shadowColor = "rgb(60, 60, 60)";
            // ctx.shadowOffsetX = 3;
            // ctx.shadowOffsetY = 2;
            if (blocks[c][r].status == 2) {   
                blocks[c][r].img.src = 'blocksbg.jpg';
                ctx.drawImage(blocks[c][r].img, blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
                // Reset shadow properties to default
            } else if(blocks[c][r].status == 1){
                blocks[c][r].img.src = 'Paddle.jpg';
                ctx.drawImage(blocks[c][r].img, blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
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
                clearInterval(interval);
                
            }
            resetBall();
            resetpaddle();

        }

    }

    ball.x += xDirection
    ball.y += yDirection
    blocksCollision();
}
function blocksCollision() {
    let change = false;
    let ballInBlocks = (block) => 
                 ball.x + 2 * ball.radius > block.x &&
                 ball.x < block.x + blockWidth &&
                 ball.y + 2 * ball.radius > block.y &&
                 ball.y < block.y + blockHeight;
    blocks.forEach((block) => {        
        if (block.status > 0 && ballInBlocks(block)){
                block.status--;
                if (block.status == 0){
                    score += 10;
                }
                if (!change){
                    change=true
                    ballTouchBlock(block)
                }

        }
    });
}
    function ballTouchBlock(block) {
            let fromLeft = () => ball.x + 2 * ball.radius - xDirection <= block.x;
            let fromRight = () => ball.x - xDirection >= blockWidth + block.x;
            if (fromLeft() || fromRight())
                xDirection = -xDirection
            else
                yDirection = -yDirection
        }
        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 30;
             xDirection = 2
             yDirection = -2
          } 
          function resetpaddle(){
            paddleX = (canvas.width - paddleWidth) / 2;
          }     
var interval = setInterval(moveBall,10)