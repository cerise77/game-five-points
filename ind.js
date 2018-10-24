var game = document.querySelector('#game');
var field = game.querySelector('.field');

var rowsNum = 20;
var colsNum = 30;
//var nextGamer = "gamer1";
var gamers = ['gamer1', 'gamer2'];
var gamerNum = 0;

var rows = fillField(field, rowsNum, colsNum);
//console.log(rows);

var cols = getColumns(rows);
var diag1 = getFirstDiags(rows);
var diag2 = getSecondDiags(rows);
var lines = rows.concat(cols, diag1, diag2);

//console.log(lines);

function checkWin(gamer, lines){
  for (var i = 0; i < lines.length; i++) {
    for (var j = 4; j < lines[i].length; j++) {

      if (
        lines[i][j - 4].classList.contains(gamer) &&
        lines[i][j - 3].classList.contains(gamer) &&
        lines[i][j - 2].classList.contains(gamer) &&
        lines[i][j - 1].classList.contains(gamer) &&
        lines[i][j].classList.contains(gamer)
      ) {
            return true;
      }

    }
  }
  return false;
}

function isWin(gamers, lines){

  for (var i = 0; i < gamers.length; i++) {
    if (checkWin(gamers[i], lines)) {
      endGame(gamers[i]);
      break;
    }
  }
}

function endGame(gamer){
  //console.log(gamer);
  alert('Won ' + gamer + '. ' + 'Congratulations!')
  freezeField(field);
}

function freezeField(field){
  var cells = field.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", cellClickHandler);
  }
}


function fillField(field, rowsNum, colsNum){
  var rows = [];

  for (var i = 0; i < rowsNum; i++) {
    var tr = document.createElement('tr');
    rows[i] = [];

    for (var j = 0; j < colsNum; j++) {
      var td = document.createElement('td');
      tr.appendChild(td)

      td.addEventListener("click", cellClickHandler);
      rows[i][j] = td;
    }

    field.appendChild(tr);
  }

  return rows;
}

function cellClickHandler(){
  this.classList.add(gamers[gamerNum]);
  this.removeEventListener("click", cellClickHandler);

  isWin(gamers, lines);

  gamerNum++;
  if (gamerNum == gamers.length) {
    gamerNum = 0;
  }
}

function getColumns(arr){
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (result[j] === undefined) {
        result[j] = [];
      }
      result[j][i] = arr[i][j];
    }
  }

  return result;
}

function getFirstDiags(arr){
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (result[i + j] === undefined) {
        result[i + j] = [];
      }

      result[i + j].push(arr[i][j]);
    }
  }

  return result;
}

function getSecondDiags(arr){
  return getFirstDiags(reverseSubArrs(arr));
}

function reverseSubArrs(arr){
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    for (var j = arr[i].length - 1; j >= 0; j--) {
      if (result[i] === undefined) {
        result[i] = [];
      }

      result[i].push(arr[i][j]);
    }
  }

  return result;
}
