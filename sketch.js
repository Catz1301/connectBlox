var gridWidth = 5;
var gridHeight = 5;
var gridCellSize = 10;
var isFullScreen = false;
var bgColor = 0x28262c;
var doDebug = true; 

var gridSizesSet = false;
var boardSet = false;
/**
 * @var
 * @name board
 * @type {Square[][]}
 */
var board = [[]];
var holdingSquare = undefined;
var captureMouseX = 0;
var captureMouseY = 0;
var startedCapture = false;
var dragging = false;
var chanceOfSquare = 0.3;

/**
 * @var
 * @name isEditing
 * @type {boolean}
 * @description Flag indicating whether or not the user is editing the board.
 */
var isEditing = false;

var squareId = 0;


function setup() {
  createCanvas(displayWidth, displayHeight);
  // canvas.requestFullscreen();
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

/* Create a board with random squares that can be moved around, and have different values on each side, up to four. */


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