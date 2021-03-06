var boardSize = 8;
var level = 1;
var array = [];
var twoDimensionalArray = [];
var square;
var score = 0;
var time = 300;
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

//xáo trộn vị trí các ô trong bảng
$("#shuffle").click(() => {
  shuffle();
});

//tăng level sau khi thắng màn chơi
$("#increaseLevel").click(() => {
  clearInterval(counter);
  isWin = false;
  time = ogTime + 50;
  ogTime = time;
  level += 1;
  levelNow = level;
  boardSize += 2;

  //tăng level và chỉ cho phép từ level 5 trở đi mới có thể đổi hình các ô
  switch (levelNow) {
    case 1:
      setFixedLevel(time, levelNow, boardSize);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 2:
      setFixedLevel(time, levelNow, boardSize);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 3:
      setFixedLevel(time, levelNow, boardSize);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 4:
      setFixedLevel(time, levelNow, boardSize);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 5:
      setFixedLevel(time, levelNow, boardSize);
      $("#shuffleValue").removeAttr("disabled");
      $("#shuffleValue").css("opacity", 1);
      addMiddleLine();
      break;
    case 6:
      setFixedLevel(time, levelNow, boardSize);
      $("#shuffleValue").removeAttr("disabled");
      $("#shuffleValue").css("opacity", 1);
      addFourDirectionLine();
      break;
  }
  $(".win-modal").css("display", "none");
});

//set các level cố định và chỉ cho phép từ level 5 trở đi mới có thể đổi hình các ô
$(".level").click(function () {
  let level = Number($(this).attr("level"));
  switch (level) {
    case 1:
      setFixedLevel(300, 1, 8);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 2:
      setFixedLevel(400, 2, 10);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 3:
      setFixedLevel(500, 3, 12);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 4:
      setFixedLevel(600, 4, 14);
      $("#shuffleValue").attr("disabled", true);
      $("#shuffleValue").css("opacity", 0.5);
      break;
    case 5:
      setFixedLevel(700, 5, 16);
      $("#shuffleValue").removeAttr("disabled");
      $("#shuffleValue").css("opacity", 1);
      addMiddleLine();
      break;
    case 6:
      setFixedLevel(800, 6, 18);
      $("#shuffleValue").removeAttr("disabled");
      $("#shuffleValue").css("opacity", 1);
      addFourDirectionLine();
      break;
  }
});

//khởi động lại màn chơi
$(".restart").click(function () {
  restart();
  playSound(3);
  $(".win-modal").css("display", "none");
  $(".modal").css("display", "none");
});

//đổi hình các ô trong bảng
$("#shuffleValue").click(() => {
  shuffleValue();
  playSound(1);
});

//phát âm thanh
function playSound(key) {
  switch (Number(key)) {
    case 0:
      var clickSound = new Audio("sound/click.mp3");
      clickSound.play();
      break;
    case 1:
      var newGameSound = new Audio("sound/new-game.mp3");
      newGameSound.volume = 0.5;
      newGameSound.play();
      break;
    case 2:
      var wrongSound = new Audio("sound/wrong.mp3");
      wrongSound.play();
      break;
    case 3:
      document.querySelectorAll("audio")[0].play();
      break;
    case 4:
      var correctSound = new Audio("sound/correct.mp3");
      correctSound.play();
      break;
    case 5:
      var winSound = new Audio("sound/win.mp3");
      winSound.play();
      break;
    case 6:
      var loseSound = new Audio("sound/lose.mp3");
      loseSound.play();
      break;
    default:
      break;
  }
}

//thêm đường ở bốn hướng
function addFourDirectionLine() {
  var midIndex = boardSize / 2;

  //ma trận của đường ở bốn hướng
  let barrier = [];

  barrier.push(0);
  for (let i = 1; i < boardSize + 1; i++) {
    barrier.push(-1);
  }
  barrier.push(0);

  twoDimensionalArray[midIndex] = barrier;
  let c = midIndex + 1;

  twoDimensionalArray.map((x) => {
    x.map((__, i) => {
      if (i === midIndex || i === c) {
        x[i] = -1;
      }
    });
  });

  $("td").each(function () {
    let row = Number(this.getAttribute("row"));
    let col = Number(this.getAttribute("col"));
    var childElm = this.firstChild;

    if (row === midIndex || row === c || col === midIndex || col === c) {
      $(this).removeAttr("onclick");
      $(this).removeAttr("value");
      this.setAttribute("selected", true);
      $(childElm).remove();
    }
  });
}

