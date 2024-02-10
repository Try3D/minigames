const root = document.getElementById("root");

const width = 15;
const height = 20;

const places = [[4, 11]];

const canvas = document.createElement("div");

const render = () => {
  canvas.innerHTML = "";

  if (cur === null) {
    cur = places[places.length - 1].slice();
  }

  for (let i = 0; i < height; ++i) {
    const row = document.createElement("div");

    for (let j = 0; j < width; ++j) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      row.appendChild(checkbox);
      if (
        places[height - i - 1] !== undefined &&
        j >= places[height - i - 1][0] &&
        j < places[height - i - 1][1]
      ) {
        checkbox.checked = true;
      } else if (
        cur &&
        i === height - towHeight - 1 &&
        cur[0] <= j &&
        cur[1] > j
      ) {
        checkbox.style.backgroundColor = "red";
        checkbox.style.border = "red";
        checkbox.checked = true;
      }
    }

    canvas.appendChild(row);
  }
};

let direction = "left";
let cur = null;
let towHeight = 1;

const handleKeyDown = (event) => {
  if (event.key === " ") {
    const intersection = [
      Math.max(cur[0], places[places.length - 1][0]),
      Math.min(cur[1], places[places.length - 1][1]),
    ];
    places.push(intersection);
    towHeight += 1;
    cur = null;
  }
};

document.addEventListener("keydown", handleKeyDown);

const startGame = () => {
  if (cur && direction === "left") {
    if (cur[0] === 0) {
      direction = "right";
      cur[0] += 1;
      cur[1] += 1;
    } else {
      cur[0] -= 1;
      cur[1] -= 1;
    }
  } else if (cur && direction === "right") {
    if (cur[1] === width) {
      direction = "left";
      cur[0] -= 1;
      cur[1] -= 1;
    } else {
      cur[0] += 1;
      cur[1] += 1;
    }
  }
  if ((cur && cur[0] === cur[1]) || height - towHeight === 0) {
    document.removeEventListener("keydown", handleKeyDown);
    clearInterval(gameLoop);
  }
};

const gameLoop = setInterval(() => {
  startGame();
  render();
}, 75);
render();

const header = document.createElement("div");

const heading = document.createElement("h1");
heading.innerText = "Tower Game";
const a = document.createElement("a");
a.href = "../index.html";
const div = document.createElement("div");
div.innerText = "< go back";
a.appendChild(div);

header.appendChild(a);
header.appendChild(heading);

root.appendChild(header);
root.appendChild(canvas);
