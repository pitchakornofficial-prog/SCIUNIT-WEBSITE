(function initAboutModal() {
  const modalHTML = `
    <div class="modal" id="aboutModal" aria-hidden="true">
      <div class="modal-backdrop" data-close="true"></div>
      <div
        class="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aboutModalTitle"
      >
        <button class="modal-close" data-close="true" aria-label="ปิด">
          ✕
        </button>
        <h2 id="aboutModalTitle">หัวข้อ</h2>
        <div class="modal-content" id="aboutModalContent"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("aboutModal");
  const titleEl = document.getElementById("aboutModalTitle");
  const contentEl = document.getElementById("aboutModalContent");

  if (!modal || !titleEl || !contentEl) return;

  const openModal = (title, detail) => {
    titleEl.textContent = title || "รายละเอียด";
    contentEl.innerText = detail || "-";

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".about-item").forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.dataset.title, card.dataset.detail);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
