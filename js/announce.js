(function () {
  const modal = document.getElementById("announceModal");
  if (!modal) return;

  const openModal = () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // ✅ เปิดทุกครั้งที่เข้าหน้าแรก
  openModal();

  // ปิดเมื่อกด X หรือคลิกพื้นหลัง
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  // ปิดด้วย ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
