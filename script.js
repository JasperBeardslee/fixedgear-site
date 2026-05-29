const chainrings = [42,43,44,45,46,47,48,49,50,51,52,53,54,55];
const cogs = [12,13,14,15,16,17,18,19,20,21,22,23];

const xAxis    = document.getElementById("xAxis");
const yAxis    = document.getElementById("yAxis");
const matrix   = document.getElementById("matrix");

let selectedRow  = null;
let selectedCol  = null;
let selectedFront = null;
let selectedRear  = null;
let useImperial  = true;   // mph vs km/h

function gcd(a, b){ return b === 0 ? a : gcd(b, a % b); }

/* ── Axis labels ── */
chainrings.forEach(c => {
  const el = document.createElement("div");
  el.className = "axis";
  el.textContent = c;
  xAxis.appendChild(el);
});

cogs.forEach(c => {
  const el = document.createElement("div");
  el.className = "axis";
  el.textContent = c;
  yAxis.appendChild(el);
});

/* ── Matrix ── */
cogs.forEach((rear, i) => {
  chainrings.forEach((front, j) => {

    const ratio = (front / rear).toFixed(2);
    const skid  = rear / gcd(front, rear);

    const cell = document.createElement("div");
    cell.className   = "cell";
    cell.textContent = ratio;
    cell.dataset.row = i;
    cell.dataset.col = j;

    cell.addEventListener("mouseenter", () => {
      clearHover();
      highlight(i, j);
    });

    cell.addEventListener("mouseleave", () => {
      clearHover();
      if (selectedRow !== null) highlight(selectedRow, selectedCol);
    });

    cell.addEventListener("click", () => {
      document.querySelectorAll(".selected").forEach(n => n.classList.remove("selected"));
      cell.classList.add("selected");
      selectedRow   = i;
      selectedCol   = j;
      selectedFront = front;
      selectedRear  = rear;
      clearHover();
      highlight(selectedRow, selectedCol);
      updateOutput();
    });

    matrix.appendChild(cell);
  });
});

/* ── Highlight helpers ── */
function highlight(row, col){
  document.querySelectorAll(".cell").forEach(c => {
    if (c.classList.contains("selected")) return;
    if (c.dataset.row == row || c.dataset.col == col) c.classList.add("hover");
  });
}

function clearHover(){
  document.querySelectorAll(".cell").forEach(c => c.classList.remove("hover"));
}

/* ── Output update ── */
function updateOutput(){
  if (selectedFront === null) return;

  const front = selectedFront;
  const rear  = selectedRear;

  const wheelDia  = parseFloat(document.getElementById("wheelSize").value); // inches
  const cadence   = parseInt(document.getElementById("cadence").value);      // RPM
  const skid      = rear / gcd(front, rear);

  const ratio      = front / rear;
  const gearInches = ratio * wheelDia;
  const devMeters  = gearInches * Math.PI * 0.0254;
  const speedKmh   = devMeters * cadence * 60 / 1000;
  const speedMph   = speedKmh * 0.621371;

  document.querySelector(".selection").textContent = `${front} × ${rear}`;
  document.getElementById("ratio").textContent       = `Ratio: ${ratio.toFixed(2)}`;
  document.getElementById("skid").textContent       = `Skid patches: ${skid}`;
  document.getElementById("gearInches").textContent = `Gear inches: ${gearInches.toFixed(1)}"`;
  document.getElementById("speed").textContent       = useImperial
    ? `${speedMph.toFixed(1)} mph`
    : `${speedKmh.toFixed(1)} km/h`;
}

/* ── Controls ── */
document.getElementById("cadence").addEventListener("input", e => {
  document.getElementById("cadenceVal").textContent = e.target.value;
  updateOutput();
});

document.getElementById("wheelSize").addEventListener("change", updateOutput);

document.getElementById("btnMph").addEventListener("click", () => {
  useImperial = true;
  document.getElementById("btnMph").classList.add("active");
  document.getElementById("btnKph").classList.remove("active");
  updateOutput();
});

document.getElementById("btnKph").addEventListener("click", () => {
  useImperial = false;
  document.getElementById("btnKph").classList.add("active");
  document.getElementById("btnMph").classList.remove("active");
  updateOutput();
});
