var boardSize = 6;
var level = 1;
var array = [];
var twoDimensionalArray = [];
var square;
var correct = 0;
var time = 300;
var isWin = false;

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

$("#showAt").click(() => {
  console.log(twoDimensionalArray[$("#rowS").val()][$("#colS").val()]);
});

$("#showTwoDimensionalArray").click(function () {
  console.log(twoDimensionalArray);
});

$("#increaseLevel").click(() => {
  var s = (level % 3) + 1;
  time = 300;
  setLevel((level += 1));
  drawBoard((boardSize += s));
  setScore(correct);
  setGameTime();
  setTimeLeft();
  $("#increaseLevel").css("visibility", "hidden");
  isWin = false;
});

$("#restart").click(() => {
  level = 1;
  boardSize = 6;
  correct = 0;
  array = [];
  time = 300;
  setLevel(level);
  drawBoard(boardSize);
  setScore(correct);
  setGameTime();
  setTimeLeft();
  $("#restart").css("visibility", "hidden");
  $(".modal").css("display", "none");
  isWin = false;
});

$("#showArray").click(() => {
  console.log("array ", array);
});

function setTimeLeft() {
  const loop = setInterval(setTime, 1000);

  function setTime() {
    if (time === 0) {
      $(".modal").css("display", "block");
      $("#restart").css("visibility", "visible");
      $("td").css("visibility", "hidden");
      clearInterval(loop);
    } else if (isWin) {
      $("#increaseLevel").css("visibility", "visible");
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
    var row = this.getAttribute("row");
    var col = this.getAttribute("col");

    var shuffleValue = random(0, 8);
    this.setAttribute("value", shuffleValue);
    twoDimensionalArray[row][col] = shuffleValue;
    var childElm = this.firstChild;
    var src = "image/" + shuffleValue + ".png";
    childElm.setAttribute("src", src);
  });
}

function checkAllCell() {
  var selectedCells = $("td[selected='true'");
  if (selectedCells.length === boardSize * boardSize) {
    $("#increaseLevel").css("visibility", "visible");
    isWin = true;
  }
}

function select(elm) {
  let row = elm.getAttribute("row");
  let col = elm.getAttribute("col");
  let val = elm.getAttribute("value");

  console.log("selecting now ", twoDimensionalArray[row][col]);

  elm.style.opacity = "0.5";

  array.push(elm);

  if (array.length == 2) {
    var first = array[0];
    var second = array[1];

    if (array[0] == array[1]) {
      array = [];
    } else if (
      array[0].getAttribute("value") == array[1].getAttribute("value")
    ) {
      twoDimensionalArray[first.getAttribute("row")][
        first.getAttribute("col")
      ] = 0;
      twoDimensionalArray[second.getAttribute("row")][
        second.getAttribute("col")
      ] = 0;

      correct += 100;
      setScore(correct);
      first.style.visibility = "hidden";
      second.style.visibility = "hidden";
      first.setAttribute("selected", true);
      second.setAttribute("selected", true);
    }
    first.style.opacity = 1;
    second.style.opacity = 1;
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
  var arr = [];

  for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
    var currentRow = $("<tr></tr>").appendTo(table);
    for (var col = 0; col < colNum; col++) {
      var randomVal = random(1, size);
      arr.push(randomVal);
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
    twoDimensionalArray[rowIndex] = arr;
    arr = [];
    $("#board").html(table);
  }
}
