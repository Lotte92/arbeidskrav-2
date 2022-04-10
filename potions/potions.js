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

function createHtmlInfoSeverusSnape(severusSnape) {
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

// Henter ut 10 random elever med sort og math.random.
async function onClickStartButton() {
  const students = await loadCharactersStudents();
  const sortedStudents = students.sort((student1, student2) => {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
  });

  const tenFirstStudents = sortedStudents.slice(0, 10);

  addStudentsToHtml(tenFirstStudents);
}

//lage knapp for å starte undervisning
function makeStartClassButton() {
  const button = document.createElement("button");
  button.textContent = `Trykk her for å starte undervisningen`;
  document.body.append(button);
  button.addEventListener(`click`, onClickStartButton);
}

// loadSeverusSnape().then((snape) => console.log(snape));
//Professor Snape: Bilde, Navn, Alder, Tryllestav-informasjon. //

// hente ut studenter
async function loadCharactersStudents() {
  const apiUrl = `http://hp-api.herokuapp.com/api/characters/students`;
  const result = await fetch(apiUrl);
  const students = await result.json();
  return students;
}

function addStudentsToHtml(students) {
  document.querySelector(".cards")?.remove();

  const cards = document.createElement("div");
  cards.classList.add("cards");
  document.body.append(cards);

  console.log(students);
  for (const student of students) {
    cards.append(createCard(student));
  }
}

function createCard(student) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = `rgb(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
    Math.random() * 100 + 155
  )}, ${Math.floor(Math.random() * 100 + 155)})`;

  const img = document.createElement("img");
  img.src = student.image;
  if (student.image === "") {
    img.src = "./noimage.png";
  }
  card.append(img);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  card.append(cardContent);

  const studentName = document.createElement("h2");
  studentName.textContent = student.name;
  cardContent.append(studentName);

  const studentHouse = document.createElement("p");
  studentHouse.textContent = student.house;
  cardContent.append(studentHouse);

  return card;
}

async function main() {
  const severusSnape = await loadSeverusSnape();
  createHtmlInfoSeverusSnape(severusSnape);
  makeStartClassButton();
}
main();
