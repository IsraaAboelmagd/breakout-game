
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
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
    if(rightPressed) {
        paddleX += 4;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 4;
        if (paddleX < 0){
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
var blockPadding = 10;
var blockOffsetTop = 30;
var blockOffsetLeft = 30;

var blocks = [];
var redBlocks = [];
var blueBlocks = [];

for (var c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for (var r = 0; r < blockRowCount; r++) {
        var blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
        var blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
        blocks[c][r] = { x: blockX, y: blockY, status: 1 };
        redBlocks.push(blocks[c][r]);
    }
}

// function drawBlocks() {
//     for (var c = 0; c < blockColumnCount; c++) {
//         for (var r = 0; r < blockRowCount; r++) {
//             if (blocks[c][r].status == 1) {
//                 if (redBlocks.includes(blocks[c][r])) {
//                     ctx.fillStyle = "#FF0000";
//                 } else if (blueBlocks.includes(blocks[c][r])) {
//                     ctx.fillStyle = "#0000FF";
//                 } else {
//                     ctx.fillStyle = "#0095DD";
//                 }
//                 ctx.fillRect(blocks[c][r].x, blocks[c][r].y, blockWidth, blockHeight);
//             }
//         }
//     }
// }
function drawBlocks() {
    for (var c = 0; c < blockColumnCount; c++) {
        for (var r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].status == 1) {
                var img;
                if (redBlocks.includes(blocks[c][r])) {
                    img = document.getElementById("blocksbg"); //replace "red-image" with the ID of your red background image
                } else if (blueBlocks.includes(blocks[c][r])) {
                    img = document.getElementById("blue-image"); //replace "blue-image" with the ID of your blue background image
                } else {
                    img = document.getElementById("default-image"); //replace "default-image" with the ID of your default background image
                }
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
