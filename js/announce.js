(function initAnnouncement() {
  // 1. เก็บ HTML ไว้ในตัวแปร (ใช้ Backticks ` `)
  const modalHTML = `
    <div class="modal" id="announceModal" aria-hidden="true">
      <div class="modal-backdrop" data-close="true"></div>
      <div class="announce-box" role="dialog" aria-modal="true" aria-label="ประกาศสำคัญ">
        <button class="modal-close" data-close="true" aria-label="ปิด">
          ✕
        </button>
        <img
          class="announce-img"
          src="images/popupindex.png"
          alt="ประกาศวันเลือกตั้ง"
        />
      </div>
    </div>
  `;

  // 2. ยัด HTML เข้าไปที่ท้ายสุดของ <body>
  // insertAdjacentHTML 'beforeend' จะใส่โค้ด html ต่อท้ายใน body โดยไม่ไปลบของเดิม
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // --- ส่วน Logic เดิม (ทำงานหลังจาก HTML ถูกสร้างแล้ว) ---
  const modal = document.getElementById("announceModal");
  if (!modal) return;

  const openModal = () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // ล็อคไม่ให้เลื่อนหน้าจอหลัง
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // ปลดล็อคหน้าจอ
  };

  // สั่งเปิด Modal ทันทีที่โหลด
  openModal();

  // ดักจับ Event การคลิก (ปิดเมื่อกดปุ่ม X หรือ พื้นหลังดำ)
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  // ดักจับปุ่ม ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
