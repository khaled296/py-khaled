document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "reset-password.html") {
    const resetPasswordForm = document.getElementById("reset-password-form");

    if (resetPasswordForm) {
      resetPasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newPassword = resetPasswordForm
          .querySelector('input[name="newPassword"]')
          .value.trim();
        const confirmPassword = resetPasswordForm
          .querySelector('input[name="confirmPassword"]')
          .value.trim();

        if (!newPassword || !confirmPassword) {
          alert("يرجى ملء جميع الحقول");
          return;
        }

        if (newPassword !== confirmPassword) {
          alert("كلمة المرور غير متطابقة");
          return;
        }

        // إرسال إلى الباك إند
        fetch("http://localhost:5000/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: newPassword }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("تم تغيير كلمة المرور بنجاح!");
              window.location.href = "index.html";
            } else {
              alert("حدث خطأ أثناء تغيير كلمة المرور");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("فشل الاتصال بالسيرفر");
          });
      });
    }
  }
});
