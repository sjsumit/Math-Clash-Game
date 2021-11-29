let goal = 9 + Math.floor(Math.random() * 60);
document.querySelector(".goal").innerText = goal;

let grid = document.getElementById("grid");
let maxRows = 6,
  maxColumns = 6,
  totalRows = 0,
  totalSum = 0,
  totalSelected = 0,
  score = 0;
for (let i = 0; i < maxRows; i++) {
  for (let j = 0; j < maxColumns; j++) {
    let cell = document.createElement("div");
    cell.className = "cell blank";
    cell.id = i + "" + j;
    grid.appendChild(cell);
  }
}
let numbers = [];

function renderBoard() {
  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < maxColumns; j++) {
      let cell = document.getElementById(i + "" + j);
      if (numbers[i][j].deleted) {
        cell.innerText = "";
        cell.classList.remove("selected");
        continue;
      }
      cell.innerText = numbers[i][j].value;
      if (numbers[i][j].selected) cell.classList.add("selected");
      else cell.classList.remove("selected");
      cell.onclick = onCellClick;
    }
  }
  for (let i = totalRows; i < maxRows; i++) {
    for (let j = 0; j < maxColumns; j++) {
      let cell = document.getElementById(i + "" + j);
      cell.innerText = "";
      cell.classList.remove("selected");
    }
  }
}

const deselecAndDeletetAll = () => {
  console.log("ds", numbers, totalRows);
  for (let i = 0; i < totalRows; i++) {
    let deleted = 0;
    for (let j = 0; j < maxColumns; j++) {
      if (numbers[i][j].selected) {
        let k = i;
        for (; k < totalRows - 1; k++) {
          numbers[k][j] = numbers[k + 1][j];
        }
        numbers[k][j].deleted = true;
        numbers[i][j].selected = false;
        deleted++;
      } else if (numbers[i][j].deleted) deleted++;
    }
    if (deleted === maxColumns) {
      totalRows--;
      console.log("new total rows", totalRows);
    }
  }
};

const deselectAll = () => {
  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < maxColumns; j++) {
      numbers[i][j].selected = false;
      totalSelected = 0;
    }
  }
};

let id = setInterval(() => {
  let newRow = [];
  for (let i = 0; i < maxColumns; i++) {
    newRow.push({
      selected: false,
      value: 1 + Math.floor(Math.random() * 9)
    });
  }
  numbers = [newRow, ...numbers];
  numbers.splice(maxRows);
  totalRows++;
  renderBoard();
  if (totalRows >= maxRows) {
    gamceOVer();
    clearInterval(id);
    let timer = document.querySelector(".timer-animation");
    timer.style.animation = "none";
    timer.style["background-color"] = "grey";
    return;
  }
}, 3000);

const onCellClick = (e) => {
  if (!numbers[e.target.id.split("")[0]][e.target.id.split("")[1]].selected) {
    numbers[e.target.id.split("")[0]][e.target.id.split("")[1]].selected = true;
    e.target.classList.add("selected");
    totalSum += +e.target.innerText;
    totalSelected++;
  } else {
    numbers[e.target.id.split("")[0]][
      e.target.id.split("")[1]
    ].selected = false;
    e.target.classList.remove("selected");
    totalSelected--;
    totalSum += -e.target.innerText;
  }
  if (totalSum === goal) {
    goal = 9 + Math.floor(Math.random() * 60);
    score += totalSelected;
    totalSelected = 0;
    totalSum = 0;
    document.querySelector(".goal").innerText = goal;
    document.querySelector(".final-score").innerText = score;
    deselecAndDeletetAll();
    renderBoard();
  } else if (totalSum > goal) {
    totalSelected = 0;
    totalSum = 0;
    deselectAll();
    renderBoard();
  }
  document.querySelector(".score").innerText = totalSum;
};

const gamceOVer = () => {
  document.querySelector(".endscreen").classList.remove("hidden");
  document.querySelector(".end-score").innerText = score;
  document.querySelector(".restart").addEventListener("click", (e) => {
    window.location.reload();
  });
};
