# breakout-game
<!DOCTYPE html>
<html>
  <head>
    <title>Adding Blocks to Canvas Example</title>
    <style>
        canvas {
          border: 1px solid black;
        }
      </style>
  </head>
  <body onload="addBlocks()">
    <canvas id="myCanvas" width="480" height="320"></canvas>
    <script>
      function addBlocks() {
  var canvas = document.getElementById("myCanvas"); //get the canvas element
  var ctx = canvas.getContext("2d"); //get the context for the canvas
  
  var blocks = []; //create an array to hold the blocks
  
  //set up the block dimensions and spacing
  var blockRowCount = 4;
  var blockColumnCount = 6;
  var blockWidth = 60;
  var blockHeight = 10;
  var blockPadding = 10;
  var blockOffsetTop = 30;
  var blockOffsetLeft = 30;

  //loop through the rows and columns and create each block
  for(var c=0; c<blockColumnCount; c++) {
    blocks[c] = [];
    for(var r=0; r<blockRowCount; r++) {
      blocks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  //draw each block on the canvas
  for(var c=0; c<blockColumnCount; c++) {
    for(var r=0; r<blockRowCount; r++) {
      if(blocks[c][r].status == 1) {
        var blockX = (c*(blockWidth+blockPadding))+blockOffsetLeft;
        var blockY = (r*(blockHeight+blockPadding))+blockOffsetTop;
        blocks[c][r].x = blockX;
        blocks[c][r].y = blockY;
        ctx.beginPath();
        ctx.rect(blockX, blockY, blockWidth, blockHeight);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

    </script>
  </body>
</html>
