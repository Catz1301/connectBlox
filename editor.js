var addingSquares = false;
var saveBoardBtnHover = false;
var shareBoardBtnHover = false;
var clearBoardBtnHover = false;
var rotationLockBtnHover = false;
var toggleSquareBtnHover = false;
var holdSquareForButton = undefined;
/**
 * @var
 * @name selectedSquare
 * @type {Square}
 */
var selectedSquare = undefined;
var fileInput = undefined;

function setupEditor() {
  // set up buttons and flags.

  // That button column on the right side of the screen.
  saveBoardButton = new Clickable(width - 155, 5);
  saveBoardButton.resize(150, 50);
  // (width - 155, 5, width - 5, 55)
  saveBoardButton.text = "Save Board";
  saveBoardButton.cornerRadius = 0;
  saveBoardButton.textSize = 24;
  saveBoardButton.textScaled = false;
  saveBoardButton.textColor = color(250);
  // saveBoardButton.color = color(65, 184, 131);
  saveBoardButton.onPress = function() {
    saveBoard();
    holdSquareForButton = selectedSquare;
  }
  saveBoardButton.onOutside = function() {
    this.color = color(65, 184, 131);
    saveBoardBtnHover = false;
  }
  saveBoardButton.onHover = function() {
    this.color = color(35, 154, 101);
    saveBoardBtnHover = true;
  }
  shareBoardButton = new Clickable(width - 155, 60);
  shareBoardButton.resize(150, 50);
  // (width - 155, 60, width-5, 110)
  shareBoardButton.text = "Share Board";
  shareBoardButton.cornerRadius = 0;
  shareBoardButton.textSize = 24;
  shareBoardButton.textScaled = false;
  shareBoardButton.textColor = color(250);
  // shareBoardButton.color = color(65, 184, 131);
  shareBoardButton.onPress = function() {
    // shareBoard();
    holdSquareForButton = selectedSquare;
  }
  shareBoardButton.onOutside = function() {
    this.color = color(65, 184, 131);
    shareBoardBtnHover = false;
  }
  shareBoardButton.onHover = function() {
    this.color = color(35, 154, 101);
    shareBoardBtnHover = true;
  }
  clearBoardButton = new Clickable(width - 155, 115);
  clearBoardButton.resize(150, 50);
  // (width - 155, 115, width-5, 165)
  clearBoardButton.text = "Clear Board";
  clearBoardButton.cornerRadius = 0;
  clearBoardButton.textSize = 24;
  clearBoardButton.textScaled = false;
  clearBoardButton.textColor = color(250);
  // clearBoardButton.color = color(65, 184, 131);
  clearBoardButton.onPress = function() {

    let clearBoardModal = new Modal("Clear Board", "Are you sure you want to clear the board?");
    clearBoardModal.show().then(result => {
      if (result == Modal.ModalResult.POSITIVE) {
        clearBoard();
      }
    });
    holdSquareForButton = selectedSquare;
  }
  clearBoardButton.onOutside = function() {
    this.color = color(65, 184, 131);
    clearBoardBtnHover = false;
  }
  clearBoardButton.onHover = function() {
    this.color = color(35, 154, 101);
    clearBoardBtnHover = true;
  }
  rotationLockButton = new Clickable(width - 155, 170);
  rotationLockButton.resize(150, 50);
  // (width - 155, 170, width-5, 220)
  rotationLockButton.text = "Lock Rotation";
  rotationLockButton.cornerRadius = 0;
  rotationLockButton.textSize = 20;
  rotationLockButton.textScaled = true;
  rotationLockButton.textColor = color(250);
  // rotationLockButton.color = color(65, 184, 131);
  rotationLockButton.onPress = function() { // If this doesn't work, blame copilot. I didn't write a lick of this.
    if (selectedSquare != undefined) {
      selectedSquare.lockRotation = !selectedSquare.lockRotation;
      if (selectedSquare.lockRotation) {
        this.text = "Unlock Rotation";
      } else {
        this.text = "Lock Rotation";
      }
    }
  }
  rotationLockButton.onOutside = function() {
    this.color = color(65, 184, 131);
    rotationLockBtnHover = false;
  }
  rotationLockButton.onHover = function() {
    this.color = color(35, 154, 101);
    rotationLockBtnHover = true;
    holdSquareForButton = selectedSquare;
  }
  toggleSquareButton = new Clickable(width - 155, 225);
  toggleSquareButton.resize(150, 50);
  // (width - 155, 225, width-5, 275)
  toggleSquareButton.text = "Toggle Square";
  toggleSquareButton.cornerRadius = 0;
  toggleSquareButton.textSize = 20;
  toggleSquareButton.textScaled = true;
  toggleSquareButton.textColor = color(250);
  // toggleSquareButton.color = color(65, 184, 131);
  toggleSquareButton.onPress = function() {
    if (selectedSquare != undefined) {
      console.log(selectedSquare)
      holdSquareForButton = selectedSquare;
      //selectedSquare.toggleSquare();
    }
  }
  toggleSquareButton.onOutside = function() {
    this.color = color(65, 184, 131);
    toggleSquareBtnHover = false;
  }
  toggleSquareButton.onHover = function() {
    this.color = color(35, 154, 101);
    toggleSquareBtnHover = true;
  }
}

