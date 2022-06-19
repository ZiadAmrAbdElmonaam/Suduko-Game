let boxGameElement = document.querySelector(".boxGame");
let headerGameElement = document.querySelector("header");
let groupGameElement = location.search
  .split("?")[1]
  .split("=")[1]
  .split("&")[0];
let levelGame = location.search.split("?")[1].split("=")[2];
let length = levelGame == "level1" ? 4 : 9;
let startBtn = document.querySelector("#start");
let allDivs = document.querySelector(".boxGame").children;
let col = 1;
let row = 1;
startBtn.classList.add("startbtn");
let tryAgain = document.querySelector("#tryagain");

async function fetchRandom() {
  let response = await fetch(`https://sudoku-api.deta.dev/?type=${length}`);
  let randomImg = await response.json();
  console.log(randomImg);
  localStorage.setItem("sol", randomImg.solution);
  //   initialize both of row and column
  let row = 1;
  let col = 1;

  for (let index = 0; index < length * length; index++) {
    let divGame = document.createElement("div");
    boxGameElement.appendChild(divGame);
    if (randomImg.board[index] == ".") {
      continue;
    }

    let imgGame = document.createElement("img");
    imgGame.src = `images/${levelGame}-${groupGameElement}/${randomImg.board[index]}.jpg`;
    divGame.classList.add("created");
    divGame.appendChild(imgGame);
  }

  for (let row = 1, divIndex = 0; row <= length; row++) {
    for (let col = 1; col <= length; col++, divIndex++) {
      allDivs[divIndex].id = row + "" + col;
    }
  }
}

window.addEventListener("load", (e) => {
  boxGameElement.classList.add(`boxGame-${length}`);

  for (let index = 1; index <= length; index++) {
    let playImage = document.createElement("img");
    playImage.src = `/images/${levelGame}-${groupGameElement}/${index}.jpg`;
    headerGameElement.appendChild(playImage);
  }
});

document.body.addEventListener("keydown", (e) => {
  let numbers = [];
  for (let i = 1; i <= length; i++) {
    numbers.push(i);
  }

  let currentDiv = document.getElementById(`${row}${col}`);
  currentDiv.classList.remove("target");
  console.log(currentDiv);
  if (e.key == "ArrowRight") {
    if (col != length) {
      col++;

      currentDiv = document.getElementById(row + "" + col);
      currentDiv.classList.add("target");
    }
  } else if (e.key == "ArrowLeft") {
    if (col != 1) {
      col--;

      currentDiv = document.getElementById(row + "" + col);
      currentDiv.classList.add("target");
    }
  } else if (e.key == "ArrowDown") {
    if (row != length) {
      row++;

      currentDiv = document.getElementById(row + "" + col);
      currentDiv.classList.add("target");
    }
  } else if (e.key == "ArrowUp") {
    if (row != 1) {
      row--;

      currentDiv = document.getElementById(row + "" + col);
      currentDiv.classList.add("target");
    }
  } else if (
    numbers.includes(parseInt(e.key)) &&
    !currentDiv.classList.contains("created")
  ) {
    if (currentDiv.children.length == 1) {
      currentDiv.children[0].remove();
    }
    let choosen = document.createElement("img");
    currentDiv.append(choosen);
    choosen.src = headerGameElement.children[parseInt(e.key) - 1].src;

    // choosen.id= e.key;
  } else if (e.key == "Enter") {
    console.log(localStorage.sol);

    let userSolution = boxGameElement.querySelectorAll("img");
    let msg = "win";
    for (let index = 0; index < userSolution.length; index++) {
      if (
        userSolution[index].src.split("/")[5].split(".")[0] !=
        localStorage.sol[index]
      ) {
        msg = "lose";
        break;
      }
    }
    alert(msg);
    clearInterval(timerId);
  } else {
    return;
  }
});
startBtn.addEventListener(
  "click",
  (e) => {
    fetchRandom();

    if (length == 4) {
      time = 61;
    } else time = 120;

    actionsEnabled = true;
    timerId = window.setInterval(() => {
      time > 0 && time--;
      minutes = Math.floor(time / 60);
      seconds = time - minutes * 60;

      if (time === 0) {
        actionsEnabled = false;
        clearInterval(timerId);
        alert("Lost!! Try again");
      }
      document.querySelector(
        "#timeRemaining"
      ).innerHTML = `${minutes}:${seconds}`;
    }, 1000);
  },
  { once: "true" }
);

tryAgain.addEventListener("click", (e) => {
  location.reload();
});
