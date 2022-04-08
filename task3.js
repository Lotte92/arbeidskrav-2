let getCharacters = async () => {
  fetch("http://hp-api.herokuapp.com/api/characters")
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      throw Error("ERROR");
    })
    .then((data) => {
      filterStaff(data);
    })
    .catch((err) => console.log("first", err));
};
getCharacters();
let staff = [];

function filterStaff(data) {
  staff = data.filter(function (data) {
    return data.hogwartsStaff == true;
  });
  showStaff(staff);
  return staff;
}

function showStaff(staff) {
  console.log(staff);
  let staffList = document.querySelector(".staff-list");
  staffList.innerHTML = "";
  for (let i = 0; i < staff.length; i++) {
    let staffName = document.createElement("h3");
    let editCard = document.createElement("ul");
    let staffCard = document.createElement("ul");
    staffName.innerText = staff[i].name;
    let staffHouse = document.createElement("p");
    staffHouse.classList.add("staff-house");
    staffHouse.innerText = `House: ${staff[i].house}`;
    if (staff[i].house == "Gryffindor") {
      staffCard.classList.add("staff-gryffindor");
    } else if (staff[i].house == "Slytherin") {
      staffCard.classList.add("staff-slytherin");
    } else if (staff[i].house == "Hufflepuff") {
      staffCard.classList.add("staff-hufflepuff");
    } else if (staff[i].house == "Ravenclaw") {
      staffCard.classList.add("staff-ravenclaw");
    }

    let staffPatronus = document.createElement("p");
    staffPatronus.classList.add("staff-patronus");
    if (staff[i].patronus == "") {
      staffPatronus.innerText = "Patronus: Unknown";
    } else {
      staffPatronus.innerText = `Patronus: ${staff[i].patronus}`;
    }

    let staffImg = document.createElement("img");
    staffImg.classList.add(".staff-img");
    if (staff[i].image == "") {
      staffImg.src = "/assets/default-img.jpeg";
    } else {
      staffImg.src = staff[i].image;
    }

    staffList.append(staffCard, editCard);
    staffCard.append(staffName, staffHouse, staffPatronus, staffImg);
  }
}
