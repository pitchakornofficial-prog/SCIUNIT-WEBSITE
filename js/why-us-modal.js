(function () {
  const modal = document.getElementById("whyModal");
  const titleEl = document.getElementById("whyModalTitle");
  const contentEl = document.getElementById("whyModalContent");

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

  document.querySelectorAll(".why-item").forEach((card) => {
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
