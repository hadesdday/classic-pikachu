var boardSize = 6;
var level = 1;
var array = [];
var twoDimensionalArray = [];
var square;
var score = 0;
var time = 999999;
var ogTime = 300;
var isWin = false;

$(() => {
  setLevel(level);
  drawBoard(boardSize);
  setScore(score);
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
  isWin = false;
  time = ogTime + 50;
  ogTime = time;
  setLevel((level += 1));
  drawBoard((boardSize += 2));
  setScore(score);
  setGameTime();
  setTimeLeft();
  $("#increaseLevel").css("visibility", "hidden");
});

$("#restart").click(() => {
  level = 1;
  boardSize = 6;
  score = 0;
  array = [];
  time = 300;
  ogTime = time;
  setLevel(level);
  drawBoard(boardSize);
  setScore(score);
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

    var shuffleValue = random(1, boardSize);
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

  let now = twoDimensionalArray[row][col];
  console.log("selecting now ", { row, col, now });

  elm.style.opacity = "0.5";

  array.push(elm);

  if (array.length == 2) {
    var first = array[0];
    var second = array[1];

    if (array[0] == array[1]) {
      array = [];
    } else if (
      first.getAttribute("value") === second.getAttribute("value") &&
      (first.getAttribute("quiz", true) || second.getAttribute("quiz", true))
    ) {
      createQuiz(level);
      $(".random-question").css("display", "block");
      $("td").each(function () {
        this.style.pointerEvents = "none";
      });
      $("#submit-answer").click(() => {
        var isCorrectAnswer = checkCorrectAnswer();
        if (isCorrectAnswer && checkTwoPoint(first, second)) {
          twoDimensionalArray[first.getAttribute("row")][
            first.getAttribute("col")
          ] = 0;
          twoDimensionalArray[second.getAttribute("row")][
            second.getAttribute("col")
          ] = 0;

          score += 100;
          setScore(score);
          first.style.visibility = "hidden";
          second.style.visibility = "hidden";
          first.setAttribute("selected", true);
          second.setAttribute("selected", true);

          first.setAttribute("quiz", false);
          second.setAttribute("quiz", false);
          $("td").each(function () {
            this.style.pointerEvents = "auto";
          });
          $(".random-question").css("display", "none");
        } else {
          createQuiz(5);
        }
      });
    } else if (checkTwoPoint(first, second)) {
      twoDimensionalArray[first.getAttribute("row")][
        first.getAttribute("col")
      ] = 0;
      twoDimensionalArray[second.getAttribute("row")][
        second.getAttribute("col")
      ] = 0;

      score += 100;
      setScore(score);
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

function checkTwoPoint(first, second) {
  var firstRow = Number(first.getAttribute("row"));
  var firstCol = Number(first.getAttribute("col"));
  var firstVal = Number(first.getAttribute("value"));

  var secondRow = Number(second.getAttribute("row"));
  var secondCol = Number(second.getAttribute("col"));
  var secondVal = Number(second.getAttribute("value"));

  if (firstVal === secondVal) {
    if (firstRow === secondRow && checkOnRow(firstCol, secondCol, firstRow)) {
      return true;
    }

    if (
      firstCol === secondCol &&
      checkOnColumn(firstRow, secondRow, firstCol)
    ) {
      return true;
    }

    if (checkRowSquare(first, second)) {
      return true;
    }

    if (checkColumnSquare(first, second)) {
      return true;
    }

    if (checkOnRowByBorder(first, second, 1)) {
      return true;
    }

    if (checkOnRowByBorder(first, second, -1)) {
      return true;
    }

    if (checkOnColumnByBorder(first, second, 1)) {
      return true;
    }

    if (checkOnColumnByBorder(first, second, -1)) {
      return true;
    }
  }
  return false;
}

function checkOnRow(x, y, row) {
  let min = Math.min(x, y);
  let max = Math.max(x, y);

  for (let i = min + 1; i < max; i++) {
    if (twoDimensionalArray[row][i] !== 0) {
      return false;
    }
  }
  return true;
}

function checkOnColumn(x, y, col) {
  let min = Math.min(x, y);
  let max = Math.max(x, y);

  for (let i = min + 1; i < max; i++) {
    if (twoDimensionalArray[i][col] !== 0) {
      return false;
    }
  }
  return true;
}

function checkRowSquare(x, y) {
  let minY = x;
  let maxY = y;

  if (Number(x.getAttribute("col")) > Number(y.getAttribute("col"))) {
    minY = y;
    maxY = x;
  }

  let minCol = Number(minY.getAttribute("col"));
  let minRow = Number(minY.getAttribute("row"));
  let maxCol = Number(maxY.getAttribute("col"));
  let maxRow = Number(maxY.getAttribute("row"));

  for (let i = minCol; y <= maxCol; i++) {
    if (i > minCol && twoDimensionalArray[minRow][i] !== 0) {
      return false;
    }
    if (
      twoDimensionalArray[maxRow][i] === 0 &&
      checkOnColumn(minRow, maxRow, i) &&
      checkOnRow(i, maxCol, maxRow)
    ) {
      return true;
    }
  }
  return false;
}

function checkColumnSquare(x, y) {
  let minX = x;
  let maxX = y;

  if (Number(x.getAttribute("row")) > Number(y.getAttribute("row"))) {
    minX = y;
    maxX = x;
  }

  let minRow = Number(minX.getAttribute("row"));
  let minCol = Number(minX.getAttribute("col"));
  let maxRow = Number(maxX.getAttribute("row"));
  let maxCol = Number(maxX.getAttribute("col"));

  for (let z = minRow; z <= maxRow; z++) {
    if (z > minRow && twoDimensionalArray[z][minCol] !== 0) {
      return false;
    }
    if (
      twoDimensionalArray[z][maxCol] === 0 &&
      checkOnRow(minCol, maxCol, z) &&
      checkOnColumn(z, maxRow, maxCol)
    ) {
      return true;
    }
  }
  return false;
}

function checkOnRowByBorder(p1, p2, type) {
  let pMinY = p1;
  let pMaxY = p2;

  if (Number(p1.getAttribute("col")) > Number(p2.getAttribute("col"))) {
    pMinY = p2;
    pMaxY = p1;
  }

  let y = Number(pMaxY.getAttribute("col")) + Number(type);
  let row = Number(pMinY.getAttribute("row"));
  let colFinish = Number(pMaxY.getAttribute("col"));

  if (type === -1) {
    colFinish = Number(pMinY.getAttribute("col"));
    y = Number(pMinY.getAttribute("col")) + Number(type);
    row = Number(pMaxY.getAttribute("row"));
  }

  if (
    (twoDimensionalArray[row][colFinish] === 0 ||
      Number(pMinY.getAttribute("col")) ===
        Number(pMaxY.getAttribute("col"))) &&
    checkOnRow(
      Number(pMinY.getAttribute("col")),
      Number(pMaxY.getAttribute("col")),
      row
    )
  ) {
    var n1 = Number(pMinY.getAttribute("row"));
    var n2 = Number(pMaxY.getAttribute("row"));
    console.log({ n1, n2 });

    while (
      twoDimensionalArray[Number(pMinY.getAttribute("row"))][y] === 0 &&
      twoDimensionalArray[Number(pMaxY.getAttribute("row"))][y] === 0
    ) {
      if (
        checkOnColumn(
          Number(pMinY.getAttribute("row")),
          Number(pMaxY.getAttribute("row")),
          y
        )
      ) {
        return true;
      }
      y += type;
    }
  }
  return false;
}

function checkOnColumnByBorder(p1, p2, type) {
  var pMinX = p1;
  var pMaxX = p2;

  if (Number(p1.getAttribute("row")) > Number(p2.getAttribute("row"))) {
    pMinX = p2;
    pMaxX = p1;
  }

  var x = Number(pMaxX.getAttribute("row")) + Number(type);
  var col = Number(pMinX.getAttribute("col"));
  var rowFinish = Number(pMaxX.getAttribute("row"));

  console.log("before ", { x, col, rowFinish, type });

  if (type === -1) {
    rowFinish = Number(pMinX.getAttribute("row"));
    x = Number(pMinX.getAttribute("row")) + Number(type);
    col = Number(pMaxX.getAttribute("col"));
  }

  console.log("after ", { x, col, rowFinish, type });

  if (
    (twoDimensionalArray[rowFinish][col] === 0 ||
      Number(pMinX.getAttribute("row")) ===
        Number(pMaxX.getAttribute("row"))) &&
    checkOnColumn(
      Number(pMinX.getAttribute("row")),
      Number(pMaxX.getAttribute("row")),
      col
    )
  ) {
    while (
      twoDimensionalArray[x][Number(pMinX.getAttribute("col"))] === 0 &&
      twoDimensionalArray[x][Number(pMaxX.getAttribute("col"))] === 0
    ) {
      if (
        checkOnRow(
          Number(pMinX.getAttribute("col")),
          Number(pMaxX.getAttribute("col")),
          x
        )
      ) {
        return true;
      }
      x += type;
    }
  }
  return false;
}

function drawBoard(size) {
  let rowNum = Number(size) + 1;
  let colNum = Number(size) + 1;

  let table = $("<table border='1'></table>");

  let matrix = [];
  let temp = [];

  for (let i = 0; i < boardSize + 2; i++) {
    for (let j = 0; j < boardSize + 2; j++) {
      temp.push(random(1, boardSize));
    }
    matrix[i] = temp;
    temp = [];
  }

  matrix.map((x) => (x[0] = 0));
  matrix.map((x) => (x[boardSize + 1] = 0));
  matrix.forEach(function (a, i) {
    if (i === 0 || i === boardSize + 1) {
      let t = [];
      for (let j = 0; j < boardSize + 2; j++) {
        t.push(0);
      }
      matrix[i] = t;
      t = [];
    }
  });
  twoDimensionalArray = matrix;

  for (let rowIndex = 1; rowIndex < rowNum; rowIndex++) {
    let currentRow = $("<tr></tr>").appendTo(table);
    for (let col = 1; col < colNum; col++) {
      let randomVal = matrix[rowIndex][col];
      let img =
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

  for (let i = 0; i < level + 3; i++) {
    var randomValue = random(0, boardSize);
    var td = $("td").eq(randomValue);
    td.attr("quiz", true);
  }
  console.log($("td[quiz='true']"));
}

function checkCorrectAnswer() {
  var numA = Number($("#numA").text());
  var operator = $("#operator").text();
  var numB = Number($("#numB").text());
  var result = operatorCalculate(numA, numB, operator);

  var answer = Number($("input[name='answer']").val());
  if (answer === result) {
    return true;
  }
  return false;
}

function operatorCalculate(a, b, o) {
  switch (o) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
}

function createQuiz(level) {
  var operator = ["+", "-", "*", "/"];
  if (level < 3) {
    var randOp = operator[random(0, operator.length - 2)];
  } else {
    var randOp = operator[random(0, operator.length)];
  }

  var a = random(0, 100);
  var b = random(0, 100);

  $("#numA").text(a);
  $("#operator").text(randOp);
  $("#numB").text(b);
}
