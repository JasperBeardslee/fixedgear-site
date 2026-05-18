const chainrings = [42,43,44,45,46,47,48,49,50,51,52,53,54,55];
const cogs = [13,14,15,16,17,18,19,20,21,22,23];

const table = document.getElementById("gearTable");

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

cogs.forEach(cog => {
  const row = document.createElement("div");
  row.className = "row";

  chainrings.forEach(chainring => {
    let ratio = (chainring / cog).toFixed(2);
    let skid = cog / gcd(chainring, cog);

    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = ratio;

    cell.addEventListener("click", () => {
      document.querySelectorAll(".cell").forEach(c => c.classList.remove("active"));
      cell.classList.add("active");

      document.getElementById("selection").textContent =
        `${chainring} x ${cog}`;

      document.getElementById("ratio").textContent = ratio;
      document.getElementById("skid").textContent = skid;
    });

    row.appendChild(cell);
  });

  table.appendChild(row);
});
