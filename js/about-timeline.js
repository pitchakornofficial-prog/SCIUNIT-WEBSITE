(function () {
  // พับ/ขยาย Timeline ใหญ่
  const tl = document.querySelector(".tl");
  const toggle = document.getElementById("tlToggle");
  const body = document.getElementById("tlBody");

  if (toggle && body) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("tl-collapsed");
      tl.classList.toggle("open");
    });
  }

  // พับ/ขยายการ์ดเหตุการณ์
  document.querySelectorAll(".tl-item").forEach((item) => {
    const card = item.querySelector(".tl-card");
    card.addEventListener("click", (e) => {
      // ถ้าคลิกลิงก์อ้างอิง ไม่ toggle
      if (e.target.closest(".tl-ref")) return;

      item.classList.toggle("tl-item-collapsed");
    });
  });
})();
