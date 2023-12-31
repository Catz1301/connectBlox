// todo: read file from host. ex: [public_html]/boards/Level 1.blox

/**
 * @Class Square
 * @description A square that can be rotated and moved around the board.
 * @param {number} x The x position of the square
 * @param {number} y The y position of the square
 * @param {number} id The id of the square
 */

class Square {
  constructor(x, y, id = 1, lockRotation = false) {
    this.x = x;
    this.y = y;
    this.gridX = floor(x / gridCellSize);
    this.gridY = floor(y / gridCellSize);
    this.gridY;
    this.id = id;
    this.lockRotation = lockRotation; //lk; <-- cat stepped on the keyboard. I'm leaving it in because it's funny.
    this.color = color(255, 0, 0);
    // set the value on each side of the square with a random number between 0 and 4, including 0 and 4.
    this.connectors = [floor(random(0, 5)), floor(random(0, 5)), floor(random(0, 5)), floor(random(0, 5))];
    this.solvedSides = [false, false, false, false];
    this.holding = false;
    this.lastSuccessfulPosX = x;
    this.lastSuccessfulPosY = y;
    this.side = Square.side;
  }

  static side = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
  }

  /**
   * @public
   * @function
   * @name draw
   * @description draws the square on the screen
   */
  drawSquare() {
    fill(this.color);
    // draw the square with 5 pixel padding
    var padding = 5;
    var spacing = 5;
    stroke(255);
    strokeWeight(1);
    // rectMode(CENTER);
    rect(this.x + padding, this.y + padding, gridCellSize - padding*2, gridCellSize - padding*2);
    
    // draw a line sticking out of the square for each connector, with 5 pixel spacing between each line., 
    // the line should be 5 pixels long, and the color should be blue.
    // the lines should be vertical for connector[0] and connector[2], and horizontal for connector[1] and connector[3].
    // the lines should be drawn from the center of the square.
    var strokeW = 2
    strokeWeight(strokeW);

    // ----- TOP SIDE -----
    if (this.connectors[0] == 1) {
      line(this.x + (gridCellSize / 2), this.y + padding, this.x + (gridCellSize / 2), this.y);
    } else if (this.connectors[0] == 2) {
      // line(x + (middle of cell) - (line spacing - strokeWeight), y, x + (middle of cell) - (line spacing - strokeWeight), y);
      line(this.x + (gridCellSize / 2) - (spacing/2), this.y + padding, this.x + (gridCellSize / 2) - (spacing/2), this.y); // second connector
      // line(x + (middle of cell) + (line spacing + strokeWeight), y + padding, x + (middle of cell) + (line spacing + strokeWeight), y); NOTE: No need to worry about the stroke weight because this is the last connector.
      line(this.x + (gridCellSize / 2) + (spacing/2), this.y + padding, this.x + (gridCellSize / 2) + (spacing/2), this.y); // third connector
    } else if (this.connectors[0] == 3) {
      // line(x + (middle of cell) - (line spacing - strokeWeight), y + padding, x + (middle of cell) - (line spacing - strokeWeight), y);
      line(this.x + (gridCellSize / 2) - (spacing), this.y + padding, this.x + (gridCellSize / 2) - (spacing), this.y); // first connector
      // line(x + (middle of cell) + strokeWeight, y + padding, x + (middle of cell) + strokeWeight, y); NOTE: Add stroke weight because we need even spacing between the first and third connectors.
      line(this.x + (gridCellSize / 2), this.y + padding, this.x + (gridCellSize / 2), this.y); // second connector
      // line(x + (middle of cell) + (line spacing + strokeWeight), y + padding, x + (middle of cell) + (line spacing + strokeWeight), y); NOTE: No need to worry about the stroke weight because this is the last connector.
      line(this.x + (gridCellSize / 2) + (spacing), this.y + padding, this.x + (gridCellSize / 2) + (spacing), this.y); // third connector
    } else if ( this.connectors[0] == 4) {
      // draw 4 vertical lines at the top of the square, centered at the middle of the top.
      // line(x + (middle of cell) - (line spacing - strokeWeight), y + padding, x + (middle of cell) - (line spacing - strokeWeight), y);
      line(this.x + (gridCellSize / 2) - (spacing * 1.5), this.y + padding, this.x + (gridCellSize / 2) - (spacing * 1.5), this.y); // first connector
      // line(x + (middle of cell) + strokeWeight, y + padding, x + (middle of cell) + strokeWeight, y); NOTE: Add stroke weight because we need even spacing between the first and third connectors.
      line(this.x + (gridCellSize / 2) - (spacing/2), this.y + padding, this.x + (gridCellSize / 2) - (spacing/2), this.y); // second connector
      // line(x + (middle of cell) + (line spacing + strokeWeight), y + padding, x + (middle of cell) + (line spacing + strokeWeight), y); NOTE: No need to worry about the stroke weight because this is the last connector.
      line(this.x + (gridCellSize / 2) + (spacing/2), this.y + padding, this.x + (gridCellSize / 2) + (spacing/2), this.y); // third connector
      // line(x + (middle of cell) + (line spacing * 2), y + padding, x + (middle of cell) + (line spacing * 2), y); NOTE: No need to worry about the stroke weight because this is the last connector.
      line(this.x + (gridCellSize / 2) + (spacing * 1.5), this.y + padding, this.x + (gridCellSize / 2) + (spacing * 1.5), this.y); // fourth connector
    }
    // ----- RIGHT SIDE -----
    if (this.connectors[1] == 1) {
      // line(x + cellSize - padding, y + (middle of cell), x + cellSize, y + (middle of cell))
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2), this.x + gridCellSize, this.y + (gridCellSize / 2)); // first connector
    } else if (this.connectors[1] == 2) {
      // line(x + cellSize - padding, y + (middle of cell) - (half spacing), x + cellSize, y + (middle of cell) - (half spacing));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) - (spacing/2), this.x + gridCellSize, this.y + (gridCellSize / 2) - (spacing/2)); // first connector
      // line(x + cellSize - padding, y + (middle of cell) + (half spacing), x + cellSize, y + (middle of cell) + (half spacing)
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) + (spacing/2), this.x + gridCellSize, this.y + (gridCellSize / 2) + (spacing/2)); // second connector
    } else if (this.connectors[1] == 3) {
      // line(x + cellSize - padding, y + (middle of cell) - (spacing), x + cellSize, y + (middle of cell) - (spacing));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) - (spacing), this.x + gridCellSize, this.y + (gridCellSize / 2) - (spacing)); // first connector
      // line(x + cellSize - padding, y + (middle of cell), x + cellSize, y + (middle of cell));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2), this.x + gridCellSize, this.y + (gridCellSize / 2)); // second connector
      // line(x + cellSize - padding, y + (middle of cell) + (spacing), x + cellSize, y + (middle of cell) + (spacing));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) + (spacing), this.x + gridCellSize, this.y + (gridCellSize / 2) + (spacing)); // third connector
    } else if (this.connectors[1] == 4) {
      // line(x + cellSize - padding, y + (middle of cell) - (spacing * 1.5), x + cellSize, y + (middle of cell) - (spacing * 1.5));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) - (spacing * 1.5), this.x + gridCellSize, this.y + (gridCellSize / 2) - (spacing * 1.5)); // first connector
      // line(x + cellSize - padding, y + (middle of cell) - (spacing / 2), x + cellSize, y + (middle of cell) - (spacing / 2));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) - (spacing / 2), this.x + gridCellSize, this.y + (gridCellSize / 2) - (spacing / 2)); // second connector
      // line(x + cellSize - padding, y + (middle of cell) + (spacing / 2), x + cellSize, y + (middle of cell) + (spacing / 2));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) + (spacing / 2), this.x + gridCellSize, this.y + (gridCellSize / 2) + (spacing / 2)); // third connector
      // line(x + cellSize - padding, y + (middle of cell) + (spacing * 1.5), x + cellSize, y + (middle of cell) + (spacing * 1.5));
      line(this.x + gridCellSize - padding, this.y + (gridCellSize / 2) + (spacing * 1.5), this.x + gridCellSize, this.y + (gridCellSize / 2) + (spacing * 1.5)); // fourth connector
    }

    // ----- BOTTOM SIDE -----
    if (this.connectors[2] == 1) {
      // line(x + (middle of cell), y + cellSize - padding, x + (middle of cell), y + cellSize);
      line(this.x + (gridCellSize / 2), this.y + gridCellSize - padding, this.x + (gridCellSize / 2), this.y + gridCellSize); // first connector
    } else if (this.connectors[2] == 2) {
      // line(x + (middle of cell) - (half spacing), y + cellSize - padding, x + (middle of cell) - (half spacing), y + cellSize);
      line(this.x + (gridCellSize / 2) - (spacing/2), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) - (spacing/2), this.y + gridCellSize); // first connector
      // line(x + (middle of cell) + (half spacing), y + cellSize - padding, x + (middle of cell) + (half spacing), y + cellSize);
      line(this.x + (gridCellSize / 2) + (spacing/2), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) + (spacing/2), this.y + gridCellSize); // second connector
    } else if (this.connectors[2] == 3) {
      // line(x + (middle of cell) - (spacing), y + cellSize - padding, x + (middle of cell) - (spacing), y + cellSize);
      line(this.x + (gridCellSize / 2) - (spacing), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) - (spacing), this.y + gridCellSize); // first connector
      // line(x + (middle of cell), y + cellSize - padding, x + (middle of cell), y + cellSize);
      line(this.x + (gridCellSize / 2), this.y + gridCellSize - padding, this.x + (gridCellSize / 2), this.y + gridCellSize); // second connector
      // line(x + (middle of cell) + (spacing), y + cellSize - padding, x + (middle of cell) + (spacing), y + cellSize);
      line(this.x + (gridCellSize / 2) + (spacing), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) + (spacing), this.y + gridCellSize); // third connector
    } else if (this.connectors[2] == 4) {
      // line(x + (middle of cell) - (spacing * 1.5), y + cellSize - padding, x + (middle of cell) - (spacing * 1.5), y + cellSize);
      line(this.x + (gridCellSize / 2) - (spacing * 1.5), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) - (spacing * 1.5), this.y + gridCellSize); // first connector
      // line(x + (middle of cell) - (spacing / 2), y + cellSize - padding, x + (middle of cell) - (spacing / 2), y + cellSize);
      line(this.x + (gridCellSize / 2) - (spacing/2), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) - (spacing/2), this.y + gridCellSize); // second connector
      // line(x + (middle of cell) + (spacing / 2), y + cellSize - padding, x + (middle of cell) + (spacing / 2), y + cellSize);
      line(this.x + (gridCellSize / 2) + (spacing/2), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) + (spacing/2), this.y + gridCellSize); // third connector
      // line(x + (middle of cell) + (spacing * 1.5), y + cellSize - padding, x + (middle of cell) + (spacing * 1.5), y + cellSize);
      line(this.x + (gridCellSize / 2) + (spacing * 1.5), this.y + gridCellSize - padding, this.x + (gridCellSize / 2) + (spacing * 1.5), this.y + gridCellSize); // fourth connector
    }
    
    // ----- LEFT SIDE -----
    if (this.connectors[3] == 1) {
      // line(x + padding, y + (middle of cell), x, y + (middle of cell)
      line(this.x + padding, this.y + (gridCellSize / 2), this.x, this.y + (gridCellSize / 2)); // first connector
    } else if (this.connectors[3] == 2) {
      // line(x + padding, y + (middle of cell) - (half spacing), x, y + (middle of cell) - (half spacing)
      line(this.x + padding, this.y + (gridCellSize / 2) - (spacing/2), this.x, this.y + (gridCellSize / 2) - (spacing/2)); // first connector
      // line(x + padding, y + (middle of cell) + (half spacing), x, y + (middle of cell) + (half spacing)
      line(this.x + padding, this.y + (gridCellSize / 2) + (spacing/2), this.x, this.y + (gridCellSize / 2) + (spacing/2)); // second connector
    } else if (this.connectors[3] == 3) {
      // line(x + padding, y + (middle of cell) - (spacing), x, y + (middle of cell) - (spacing)
      line(this.x + padding, this.y + (gridCellSize / 2) - (spacing), this.x, this.y + (gridCellSize / 2) - (spacing)); // first connector
      // line(x + padding, y + (middle of cell), x, y + (middle of cell)
      line(this.x + padding, this.y + (gridCellSize / 2), this.x, this.y + (gridCellSize / 2)); // second connector
      // line(x + padding, y + (middle of cell) + (spacing), x, y + (middle of cell) + (spacing)
      line(this.x + padding, this.y + (gridCellSize / 2) + (spacing), this.x, this.y + (gridCellSize / 2) + (spacing)); // third connector
    } else if (this.connectors[3] == 4) {
      // line(x + padding, y + (middle of cell) - (spacing * 1.5), x, y + (middle of cell) - (spacing * 1.5)
      line(this.x + padding, this.y + (gridCellSize / 2) - (spacing * 1.5), this.x, this.y + (gridCellSize / 2) - (spacing * 1.5)); // first connector
      // line(x + padding, y + (middle of cell) - (spacing / 2), x, y + (middle of cell) - (spacing / 2)
      line(this.x + padding, this.y + (gridCellSize / 2) - (spacing/2), this.x, this.y + (gridCellSize / 2) - (spacing/2)); // second connector
      // line(x + padding, y + (middle of cell) + (spacing / 2), x, y + (middle of cell) + (spacing / 2)
      line(this.x + padding, this.y + (gridCellSize / 2) + (spacing/2), this.x, this.y + (gridCellSize / 2) + (spacing/2)); // third connector
      // line(x + padding, y + (middle of cell) + (spacing * 1.5), x, y + (middle of cell) + (spacing * 1.5)
      line(this.x + padding, this.y + (gridCellSize / 2) + (spacing * 1.5), this.x, this.y + (gridCellSize / 2) + (spacing * 1.5)); // fourth connector
    }
    if (doDebug) {
      stroke(0, 100, 255);
      // strokeWeight(1);
      // draw a line at the side of solved sides, respecting padding
      padding = 4
      if (this.solvedSides[0] == true) {
        line(this.x + padding, this.y + padding, this.x + gridCellSize - padding, this.y + padding);
      }
      if (this.solvedSides[1] == true) {
        line(this.x + gridCellSize - padding, this.y + padding, this.x + gridCellSize - padding, this.y + gridCellSize - padding);
      }
      if (this.solvedSides[2] == true) {
        line(this.x + padding, this.y + gridCellSize - padding, this.x + gridCellSize - padding, this.y + gridCellSize - padding);
      }
      if (this.solvedSides[3] == true) {
        line(this.x + padding, this.y + padding, this.x + padding, this.y + gridCellSize - padding);
      }
      /* if (this.solvedSides[0] == true) {
        line(this.x, this.y, this.x + gridCellSize, this.y);
      }
      if (this.solvedSides[1] == true) {
        line(this.x + gridCellSize, this.y, this.x + gridCellSize, this.y + gridCellSize);
      }
      if (this.solvedSides[2] == true) {
        line(this.x, this.y + gridCellSize, this.x + gridCellSize, this.y + gridCellSize);
      }
      if (this.solvedSides[3] == true) {
        line(this.x, this.y, this.x, this.y + gridCellSize);
      } */

    }
  }

  /**
   * @public
   * @function
   * @name rotateSquare
   * @description rotates the square 90 degrees clockwise
   */
  rotateSquare(editing = false) {
    if (this.lockRotation == false || editing == true) {
      // shift all connectors to the right, and move the last connector to the first position.
      let lastConnector = this.connectors[this.connectors.length - 1];
      for (var i = this.connectors.length - 1; i > 0; i--) {
        this.connectors[i] = this.connectors[i - 1];
      }
      this.connectors[0] = lastConnector;
      let lastSide = this.side[this.side.length - 1];
      for (var i = this.side.length - 1; i > 0; i--) {
        this.side[i] = this.side[i - 1];
      }
      this.side[0] = lastSide;
      let lastSolvedSide = this.solvedSides[this.solvedSides.length - 1];
      for (var i = this.solvedSides.length - 1; i > 0; i--) {
        this.solvedSides[i] = this.solvedSides[i - 1];
      }
      this.solvedSides[0] = lastSolvedSide;
    }
    
  }
  
  /**
   * @public
   * @function
   * @name move
   * @param {number} posX the x position of the mouse
   * @param {number} posY the y position of the mouse
   */
  move(posX, posY) {
    this.x = posX - gridCellSize / 2;
    this.y = posY - gridCellSize / 2;
    // this.gridX = floor(this.x / gridCellSize);
    // this.gridY = floor(this.y / gridCellSize);
  }

  /**
   * @public
   * @function
   * @name click
   * @description rotates the square 90 degrees clockwise
   */
  click() {
    let x1 = this.x, x2 = this.x + gridCellSize;
    let y1 = this.y, y2 = this.y + gridCellSize;
    if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
      doDebug ? console.log({status: "square clicked", codeLocation: "Square.click()",  mouseX, mouseY, "Square ID": this.id}) : undefined;
      //alert("clicked on square " + this.value);
      // doDebug ? console.debug(this) : undefined;
      if (this.holding == false) {
        this.rotateSquare();
      }
    } 
  }

  /**
   * @public
   * @function
   * @name check
   * @param {number} x the x position of the mouse
   * @param {number} y the y position of the mouse
   * @returns {boolean} true if the mouse is over the square
   */
  check(x, y) {
    let x1 = this.x, x2 = this.x + gridCellSize;
    let y1 = this.y, y2 = this.y + gridCellSize;
    if (x > x1 && x < x2 && y > y1 && y < y2) {
      doDebug ? console.log("%cThe square occupies the space at ", "color: salmon", x, y) : undefined;
      return true;
    } else {
      return false; // fix
    }
  }

  /**
   * @public
   * @function
   * @name hold
   * @returns {Square|undefined} the square that is being held, or undefined if the mouse is not over this square.
   */
  hold() {
    let x1 = this.x, x2 = this.x + gridCellSize;
    let y1 = this.y, y2 = this.y + gridCellSize;
    if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
      this.holding = true;
      return this;
    } else {
      return undefined;
    }
  }

  /**
   * @public
   * @function
   * @name release
   * @param {number} x the x position of the mouse
   * @param {number} y the y position of the mouse
   * @returns {{oldGridX: int, oldGridY: int, gridX: int, gridY: int, newSquare: undefined}} an object containing the gridX and gridY of the square, or undefined if the square is not being held.
   */
  release(x, y) { // Take a bullet to the head before fucking with this. it works. leave it.
    // snap position to grid
    let oldGridX = this.gridX;
    let oldGridY = this.gridY;
    let squareAtReleasePos = checkBoardForSquare(mouseX, mouseY);
    let emptySquare = false;
    if (squareAtReleasePos == undefined) {
      emptySquare = true;
    }
    
    if (emptySquare == true) {
      this.x = floor((this.x + (gridCellSize / 2)) / gridCellSize) * gridCellSize;
      this.y = floor((this.y + (gridCellSize / 2)) / gridCellSize) * gridCellSize;
      this.gridX = floor(this.x / gridCellSize);
      this.gridY = floor(this.y / gridCellSize);

      board[this.gridX][this.gridY] = this;
      board[oldGridX][oldGridY] = undefined;
      doDebug ? console.log({status: "square released", Position: {x: this.x, y: this.y}, gridCellSize: gridCellSize}) : undefined;
      this.holding = false;
      this.lastSuccessfulPosX = this.x;
      this.lastSuccessfulPosY = this.y;
      return {oldGridX, oldGridY, gridX: this.gridX, gridY: this.gridY, newSquare: undefined};
    } else {
      this.x = this.lastSuccessfulPosX;
      this.y = this.lastSuccessfulPosY;
      return {oldGridX, oldGridY, gridX: this.gridX, gridY: this.gridY, newSquare: undefined};
    }
  }

  /** 
   * @public
   * @function
   * @name select
   * @description returns true if the mouse is over it
   * @returns {boolean} true if the mouse is over it
   */
  select() {
    let x1 = this.x, x2 = this.x + gridCellSize;
    let y1 = this.y, y2 = this.y + gridCellSize;
    if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
      doDebug ? console.log({status: "Selecting square", mouseX, mouseY}) : undefined;
      this.color = color(0, 255, 0);
      return true;
    } else {
      this.color = color(255, 0, 0);
      return false;
    }
  }

  /**
   * @public
   * @function
   * @name addConnector
   * @description Adds a connector to the square.
   * @param {string} side The side to add a connector to. Valid options are "top", "right", "bottom", and "left".
   */
  addConnector(side) {
    doDebug ? console.debug({status: "adding connector to " + side}) : undefined;
    if (side == "top") {
      this.addTopConnector();
    } else if (side == "right") {
      this.addRightConnector();
    } else if (side == "bottom") {
      this.addBottomConnector();
    } else if (side == "left") {
      this.addLeftConnector();
    }
  }
  /** @private */
  addTopConnector() {
    if (this.connectors[0] < 4)
      this.connectors[0]++;
    else
      this.connectors[0] = 0;
  }
  /** @private */
  addRightConnector() {
    if (this.connectors[1] < 4)
      this.connectors[1]++;
    else
      this.connectors[1] = 0;
  }
  /** @private */
  addBottomConnector() {
    if (this.connectors[2] < 4)
      this.connectors[2]++;
    else
      this.connectors[2] = 0;
  }
  /** @private */
  addLeftConnector() {
    if (this.connectors[3] < 4)
      this.connectors[3]++;
    else
      this.connectors[3] = 0;
  }

  static parseObj = function(obj) {
    let objKeys = Object.keys(obj);
    doDebug ? console.log(objKeys) : undefined;
    if (objKeys.includes("x") && objKeys.includes("y") && objKeys.includes("id") && objKeys.includes("connectors")) {
      let square = new Square(obj.x, obj.y, obj.id);
      square.connectors = obj.connectors;
      square.color = color(obj.color.levels[0], obj.color.levels[1], obj.color.levels[2]);
      return square;
    } else {
      console.error("The object passed to parseObj() is not a square.");
      return undefined;
    }
  }
}