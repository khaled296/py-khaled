document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "add-tuk-tuk.html") {
    const addTukTukForm = document.getElementById("add-tuk-tuk-form");
    if (addTukTukForm) {
      addTukTukForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const driverName = addTukTukForm
          .querySelector('input[name="driverName"]')
          .value.trim();
        const driverPhone = addTukTukForm
          .querySelector('input[name="driverPhone"]')
          .value.trim();
        const nationalId = addTukTukForm
          .querySelector('input[name="nationalId"]')
          .value.trim();
        const tukTukNumber = addTukTukForm
          .querySelector('input[name="tukTukNumber"]')
          .value.trim();

        if (driverName && driverPhone && nationalId && tukTukNumber) {
          fetch("http://127.0.0.1:5000/add-tuk-tuk", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              driverName,
              driverPhone,
              nationalId,
              tukTukNumber,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                alert(data.message);
                // ✅ التوجيه إلى صفحة بيانات السائقين
                window.location.href = "drivers-data.html";
              } else {
                alert(data.message);
              }
            })
            .catch((err) => {
              console.error(err);
              alert("فشل الاتصال بالخادم");
            });
        } else {
          alert("يرجى ملء جميع الحقول");
        }
      });
    }
  }
});
