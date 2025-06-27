document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "confirm-account.html") {
    const confirmAccountForm = document.getElementById("confirm-account-form");
    if (confirmAccountForm) {
      confirmAccountForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const phoneNumberOrEmail = confirmAccountForm
          .querySelector('input[name="phoneNumberOrEmail"]')
          .value.trim();

        // Simulate server response
        setTimeout(() => {
          if (phoneNumberOrEmail) {
            alert("تم إرسال رمز التأكيد بنجاح!");
            window.location.href = "verification-code.html";
          } else {
            alert("يرجى إدخال رقم الهاتف أو البريد الإلكتروني");
          }
        }, 1000);
      });
    }
  }
});
