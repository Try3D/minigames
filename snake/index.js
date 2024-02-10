const root = document.getElementById("root");

const width = 15;
const canvas = document.createElement("div");

const snakePath = [[Math.floor(width / 2), Math.floor(width / 4)]];

let x = Math.floor(width / 2);
let y = Math.floor((width * 3) / 4);

const render = () => {
  canvas.innerHTML = "";

  for (let i = 0; i < width; ++i) {
    const row = document.createElement("div");

    for (let j = 0; j < width; ++j) {
      const checkBox = document.createElement("input");
      if (i === x && j === y) {
        checkBox.type = "checkbox";
        checkBox.style.backgroundColor = "#e53935";
        checkBox.style.borderColor = "#e53935";
      } else {
        checkBox.type = "checkbox";
      }
      checkBox.id = `checkbox${i}-${j}`;
      row.appendChild(checkBox);

      for (let loc of snakePath) {
        if (loc[0] === i && loc[1] === j) {
          checkBox.checked = true;
        }

        if (i === x && j === y) {
          checkBox.checked = true;
        }
      }
    }
    canvas.appendChild(row);
  }
};

let direction = "START";

const handleKeyDown = (event) => {
  console.log("hi");
  switch (event.key) {
    case "ArrowUp":
      direction = direction == "DOWN" ? "DOWN" : "UP";
      break;
    case "ArrowDown":
      direction = direction == "UP" ? "UP" : "DOWN";
      break;
    case "ArrowLeft":
      direction = direction === "RIGHT" ? "RIGHT" : "LEFT";
      break;
    case "ArrowRight":
      direction = direction === "LEFT" ? "LEFT" : "RIGHT";
      break;
  }
};

document.addEventListener("keydown", handleKeyDown);

const startGame = () => {
  const head = [...snakePath[0]];
  switch (direction) {
    case "UP":
      head[0] -= 1;
      if (head[0] < 0) {
        head[0] = width - 1;
      }
      break;
    case "DOWN":
      head[0] += 1;
      head[0] %= width;
      break;
    case "LEFT":
      head[1] -= 1;
      if (head[1] < 0) {
        head[1] = width - 1;
      }
      break;
    case "RIGHT":
      head[1] += 1;
      head[1] %= width;
      break;
    default:
      break;
  }
  if (
    snakePath.length > 1 &&
    snakePath
      .slice(1)
      .some(([SnakeX, SnakeY]) => SnakeX === head[0] && SnakeY === head[1])
  ) {
    clearInterval(gameLoop);
    document.removeEventListener("keydown", handleKeyDown);
  }

  snakePath.unshift(head);
  if (head[0] === x && head[1] === y) {
    do {
      x = Math.floor(Math.random() * width);
      y = Math.floor(Math.random() * width);
    } while (
      snakePath.some(([SnakeX, SnakeY]) => SnakeX === x && SnakeY === y)
    );
  } else {
    snakePath.pop();
  }
};

const gameLoop = setInterval(() => {
  startGame();
  render();
}, 100);

const header = document.createElement("div");

const heading = document.createElement("h1");
heading.innerText = "Snake Game";
const a = document.createElement("a");
a.href = "../index.html";
const div = document.createElement("div");
div.innerText = "< go back";
a.appendChild(div);

header.appendChild(a);
header.appendChild(heading);

root.appendChild(header);
root.appendChild(canvas);
