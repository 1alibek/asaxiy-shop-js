const appendAllProduct = document.getElementById("append-all-product");
const appendEditProduct = document.getElementById("append-edit-pr");
const appendRemoveProduct = document.getElementById("append-remove-pr");
const addSection = document.getElementById("add-section");
const addBtn = document.getElementById("add-btn");
fetch("https://677a303e671ca03068334652.mockapi.io/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      // all product
      let allProductDiv = document.createElement("div");
      allProductDiv.innerHTML += `
                <div
                    class="px-[20px] h-[100%] rounded-lg flex flex-col justify-between relative bg-white p-[20px] items-start gap-[20px] border border-blue-400">
                    <p
                        class="absolute top-[5px] left-[5px] text-[12px] text-[#fff] bg-blue-500 p-[2px_6px] rounded-md">
                        ${product?.category}</p>
                    <div class="h-[130px] w-[130px] m-auto">
                        <img src="${
                          product?.img
                        }" alt="" class="object-contain h-[130px] w-[130px]">
                    </div>

                    <h1 class="text-gray-600 leading-[120%]">${
                      product?.title
                    }</h1>

                    <div class="flex flex-col w-full gap-[2px]">
                        <h1 class="text-[20px] font-[600] text-primary">${product?.price
                          .toLocaleString()
                          .replace(/,/g, " ")} so'm</h1>
                        <p class="text-[14px] text-blue-500 font-[500]">${product?.month
                          .toLocaleString()
                          .replace(/,/g, " ")} so'm / 12 oy</p>
                          <div class=" flex items-center justify-between mt-2">
                          <button class="bg-blue-600 text-white rounded-lg py-2 px-4">Edit</button>
                          <button class="bg-red-600 text-white rounded-lg py-2 px-4">Delete</button>
                          </div>
                    </div>
                </div>
                `;
      appendAllProduct.append(allProductDiv);
    });
  });

function hideSections() {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
}


const box = document.querySelector(".box");

addBtn.addEventListener("click", (e) => {
  box.style.display = "block";
  box.style.backgroundColor = "white";
  box.style.height = "100vh";
});
