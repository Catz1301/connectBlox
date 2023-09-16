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