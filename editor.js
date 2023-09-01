var addingSquares = false;
/**
 * @var
 * @name selectedSquare
 * @type {Square}
 */
var selectedSquare = undefined;
var fileInput = undefined;

function saveBoard() {
  // get the board as json, then turn it into a blob.
  let boardJson = JSON.stringify(board);
  let boardBlob = new Blob([boardJson], {type: "application/blox"});
  // create a file with the first 3 bytes as '0x420069'
  let boardFile = new File([0x420069, boardBlob], "board.blox", {type: "application/blox"}); // this line causes unexpected output. 0x420069 is the magic number for blox files.
  // save the board file, by creating a link and clicking it.
  let boardLink = document.createElement("a");
  let objURL = URL.createObjectURL(boardFile);
  boardLink.href = objURL;
  boardLink.download = "board.blox";
  boardLink.click();
  URL.revokeObjectURL(objURL);
}

function loadBoard() {
  let fileInput = createFileInput(loadFile);
  fileInput.position(0, 0);
}