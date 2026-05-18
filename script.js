const chainrings = [42,43,44,45,46,47,48,49,50,51,52,53,54,55];
const cogs      = [12,13,14,15,16,17,18,19,20,21,22,23]; // includes 12 for your “53×12” example

const grid = document.getElementById("gearGrid");

let selected = null; // { front, rear, ratio, skid, cellEl }

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function calc(front, rear) {
  const ratio = (front / rear).toFixed(2);
  const skid = rear / gcd(front, rear);
  return { ratio, skid };
}

function setInfoToSelection() {
  const setupEl = document.getElementById("setup");
  const ratioEl = document.getElementById("metricRatio");
  const skidEl  = document.getElementById("metricSkid");

  if (!selected) {
    setupEl.textContent = "Click a ratio";
    ratioEl.textContent = "";
    skidEl.textContent  = "";
    return;
  }

  setupEl.textContent = `${selected.front} × ${selected.rear}`;
  ratioEl.textContent = `Ratio: ${selected.ratio}`;
  skidEl.textContent  = `Skid patches: ${selected.skid}`;
}

function setHoverHint(text) {
  document.getElementById("hoverHint").textContent = text || "";
}

function clearHoverHighlights() {
  grid.querySelectorAll(".hoverHL").forEach(el => el.classList.remove("hoverHL"));
}

function applyHoverHighlights(row, col) {
  // highlight every cell with same row or same col (includes axis cells too)
  grid.querySelectorAll(`[data-row="${row}"]`).forEach(el => el.classList.add("hoverHL"));
  grid.querySelectorAll(`[data-col="${col}"]`).forEach(el => el.classList.add("hoverHL"));
}

// Build grid: 1 header row + N cog rows, 1 axis col + 14 chainring cols
// Row 0 is header; Col 0 is cog axis
function buildGrid() {
  // Row 0: corner + chainring axis
  addCell("", "cell corner"); // corner (0,0)

  chainrings.forEach((front, j) => {
    const el = addCell(front, "cell axis");
    el.dataset.row = "0";
    el.dataset.col = String(j + 1); // chainring columns start at 1
  });

  // Remaining rows: cog axis + ratios
  cogs.forEach((rear, i) => {
    const rowIndex = String(i + 1);

    // Cog axis cell at col 0
    const axisEl = addCell(rear, "cell axis");
    axisEl.dataset.row = rowIndex;
    axisEl.dataset.col = "0";

    chainrings.forEach((front, j) => {
      const colIndex = String(j + 1);
      const { ratio, skid } = calc(front, rear);

      const cellEl = addCell(ratio, "cell ratio");
      cellEl.dataset.row = rowIndex;
      cellEl.dataset.col = colIndex;
      cellEl.dataset.front = String(front);
      cellEl.dataset.rear = String(rear);
      cellEl.dataset.ratio = ratio;
      cellEl.dataset.skid = String(skid);

      cellEl.addEventListener("mouseenter", () => {
        clearHoverHighlights();
        applyHoverHighlights(rowIndex, colIndex);

        // If nothing selected yet, hover drives the info panel (nice onboarding)
        if (!selected) {
          document.getElementById("setup").textContent = `${front} × ${rear}`;
          document.getElementById("metricRatio").textContent = `Ratio: ${ratio}`;
          document.getElementById("metricSkid").textContent  = `Skid patches: ${skid}`;
          setHoverHint("");
        } else {
          // Otherwise: keep selected info, only show hover hint
          setHoverHint(`Hovering: ${front} × ${rear}`);
        }
      });

      cellEl.addEventListener("mouseleave", () => {
        clearHoverHighlights();
        // keep selected info stable
        if (selected) setHoverHint("");
      });

      cellEl.addEventListener("click", () => {
        // clear previous selected
        grid.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));

        selected = {
          front,
          rear,
          ratio,
          skid,
          cellEl
        };

        cellEl.classList.add("selected");
        setHoverHint("");
        setInfoToSelection();
      });
    });
  });

  // If mouse leaves the whole grid, clear row/col highlighting + hover hint
  grid.addEventListener("mouseleave", () => {
    clearHoverHighlights();
    if (selected) setHoverHint("");
  });
}

function addCell(text, className) {
  const el = document.createElement("div");
  el.className = className;
  el.textContent = text;
  grid.appendChild(el);
  return el;
}

buildGrid();
setInfoToSelection();
