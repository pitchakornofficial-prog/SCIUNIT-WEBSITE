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

(function () {
  const el = document.getElementById("typeTarget");
  if (!el) return;

  // 🔁 คำที่ต้องการให้พิมพ์สลับไปเรื่อย ๆ
  const words = [
    "พรรค SCI UNIT ก่อตั้งขึ้นจากนักศึกษาคณะวิทยาศาสตร์",
    "เราเชื่อในสิทธิ เสรีภาพ และความเท่าเทียมของนักศึกษา",
    "รวมพลังนักศึกษาหลากหลายสาขา เพื่อเป้าหมายเดียวกัน",
    "เติบโตไปพร้อมกัน ด้วยการมีส่วนร่วมของทุกคน",
    "SCI UNIT Together We Move Forward",
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
