const passwordType = document.querySelector(".pass-type");
const form = document.getElementById("reg-form");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userData = {
    name: nameInput.value.trim(),
    surname: surnameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch("https://677a303e671ca03068334652.mockapi.io/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then(() => {
     
      setTimeout(() => {
        form.reset();
        window.location.href = "./login.html";
      }, 2000);
    })
    .catch((err) => console.log(err));
});

