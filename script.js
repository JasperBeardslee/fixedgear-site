:root{
  --bg:#1a1a22;
  --banner:#06060a;
  --table:#1c1c26;

  --purple:#b794f4;
  --grid:rgba(183,148,244,0.25);
  --hover:rgba(183,148,244,0.18);
  --orange:#f6ad55;

  --cell:44px;
  --radius:10px;
}

/* Background pattern */
body{
  margin:0;
  font-family:'Montserrat', sans-serif;
  color:#f5f5f5;

  background-color:var(--bg);
  background-image:url("./assets/bikepattern.jpg");
  background-repeat:repeat;
  background-size:200px;
}

/* Subtle overlay (does NOT block clicks) */
body::before{
  content:"";
  position:fixed;
  inset:0;
  background:rgba(20,20,26,0.92);
  pointer-events:none;
  z-index:0;
}

.banner, .main{
  position:relative;
  z-index:1;
}

/* Banner */
.banner{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:18px 40px;
  background:var(--banner);
  border-bottom:1px solid rgba(183,148,244,0.25);
}

.brand{
  font-family:'Space Grotesk', sans-serif;
  font-size:34px;
  font-weight:700;
  color:#fff;
  letter-spacing:1px;

  -webkit-text-stroke:1px rgba(183,148,244,0.6);
  text-shadow:0 0 6px rgba(183,148,244,0.4);
}

.nav{
  font-family:'Space Grotesk', sans-serif;
  display:flex;
  gap:24px;
  font-size:16px;
  font-weight:600;
}

.nav span{
  color:#fff;
  -webkit-text-stroke:0.6px rgba(183,148,244,0.5);
  text-shadow:0 0 4px rgba(183,148,244,0.3);
}

/* Main layout */
.main{
  display:flex;
  justify-content:center;
  padding:40px 0;
}

.layout{
  display:flex;
  align-items:center;
  gap:50px;
}

/* Table wrap */
.table-wrap{
  display:flex;
  align-items:center;
  gap:10px;
}

.y-label{
  writing-mode:vertical-rl;
  transform:rotate(180deg);
  font-size:18px;
  font-weight:600;
}

/*
  Grid layout:
  columns: [y-axis] + 14 ratio columns
  rows:    [label] [x-axis] + 12 ratio rows
*/
.table-grid{
  display:grid;
  grid-template-columns: var(--cell) repeat(14, var(--cell));
  grid-template-rows: auto var(--cell) repeat(12, var(--cell));
  gap:0;
}

/* Chainring label spans ratio columns only (col 2..15) */
.x-label{
  grid-column: 2 / span 14;
  grid-row: 1;
  text-align:center;
  font-size:18px;
  font-weight:600;
  margin-bottom:10px;
}

/* Blank corner in row 2 col 1 */
.corner{
  grid-column:1;
  grid-row:2;
  width:var(--cell);
  height:var(--cell);
}

/* X axis row 2 col 2..15 */
.x-axis{
  grid-column:2 / span 14;
  grid-row:2;
  display:grid;
  grid-template-columns: repeat(14, var(--cell));
}

/* Y axis rows 3..14 col 1 */
.y-axis{
  grid-column:1;
  grid-row:3 / span 12;
  display:grid;
  grid-template-rows: repeat(12, var(--cell));
}

/* Matrix rows 3..14 col 2..15 */
.matrix{
  grid-column:2 / span 14;
  grid-row:3 / span 12;

  display:grid;
  grid-template-columns: repeat(14, var(--cell));
  grid-template-rows: repeat(12, var(--cell));

  background:var(--table);
  border:2px solid var(--purple);
  border-radius:var(--radius);
  overflow:hidden;
}

/* Axis cells */
.axis{
  width:var(--cell);
  height:var(--cell);
  display:flex;
  align-items:center;
  justify-content:center;
  box-sizing:border-box;
}

/* Ratio cells */
.cell{
  width:var(--cell);
  height:var(--cell);
  display:flex;
  align-items:center;
  justify-content:center;

  border-right:1px solid var(--grid);
  border-bottom:1px solid var(--grid);

  cursor:pointer;
  user-select:none;

  box-sizing:border-box;     /* prevents jump/reflow */
  line-height:1;             /* prevents font metric wobble */
}

/* Row/col highlight */
.hover{
  background:var(--hover);
}

/* ✅ Selected MUST win over hover */
.selected{
  background:var(--orange) !important;
  color:#111 !important;
}

/* Output */
.output-container{
  text-align:center;
}

.output-title{
  font-size:18px;
  font-weight:600;
  margin-bottom:6px;
}

.output-box{
  border:2px solid var(--purple);
  border-radius:var(--radius);
  width:200px;
  height:200px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  background:var(--table);
}

.selection{
  font-size:18px;
  font-weight:600;
}

#ratio, #gearInches, #skid{
  font-size:13px;
  opacity:0.85;
  margin-top:4px;
}

/* Controls below output box */
.controls{
  margin-top:18px;
  width:200px;
  border:2px solid var(--purple);
  border-radius:var(--radius);
  overflow:hidden;
  background:var(--table);
}

.control-label,
.speed-row{
  display:flex;
  flex-direction:column;
  gap:6px;
  padding:10px 14px;
  font-size:12px;
  font-weight:600;
  opacity:0.8;
  letter-spacing:0.5px;
  text-transform:uppercase;
  border-bottom:1px solid rgba(183,148,244,0.3);
}

.control-label:last-child,
.speed-row:last-child{
  border-bottom:none;
}

.control-label select{
  background:#1c1c26;
  color:#f5f5f5;
  border:1px solid var(--purple);
  border-radius:6px;
  padding:6px 8px;
  font-size:13px;
  font-family:'Montserrat', sans-serif;
  cursor:pointer;
  appearance:none;
}

.control-label input[type=range]{
  -webkit-appearance:none;
  width:100%;
  height:4px;
  border-radius:2px;
  background:rgba(183,148,244,0.3);
  outline:none;
  cursor:pointer;
}

.control-label input[type=range]::-webkit-slider-thumb{
  -webkit-appearance:none;
  width:16px;
  height:16px;
  border-radius:50%;
  background:var(--purple);
  cursor:pointer;
}

/* Speed display + unit toggle */
.speed-row{
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}

.speed-display{
  font-size:28px;
  font-weight:700;
  font-family:'Space Grotesk', sans-serif;
  color:var(--purple);
  min-width:90px;
}

.unit-toggle{
  display:flex;
  gap:4px;
}

.unit-btn{
  background:transparent;
  border:1px solid var(--purple);
  color:var(--purple);
  border-radius:6px;
  padding:4px 10px;
  font-size:12px;
  font-family:'Montserrat', sans-serif;
  font-weight:600;
  cursor:pointer;
  opacity:0.5;
  transition:opacity 0.15s;
}

.unit-btn.active{
  opacity:1;
  background:rgba(183,148,244,0.15);
}
