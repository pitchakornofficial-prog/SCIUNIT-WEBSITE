(function () {
  const modal = document.getElementById("aboutModal");
  const titleEl = document.getElementById("aboutModalTitle");
  const contentEl = document.getElementById("aboutModalContent");

  if (!modal || !titleEl || !contentEl) return;

  const openModal = (title, detail) => {
    titleEl.textContent = title || "รายละเอียด";
    contentEl.textContent = detail || "-";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // คลิกการ์ดเพื่อเปิด
  document.querySelectorAll(".about-item").forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.dataset.title, card.dataset.detail);
    });
  });

  // ปิดด้วย X หรือคลิกพื้นหลัง
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  // ปิดด้วย ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
