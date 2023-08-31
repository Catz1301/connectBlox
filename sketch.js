var gridWidth = 5;
var gridHeight = 5;
var gridCellSize = 10;
var isFullScreen = false;
var bgColor = 0x28262c;
var doDebug = true; 

var gridSizesSet = false;
var boardSet = false;
var board = [[]];
var holdingSquare = undefined;
var captureMouseX = 0;
var captureMouseY = 0;
var startedCapture = false;
var dragging = false;
var chanceOfSquare = 0.3;

function setup() {
  createCanvas(displayWidth, displayHeight);
  // canvas.requestFullscreen();
}

function mousePressed() {
  if (startedCapture == false) {
    captureMouseX = mouseX;
    captureMouseY = mouseY;
    startedCapture = true;
    doDebug ? console.debug({status: "startedCapture", captureMouseX, captureMouseY,}) : undefined;
  }
  if (isFullScreen == false) {
    fullscreen(true);
    isFullScreen = true;
    return;
  }
  if (boardSet == true && dragging == true) {
    doDebug ? console.debug({status: "Checking for square to hold"}) : undefined;
    
  }
}

function mouseDragged() {
  doDebug ? console.debug({status: "Dragging", dragging,}) : undefined;
  if (abs(captureMouseX - mouseX) > 5 || abs(captureMouseY - mouseY) > 5) {
    dragging = true;
    board.forEach(function(e, index){
      e.forEach(function(d,index2){
        if (board[index][index2].hold() != undefined && holdingSquare == undefined) {
          holdingSquare = board[index][index2].hold();
          doDebug ? console.debug({status: "Holding square", holdingSquare,}) : undefined;
        }
      });
    });
  }
  if (dragging && holdingSquare != undefined) {
    holdingSquare.move(mouseX, mouseY);
  }
}

function mouseReleased() {
  captureMouseX = 0;
  captureMouseY = 0;
  startedCapture = false;
  dragging = false;
  // if (holdingSquare != undefined) {
  //   holdingSquare = holdingSquare.release();
  // }
  doDebug ? console.debug({status: "Resetting drag measurements", CaptureMousePos: {x: captureMouseX, y: captureMouseY}, startedCapture, dragging, holdingSquare}) : undefined;
  if (boardSet == true && holdingSquare == undefined) {
    board.forEach(function(e, index){
      e.forEach(function(d,index2){
          board[index][index2].click()
      });
    });
    doDebug ? console.debug({"Code Location": "mouseReleased", status: "clicked square", holdingSquare}) : undefined;
  } else {
    doDebug ? console.debug({"Code Location": "mouseReleased", status: "resetting holdingSquare holding status", holdingSquare}) : undefined;
    // holdingSquare.holding = false;
    doDebug ? console.debug({"Code Location": "mouseReleased", status: "holdingSquare holding status reset", holdingSquare}) : undefined;
    holdingSquare = holdingSquare.release(mouseX, mouseY);
    doDebug ? console.debug({"Code Location": "mouseReleased", status: "released square", holdingSquare}) : undefined;
  }
}

function keyDown(e) {
  return false;
}

function keyPressed() {
  // return false;
  if (keyCode == ESCAPE) {

    if (confirm("Are you sure you want to exit full screen?")) {
      fullscreen(false);
      isFullScreen = false;
      return;
    } else {
      return false;
    }
  }
}

function draw() {
  background(40, 38, 44);
  if (isFullScreen == false) {
    displayStartScreen();
  } else {
    //drawGrid();
    if (gridSizesSet == false) {
      var gridWidth = 10;
      var gridHeight = 10;
      gridCellSize = floor(height / gridHeight);
      gridSizesSet = true;
    }
    if (boardSet == false) {
      board = createBoard(gridWidth, gridHeight);
      boardSet = true;
    }
    drawBoard(board);
  }
}

// check the board to see if there is a square at the mouse position. If there is, return it. If not, return undefined.
function checkBoardForSquare(mx, my) {
  let squareFound = false;
  let square = undefined;
  for (var x = 0; x < board.length; x++) {
    for(var y = 0; y < board[x].length; y++) {
      if (board[x][y] == undefined) {
        doDebug ? console.debug({status: "Board space is undefined, returning"}) : undefined;
        // console.trace();
        // square = undefined;
        continue;
      } else {
        let squareAt = board[x][y].check(mx, my);
        doDebug ? console.debug("%cSquare at " + x + ", " + y + " is " + squareAt, "color: Blue; background-color: yellow; font-size: 16px") : undefined;
        if (board[x][y].check(mx, my)) {
          doDebug ? console.debug({status: "Square found, returning", squareAt}) : undefined;
          squareFound = true;
          square = board[x][y];
          return square;
        }
        else
          continue;
      }
    };
  };
  doDebug ? console.debug("%c%o", "color: white, background-color: green, font-size: 16px;", square) : undefined;
  return square;
  /* 
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[x].length; y++) {
      if (board[x][y] == undefined) {
        continue;
      } else {
        if (board[x][y].check(mx, my))
          return board[x][y];
        else
          return undefined;
      }
    }
  }
  return {
    Name: "DummyObject",
    data: {
      isUseless: true,
      value: 69,
    }
  } */
}

        

function drawBoard(board) {
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[x].length; y++) {
      if (board[x][y] != undefined)
        board[x][y].draw();
    }
  }
}
/* Create a board with random squares that can be moved around, and have different values on each side, up to four. */
function createBoard(width, height) {
  var board = [[]];
  let squareId = 0;
  for (var x = 0; x < width; x++) {
    board[x] = [];
    for (var y = 0; y < height; y++) {
      if (random(0, 1) <= chanceOfSquare) {
        board[x][y] = new Square(x * gridCellSize, y * gridCellSize, squareId);
        squareId++;
      }
    }
  }
  return board;
  
}

/* create a square with a value on each side, up to four. Fill it with a redish color. These squares must be able to move around the board. */
// use from "Square.js";

function drawGrid() {
  var gridWidth = 10;
  var gridHeight = 10;
  gridCellSize = floor(height / gridHeight);
  stroke(250);
  fill(40,38,44);
  for (var gridX = 0; gridX < gridWidth; gridX++) {
    for (var gridY = 0; gridY < gridHeight; gridY++) {
      rect(gridX * gridCellSize, gridY * gridCellSize, gridCellSize, gridCellSize);
    }
  }
}

function displayStartScreen() {
  fill(0);
  textSize(32);
  fill(255);
  text("Click to start", (width/2)-(7*16), (height/2)-16);
}