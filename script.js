let selectedRow = null;
let selectedCol = null;

function applyHover(row, col){
  document.querySelectorAll(".mcell").forEach(c => {
    if(c.dataset.row === row || c.dataset.col === col){
      c.classList.add("hoverHL");
    }
  });
}

function clearHover(){
  document.querySelectorAll(".mcell").forEach(c => c.classList.remove("hoverHL"));
}

cell.addEventListener("mouseenter", () => {
  clearHover();

  applyHover(i.toString(), j.toString());

  if(selected){
    setHint(`Hovering: ${front} × ${rear}`);
  }
});

cell.addEventListener("click", () => {
  document.querySelectorAll(".selected").forEach(n => n.classList.remove("selected"));

  cell.classList.add("selected");

  selected = { front, rear, ratio, skid };

  /* ✅ persist row/column highlight */
  selectedRow = i.toString();
  selectedCol = j.toString();

  clearHover();
  applyHover(selectedRow, selectedCol);

  setSelectedInfo();
});
