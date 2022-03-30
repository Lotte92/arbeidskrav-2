//1.fetch HP API http://hp-api.herokuapp.com/api/characters - view all characters
//http://hp-api.herokuapp.com/api/characters/students - view all characters who are Hogwarts students during the book series
//Oversikt over alle husene: createElement houseCard per hus.
//HouseCard onClick, function show students.
//StudentsCard: Bilde, navn, hus, alder, lever/lever ikke.
//if student dead = color: red;
//if no picture = default picture
//if dead = age not show up
//if age unknown = "uvisst"

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

let gryffindorCard = document.createElement("div");
let gryffindorBtn = document.createElement("button");
gryffindorBtn.innerText = "Show students of Gryffindor";
let gryffindorList = document.createElement("ul");

document.body.append(gryffindorCard);
gryffindorCard.append(gryffindorBtn, gryffindorList);

gryffindorBtn.addEventListener("click", () => {
  function listGryffindorStudents() {
    for (let i = 0; i < caracterArray.length; i++) {
      if (caracterArray[i].house === "Gryffindor") {
        gryffindorList.innerHTML += `<div> <li id="${i}"> 
       <img src="${caracterArray[i].image}" alt="caracter-images"/> 
        <p> 
    Name: ${caracterArray[i].name}
     House: ${caracterArray[i].house}
      Date of Birth: ${caracterArray[i].dateOfBirth}
       Alive: ${caracterArray[i].alive}
    </p> </li> </div>`;
      }
      if (caracterArray[i].image === "") {
        caracterArray[i].image ===
          `<img src="/assets/default-picture.webp" alt="default-picture"/>`;
      }
    }
  }
  listGryffindorStudents();
});

gryffindorCard.style.backgroundColor = "lightgrey";
gryffindorCard.style.height = "300px";
gryffindorCard.style.width = "400px";

getCaracters("http://hp-api.herokuapp.com/api/characters").then(() => {
  console.log(caracterArray);
});

class Caracters {
  constructor(image, name, house, dateOfBirth, alive) {
    this.image = image;
    this.name = name;
    this.house = house;
    this.dateOfBirth = dateOfBirth;
    this.alive = alive;
  }
}
