var boardSize = 6;
var level = 1;
var array = [];
var multiDimensional = [[1, 2]];
var square;
var correct = 0;
var time = 3;

$(() => {
  setLevel(level);
  drawBoard(boardSize);
  setScore(correct);
  setGameTime();
  setTimeLeft();
});

$("#shuffle").click(() => {
  shuffle();
});

$("#increaseLevel").click(() => {
  time = 3;
  setLevel((level += 1));
  drawBoard((boardSize += 1));
  setScore(correct);
  setGameTime();
  setTimeLeft();
  $("#increaseLevel").css("visibility", "hidden");
});

$("#restart").click(() => {
  level = 1;
  boardSize = 6;
  correct = 0;
  array = [];
  time = 3;
  setLevel(level);
  drawBoard(boardSize);
  setScore(correct);
  setGameTime();
  setTimeLeft();
});

$("#showArray").click(() => {
  console.log("array ", array);
});

function setTimeLeft() {
  const loop = setInterval(setTime, 1000);

  function setTime() {
    if (time === 0) {
      // alert("Time is out");
      clearInterval(loop);
    } else {
      time -= 1;
      $("#time").text(time);
    }
  }
}

function setGameTime() {
  $("#time").text(time);
}

function setScore(score) {
  $("#score").text("Score " + score);
}

function setLevel(level) {
  $("#level-title").text("Level " + level);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffle() {
  $("td[selected='false'").each(function () {
    var shuffleValue = random(0, 8);
    this.setAttribute("value", shuffleValue);
    var childElm = this.firstChild;
    var src = "image/" + shuffleValue + ".png";
    childElm.setAttribute("src", src);
  });
}

function checkAllCell() {
  var selectedCells = $("td[selected='true'");
  if (selectedCells.length === boardSize * boardSize) {
    $("#increaseLevel").css("visibility", "visible");
  }
}

function select(elm) {
  let row = elm.getAttribute("row");
  let col = elm.getAttribute("col");
  let val = elm.getAttribute("value");
  // square = {
  //   row: row,
  //   col: col,
  //   val: val,
  // };

  array.push(elm);

  if (array.length == 2) {
    var first = array[0];
    var second = array[1];

    if (array[0] == array[1]) {
      array = [];
    } else if (
      array[0].getAttribute("value") == array[1].getAttribute("value")
    ) {
      correct += 100;
      setScore(correct);
      first.style.visibility = "hidden";
      second.style.visibility = "hidden";
      first.setAttribute("selected", true);
      second.setAttribute("selected", true);
    }
    array = [];
    checkAllCell();
  }
  console.log("square clicked ", { row, col, val });
  console.log("square clicked array ", { array });
}

function selfChoose(a, b) {
  if (a == b) {
    return true;
  }
  return false;
}

function checkCorrectOnRow(a, b) {
  console.log({ a, b });
}

function checkSurround(a) {}

function drawBoard(size) {
  var rowNum = Number(size);
  var colNum = Number(size);

  var table = $("<table border='1'></table>");
  for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
    var currentRow = $("<tr></tr>").appendTo(table);
    for (var col = 0; col < colNum; col++) {
      var randomVal = random(0, size);
      var img =
        "<img width='50' height='50' src='image/" + randomVal + ".png'/>";
      currentRow.append(
        "<td width='50px' height='50px' row='" +
          rowIndex +
          "' col='" +
          col +
          "' value='" +
          randomVal +
          "' onclick='select(this)' selected='false'>" +
          img +
          "</td>"
      );
    }
    $("#board").html(table);
  }
}
