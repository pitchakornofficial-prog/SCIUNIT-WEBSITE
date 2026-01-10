(function () {
  const modal = document.getElementById("contactModal");
  const titleEl = document.getElementById("contactModalTitle");
  const contentEl = document.getElementById("contactModalContent");

  const socialWrap = document.getElementById("socialActions");
  const btnFacebook = document.getElementById("btnFacebook");
  const btnInstagram = document.getElementById("btnInstagram");
  const btnTikTok = document.getElementById("btnTikTok");

  if (!modal || !titleEl || !contentEl) return;

  const openModal = ({ title, detail, fb, ig, tt }) => {
    titleEl.textContent = title || "ติดต่อ & ติดตามเรา";
    contentEl.textContent = detail || "-";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // ตั้งค่า/ซ่อน-โชว์ปุ่ม social
    const hasAny = !!(fb || ig || tt);
    if (hasAny) {
      socialWrap.style.display = "flex";

      if (fb) {
        btnFacebook.href = fb;
        btnFacebook.style.display = "inline-flex";
      } else {
        btnFacebook.style.display = "none";
      }

      if (ig) {
        btnInstagram.href = ig;
        btnInstagram.style.display = "inline-flex";
      } else {
        btnInstagram.style.display = "none";
      }

      if (tt) {
        btnTikTok.href = tt;
        btnTikTok.style.display = "inline-flex";
      } else {
        btnTikTok.style.display = "none";
      }
    } else {
      socialWrap.style.display = "none";
    }
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // คลิกการ์ดเพื่อเปิด
  document.querySelectorAll(".contact-item").forEach((card) => {
    card.addEventListener("click", () => {
      openModal({
        title: card.dataset.title,
        detail: card.dataset.detail,
        fb: card.dataset.facebook,
        ig: card.dataset.instagram,
        tt: card.dataset.tiktok,
      });
    });
  });

  // คลิก backdrop / X เพื่อปิด
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  // ESC ปิด
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();

(function () {
  const el = document.getElementById("typeTarget");
  if (!el) return;

  // 🔁 คำที่ต้องการให้พิมพ์สลับไปเรื่อย ๆ
  const words = [
    "รับฟังทุกความคิดเห็น",
    "เปิดรับทุกข้อเสนอ",
    "ติดต่อได้ง่าย เข้าถึงได้จริง",
    "ติดตามเราได้ทุกช่องทาง",
    "SCI UNIT ใกล้คุณเสมอ",
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
