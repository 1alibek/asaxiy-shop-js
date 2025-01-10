import { usefetch, addUIData } from "./utils/index.js";

const cards = document.querySelector(".cards");
const counter = document.querySelector(".counter");
const counter2 = document.querySelector(".counter2");
const logout = document.querySelector(".logout");
const filter_btn = document.querySelector(".filter_btn");
const searchInput = document.querySelector(".searchInput");

const request = usefetch();
let card = JSON.parse(localStorage.getItem("cards")) || [];
let category = localStorage.getItem("sort") || "all";
let productdata = [];

request().then((data) => {
  productdata = data;
  getData(productdata);
});

function getData(data) {
  cards.innerHTML = "";
  if (category !== "all") {
    data = data.filter((element) => element.category === category);
  }
  data.forEach((value) => {
    addUIData(value, cards);
  });
  setupButtons(data);
}

function setupButtons(data) {
  let buttons = document.querySelectorAll(".shopbtn");
  buttons.forEach((value, idx) => {
    value.addEventListener("click", () => {
      AddToCard(data[idx]);
    });
  });

  let likebutton = document.querySelectorAll(".likebtn");
  likebutton.forEach((value, idx) => {
    value.addEventListener("click", () => {
      Likeshop(data[idx]);
    });
  });
}

filter_btn.addEventListener("click", (e) => {
  const id = e.target.id;
  if (id) {
    category = id;
    localStorage.setItem("sort", id);
    getData(productdata);
  }
});

let likes = JSON.parse(localStorage.getItem("likes")) || [];

function Likeshop(data) {
  likes = [...likes, data];
  localStorage.setItem("likes", JSON.stringify(likes));
  cardLengthFunc2();
}

function AddToCard(data) {
  card = [...card, data];
  localStorage.setItem("cards", JSON.stringify(card));
  cardLengthFunc();
}

function cardLengthFunc() {
  let cardlength = card.length;
  counter.innerHTML = cardlength;
}

let userId = localStorage.getItem("userId");

function cardLengthFunc2() {
  let cardlength2 = likes.length;
  counter2.innerHTML = cardlength2;
}

logout.addEventListener("click", () => {
  localStorage.removeItem("userId");
  location.reload();
});

if (userId) {
  logout.style.display = "block";
} else {
  logout.style.display = "none";
}

cardLengthFunc();
cardLengthFunc2();

// Search functionality
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = productdata.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );
  getData(filteredData);
});
