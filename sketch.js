// library stuff
// var scribble;

// global variable stuff
var gridWidth = 10;
var gridHeight = 10;
var gridCellSize = 10;
var isFullScreen = false;
var bgColor = 0x28262c;
var doDebug = false; 

var gridSizesSet = false;
var boardSet = false;
/**
 * @var
 * @name board
 * @type {Square[][]}
 */
// game variable stuff
var board = [[]];
var solved = false;
var holdingSquare = undefined;
var captureMouseX = 0;
var captureMouseY = 0;
var startedCapture = false;
var dragging = false;
var chanceOfSquare = 0.3;

var showingContextMenu = false; // todo: implement context menu
var enableFeedback = true;

/**
 * @var
 * @name isEditing
 * @type {boolean}
 * @description Flag indicating whether or not the user is editing the board.
 */
var isEditing = false;

var squareId = 0;
var level = 0; // -1 for custom boards.
var instructions = [
  "Shift + E: Toggle edit mode",
  "a or A (in edit mode): Toggle adding squares on click",
  "s (in edit mode): Save board",
  "l: Load board",
  "1 (in edit mode): add connector to top of selected square",
  "2 (in edit mode): add connector to right of selected square",
  "3 (in edit mode): add connector to bottom of selected square",
  "4 (in edit mode): add connector to left of selected square",
  "r: Shuffle board",
  "del: Reset board",
  "Left Arrow (In edit mode): Rotate selected square counter-clockwise",
  "Right Arrow (In edit mode): Rotate selected square clockwise",
  "Right Shift + Backspace: Delete selected square",
  "Right Shift + c: Clear board",
  "d: Toggle debug mode"
]


function setup() {
  createCanvas(displayWidth, displayHeight);
  alert("This game is in a beta stage of development. Any feedback would be appreciated.\nYou can contact me via email or dm me in Instagram.\n\nEmail: developingwhiskers192@gmail.com\nInstagram: www.instagram.com/whiskersofcode/\n\nThank you for playing!");
  // alert("Shift + E: Toggle edit mode\na or A (in edit mode): Toggle adding squares on click\ns (in edit mode): Save board\nl: Load board\n1 (in edit mode): add connector to top of selected square\n2 (in edit mode): add connector to right of selected square\n3 (in edit mode): add connector to bottom of selected square\n4 (in edit mode): add connector to left of selected square\nr: Shuffle board\nLeft Arrow (In edit mode): Rotate selected square counter-clockwise\nRight Arrow (In edit mode): Rotate selected square clockwise\n\nClick to start");
  
  // canvas.requestFullscreen();
  // scribble = new Scribble();
}

function draw() {
  if (solved == false) {
    background(40, 38, 44);
  } else {
    background(40, 50, 44);
  }
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
    if (level != -1) {
      if (level < boards.length) {
        if (boardSet == false) {
          setBoard(boards[level]);
          boardSet = true;
        }
      }
    }
    if (boardSet == false) {
      board = createBoard(gridWidth, gridHeight);
      boardSet = true;
    }
    // console.log(board);
    checkForAnomolies(); // fix thisd
    drawBoard(board);
  }
  if (enableFeedback)
    drawFeedbackButton();
}

// check the board to see if there is a square at the mouse position. If there is, return it. If not, return undefined.

/* Create a board with random squares that can be moved around, and have different values on each side, up to four. */


/* create a square with a value on each side, up to four. Fill it with a redish color. These squares must be able to move around the board. */
// use from "Square.js";

function drawFeedbackButton() {
  // detect if the mouse is over the button.
  if (mouseX > width - 155 && mouseX < width - 5 && mouseY > height - 80 && mouseY < height - 5) {
    fill(8, 84, 158);
  } else {
    fill(38, 114, 188);
  }
  stroke(250);
  strokeWeight(1);
  rect(width - 155, height - 80, 150, 75);
  // draw the text 'feedback' in the middle of the button.
  fill(250);
  textSize(24);
  noStroke();
  text("Feedback", width - 155 + 21, height - 75 + (75 / 2)+4);
}

function drawGrid() {
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
  noStroke();
  fill(0);
  textSize(32);
  fill(255);
  // show the instructions.
  for (var i = 0; i < instructions.length; i++) {
    text(instructions[i], 10, 32 + (i * 40));
  }
  stroke(0);
  text("Click to start", (width/2)-(7*16), 32 + ((instructions.length + 1)  * 40));
}

// display a context menu with options for the user to choose from.
function displayContextMenu() {
  // display a context menu with options for the user to choose from.

  rect(mouseX, mouseY, 100, 100);
}