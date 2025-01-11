const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordType = document.querySelector(".pass-type");
const error = document.querySelector(".error");

if (localStorage.getItem("userId")) {
  window.location.href = "./index.html";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  fetch("https://677a303e671ca03068334652.mockapi.io/users")
    .then((res) => res.json())
    .then((data) => {
       if (email === "admin@gmail.com" && password === "123") {
         error.classList.add("hidden");
         
         localStorage.setItem("userId", "admin"); // Admin ID sifatida maxsus qiymat
         setTimeout(() => {
           window.location.href = "./admin.html";
         }, 2000);
         return; // Admin topilgan bo'lsa, keyingi tekshirishni o'tkazib yuboramiz
       }
      const user = data.find(
        (e) => e.email === email && e.password === password
      );

      if (user) {
        error.classList.add("hidden");
    

        localStorage.setItem("userId", user.id);

        setTimeout(() => {
          window.location.href = "./index.html";
        }, 2000);
      } else {
        error.classList.remove("hidden");
      }
    })
    .catch((err) => console.log(err));
});

