async function loadCharactersStaff() {
  const apiUrl = `http://hp-api.herokuapp.com/api/characters/staff`;
  const result = await fetch(apiUrl);
  const staff = await result.json();
  return staff;
}

async function loadSeverusSnape() {
  const staff = await loadCharactersStaff();
  return staff.find((character) => character.name === `Severus Snape`);
}

function infoSeverusSnape(severusSnape) {
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info-div");
  document.body.append(infoDiv);

  const image = document.createElement("img");
  image.src = severusSnape.image;
  image.alt = "bilde av severus snape";
  infoDiv.append(image);

  const name = document.createElement("h2");
  name.textContent = severusSnape.name;
  infoDiv.append(name);

  //regne ut alder på severus snape
  const age = new Date().getFullYear() - severusSnape.yearOfBirth;
  const ageElement = document.createElement("p");
  ageElement.textContent = `Age: ${age}`;
  infoDiv.append(ageElement);

  // tryllekunst snakkeboble
  const spell = document.createElement("p");
  spell.textContent = `Wingardium Leviosa`;
  spell.classList.add("bubble");
  infoDiv.append(spell);
}

//lage knapp for å starte undervisning
function makeStartClassButton() {
  const button = document.createElement("button");
  button.textContent = `Trykk her for å starte undervisningen`;
  document.body.append(button);
  button.addEventListener(`click`, () => {
    console.log("todo");
  });
}

// loadSeverusSnape().then((snape) => console.log(snape));
//Professor Snape: Bilde, Navn, Alder, Tryllestav-informasjon. //

async function main() {
  const severusSnape = await loadSeverusSnape();
  infoSeverusSnape(severusSnape);
  makeStartClassButton();
}
main();
