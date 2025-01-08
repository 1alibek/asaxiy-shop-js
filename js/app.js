import { usefetch, addUIData } from "./utils/index.js";
const cards = document.querySelector(".cards");
const counter = document.querySelector(".counter");
const request = usefetch();
let card = JSON.parse(localStorage.getItem("cards")) || [];

request().then((data) => getData(data));
function getData(data) {
    
  data.forEach((value) => {
    addUIData(value, cards);
  });
  let buttons = document.querySelectorAll(".shopbtn");
  buttons.forEach((value, idx) => {
    value.addEventListener("click", () => {
      AddToCard(data[idx]);
    });
  });
}


function AddToCard(data) {
  cardLengthFunc();
  card = [...card, data];
  localStorage.setItem("cards", JSON.stringify(card));
}
function cardLengthFunc() {
  let cardlength = card.length;
  counter.innerHTML = cardlength;
}
cardLengthFunc();