//thêm đường ở vị trí giữa bảng
function addMiddleLine() {
  let midIndex = boardSize / 2;

  let c = [];
  c.push(0);

  for (let i = 1; i < boardSize + 1; i++) {
    c.push(-1);
  }

  c.push(0);

  twoDimensionalArray[midIndex] = c;
  twoDimensionalArray[midIndex + 1] = c;

  $("td").each(function () {
    let row = Number(this.getAttribute("row"));
    var childElm = this.firstChild;

    if (row === midIndex || row === midIndex + 1) {
      $(this).removeAttr("onclick");
      $(this).removeAttr("value");
      this.setAttribute("selected", true);
      $(childElm).remove();
    }
  });
}

//set level cố định theo tham số nhận vào
function setFixedLevel(t, lvl, bs) {
  clearInterval(counter);
  isWin = false;
  time = Number(t);
  ogTime = time;
  level = Number(lvl);
  levelNow = level;
  boardSize = Number(bs);
  setLevel(level);
  drawBoard(boardSize);
  setScore(score);
  setGameTime();
  setTimeLeft();
  playSound(1);
  playSound(3);
}

//khởi động lại màn chơi
function restart() {
  clearInterval(counter);
  score = 0;
  array = [];
  time = ogTime;
  ogTime = time;
  setLevel(level);
  drawBoard(boardSize);
  setScore(score);
  setGameTime();
  setTimeLeft();
  isWin = false;
  playSound(1);
}

//random chẵn số lần các phần tử theo kích thước bảng
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
    ranLeft.map((z) => {
      if (r === z.index && z.count <= boardSize && z.count > 0) {
        t.push(r);
        z.count -= 1;
      }
    });
  }
  return t;
}

//đẩy các ô về phía trước
function shiftAllCellToStart() {
  let temp = [];

  twoDimensionalArray.map((row) => {
    let val = row.filter((x) => x > 0);
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
      if (b > 0) {
        t.push(b);
      }
    });
  });

  for (let i = 0; i < twoDimensionalArray.length - 2; i++) {
    let slicedElm = t.splice(0, twoDimensionalArray.length - 2);
    re.push(slicedElm);
  }

  re.map((x) => {
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
    if (value > 0) {
      let child = $(elm).children();
      let newSrc = "image/" + re[row][col] + ".png";
      $(child).attr("src", newSrc);
      $(elm).attr("selected", "false");
    }
    elm.setAttribute("value", value);
  });
}

//hiển thị thời gian còn lại của trò chơi
function setTimeLeft() {
  const loop = setInterval(setTime, 1000);

  counter = loop;

  function setTime() {
    if (time === 0) {
      $(".modal").css("display", "block");
      $("#restart").css("visibility", "visible");
      $("table").css("visibility", "hidden");
      clearInterval(loop);
      document.querySelectorAll("audio")[0].pause();
      document.querySelectorAll("audio")[0].currentTime = 0;
      playSound(6);
    } else if (isWin) {
      $("#increaseLevel").css("visibility", "visible");
      clearInterval(loop);
    } else {
      time -= 1;
      $("#time").text(time);
    }
  }
}

//hiển thị thời gian trò chơi
function setGameTime() {
  $("#time").text(time);
}

//hiển thị điểm của người chơi
function setScore(score) {
  $("#score").text("Score " + score);
}

//hiển thị level hiện tại
function setLevel(level) {
  $("#level-title").text("Level " + level);
}

//random số trong khoảng từ tham số nhận vào
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//đảo ngược bảng
function reverseBoard() {
  twoDimensionalArray.reverse();

  $("td[selected='false'").each(function () {
    var row = this.getAttribute("row");
    var col = this.getAttribute("col");

    var val = Number(twoDimensionalArray[row][col]);
    if (val > 0) {
      this.setAttribute("value", val);
      var childElm = this.firstChild;
      var src = "image/" + val + ".png";
      childElm.setAttribute("src", src);
    }
  });
}

