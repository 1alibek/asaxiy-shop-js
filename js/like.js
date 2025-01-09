let products = document.querySelector(".products");
const products_ui = document.querySelector(".products_ui");
const no_data = document.querySelector(".no-data");
let cart = JSON.parse(localStorage.getItem("likes")) || [];
function renderUiProduct(cart) {
  products.innerHTML = "";
  cart.forEach((value) => {
    let product = document.createElement("div");

    product.innerHTML = `
        <div class="relative">
 <i id=${
   value.id
 } class="fa-regular fa-heart likebtn absolute top-1 left-4 like"></i>
       <img class="imgofcard mx-auto" src="${
         value.img || "default-image.jpg"
       }" alt="" />
    </div>
    <div class="txtarea p-[15px]">
      <h1 class="text-[14px] multi-line font-medium">${
        value.title || "No Title"
      }</h1>
      <div class="stars flex items-center justify-between my-[8px]">
        
        <p>${value.comment || 0} отзывов</p>
      </div>
      <div class="prices">
        <p class="text-[12px] font-normal text-[#94a3b8]">
          <s>${value.price + Math.round(Math.random() + 150000)} сум</s>
        </p>
        <p class="text-[18px] font-bold text-[#006bff] my-[4px]">${
          value.price || 0
        } сум</p>
        <button class="text-[#fe7300] border rounded-md border-[#fe7300] p-[6px] w-[100%] text-left text-[14px] font-medium hover:bg-[#fe7300] hover:text-white transition-all active:scale-95">
          ${value.month} сум x 12 мес
        </button>
      </div>
      <div class="btns flex items-center gap-1 mt-[15px]">
        <button id="${
          value.id
        }" class="flex kupitbtn items-center gap-2 w-[100%] text-center text-white text-[13px] bg-[#006bff] px-4 py-2 rounded-[10px]  active:scale-95">
          Купить в один клик
        </button>
        <button  id="${
          value.id
        }"  class="flex shopbtn  items-center gap-2  text-center text-white text-[13px] bg-[#006bff] px-4 py-2 rounded-[10px]  active:scale-95">
            <img src="./svg/icon4 copy.svg" alt="">
        </button>
      </div>
    </div>
    `;
    products.append(product);
  });
}

products.addEventListener("click", (e) => {
  if (e.target.classList.contains("likebtn")) {
    deleteData(e.target.id);
  }
});
function deleteData(id) {
  cart = cart.filter((value) => value.id !== id);
  localStorage.setItem("likes", JSON.stringify(cart));
  renderUiProduct(cart);
}

renderUiProduct(cart);
