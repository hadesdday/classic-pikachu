var boardSize = 8;
var level = 1;
var array = [];
var twoDimensionalArray = [];
var square;
var score = 0;
var time = 1;
var ogTime = 300;
var isWin = false;
var counter;
var levelNow;

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

$("#showTwoDimensionalArray").click(function () {
  console.log(twoDimensionalArray);
});

$("#increaseLevel").click(() => {
  clearInterval(counter);
  isWin = false;
  time = ogTime + 50;
  ogTime = time;
  level += 1;
  levelNow = level;
  setLevel(level);
  drawBoard((boardSize += 2));
  setScore(score);
  setGameTime();
  setTimeLeft();
  $("#increaseLevel").css("visibility", "hidden");
});

$(".level").click(function () {
  let level = Number($(this).attr("level"));
  switch (level) {
    case 1:
      clearInterval(counter);
      isWin = false;
      time = 300;
      ogTime = time;
      level = 1;
      levelNow = level;
      setLevel(level);
      drawBoard((boardSize = 8));
      setScore(score);
      setGameTime();
      setTimeLeft();
      break;
    case 2:
      clearInterval(counter);
      isWin = false;
      time = 400;
      ogTime = time;
      level = 2;
      levelNow = level;
      setLevel(level);
      drawBoard((boardSize = 10));
      setScore(score);
      setGameTime();
      setTimeLeft();
      break;
    case 3:
      clearInterval(counter);
      isWin = false;
      time = 500;
      ogTime = time;
      level = 3;
      levelNow = level;
      setLevel(level);
      drawBoard((boardSize = 12));
      setScore(score);
      setGameTime();
      setTimeLeft();
      break;
    case 4:
      clearInterval(counter);
      isWin = false;
      time = 600;
      ogTime = time;
      level = 4;
      levelNow = level;
      setLevel(level);
      drawBoard((boardSize = 14));
      setScore(score);
      setGameTime();
      setTimeLeft();
      break;
    case 5:
      clearInterval(counter);
      isWin = false;
      time = 700;
      ogTime = time;
      level = 5;
      levelNow = level;
      setLevel(level);
      drawBoard((boardSize = 16));
      setScore(score);
      setGameTime();
      setTimeLeft();
      break;
    case 6:
      clearInterval(counter);
      isWin = false;
      time = 800;
      ogTime = time;
      level = 6;
      levelNow = level;
      setLevel(level);
      drawBoard((boardSize = 18));
      setScore(score);
      setGameTime();
      setTimeLeft();
      break;
  }
});

$("#og-restart").click(function () {
  restart();
  $("#restart").css("visibility", "hidden");
  $(".modal").css("display", "none");
});

$("#restart").click(function () {
  restart();
  $("#restart").css("visibility", "hidden");
  $(".modal").css("display", "none");
});

function restart() {
  clearInterval(counter);
  level = 1;
  levelNow = level;
  boardSize = 8;
  score = 0;
  array = [];
  time = 300;
  ogTime = time;
  setLevel(level);
  drawBoard(boardSize);
  setScore(score);
  setGameTime();
  setTimeLeft();
  isWin = false;
}

function randomValArray() {
  let t = [];
  let ranLeft = [];

  for (let i = 1; i <= boardSize; i++) {
    let x = {
      index: i,
      count: boardSize,
    };
    ranLeft.push(x);
  }

  while (t.length <= boardSize * boardSize) {
    if (t.length === boardSize * boardSize) {
      break;
    }
    let r = random(1, boardSize + 1);
    ranLeft.map((z, i) => {
      if (r === z.index && z.count <= boardSize && z.count > 0) {
        t.push(r);
        z.count -= 1;
      }
    });
  }
  return t;
}

function shiftAllCellToStart() {
  let temp = [];

  twoDimensionalArray.map((row) => {
    let val = row.filter((x) => x !== 0);
    temp.push(val);
  });

  var re = [];
  var t = [];

  for (let i = 0; i < twoDimensionalArray.length; i++) {
    t.push(0);
  }
  re.push(t);

  temp[0] = [...re[0]];
  temp[twoDimensionalArray.length - 1] = [...re[0]];

  t = [];

  twoDimensionalArray.map((x) => {
    x.map((b) => {
      if (b !== 0) {
        t.push(b);
      }
    });
  });

  for (let i = 0; i < twoDimensionalArray.length - 2; i++) {
    let slicedElm = t.splice(0, twoDimensionalArray.length - 2);
    re.push(slicedElm);
  }

  re.map((x, i) => {
    if (x.length < twoDimensionalArray.length) {
      x.unshift(0);
      for (let i = x.length; i < twoDimensionalArray.length; i++) {
        x.push(0);
      }
    }
  });

  if (re.length < twoDimensionalArray.length) {
    t = [...twoDimensionalArray[0]];
    for (let i = re.length; i < twoDimensionalArray.length; i++) {
      re.push(t);
    }
  }
  t = [];

  twoDimensionalArray = re;

  $("td").each(function (index, elm) {
    let row = elm.getAttribute("row");
    let col = elm.getAttribute("col");
    let value = re[row][col];
    if (value !== 0) {
      let child = $(elm).children();
      let newSrc = "image/" + re[row][col] + ".png";
      $(child).attr("src", newSrc);
      $(elm).attr("selected", "false");
    }
    elm.setAttribute("value", value);
  });
}

function setTimeLeft() {
  const loop = setInterval(setTime, 1000);

  counter = loop;

  function setTime() {
    if (time === 0) {
      $(".modal").css("display", "block");
      $("#restart").css("visibility", "visible");
      $("table").css("visibility", "hidden");
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
  let temp = [];

  $("td[selected='false']").each(function () {
    var val = this.getAttribute("value");
    let now = val;
    temp.push(now);
  });

  $("td[selected='false']").each(function () {
    var row = this.getAttribute("row");
    var col = this.getAttribute("col");
    let randomIndex = Math.floor(Math.random() * temp.length);
    let splicedElm = temp.splice(randomIndex, 1);

    this.setAttribute("value", splicedElm);
    twoDimensionalArray[row][col] = splicedElm;
    var childElm = this.firstChild;
    var src = "image/" + splicedElm + ".png";
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
      console.log("matrix before shifted ", twoDimensionalArray);
      if (typeof levelNow !== undefined && levelNow >= 2) {
        shiftAllCellToStart();
        console.log("matrix after shifted ", twoDimensionalArray);
        reloadBoard();
      }
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

  var randomValArr = randomValArray();
  // console.log(randomValArr);

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
      let randomVal = randomValArr.splice(0, 1);
      // let randomVal = matrix[rowIndex][col];
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
}

function reloadBoard() {
  let rowNum = Number(boardSize) + 1;
  let colNum = Number(boardSize) + 1;

  let table = $("<table border='1'></table>");

  for (let rowIndex = 1; rowIndex < rowNum; rowIndex++) {
    let currentRow = $("<tr></tr>").appendTo(table);
    for (let col = 1; col < colNum; col++) {
      let value = twoDimensionalArray[rowIndex][col];
      if (value !== 0) {
        let img = "<img width='50' height='50' src='image/" + value + ".png'/>";
        currentRow.append(
          "<td width='50px' height='50px' row='" +
            rowIndex +
            "' col='" +
            col +
            "' value='" +
            value +
            "' onclick='select(this)' selected='false'>" +
            img +
            "</td>"
        );
      }
    }
    $("#board").html(table);
  }
}
