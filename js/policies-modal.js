(function () {
  const modal = document.getElementById("policyModal");
  const titleEl = document.getElementById("modalTitle");
  const contentEl = document.getElementById("modalContent");

  if (!modal || !titleEl || !contentEl) return;

  const openModal = (title, detail) => {
    titleEl.textContent = title || "รายละเอียดนโยบาย";
    contentEl.textContent = detail || "-";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // กันหน้าเลื่อนตอนเปิด modal
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // คืนค่า
  };

  // คลิกการ์ดเพื่อเปิด
  document.querySelectorAll(".policy-item").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.dataset.title;
      const detail = card.dataset.detail;
      openModal(title, detail);
    });
  });

  // ปิดเมื่อกดปุ่มปิด/พื้นหลัง
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  // กด ESC เพื่อปิด
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
