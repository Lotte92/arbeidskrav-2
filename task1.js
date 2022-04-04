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

let gryffindorContainer = document.createElement("div");
let gryffindorBtn = document.createElement("button");
gryffindorBtn.innerText = "Show students of Gryffindor";
let createStudentBtn = document.createElement("button");
createStudentBtn.innerText = "Create your own student";

let studentCard = document.createElement("div");

document.body.append(createStudentBtn, gryffindorContainer);
gryffindorContainer.append(gryffindorBtn, studentCard);

gryffindorBtn.addEventListener("click", () => {
  function listGryffindorStudents() {
    for (let i = 0; i < caracterArray.length; i++) {
      if (caracterArray[i].house === "Gryffindor") {
        studentCard.innerHTML += `<div id="${i}" class="student-card"> 
         <img src="${caracterArray[i].image}" alt="caracter-images"/>  
     <ul> <li> Name: ${caracterArray[i].name} </li>
      <li> House: ${caracterArray[i].house}</li>
       <li> Day Of Birth: ${caracterArray[i].dateOfBirth} </li>
       <li> Alive: ${caracterArray[i].alive}</li></ul>
    </div> `;
      }
    }
  }

  listGryffindorStudents();
});

gryffindorContainer.style.backgroundColor = "lightgrey";
gryffindorContainer.style.height = "300px";
gryffindorContainer.style.width = "400px";

createStudentBtn.addEventListener("click", () => {
  addStudent();
});

function addStudent() {
  studentCard.innerHTML = "";
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
