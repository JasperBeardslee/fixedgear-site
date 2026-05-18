const chainrings = [42,43,44,45,46,47,48,49,50,51,52,53,54,55];
const cogs = [12,13,14,15,16,17,18,19,20,21,22,23];

const xAxis = document.getElementById("xAxis");
const yAxis = document.getElementById("yAxis");
const matrix = document.getElementById("matrix");

let selectedRow = null;
let selectedCol = null;
let selected = null;

function gcd(a,b){ return b===0 ? a : gcd(b,a%b); }

/* ✅ X AXIS (WITH SPACER FIX) */
let spacer = document.createElement("div");
spacer.className = "axis";
xAxis.appendChild(spacer);

chainrings.forEach((c) => {
  let el = document.createElement("div");
  el.className = "axis";
  el.textContent = c;
  xAxis.appendChild(el);
});

/* Y AXIS */
cogs.forEach((c) => {
  let el = document.createElement("div");
  el.className = "axis";
  el.textContent = c;
  yAxis.appendChild(el);
});

/* MATRIX */
cogs.forEach((rear, i) => {
  chainrings.forEach((front, j) => {

    let ratio = (front / rear).toFixed(2);
    let skid = rear / gcd(front, rear);

    let cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = ratio;

    cell.dataset.row = i;
    cell.dataset.col = j;

    /* hover */
    cell.addEventListener("mouseenter", () => {
      clearHover();
      applyHighlight(i, j);

      if(!selected){
        updateOutput(front, rear, ratio, skid);
      }
    });

    /* ✅ FIX: restore selection after hover */
    cell.addEventListener("mouseleave", () => {
      clearHover();

      if(selectedRow !== null){
        applyHighlight(selectedRow, selectedCol);
      }
    });

    /* click */
    cell.addEventListener("click", () => {

      document.querySelectorAll(".selected").forEach(c => c.classList.remove("selected"));
      cell.classList.add("selected");

      selected = {front, rear, ratio, skid};
      selectedRow = i;
      selectedCol = j;

      clearHover();
      applyHighlight(selectedRow, selectedCol);

      updateOutput(front, rear, ratio, skid);
    });

    matrix.appendChild(cell);
  });
});

/* highlight (matrix only) */
function applyHighlight(row, col){
  document.querySelectorAll(".cell").forEach(c => {
    if(c.dataset.row == row || c.dataset.col == col){
      c.classList.add("hover");
    }
  });
}

function clearHover(){
  document.querySelectorAll(".cell").forEach(c => c.classList.remove("hover"));
}

/* output */
function updateOutput(front, rear, ratio, skid){
  document.querySelector(".selection").textContent = `${front} × ${rear}`;
  document.getElementById("ratio").textContent = `Ratio: ${ratio}`;
  document.getElementById("skid").textContent = `Skid patches: ${skid}`;
}
``
