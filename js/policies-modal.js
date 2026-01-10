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

(function () {
  const el = document.getElementById("typeTarget");
  if (!el) return;

  // 🔁 คำที่ต้องการให้พิมพ์สลับไปเรื่อย ๆ
  const words = [
    "นโยบายที่มาจากเสียงของนักศึกษาคณะวิทยาศาสตร์",
    "ส่งเสริมกิจกรรมที่เป็นประโยชน์และเข้าถึงได้สำหรับนักศึกษา",
    "เปิดพื้นที่รับฟังความคิดเห็นและข้อเสนอแนะอย่างจริงจัง",
    "ทำงานเป็นระบบ เพื่อประโยชน์สูงสุดของนักศึกษา",
    "SCI UNIT พรรคของนักศึกษาคณะวิทยาศาสตร์",
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
