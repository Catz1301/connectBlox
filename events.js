var preventionKey = false;

function mouseReleased() {
  if (!isEditing) {
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
        // console.debug(e);
        e.forEach(function(d,index2){
          // console.debug(d);
          // if (e == )
          if (board[index][index2] != undefined)
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
  /* ----- EDITING MODE ACTIONS ----- */

  if (isEditing) {
    if (addingSquares) {
      // add a square to the board in the spot where the user clicks, snapped to the grid.
      let x = floor(mouseX / gridCellSize);
      let y = floor(mouseY / gridCellSize);
      if (board[x][y] == undefined) {
        board[x][y] = new Square(x * gridCellSize, y * gridCellSize, squareId); // FIX. errors saying the spot on the grid is undefined. 
        squareId++;
      }
    }
    if (selectedSquare != undefined && holdingSquare != undefined) {
      // holdingSquare = holdingSquare.release();
      selectedSquare.color = color(255, 0, 0);
      selectedSquare = selectedSquare.release();
      holdingSquare = undefined;
    }
  }

}

function mousePressed() {
  if (!isEditing) {
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
  } else {
    if (boardSet == true) {
      let foundSquare = false;
      board.forEach(function(e, index){
        e.forEach(function(d,index2){
          if (board[index][index2] != undefined) {
            if (selectedSquare == undefined && board[index][index2].select() && foundSquare == false) {
              selectedSquare = board[index][index2];
              foundSquare = true;
            }
            if (selectedSquare != undefined && board[index][index2].select() && foundSquare == false) {
              selectedSquare = undefined;
            }
          }
        });
      });
    }
  }
}

function mouseDragged() {
  // if (isEditing)
  //   return false;

  doDebug ? console.debug({status: "Dragging", dragging,}) : undefined;
  if (abs(captureMouseX - mouseX) > 5 || abs(captureMouseY - mouseY) > 5) {
    dragging = true;
    board.forEach(function(e, index){
      e.forEach(function(d,index2){
        if (board[index][index2] != undefined) {
          if (board[index][index2].hold() != undefined && holdingSquare == undefined) {
          holdingSquare = board[index][index2].hold();
          doDebug ? console.debug({status: "Holding square", holdingSquare,}) : undefined;
          }
        }
      });
    });
  }
  if (dragging && holdingSquare != undefined) {
    holdingSquare.move(mouseX, mouseY);
  }
}


  
function keyPressed(event) {
  // return false;
  if (event.code == "ShiftRight") {
    preventionKey = true;
  }
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

function keyReleased(event) {
  if (keyCode == BACKSPACE && preventionKey) {
    board.forEach(function(e, index){
      e.forEach(function(d,index2){
        if (board[index][index2] != undefined) {
          if (selectedSquare != undefined) {
            if (selectedSquare.id == board[index][index2].id) {
              board[index][index2] = undefined;
              holdingSquare = undefined;
              selectedSquare = undefined;
            }
        }
        }
      });
    });
  }
  if (event.code == "ShiftRight") {
    preventionKey = false;
  }
  if (event.key === '1') { // FIX. Does not ever go true.
    doDebug ? console.debug({status: "key '1' pressed", event, key, keyCode}) : undefined;
    // add a connector to the top of the selected square. If there is no selected square, do nothing. If there is already 4 connectors, remove all connectors.
    if (selectedSquare != undefined) {
      doDebug ? console.debug({status: "Adding connector to top of square", selectedSquare}) : undefined;
      selectedSquare.addConnector("top");
    }
  }
  if (event.key === '2') {
    // add a connector to the right of the selected square. If there is no selected square, do nothing. If there is already 4 connectors, remove all connectors.
    doDebug ? console.log({status: "Adding connector to right of square", selectedSquare}) : undefined;
    if (selectedSquare != undefined) {
      doDebug ? console.debug({status: "Adding connector to right of square", selectedSquare}) : undefined;
      selectedSquare.addConnector("right");
    }
  }
  if (event.key === '3') {
    // add a connector to the bottom of the selected square. If there is no selected square, do nothing. If there is already 4 connectors, remove all connectors.
    if (selectedSquare != undefined) {
      doDebug ? console.debug({status: "Adding connector to bottom of square", selectedSquare}) : undefined;
      selectedSquare.addConnector("bottom");
    }
  }
  if (event.key === "4") {
    // add a connector to the left of the selected square. If there is no selected square, do nothing. If there is already 4 connectors, remove all connectors.
    if (selectedSquare != undefined) {
      doDebug ? console.debug({status: "Adding connector to left of square", selectedSquare}) : undefined;
      selectedSquare.addConnector("left");
    }
  }
  if (isEditing) {
    if (keyCode == LEFT_ARROW) {
      if (selectedSquare != undefined) {
        if (selectedSquare != undefined) {
          for (let i = 0; i < 3; i++)
            selectedSquare.rotateSquare(true);
        }
      }
    } else if (keyCode == RIGHT_ARROW) {
      selectedSquare.rotateSquare(true);
    }
  }
}

function keyTyped() {
  
  if (key === 'E') {
    // toggle edit mode.
    isEditing = !isEditing;
    if (!isEditing) {
      addingSquares = false;
      selectedSquare.color = color(255, 0, 0);
      selectedSquare = undefined;
    }
    doDebug ? console.debug({status: "isEditing", isEditing,}) : undefined;
  }
  if (key === 'd' || key === 'D') {
    // toggle debug mode.
    doDebug = !doDebug;
    doDebug ? console.debug({status: "doDebug", doDebug,}) : undefined;
  }
  if (key === 'a' || key === 'A') {
    // add squares to where the user clicks on the board when in edit mode.
    if (isEditing) {
      addingSquares = !addingSquares;
    }
  }
  if (key === 'C' && preventionKey == true) {
    // clear the board when in edit mode.
    clearBoard();
  }
  
  if (key === 'l' || key === 'L') {
    // load the board from the input box.
    //let inFile = createFileInput();

    loadFile();
  }
  if (key === 's' || key === 'S') {
    saveBoard();
  }

  if (key === 'r' || key === 'R') {
    shuffleBoard();
  }
}

/**
 * @todo Develop a way to load a board from a file. and also parse the file. */
function loadFile(file) {
  doDebug ? console.debug({status: "Loading file", file}) : undefined;
  if (fileInput != undefined) {
    fileInput.remove();
  }
}