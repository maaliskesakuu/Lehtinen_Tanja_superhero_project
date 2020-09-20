"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const data = await fetch("/all");
      const superheros = await data.json();
      const resultset = document.getElementById("resultset");
      for (let superhero of superheros) {
        const tr = document.createElement("tr");
        tr.appendChild(buildElement(superhero.heroID));
        tr.appendChild(buildElement(superhero.name));
        tr.appendChild(buildElement(superhero.superproperty));
        tr.appendChild(buildElement(superhero.yearOfBirth));
        tr.appendChild(buildElement(superhero.strength));
        resultset.appendChild(tr);
      }
    } catch (err) {
      document.getElementById(
        "resultarea"
      ).innerHTML = `<p class="error">${err.message}</p>`;
    }
  }

  function buildElement(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
