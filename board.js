/**
 * @public
 * @function
 * @name createBoard
 * @param {number} width The width of the board
 * @param {number} height The height of the board
 * @returns 
 */

function createBoard(width, height) {
  /** 
   * @var
   * @name board
   * @type {Square[][]}
   */
  var board = [[]];
  // let squareId = 0;
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

/**
 * @public
 * @function
 * @name drawBoard
 * @param {Square[][]} board The board to draw
 */
function drawBoard(board) {
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[x].length; y++) {
      if (board[x][y] != undefined)
        board[x][y].draw();
    }
  }
}

/**
 * @public
 * @function
 * @name checkBoardForSquare
 * @description Check the board for a square at the mouse position. If there is one, return it. If not, return undefined.
 * @param {number} mx The mouse x position
 * @param {number} my The mouse y position
 * @returns {Square} The square at the mouse position, or undefined if there is none.
 */
function checkBoardForSquare(mx, my) {
  let squareFound = false;
  /**
   * @var
   * @name square
   * @type {Square}
   */
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
}

/**
 * @public
 * @function
 * @name clearBoard
 * @description Clear the board
 */
function clearBoard() {
  board = [[]];
  boardSet = true;
  squareId = 0;
}