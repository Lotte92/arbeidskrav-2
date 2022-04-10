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
    let editCard = document.createElement("li");
    editCard.classList.add("staff");
    editCard.style.display = "none";

    let staffName = document.createElement("h3");
    staffName.innerText = staff[i].name;
    let staffCard = document.createElement("li");
    let staffHouse = document.createElement("p");
    staffHouse.classList.add("staff-house");
    staffHouse.innerText = `House: ${staff[i].house}`;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteStaff(i, staff);
    });

    //House
    if (staff[i].house == "Ravenclaw") {
      staffCard.classList.add("staff-ravenclaw");
    } else if (staff[i].house == "Gryffindor") {
      staffCard.classList.add("staff-gryffindor");
    } else if (staff[i].house == "Slytherin") {
      staffCard.classList.add("staff-slytherin");
    } else if (staff[i].house == "Hufflepuff") {
      staffCard.classList.add("staff-hufflepuff");
    } else {
      staffCard.classList.add("staff");
    }

    //Patronus

    let staffPatronus = document.createElement("p");
    staffPatronus.classList.add("staff-patronus");
    staffPatronus.style.display = "none";
    if (staff[i].patronus == "") {
      staffPatronus.innerHTML = "Patronus: Unknown";
    } else {
      staffPatronus.innerHTML = `Patronus: ${staff[i].patronus}`;
    }

    staffCard.addEventListener("mouseover", function () {
      staffPatronus.style.display = "inline-block";
    });

    staffCard.addEventListener("mouseout", function () {
      staffPatronus.style.display = "none";
    });

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
