// The legendary modal component. Here we go.
//make a modal class
class Modal {
  static ModalResult = {
    POSITIVE: 0,
    NEGATIVE: 1
  };
  constructor(modalTitle, modalText, showNegative = true) {
    this.modalText = modalText;
    // should be centered, and in the middle of the screen.
    this.modalTitle = modalTitle;
    this.x = width / 2;
    this.y = height / 2;
    this.showNegative = showNegative;
    this.positiveButtonHover = false;
    this.negativeButtonHover = false;

  }

  show() {
    activeModal = this;
    return new Promise((resolve, reject) => {
      this.positiveButtonPressed = () => {
        resolve(Modal.ModalResult.POSITIVE);
        activeModal = undefined;
      };
      this.negativeButtonPressed = () => {
        resolve(Modal.ModalResult.NEGATIVE);
        activeModal = undefined;
      };
    });
  }

  draw() {
    dim();
    fill(250);
    noStroke();
    rect(this.x - 200, this.y - 100, 400, 200); // The modal box
    fill(220)
    rect(this.x - 200, this.y - 100, 400, 40); // The modal title bar
    textSize(20);
    textAlign(CENTER, CENTER);
    //make the title bold.
    textStyle(BOLD);
    fill(0);
    text(this.modalTitle, this.x, this.y - 100 + 20);
    //make the text normal.
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    textWrap(CHAR);
    // split the text into lines if the text width is greater than 360.
    if (textWidth(this.modalText) > 360) {
      let lines = [];
      let words = this.modalText.split(" ");
      let currentLine = "";
      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (textWidth(currentLine + word) > 360) {
          lines.push(currentLine);
          currentLine = "";
        }
        currentLine += word + " ";
      }
      lines.push(currentLine);
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        text(line, this.x - 180, this.y - 45 + (i * 20), this.x);
      }
    } else {
      text(this.modalText, this.x - 180, this.y - 45, this.x);
    }
    // activeModal = this;
    // draw the positive and negative buttons, with 10 pixels of margin, and 5 px of padding.
    // negative button
    if (this.showNegative) {
      if (this.negativeButtonHover) {
        fill(35, 154, 101);
      } else {
        fill(65, 184, 131);
      }
      rect(this.x - 25, this.y + 100 - 50 - 10, 100, 50);
      fill(0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("NO", this.x - 25 + 50, this.y + 100 - 50 - 9 + 25);
    }
    // positive button
    if (this.positiveButtonHover) {
      fill(35, 154, 101);
    } else {
      fill(65, 184, 131);
    }
    rect(this.x + 200 - 10 - 100, this.y + 100 - 50 - 10, 100, 50);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("YES", this.x + 200 - 10 - 100 + 50, this.y + 100 - 50 - 9 + 25);
    this.handleEvents();
  }


  handleEvents() {
    if (mouseX > this.x - 25 && mouseX < this.x + 75 && mouseY > this.y + 100 - 50 - 5 && mouseY < this.y + 100 - 5) {
      // negative button was pressed.
      this.negativeButtonHover = true;
      if (mouseIsPressed) {
        this.negativeButtonPressed();
      }

    } else {
      this.negativeButtonHover = false;
    }
    if (mouseX > this.x + 200 - 10 - 100 && mouseX < this.x + 200 - 10 && mouseY > this.y + 100 - 50 - 5 && mouseY < this.y + 100 - 5) {
      // positive button was pressed.
      this.positiveButtonHover = true;
      if (mouseIsPressed) {
        this.positiveButtonPressed();
      }
    } else {
      this.positiveButtonHover = false;
    }
  }

  negativeButtonPressed() {
    alert("negative button pressed");
  }

  positiveButtonPressed() {
    alert("positive button pressed");
  }
}