"use strict";

(function () {
  let resultarea;
  let input;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultarea = document.getElementById("resultarea");
    input = document.getElementById("superheroId");
    document.getElementById("submit").addEventListener("click", submit);
  }

  async function submit() {
    clearMessage();
    const id = input.value;

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ heroID: id }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/getOne", options);
      const result = await data.json();
      updatePage(result);
    } catch (err) {
      updateMessage(err.message, "error");
    }
  }

  function updatePage(queryResult) {
    if (queryResult) {
      if (queryResult.message) {
        updateMessage(queryResult.message, queryResult.type);
      } else {
        updateSuperheroData(queryResult);
      }
    } else {
      updateMessage("not found", "error");
    }
  }

  function updateSuperheroData(superhero) {
    resultarea.innerHTML = `
        <p><span class="legend">superhero ID:</span> ${superhero.heroID}</p> 
        <p><span class="legend">name:</span> ${superhero.name}</p> 
        <p><span class="legend">superproperty:</span> ${superhero.superproperty}</p> 
        <p><span class="legend">year of birth:</span> ${superhero.yearOfBirth}</p> 
        <p><span class="legend">strength:</span> ${superhero.strength}</p> 
`;
  }
})();