//đổi hình các ô có trong bảng
function shuffleValue() {
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

//xáo trộn vị trí các ô trong bảng
function shuffle() {
  let temp = [];

  $("td[selected='false']").each(function () {
    var val = Number(this.getAttribute("value"));
    temp.push(val);
  });

  $("td[selected='false']").each(function () {
    var row = this.getAttribute("row");
    var col = this.getAttribute("col");
    let randomIndex = Math.floor(Math.random() * temp.length);
    let splicedElm = temp.splice(randomIndex, 1)[0];

    this.setAttribute("value", splicedElm);
    twoDimensionalArray[row][col] = splicedElm;
    var childElm = this.firstChild;
    var src = "image/" + splicedElm + ".png";
    childElm.setAttribute("src", src);
  });
}

//kiểm tra các ô đã được nguời chơi nối hết
function checkAllCell() {
  var selectedCells = $("td[selected='true'");
  if (selectedCells.length === boardSize * boardSize) {
    $("table").remove();
    $(".win-modal").css("display", "block");
    isWin = true;
    document.querySelectorAll("audio")[0].pause();
    document.querySelectorAll("audio")[0].currentTime = 0;
    playSound(5);
  }
}

//hàm chọn khi người chơi click vào ô
function select(elm) {
  playSound(0);

  elm.style.opacity = 0.5;

  array.push(elm);

  if (array.length == 2) {
    var first = array[0];
    var second = array[1];

    if (array[0] == array[1]) {
      array = [];
      playSound(2);
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

      if (typeof levelNow !== undefined) {
        if (levelNow === 2) {
          shiftAllCellToStart();
          reloadBoard();
        }
        if (levelNow === 3) {
          shiftAllCellToStart();
          reloadBoard();
          shuffle();
        }
        if (levelNow === 4) {
          shiftAllCellToStart();
          reloadBoard();
          shuffle();
          reverseBoard();
        }
        if (levelNow >= 5) {
          shuffle();
        }
      }
      playSound(4);
    } else {
      playSound(2);
    }
    first.style.opacity = 1;
    second.style.opacity = 1;
    array = [];
    checkAllCell();
  }
}

//kiểm tra hai điểm đã chọn có đường đi hợp lệ
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

    if (checkByRowRectangle(first, second)) {
      return true;
    }

    if (checkByColumnRectangle(first, second)) {
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

//kiểm tra cùng hàng
function checkOnRow(x, y, row) {
  let min = Math.min(x, y);
  let max = Math.max(x, y);

  for (let i = min + 1; i < max; i++) {
    if (twoDimensionalArray[row][i] > 0) {
      return false;
    }
  }
  return true;
}

//kiểm tra cùng cột
function checkOnColumn(x, y, col) {
  let min = Math.min(x, y);
  let max = Math.max(x, y);

  for (let i = min + 1; i < max; i++) {
    if (twoDimensionalArray[i][col] > 0) {
      return false;
    }
  }
  return true;
}

//kiểm tra cùng hàng trong phạm vi là hình chữ nhật không vượt qua border của bảng
function checkByRowRectangle(x, y) {
  let min = x;
  let max = y;

  if (Number(x.getAttribute("col")) > Number(y.getAttribute("col"))) {
    min = y;
    max = x;
  }

  let minCol = Number(min.getAttribute("col"));
  let minRow = Number(min.getAttribute("row"));
  let maxCol = Number(max.getAttribute("col"));
  let maxRow = Number(max.getAttribute("row"));

  for (let i = minCol; y <= maxCol; i++) {
    if (i > minCol && twoDimensionalArray[minRow][i] > 0) {
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

//kiểm tra cùng cột trong phạm vị hình chữ nhật không vươt qua border của bảng
function checkByColumnRectangle(x, y) {
  let min = x;
  let max = y;

  if (Number(x.getAttribute("row")) > Number(y.getAttribute("row"))) {
    min = y;
    max = x;
  }

  let minRow = Number(min.getAttribute("row"));
  let minCol = Number(min.getAttribute("col"));
  let maxRow = Number(max.getAttribute("row"));
  let maxCol = Number(max.getAttribute("col"));

  for (let z = minRow; z <= maxRow; z++) {
    if (z > minRow && twoDimensionalArray[z][minCol] > 0) {
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

//kiểm tra cùng hàng vượt qua phạm vị của hình chữ nhật
function checkOnRowByBorder(p1, p2, type) {
  let min = p1;
  let max = p2;

  if (Number(p1.getAttribute("col")) > Number(p2.getAttribute("col"))) {
    min = p2;
    max = p1;
  }

  let y = Number(max.getAttribute("col")) + Number(type);
  let row = Number(min.getAttribute("row"));
  let colFinish = Number(max.getAttribute("col"));

  if (type === -1) {
    colFinish = Number(min.getAttribute("col"));
    y = Number(min.getAttribute("col")) + Number(type);
    row = Number(max.getAttribute("row"));
  }

  if (
    (twoDimensionalArray[row][colFinish] === 0 ||
      Number(min.getAttribute("col")) === Number(max.getAttribute("col"))) &&
    checkOnRow(
      Number(min.getAttribute("col")),
      Number(max.getAttribute("col")),
      row
    )
  ) {
    while (
      twoDimensionalArray[Number(min.getAttribute("row"))][y] === 0 &&
      twoDimensionalArray[Number(max.getAttribute("row"))][y] === 0
    ) {
      if (
        checkOnColumn(
          Number(min.getAttribute("row")),
          Number(max.getAttribute("row")),
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

//kiểm tra cùng cột vượt qua phạm vị của hình chữ nhật
function checkOnColumnByBorder(p1, p2, type) {
  var min = p1;
  var max = p2;

  if (Number(p1.getAttribute("row")) > Number(p2.getAttribute("row"))) {
    min = p2;
    max = p1;
  }

  var x = Number(max.getAttribute("row")) + Number(type);
  var col = Number(min.getAttribute("col"));
  var rowFinish = Number(max.getAttribute("row"));

  if (type === -1) {
    rowFinish = Number(min.getAttribute("row"));
    x = Number(min.getAttribute("row")) + Number(type);
    col = Number(max.getAttribute("col"));
  }

  if (
    (twoDimensionalArray[rowFinish][col] === 0 ||
      Number(min.getAttribute("row")) === Number(max.getAttribute("row"))) &&
    checkOnColumn(
      Number(min.getAttribute("row")),
      Number(max.getAttribute("row")),
      col
    )
  ) {
    while (
      twoDimensionalArray[x][Number(min.getAttribute("col"))] === 0 &&
      twoDimensionalArray[x][Number(max.getAttribute("col"))] === 0
    ) {
      if (
        checkOnRow(
          Number(min.getAttribute("col")),
          Number(max.getAttribute("col")),
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

//vẽ bảng theo size truyền vào
function drawBoard(size) {
  let rowNum = Number(size) + 1;
  let colNum = Number(size) + 1;

  let table = $("<table border='1'></table>");

  let matrix = [];
  let temp = [];

  //lấy mảng đã random chẵn số lần theo size
  var randomValArr = randomValArray();

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
      if (twoDimensionalArray[rowIndex][col] > 0) {
        let randomVal = Number(randomValArr.splice(0, 1)[0]);
        twoDimensionalArray[rowIndex][col] = randomVal;
        let img =
          "<img width='50' height='50' class='game__cell' src='image/" +
          randomVal +
          ".png'/>";
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
    }
    $("#board").html(table);
  }
}

//vẽ lại bảng
function reloadBoard() {
  let rowNum = Number(boardSize) + 1;
  let colNum = Number(boardSize) + 1;

  let table = $("<table border='1'></table>");

  for (let rowIndex = 1; rowIndex < rowNum; rowIndex++) {
    let currentRow = $("<tr></tr>").appendTo(table);
    for (let col = 1; col < colNum; col++) {
      let value = twoDimensionalArray[rowIndex][col];
      if (value > 0) {
        let img =
          "<img width='50' height='50' class='game__cell' src='image/" +
          value +
          ".png'/>";
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
      } else {
        currentRow.append(
          "<td width='50px' height='50px' row='" +
            rowIndex +
            "' col='" +
            col +
            "' selected='true'>" +
            "</td>"
        );
      }
    }
    $("#board").html(table);
  }
}
