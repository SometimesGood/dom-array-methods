/* -------------------------------- MODEL -------------------------------*/
/* -------------------------------- MODEL -------------------------------*/
/* -------------------------------- MODEL -------------------------------*/

// DOM VARIABLES

const mainContainer = document.getElementById("container");
const main = document.getElementById("main-bar");
let addUserButton = document.getElementById("addUser");
let doubleButton = document.getElementById("double");
let millionButton = document.getElementById("million");
let sortButton = document.getElementById("sort");
let calcWealth = document.getElementById("calcwealth");
let userNumber = document.getElementById("multiplyNumber");
let multiplyNumberButton = document.getElementById("multiply");
//let sortArrowMoney = document.getElementById("sortByMoney");
//let sortArrowName = document.getElementById("sortByName");
let sortByNameDesButton = document.getElementById("nameDes");
let sortByNameAscButton = document.getElementById("nameAsc");
let sortByMoneyDesButton = document.getElementById("moneyDes");
let sortByMoneyAscButton = document.getElementById("moneyAsc");

// preparing DOM elements
const formContainer = document.getElementById("formContainer");
let submitButton = document.getElementById("submitButton");
let genderInput = document.getElementById("genderInput");
let nameInput = document.getElementById("nameInput");
let moneyInput = document.getElementById("moneyInput");
let maleCheck = document.getElementById("male");
let femaleCheck = document.getElementById("female");

let data = [];

function addSelfUser() {
  const usernameInput = document.getElementById("usernameInput").value;
  const userMoney = document.getElementById("userMoneyInput").value;
  changeContainerStyle();
  let selfUser = {
    gender: whichGender(),
    name: usernameInput,
    money: Math.floor(userMoney),
  };
  addData(selfUser);
}

// FORMAT MONEY FUNCTION
//stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
// NEXT TIME USE INTL.numberformat. Read about it in the link above
function formatMoney(moneyValue) {
  let formattedValue =
    moneyValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " NOK";
  return formattedValue;
}

// fetch random users and add money
async function getRandomUser() {
  // regular exp for only allowing names which uses the latin alfabeth
  let regex = new RegExp("^[a-zA-Z]+$");
  // SJekk ut designet på denne nettsiden ikoner ser bra ut
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  console.log(user);

  const newUser = {
    gender: user.gender,
    name: ` ${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    //picture: user.picture.thumbnail,
  };
  // replace persons that has names which are using NON-latin character
  if (regex.test(user.name.first)) {
    addData(newUser);
  } else {
    getRandomUser();
  }
}

// .then(res => res.json()).then(data => {})
//getRandomUser();

/* add person, used if the person has a name with 
only latin characters in their name*/
function addData(user) {
  data.push(user);
  updateDOM();
}

// doubles the money of every person
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// multiply by the number entered
function multiplyMoney(multiplier) {
  multiplier = userNumber.value;
  if (multiplier > 0) {
    data = data.map((user) => {
      return { ...user, money: user.money * multiplier };
    });
    updateDOM();
    numberWarning(false);
  } else {
    numberWarning(true);
  }
}

// sort by richest
function sortByMoneyDes() {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}

// sort by poorest
function sortByMoneyAsc() {
  data.sort((a, b) => {
    return a.money - b.money;
  });
  updateDOM();
}

// sort alphabetical
function sortByNameDes() {
  data.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    return 0;
  });
  updateDOM();
}

// sort reverse alphabetical
function sortByNameAsc() {
  data.sort((a, b) => {
    if (a.name > b.name) return -1;
    else if (a.name < b.name) return 1;
    return 0;
  });
  updateDOM();
}

// show only millionaires
function onlyMillionaires() {
  data = data.filter((user) => {
    return user.money > 999999;
  });
  updateDOM();
}

// sum total money
function totalMoney() {
  allCash = data.reduce((acc, user) => (acc += user.money), 0);
  showTotal(allCash);
}

function whichGender() {
  if (maleCheck.checked == true) {
    return "male";
  } else return "female";
}

/* -------------------------------- VIEW -------------------------------*/
/* -------------------------------- VIEW -------------------------------*/
/* -------------------------------- VIEW -------------------------------*/

// Insert person into the UI with name and income
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person Wealth</strong></h2>";

  const header = document.createElement("div");
  header.classList.add("person");
  if (genderInput.checked == true) {
    header.innerHTML = `<h4>Gender</h4>`;
  }
  if (nameInput.checked == true) {
    header.innerHTML += `<h4 id="yolo">Name</h4>`;
  }
  if (moneyInput.checked == true) {
    header.innerHTML += `<h4>Money</h4>`;
  }

  main.appendChild(header);

  providedData.forEach(function (item) {
    const element = document.createElement("div");

    element.classList.add("person");

    if (genderInput.checked == true) {
      element.innerHTML = `<strong>${item.gender}</strong>`;
    }
    if (nameInput.checked == true) {
      element.innerHTML += `<strong>${item.name}</strong>`;
    }
    if (moneyInput.checked == true) {
      element.innerHTML += `<strong>${formatMoney(item.money)}</strong>`;
    }

    /* thumbnails for each user
    <img src="${item.picture}"> */

    main.appendChild(element);
  });
}

// animation for the input field
function numberWarning(flag) {
  if (flag == true) {
    userNumber.classList.add("shake-horizontal");
  } else {
    userNumber.classList.remove("shake-horizontal");
  }
}

function showTotal(value) {
  let totalCash = document.createElement("DIV");
  console.log(value);
  totalCash.innerHTML = `<h3>Total Money: ${formatMoney(value)}</h3>`;
  main.appendChild(totalCash);
}

function changeContainerStyle() {
  formContainer.style.display = "none";
  document.body.style.background = "none";
  document.body.style.backgroundColor = "rgb(230, 230, 230)";
  mainContainer.style.visibility = "visible";
}

/* -------------------------------- CONTROLLER -------------------------------*/
/* -------------------------------- CONTROLLER -------------------------------*/
/* -------------------------------- CONTROLLER -------------------------------*/

submitButton.addEventListener("click", addSelfUser);

// button for adding more people
addUserButton.addEventListener("click", getRandomUser);

// double money event
doubleButton.addEventListener("click", doubleMoney);

// multiply money event
multiplyNumberButton.addEventListener("click", multiplyMoney);

// sortButton.addEventListener("click", sortByMoney);

// Sort by event
sortByNameDesButton.addEventListener("click", sortByNameDes);
sortByNameAscButton.addEventListener("click", sortByNameAsc);
sortByMoneyDesButton.addEventListener("click", sortByMoneyDes);
sortByMoneyAscButton.addEventListener("click", sortByMoneyAsc);

// Filter event
millionButton.addEventListener("click", onlyMillionaires);

// calc all money event
calcWealth.addEventListener("click", totalMoney);
