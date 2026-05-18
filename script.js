const chainrings = [42,43,44,45,46,47,48,49,50,51,52,53,54,55];
const cogs      = [12,13,14,15,16,17,18,19,20,21,22,23];

const xAxis = document.getElementById("xAxis");
const yAxis = document.getElementById("yAxis");
const matrix = document.getElementById("matrix");

let selected = null; // {front, rear, ratio, skid, el}

function gcd(a,b){ return b===0 ? a : gcd(b, a%b); }
function calc(front, rear){
  return {
    ratio: (front/rear).toFixed(2),
    skid: rear / gcd(front, rear)
  };
}

function setSelectedInfo(){
  const setup = document.getElementById("setup");
  const rEl = document.getElementById("metricRatio");
  const sEl = document.getElementById("metricSkid");

  if(!selected){
    setup.textContent = "Click a ratio";
    rEl.textContent = "";
    sEl.textContent = "";
    return;
  }

  setup.textContent = `${selected.front} × ${selected.rear}`;
  rEl.textContent = `Ratio: ${selected.ratio}`;
  sEl.textContent = `Skid patches: ${selected.skid}`;
}

function setHint(text=""){
  document.getElementById("hint").textContent = text;
}

function clearHover(){
  document.querySelectorAll(".hoverHL").forEach(n => n.classList.remove("hoverHL"));
}

function applyHover(rowIndex, colIndex){
  // highlight row + col in matrix
  matrix.querySelectorAll(`[data-row="${rowIndex}"]`).forEach(n => n.classList.add("hoverHL"));
  matrix.querySelectorAll(`[data-col="${colIndex}"]`).forEach(n => n.classList.add("hoverHL"));

  // highlight matching axis cells
  xAxis.querySelector(`[data-col="${colIndex}"]`)?.classList.add("hoverHL");
  yAxis.querySelector(`[data-row="${rowIndex}"]`)?.classList.add("hoverHL");
}

function buildAxes(){
  // X axis cells
  chainrings.forEach((front, j) => {
    const c = document.createElement("div");
    c.className = "axisCell";
    c.textContent = front;
    c.dataset.col = String(j);
    xAxis.appendChild(c);
  });

  // Y axis cells
  cogs.forEach((rear, i) => {
    const c = document.createElement("div");
    c.className = "axisCell";
    c.textContent = rear;
    c.dataset.row = String(i);
    yAxis.appendChild(c);
  });
}

function buildMatrix(){
  cogs.forEach((rear, i) => {
    chainrings.forEach((front, j) => {
      const { ratio, skid } = calc(front, rear);

      const cell = document.createElement("div");
      cell.className = "mcell";
      cell.textContent = ratio;

      cell.dataset.row = String(i);
      cell.dataset.col = String(j);

      cell.addEventListener("mouseenter", () => {
        clearHover();
        applyHover(String(i), String(j));

        // Output stays on SELECTED; hover only adds hint
        if(selected){
          setHint(`Hovering: ${front} × ${rear}`);
        } else {
          // nice onboarding: show hover if nothing selected yet
          document.getElementById("setup").textContent = `${front} × ${rear}`;
          document.getElementById("metricRatio").textContent = `Ratio: ${ratio}`;
          document.getElementById("metricSkid").textContent = `Skid patches: ${skid}`;
          setHint("");
        }
      });

      cell.addEventListener("mouseleave", () => {
        clearHover();
        if(selected) setHint("");
      });

      cell.addEventListener("click", () => {
        document.querySelectorAll(".selected").forEach(n => n.classList.remove("selected"));
        cell.classList.add("selected");

        selected = { front, rear, ratio, skid, el: cell };
        setHint("");
        setSelectedInfo();
      });

      matrix.appendChild(cell);
    });
  });

  // leaving the whole matrix clears hover highlight
  matrix.addEventListener("mouseleave", () => {
    clearHover();
    if(selected) setHint("");
  });
}

buildAxes();
buildMatrix();
setSelectedInfo();
