document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = registerForm.firstName.value.trim();
      const lastName = registerForm.lastName.value.trim();
      const phone = registerForm.phone.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value.trim();

      if (!firstName || !lastName || !phone || !email || !password) {
        alert("يرجى ملء جميع الحقول");
        return;
      }

      fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, phone, email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          if (data.status === "success") {
            window.location.href = "index.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("حدث خطأ أثناء إرسال البيانات للسيرفر");
        });
    });
  }
});
