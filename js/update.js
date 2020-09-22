"use strict";

(function () {
  let superheroIdField;
  let nameField;
  let superpropertyField;
  let birthYearField;
  let strengthField;
  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    superheroIdField = document.getElementById("superheroId");
    nameField = document.getElementById("name");
    superpropertyField = document.getElementById("superproperty");
    birthYearField = document.getElementById("birthyear");
    strengthField = document.getElementById("strength");

    readOnlyState(searchState);

    document.getElementById("submit").addEventListener("click", submit);
  }

  async function submit() {
    clearMessage();

    try {
      if (searchState) {
        const id = superheroIdField.value;
        const options = {
          method: "POST",
          body: JSON.stringify({
            heroID: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const data = await fetch("/getOne", options);
        const queryResult = await data.json();

        if (queryResult) {
          if (queryResult.message) {
            updateMessage(queryResult.message, queryResult.type);
          } else {
            updateSuperheroData(queryResult);
          }
        } else {
          updateMessage("Not found", "error");
        }
      } else {
        const heroID = superheroIdField.value;
        const name = nameField.value;
        const superproperty = superpropertyField.value;
        const yearOfBirth = birthYearField.value;
        const strength = strengthField.value;

        const options = {
          method: "POST",
          body: JSON.stringify({
            heroID,
            name,
            superproperty,
            yearOfBirth,
            strength,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const data = await fetch("/update", options);
        const result = await data.json();

        if (result.message) {
          updateMessage(result.message, result.type);
        }

        searchState = true;
        readOnlyState(searchState);
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  }

  function readOnlyState(state) {
    if (state) {
      superheroIdField.removeAttribute("readonly");
      nameField.setAttribute("readonly", state);
      superproperty.setAttribute("readonly", state);
      birthYearField.setAttribute("readonly", state);
      strengthField.setAttribute("readonly", state);
    } else {
      superheroIdField.setAttribute("readonly", true);
      nameField.removeAttribute("readonly");
      superproperty.removeAttribute("readonly");
      birthYearField.removeAttribute("readonly");
      strengthField.removeAttribute("readonly");
    }
  }

  function updateSuperheroData(superhero) {
    superheroIdField.value = +superhero.heroID;
    nameField.value = superhero.name;
    superpropertyField.value = superhero.superproperty;
    birthYearField.value = +superhero.yearOfBirth;
    strengthField.value = superhero.strength;
    searchState = false;
    readOnlyState(searchState);
  }
})();
