const chainrings = [42,43,44,45,46,47,48,49,50,51,52,53,54,55];
const cogs = [12,13,14,15,16,17,18,19,20,21,22,23];

const xAxis = document.getElementById("xAxis");
const yAxis = document.getElementById("yAxis");
const matrix = document.getElementById("matrix");

let selectedRow = null;
let selectedCol = null;

function gcd(a,b){
  return b===0 ? a : gcd(b,a%b);
}

/* Build X axis (14 items, no spacer needed in this layout) */
chainrings.forEach(c=>{
  const el = document.createElement("div");
  el.className = "axis";
  el.textContent = c;
  xAxis.appendChild(el);
});

/* Build Y axis (12 items) */
cogs.forEach(c=>{
  const el = document.createElement("div");
  el.className = "axis";
  el.textContent = c;
  yAxis.appendChild(el);
});

/* Build matrix */
cogs.forEach((rear,i)=>{
  chainrings.forEach((front,j)=>{

    const ratio = (front/rear).toFixed(2);
    const skid = rear / gcd(front,rear);

    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = ratio;

    cell.dataset.row = i;
    cell.dataset.col = j;

    cell.addEventListener("mouseenter",()=>{
      clearHover();
      highlight(i,j);
    });

    cell.addEventListener("mouseleave",()=>{
      clearHover();
      if(selectedRow !== null){
        highlight(selectedRow, selectedCol);
      }
    });

    cell.addEventListener("click",()=>{
      // clear previous selection
      document.querySelectorAll(".selected").forEach(n => n.classList.remove("selected"));
      cell.classList.add("selected");

      selectedRow = i;
      selectedCol = j;

      update(front, rear, ratio, skid);

      // keep row/col highlight on selected
      clearHover();
      highlight(selectedRow, selectedCol);
    });

    matrix.appendChild(cell);
  });
});

/* Highlight row+col, but never override selected */
function highlight(row,col){
  document.querySelectorAll(".cell").forEach(c=>{
    if (c.classList.contains("selected")) return; // keep orange visible
    if(c.dataset.row == row || c.dataset.col == col){
      c.classList.add("hover");
    }
  });
}

function clearHover(){
  document.querySelectorAll(".cell").forEach(c=>c.classList.remove("hover"));
}

function update(front,rear,ratio,skid){
  document.querySelector(".selection").textContent = `${front} × ${rear}`;
  document.getElementById("ratio").textContent = `Ratio: ${ratio}`;
  document.getElementById("skid").textContent = `Skid patches: ${skid}`;
}