function drawEditorUI() {
  // draw the buttons and stuff.
  saveBoardButton.draw();
  shareBoardButton.draw();
  clearBoardButton.draw();
  if (selectedSquare != undefined) {
    rotationLockButton.draw();
    toggleSquareButton.draw();
  }
}

function saveBoard() {
  // get the board as json, then turn it into a blob.
  let fileHeaderData = '420690';
  var headerByteArray = new Uint8Array(fileHeaderData.length/2);
  for (var x = 0; x < headerByteArray.length; x++){
      headerByteArray[x] = parseInt(fileHeaderData.substr(x*2,2), 16);
  }
  

  let blob = new Blob([headerByteArray], {type: "application/octet-stream"});
  
  let boardJson = JSON.stringify(board);
  let boardBlob = new Blob([boardJson], {type: "application/blox"});
  // create a file with the first 3 bytes as '0x420069'
  let boardFile = new File([blob, boardBlob], "board.blox", {type: "application/blox"}); 
  // save the board file, by creating a link and clicking it.
  let boardLink = document.createElement("a");
  let objURL = URL.createObjectURL(boardFile);
  boardLink.href = objURL;
  boardLink.download = "board.blox";
  boardLink.click();
  URL.revokeObjectURL(objURL);
}

function loadFile() {
  fileInput = createFileInput(readFile);
  fileInput.position(0, 0);
}

/**
 * @public
 * @function
 * @name readFile
 * @description Read a file and convert it to board data.
 * @param {File} file the inputed file
 * @returns {boolean} whether or not the file is valid, and whether or not the file converted to board data successfully.
 */
function readFile(inputFile) {
  isFullScreen = false;
  doDebug ? console.debug({status: "Reading file", inputFile}) : undefined;
  // let stream = file.stream();
  if (inputFile.file.size <= 3) {
    console.error("File is too small to be a valid blox file.");
    return false;
  }
  let headerBlob = inputFile.file.slice(0,3);
  let headerStream = headerBlob.stream();
  let headerReader = headerStream.getReader();
  var headerDataRead = [];
  var finishedHeader = false;
  var validHeader = false;
  headerReader.read().then(function processData({done, value}) {
    if (done) {
      let headerData = byteDataToHexStr(headerDataRead[0]);
      doDebug ? console.debug({status: "Header read", headerDataRead, "header data": headerData}) : undefined;
      if (headerData == "420690") {
        console.log("File is a valid blox file.");
        fileInput.remove();
        fileInput = undefined;
        // fullscreen();
        validHeader = true;
      } else {
        console.error("File is not a valid blox file.");
        validHeader = false;
      }
      finishedHeader = true;
      return;
  }

    headerDataRead.push(value);
    return headerReader.read().then(processData);
  }).then(success => {
    if (validHeader) {
      let dataBlob = inputFile.file.slice(3);
      let dataStream = dataBlob.stream();
      let dataReader = dataStream.getReader();
      var dataRead = [];
      var finishedData = false;
      let boardObject = undefined;
      dataReader.read().then(function processData({done, value}) {
        if (done) {
          let dataString = ""
          for (let x = 0; x < dataRead[0].length; x++) {
            dataString += String.fromCharCode(dataRead[0][x]);
          }
          boardObject = JSON.parse(dataString);
          doDebug ? console.debug({status: "Data read", dataRead, dataString, boardObject}) : undefined;
          finishedData = true;
          return;
        }
        dataRead.push(value);
        return dataReader.read().then(processData);
      }).then(success => {
        if (finishedData) {
          // let data = byteDataToHexStr(dataRead[0]);
          // console.log(data);
          // doDebug ? console.debug({status: "Data read", dataRead, data}) : undefined;
          finishedData = true;
          if (boardObject != undefined) {
            setBoard(boardObject);
          }
          return;
        }
      });
    }
  });
}


function byteDataToHexStr(bytes) {
  doDebug ? console.debug({status: "Converting bytes to hex string", bytes}) : undefined;
  let hexStr = ""
  bytes.forEach(byte => {
    let byteStr = byte.toString(16);
    if (byteStr.length == 1) {
      byteStr = "0" + byteStr;
    }
    hexStr += byteStr;
  });

  doDebug ? console.debug({status: "Converted bytes to hex string", bytes, hexStr}) : undefined;
  return hexStr;
}