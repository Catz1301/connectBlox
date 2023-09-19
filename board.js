var numberOfSquares = 0;
var alertMissingSquareAnomolie = false;
var missingSquareToast = undefined;
/**
 * @public
 * @function
 * @name createBoard
 * @param {number} boardWidth The width of the board
 * @param {number} boardHeight The height of the board
 * @returns 
 */
/** 
   * @var
   * @name board
   * @type {Square[][]}
   */

function createBoard(boardWidth, boardHeight) {
  /** 
   * @var
   * @name board
   * @type {Square[][]}
   */
  var board = [[]];
  // let squareId = 0;
  for (var x = 0; x < boardWidth; x++) {
    board[x] = [];
    for (var y = 0; y < boardHeight; y++) {
      if (random(0, 1) <= chanceOfSquare) {
        board[x][y] = new Square(x * gridCellSize, y * gridCellSize, squareId);
        squareId++;
        numberOfSquares++;
      } else {
        board[x][y] = undefined;
      }
    }
  }
  return board;
}

function createEmptyBoard(width, height) {
  var board = [[]];
  for (var x = 0; x < width; x++) {
    board[x] = [];
    for (var y = 0; y < height; y++) {
      board[x][y] = undefined;
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
  for (let x = 0; x < board.length; ++x) {
    for (let y = 0; y < board[x].length; ++y) {
      if (board[x][y] != undefined) {
        // if (holdingSquare == undefined) {
        //   board[x][y].drawSquare();
        // } else {
        //   if (board[x][y].id != holdingSquare.id) {
        //     board[x][y].drawSquare();
        //   }
        //   board[x][y].drawSquare();
        // }
        board[x][y].drawSquare(); // eventually only draw squares that are not being held, then draw the held square on top of the others.
        if (doDebug) {
          push();
          stroke(0);
          // strokeWeight(3);
          fill(255);
          textAlign(CENTER);
          textSize(16);
          text(board[x][y].id, board[x][y].x + gridCellSize / 2, board[x][y].y + 8 + gridCellSize / 2);
          pop();
        }
      }
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
function checkBoardForSquare(mx, my, squareId) {
  let squareFound = false;
  /**
   * @var
   * @name square
   * @type {Square}
   */
  let squares = [];
  let gridX = floor(mx / gridCellSize);
  let gridY = floor(my / gridCellSize);
  if (board[gridX][gridY] != undefined) {
    if (board[gridX][gridY].id == squareId) {
      return undefined;
    } else {
      return board[gridX][gridY];
    }
  } else {
    return undefined;
  }
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
        if (board[x][y].check(mx, my) && board[x][y].id != squareId) {
          doDebug ? console.debug({status: "Square found, returning", squareAt}) : undefined;
          squareFound = true;
          squares[squares.length] = board[x][y];
          return squares;
        }
        else
          continue;
      }
    };
  };
  doDebug ? console.debug("%c%o", "color: white, background-color: green, font-size: 16px;", squares) : undefined;
  return squares;
}

/**
 * @public
 * @function
 * @name clearBoard
 * @description Clear the board
 */
function clearBoard() {
  for (var x = 0; x < gridWidth; x++) {
    board[x] = [];
    for (var y = 0; y < gridHeight; y++) {
      board[x][y] = undefined;
    }
  }
  boardSet = true;
  squareId = 0;
  
}

function setBoard(boardObj) {
  //set the board
  clearBoard();
  boardObj.forEach(function(e, index) {
    e.forEach(function(d, index2) {
      if (boardObj[index][index2] != undefined) {
        board[index][index2] = Square.parseObj(boardObj[index][index2]);
        squareId++;
        numberOfSquares++;
      }
    })
  });
  doDebug ? console.debug({status: "Board set", board}) : undefined;
}

// shuffle the board by gathering all the squares and put them into an array. then clear the board, and put the squares back in the board in a random order.
function shuffleBoard() {
  let squares = [];
  board.forEach(function(e, index) {
    e.forEach(function(d, index2) {
      if (board[index][index2] != undefined) {
        squares.push(board[index][index2]);
      }
    })
  });
  clearBoard();
  // board = createEmptyBoard(gridWidth, gridHeight);
  while (squares.length > 0) {
    board.forEach(function(e, index) {
      e.forEach(function(d, index2) {
        if (random(0, 1) <= chanceOfSquare && squares.length > 0) {
          let tempSquare = squares.pop();
          tempSquare.x = index * gridCellSize;
          tempSquare.y = index2 * gridCellSize;
          board[index][index2] = tempSquare;
        }
      });
    });
  }
}

function resetBoard() {
  clearBoard();
  boardSet = false;
}

// eventually implement. Not needed for now, since the squares no longer screw up their location and kamakazi their existence.
/* function checkForAnomolies() {
  let squaresFound = 0;
  let missingSquareAnomolie = false;
  board.forEach(function(e, index) {
    e.forEach(function(d, index2) {
      if (board[index][index2] != undefined) {
        squaresFound++
      }
    });
  });
  if (squaresFound != numberOfSquares) {
    missingSquareAnomolie = true;
    popup("There is a missing square on the board. Del key will fix this.", 3, width / 2, height - 100);
  }


  // toast the user if there is an anomolie.
  if (missingSquareAnomolie) {
    // todo
    if (!alertMissingSquareAnomolie) {
      // missingSquareToast = new Toast("There is a missing square on the board. Del key will fix this.", 3000);
      alertMissingSquareAnomolie = true;
    }
    doDebug ? console.debug("Missing square anomolie detected, alerting user", "background-color: orange", missingSquareToast) : undefined;
  }
} */

function attemptSolve() {
  let allSquaresSolved = true;
  board.forEach(function(e, x) {
    e.forEach(function(d, y) {
      if (board[x][y] != null) {
        board[x][y].color = color(255, 255, 0);
        if (x == 0) {
          board[x][y].solvedSides[board[x][y].side.LEFT] = true;
        }
        if (x == gridWidth - 1) {
          board[x][y].solvedSides[board[x][y].side.RIGHT] = true;
        }
        if (y == 0) {
          board[x][y].solvedSides[board[x][y].side.TOP] = true;
        }
        if (y == gridHeight - 1) {
          board[x][y].solvedSides[board[x][y].side.BOTTOM] = true;
        }
        if (x != 0) {
          if (board[x][y] != undefined && board[x - 1][y] != undefined) {
            doDebug ? console.debug({status: "ConnectorTest", "Square": board[x][y], x,y, "Square Left Connectors": board[x][y].connectors[board[x][y].side.LEFT], "Left Square Right Connector": board[x - 1][y].connectors[board[x][y].side.RIGHT]}) : undefined;
            if (board[x][y].connectors[board[x][y].side.LEFT] == board[x - 1][y].connectors[board[x][y].side.RIGHT]) {
              board[x][y].solvedSides[board[x][y].side.LEFT] = true;
              board[x - 1][y].solvedSides[board[x][y].side.RIGHT] = true;
            } else {
              board[x][y].solvedSides[board[x][y].side.LEFT] = false;
              board[x - 1][y].solvedSides[board[x][y].side.RIGHT] = false;
            }
          } else {
            if (board[x][y] != undefined) {
              board[x][y].solvedSides[board[x][y].side.LEFT] = false;
            }
            if (board[x - 1][y] != undefined) {
              board[x - 1][y].solvedSides[board[x][y].side.RIGHT] = false;
            }
          }
        }
        if (x != gridWidth - 1) {
          if (board[x][y] != undefined && board[x + 1][y] != undefined) {
            doDebug ? console.debug({status: "ConnectorTest", "Square": board[x][y], x,y, "Square Right Connectors": board[x][y].connectors[board[x][y].side.RIGHT], "Right Square Left Connector": board[x + 1][y].connectors[board[x][y].side.LEFT]}) : undefined;
            if (board[x][y].connectors[board[x][y].side.RIGHT] == board[x + 1][y].connectors[board[x][y].side.LEFT]) {
              board[x][y].solvedSides[board[x][y].side.RIGHT] = true;
              board[x + 1][y].solvedSides[board[x][y].side.LEFT] = true;
            } else {
              board[x][y].solvedSides[board[x][y].side.RIGHT] = false;
              board[x + 1][y].solvedSides[board[x][y].side.LEFT] = false;
            }
          } else {
            if (board[x][y] != undefined) {
              board[x][y].solvedSides[board[x][y].side.RIGHT] = false;
            }
            if (board[x + 1][y] != undefined) {
              board[x + 1][y].solvedSides[board[x][y].side.LEFT] = false;
            }
          }
        }
        if (y != 0) {
          if (board[x][y] != undefined && board[x][y - 1] != undefined) {
            doDebug ? console.debug({status: "ConnectorTest", "Square": board[x][y], x,y, "Square Top Connectors": board[x][y].connectors[board[x][y].side.TOP], "Top Square Bottom Connector": board[x][y - 1].connectors[board[x][y].side.BOTTOM]}) : undefined;
            if (board[x][y].connectors[board[x][y].side.TOP] == board[x][y - 1].connectors[board[x][y].side.BOTTOM]) {
              board[x][y].solvedSides[board[x][y].side.TOP] = true;
              board[x][y - 1].solvedSides[board[x][y].side.BOTTOM] = true;
            } else {
              board[x][y].solvedSides[board[x][y].side.TOP] = false;
              board[x][y - 1].solvedSides[board[x][y].side.BOTTOM] = false;
            }
          } else {
            if (board[x][y] != undefined) {
              board[x][y].solvedSides[board[x][y].side.TOP] = false;
            }
            if (board[x][y - 1] != undefined) {
              board[x][y - 1].solvedSides[board[x][y].side.BOTTOM] = false;
            }
          }
        }
        if (y != gridHeight - 1) {
          if (board[x][y] != undefined && board[x][y + 1] != undefined) {
            doDebug ? console.debug({status: "ConnectorTest", "Square": board[x][y], x,y, "Square Bottom Connectors": board[x][y].connectors[board[x][y].side.BOTTOM], "Bottom Square Top Connector": board[x][y + 1].connectors[board[x][y].side.TOP]}) : undefined;
            if (board[x][y].connectors[board[x][y].side.BOTTOM] == board[x][y + 1].connectors[board[x][y].side.TOP]) {
              board[x][y].solvedSides[board[x][y].side.BOTTOM] = true;
              board[x][y + 1].solvedSides[board[x][y].side.TOP] = true;
            } else {
              board[x][y].solvedSides[board[x][y].side.BOTTOM] = false;
              board[x][y + 1].solvedSides[board[x][y].side.TOP] = false;
            }
          } else {
            if (board[x][y] != undefined) {
              board[x][y].solvedSides[board[x][y].side.BOTTOM] = false;
            }
            if (board[x][y + 1] != undefined) {
              board[x][y + 1].solvedSides[board[x][y].side.TOP] = false;
            }
          }
        }
      }
      if (board[x][y] != undefined) {
        if (board[x][y].connectors[0] == 0) {
          board[x][y].solvedSides[board[x][y].side.TOP] = true;
        }
        if (board[x][y].connectors[1] == 0) {
          board[x][y].solvedSides[board[x][y].side.RIGHT] = true;
        }
        if (board[x][y].connectors[2] == 0) {
          board[x][y].solvedSides[board[x][y].side.BOTTOM] = true;
        }
        if (board[x][y].connectors[3] == 0) {
          board[x][y].solvedSides[board[x][y].side.LEFT] = true;
        }
      }
      // todo: Check out Montclair, CA. It looks beautiful.
      let squareSolved = false;
      if (board[x][y] != undefined) {
        squareSolved = (board[x][y].solvedSides[board[x][y].side.LEFT] && board[x][y].solvedSides[board[x][y].side.RIGHT] && board[x][y].solvedSides[board[x][y].side.TOP] && board[x][y].solvedSides[board[x][y].side.BOTTOM]);
        doDebug ? console.log("Square at " + x + ", " + y + " is solved: " + squareSolved) : undefined;
      }
      if (squareSolved == false && board[x][y] != undefined) {
        allSquaresSolved = false;
      }
      if (board[x][y] != undefined) {
        if (board[x][y].solvedSides[board[x][y].side.LEFT] == true && board[x][y].solvedSides[board[x][y].side.RIGHT] == true && board[x][y].solvedSides[board[x][y].side.TOP] == true && board[x][y].solvedSides[board[x][y].side.BOTTOM] == true) {
          board[x][y].color = color(255, 255, 0);
        }
      }
      if (board[x][y] != undefined)
        board[x][y].color = color(255, 0, 0);
    });
  });
  if (allSquaresSolved) { // always evaluates false
    doDebug ? console.debug({status: "All squares solved"}) : undefined;
    solved = true;
    const puzzleSolved = async () => {
      setTimeout(() => {
        let advanceLevelModal = new Modal("Puzzle Solved!", "You solved the puzzle! Move on to level " + (level + 1) + "?");
        let advanceLevel = false;
        advanceLevelModal.show().then((result) => {
          if (result == Modal.ModalResult.POSITIVE) {
            advanceLevel = true;
            level++;
            boardSet = false;
            isFullScreen = false; 
            storeItem("level", level);
            solved = false;
          }
        });
      }, 1000);
    };
    puzzleSolved();
  } else {
    doDebug ? console.debug({status: "Not all squares solved"}) : undefined;
  }
}