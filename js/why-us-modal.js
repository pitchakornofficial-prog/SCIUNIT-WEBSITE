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

(function () {
  const el = document.getElementById("typeTarget");
  if (!el) return;

  // 🔁 คำที่ต้องการให้พิมพ์สลับไปเรื่อย ๆ
  const words = [
    "โปร่งใส ตรวจสอบได้ในทุกกระบวนการทำงาน",
    "วางแผนชัดเจน และพร้อมลงมือทำจริง",
    "เข้าใจนักศึกษาคณะวิทยาศาสตร์จากประสบการณ์ตรง",
    "ไม่ทิ้งใครไว้ข้างหลัง เปิดโอกาสให้ทุกคนมีส่วนร่วม",
    "สร้างการเปลี่ยนแปลงด้วยการลงมือทำ ไม่ใช่แค่คำสัญญา",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 70; // ความเร็วพิมพ์
  const deleteSpeed = 40; // ความเร็วลบ
  const pauseAfterType = 900; // หน่วงหลังพิมพ์จบ
  const pauseAfterDelete = 250;

  function tick() {
    const current = words[wordIndex];

    if (!deleting) {
      // พิมพ์เพิ่มทีละตัว
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, pauseAfterType);
      }
      return setTimeout(tick, typeSpeed);
    } else {
      // ลบทีละตัว
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        return setTimeout(tick, pauseAfterDelete);
      }
      return setTimeout(tick, deleteSpeed);
    }
  }

  tick();
})();
