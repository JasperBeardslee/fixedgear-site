const chainrings = [42,43,44,45,46,47,48,49,50,51,52,53,54,55];
const cogs = [12,13,14,15,16,17,18,19,20,21,22,23];

const xAxis = document.getElementById("xAxis");
const yAxis = document.getElementById("yAxis");
const matrix = document.getElementById("matrix");

let selectedRow = null;
let selectedCol = null;

/* MENU */
function toggleMenu(){
  document.getElementById("menu").classList.toggle("show");
}

/* GCD */
function gcd(a,b){ return b===0 ? a : gcd(b,a%b); }

/* X AXIS (aligned) */
let spacer = document.createElement("div");
spacer.className = "axis";
xAxis.appendChild(spacer);

chainrings.forEach(c=>{
  let el=document.createElement("div");
  el.className="axis";
  el.textContent=c;
  xAxis.appendChild(el);
});

/* Y AXIS */
cogs.forEach(c=>{
  let el=document.createElement("div");
  el.className="axis";
  el.textContent=c;
  yAxis.appendChild(el);
});

/* MATRIX */
cogs.forEach((rear,i)=>{
  chainrings.forEach((front,j)=>{

    let ratio=(front/rear).toFixed(2);
    let skid=rear/gcd(front,rear);

    let cell=document.createElement("div");
    cell.className="cell";
    cell.textContent=ratio;

    cell.dataset.row=i;
    cell.dataset.col=j;

    cell.addEventListener("mouseenter",()=>{
      clearHover();
      highlight(i,j);
    });

    cell.addEventListener("mouseleave",()=>{
      clearHover();
      if(selectedRow!==null){
        highlight(selectedRow,selectedCol);
      }
    });

    cell.addEventListener("click",()=>{
      document.querySelectorAll(".selected").forEach(c=>c.classList.remove("selected"));
      cell.classList.add("selected");

      selectedRow=i;
      selectedCol=j;

      update(front,rear,ratio,skid);

      clearHover();
      highlight(selectedRow,selectedCol);
    });

    matrix.appendChild(cell);
  });
});

/* HIGHLIGHT */
function highlight(row,col){
  document.querySelectorAll(".cell").forEach(c=>{
    if(c.dataset.row==row || c.dataset.col==col){
      c.classList.add("hover");
    }
  });
}

function clearHover(){
  document.querySelectorAll(".cell").forEach(c=>c.classList.remove("hover"));
}

/* OUTPUT */
function update(front,rear,ratio,skid){
  document.getElementById("selection").textContent=`${front} × ${rear}`;
  document.getElementById("ratio").textContent=`Ratio: ${ratio}`;
  document.getElementById("skid").textContent=`Skid patches: ${skid}`;
}
