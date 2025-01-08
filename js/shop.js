let products = document.querySelector(".products");
const products_ui = document.querySelector(".products_ui");
const no_data = document.querySelector(".no-data");
let cart = JSON.parse(localStorage.getItem("cards")) || [];
function renderUiProduct(cart) {
  console.log(cart);

  products.innerHTML = "";
  cart.forEach((value) => {
    console.log(value);

    let product = document.createElement("div");

    product.innerHTML = `
    <div
            class="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
            <div class="col-span-12 lg:col-span-2 img box">
              <img
                src=${value.img}
                alt="speaker image"
                class="max-lg:w-full lg:w-[180px] rounded-lg object-cover" />
            </div>
            <div class="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div class="flex items-center justify-between w-full mb-4">
                <h5
                  class="font-manrope font-bold text-2xl leading-9 text-gray-900">
                  ${value.name}
                </h5>
                <button id=${value.id}

                  class="rounded-full deleteelement group flex items-center justify-center focus-within:outline-red-500">
                 delete
                </button>
              </div>
              <p class="font-normal text-base leading-7 text-gray-500 mb-6">
               ${value.name}
                <a href="javascript:;" class="text-indigo-600">More....</a>
              </p>
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-4">
                  <button  id=${value.id}
                    class="group decrement rounded-[50px] text-2xl border border-gray-200 shadow-sm shadow-transparent px-2 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                   -
                  </button>
                 <span class="countOfTheElement">${value.count}</span>
                  <button id=${value.id}
                    class="group  increment deletebtn text-2xl rounded-[50px] border border-gray-200 shadow-sm shadow-transparent px-2 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                    +
                  </button>
                </div>
                <h6 
                  class="text-indigo-600  font-manrope font-bold text-2xl leading-9 text-right">
                ${value.price.toLocaleString()} so'm
                </h6>
              </div>
            </div>
          </div>`;
    products.append(product);
  });
}
function noData(section, section_404, length) {
  if (length) {
    section_404.style.display = "none";
  } else {
    section.style.display = "none";
    section_404.style.display = "flex";
  }
}
noData(products_ui, no_data, cart.length);
renderUiProduct(cart);
