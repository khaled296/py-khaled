document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/get-tuktuks")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("drivers-container");

      data.forEach((driver) => {
        const card = document.createElement("div");
        card.className = "driver-card";
        card.style.cursor = "pointer";

        card.onclick = () => {
          localStorage.setItem("selectedDriver", JSON.stringify(driver));
          window.location.href = "driver-data.html";
        };

        card.innerHTML = `
          <img src="../img/wallpaperflare.com_wallpaper.jpg" class="driver-img" />
          <h3>${driver.driverName}</h3>
        `;

        container.appendChild(card);
      });
    });
});
