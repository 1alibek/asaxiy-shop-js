document.addEventListener("DOMContentLoaded", () => {
  const appendAllProduct = document.getElementById("append-all-product");
  const addBtn = document.getElementById("add-btn");
  const box = document.querySelector(".box");
  const addForm = document.getElementById("add-form");
  const addTitle = document.getElementById("add-title");
  const addPrice = document.getElementById("add-price");
  const addMonthlyPay = document.getElementById("add-monthlyPay");
  const addImg = document.getElementById("add-img");
  const addCategory = document.getElementById("add-category");
  const logoutBtn = document.querySelector(".logout"); 

  let editMode = false;
  let editingProductId = null;

  // Logout functionality
  logoutBtn.addEventListener("click", () => {
    if (confirm("Haqiqatan ham tizimdan chiqmoqchimisiz?")) {
      // Mahalliy saqlashni tozalash
      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/login.html";
    }
  });

  fetch("https://677a303e671ca03068334652.mockapi.io/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        renderProduct(product);
      });
    })
    .catch((err) => console.error("Mahsulotlarni yuklashda xato:", err));

  function renderProduct(product) {
    const productDiv = document.createElement("div");
    productDiv.className =
      "px-[20px] h-[100%] rounded-lg flex flex-col justify-between relative bg-white p-[20px] items-start gap-[20px] border border-blue-400";
    productDiv.innerHTML = `
      <p class="absolute top-[5px] left-[5px] text-[12px] text-[#fff] bg-blue-500 p-[2px_6px] rounded-md">
        ${product.category}</p>
      <div class="h-[130px] w-[130px] m-auto">
        <img src="${product.img}" alt="" class="object-contain h-[130px] w-[130px]">
      </div>
      <h1 class="text-gray-600 leading-[120%]">${product.title}</h1>
      <div class="flex flex-col w-full gap-[2px]">
        <h1 class="text-[20px] font-[600] text-primary">${product.price
          .toLocaleString()
          .replace(/,/g, " ")} so'm</h1>
        <p class="text-[14px] text-blue-500 font-[500]">${product.month
          .toLocaleString()
          .replace(/,/g, " ")} so'm / 12 oy</p>
        <div class="flex items-center justify-between mt-2">
          <button class="edit-btn bg-blue-600 text-white rounded-lg py-2 px-4" data-id="${product.id}">Edit</button>
          <button class="delete-btn bg-red-600 text-white rounded-lg py-2 px-4" data-id="${product.id}">Delete</button>
        </div>
      </div>
    `;
    appendAllProduct.appendChild(productDiv);

    productDiv.querySelector(".delete-btn").addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      if (confirm("Mahsulotni o'chirishga ishonchingiz komilmi?")) {
        fetch(
          `https://677a303e671ca03068334652.mockapi.io/products/${productId}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => {
            if (res.ok) {
              productDiv.remove(); // Remove product from DOM
              alert("Mahsulot muvaffaqiyatli o'chirildi!");
            } else {
              alert("Mahsulotni o'chirishda xatolik yuz berdi.");
            }
          })
          .catch((err) => {
            console.error("O'chirishda xato:", err);
            alert("Tarmoq xatosi tufayli mahsulotni o'chirish imkonsiz.");
          });
      }
    });

    productDiv.querySelector(".edit-btn").addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      fetch(
        `https://677a303e671ca03068334652.mockapi.io/products/${productId}`
      )
        .then((res) => res.json())
        .then((product) => {
          addTitle.value = product.title;
          addPrice.value = product.price;
          addMonthlyPay.value = product.month;
          addImg.value = product.img;
          addCategory.value = product.category;
          box.style.display = "block";
          box.style.backgroundColor = "white";
          box.style.height = "100vh";
          editMode = true;
          editingProductId = product.id;
        });
    });
  }

  // Add new product or save edited product
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
      title: addTitle.value,
      price: +addPrice.value,
      month: +addMonthlyPay.value,
      img: addImg.value,
      category: addCategory.value,
    };

    if (editMode) {
      // Update  product
      fetch(
        `https://677a303e671ca03068334652.mockapi.io/products/${editingProductId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      )
        .then((res) => res.json())
        .then((updatedProduct) => {
          alert("Mahsulot muvaffaqiyatli yangilandi!");
          location.reload(); 
        })
        .catch((err) => console.error("Yangilashda xato:", err));
    } else {
      // Add new product
      fetch("https://677a303e671ca03068334652.mockapi.io/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((product) => {
          renderProduct(product);
          alert("Yangi mahsulot muvaffaqiyatli qo'shildi!");
        })
        .catch((err) => console.error("Qo'shishda xato:", err));
    }

    
    addForm.reset();
    box.style.display = "none";
    editMode = false;
    editingProductId = null;
  });

 
  addBtn.addEventListener("click", () => {
    box.style.display = "block";
    box.style.backgroundColor = "white";
    box.style.height = "100vh";
  });
});
