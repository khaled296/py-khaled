document.addEventListener("DOMContentLoaded", function () {
  // جلب عدد المستخدمين
  fetch("http://127.0.0.1:5000/get-users")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("userCount").textContent = data.length;
    });

  // جلب عدد التكاتك
  fetch("http://127.0.0.1:5000/get-tuktuks")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("tuktukCount").textContent = data.length;
    });
});
