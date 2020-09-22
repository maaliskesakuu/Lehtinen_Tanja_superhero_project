"use strict";

(function () {
  let superheroIdField;
  let nameField;
  let superpropertyField;
  let birthYearField;
  let strengthField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    superheroIdField = document.getElementById("superheroId");
    nameField = document.getElementById("name");
    superpropertyField = document.getElementById("superproperty");
    birthYearField = document.getElementById("birthyear");
    strengthField = document.getElementById("strength");

    document.getElementById("submit").addEventListener("click", submit);
  }

  async function submit() {
    clearMessage();

    const heroID = +superheroIdField.value;
    const name = nameField.value;
    const superproperty = superpropertyField.value;
    const yearOfBirth = birthYearField.value;
    const strength = strengthField.value;

    try {
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

      const data = await fetch("/insert", options);
      const result = await data.json();

      if (result.message) {
        updateMessage(result.message, result.type);
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  }
})();
