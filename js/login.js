document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = loginForm.querySelector('input[name="email"]').value.trim();
      const password = loginForm
        .querySelector('input[name="password"]')
        .value.trim();

      fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          if (data.status === "success") {
            window.location.href = "home.html"; // أو أي صفحة تانية عندك
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("حصل خطأ أثناء الاتصال بالسيرفر");
        });
    });
  }
});
