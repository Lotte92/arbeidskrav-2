//1.fetch HP API http://hp-api.herokuapp.com/api/characters - view all characters
//http://hp-api.herokuapp.com/api/characters/students - view all characters who are Hogwarts students during the book series
//Oversikt over alle husene: createElement houseCard per hus.
//HouseCard onClick, function show students.
//StudentsCard: Bilde, navn, hus, alder, lever/lever ikke.
//if student Alive = false, style.color: red;
//if no picture = default picture
//if dead = age not show up
//if age unknown = "uvisst"
getCaracters("http://hp-api.herokuapp.com/api/characters").then(() => {
  console.log(caracterArray);
});

let caracterArray = [];

async function getCaracters(url) {
  const caracters = await fetch(url);
  const jsonData = await caracters.json();
  jsonData.forEach((caracter) => {
    if (caracter.image === "") {
      caracter.image = `https://cdn.pixabay.com/photo/2017/08/19/08/52/albus-dumbledore-2657724_1280.png`;
    }

    caractersClass = new Caracters(
      caracter.image,
      caracter.name,
      caracter.house,
      caracter.dateOfBirth,
      caracter.alive
    );

    caracterArray.push(caractersClass);
  });
}

class Caracters {
  constructor(image, name, house, dateOfBirth, alive) {
    this.image = image;
    this.name = name;
    this.house = house;
    this.dateOfBirth = dateOfBirth;
    this.alive = alive;
  }
}

let inputContainer = document.getElementById("input-container");
let createStudentBtn = document.createElement("button");
createStudentBtn.innerText = "Create your own student";
inputContainer.append(createStudentBtn);

let gryffindorContainer = document.getElementById("Gryffinfor-house");
let gryffindorBtn = document.createElement("button");
gryffindorBtn.innerText = "Show students of Gryffindor";
gryffindorBtn.addEventListener("click", () => {
  listStudents("Gryffindor", gryffindorContainer);
});

let slytherinContainer = document.getElementById("Slytherin-house");
let slytherinBtn = document.createElement("button");
slytherinBtn.innerText = "Show students of Slyterin";
slytherinBtn.addEventListener("click", () => {
  listStudents("Slytherin", slytherinContainer);
});

let ravenclawContainer = document.getElementById("Ravenclaw-house");
let ravenclawBtn = document.createElement("button");
ravenclawBtn.innerText = "Show students of Ravenclaw";
ravenclawBtn.addEventListener("click", () => {
  listStudents("Ravenclaw", ravenclawContainer);
});

let hufflepuffContainer = document.getElementById("Hufflepuff-house");
let hufflepuffBtn = document.createElement("button");
hufflepuffBtn.innerText = "Show students of Hufflepuff";
hufflepuffBtn.addEventListener("click", () => {
  listStudents("Hufflepuff", hufflepuffContainer);
});

let houseContainer = document.getElementById("house-container");
houseContainer.append(
  gryffindorContainer,
  slytherinContainer,
  ravenclawContainer,
  hufflepuffContainer
);
gryffindorContainer.append(gryffindorBtn);
slytherinContainer.append(slytherinBtn);
ravenclawContainer.append(ravenclawBtn);
hufflepuffContainer.append(hufflepuffBtn);

function listStudents(students, container) {
  for (let i = 0; i < caracterArray.length; i++) {
    let aliveTag = "";
    if (caracterArray[i].alive) {
      aliveTag = `<li> Alive: ${caracterArray[i].alive}</li>`;
    } else {
      aliveTag = `<li class="dead"> Alive: ${caracterArray[i].alive}</li>`;
    }

    if (caracterArray[i].house === `${students}`) {
      container.innerHTML += `<div id="${i}" class="student-card"> 
          <img src="${caracterArray[i].image}" alt="caracter-images"/>  
          <ul>
            <li> Name: ${caracterArray[i].name} </li>
            <li> House: ${caracterArray[i].house}</li>
            <li> Day Of Birth: ${caracterArray[i].dateOfBirth} </li>
            ${aliveTag}
          </ul>
        </div> `;
    }
  }
  addStudent(students);
}

createStudentBtn.addEventListener("click", () => {
  addStudent();
});

function addStudent(students) {
  `${students}-house`.innerHTML = "";
  let inputImg = document.getElementById(`img-input`).value;
  let inputName = document.getElementById(`name-input`).value;
  let inputHouse = document.getElementById(`house-input`).value;
  let inputBirthday = document.getElementById(`dateOfBirth-input`).value;

  const newStudent = {
    image: inputImg,
    name: inputName,
    house: inputHouse,
    dateOfBirth: inputBirthday,
    alive: "",
  };

  caracterArray.unshift(newStudent);

  localStorage.setItem(`session`, JSON.stringify(caracterArray));

  console.log(newStudent);
  if (newStudent.image === "") {
    newStudent.image = `https://cdn.pixabay.com/photo/2017/08/19/08/52/albus-dumbledore-2657724_1280.png`;
  }
}
