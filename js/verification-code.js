document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("verification-code-form");
  const inputs = document.querySelectorAll(".code-inputs input");

  // تنقل تلقائي بين الخانات
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // دمج الرموز
    const code = Array.from(inputs)
      .map((input) => input.value)
      .join("");

    if (code.length !== 4) {
      alert("الرجاء إدخال رمز مكون من 4 أرقام");
      return;
    }

    // إرسال للباك إند
    fetch("http://localhost:5000/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("تم التحقق بنجاح!");
          window.location.href = "reset-password.html";
        } else {
          alert("رمز التأكيد غير صحيح");
        }
      })
      .catch((err) => {
        console.error("خطأ في الاتصال:", err);
        alert("حدث خطأ في الاتصال بالسيرفر");
      });
  });
});
