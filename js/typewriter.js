(function () {
  const el = document.getElementById("typeTarget");
  if (!el) return;

  // 🔁 คำที่ต้องการให้พิมพ์สลับไปเรื่อย ๆ
  const words = [
    "สร้างความเปลี่ยนแปลง",
    "ทำเพื่อคณะวิทยาศาสตร์",
    "ทำเพื่อนักศึกษาคณะวิทยาศาสตร์",
    "พัฒนาคณะวิทยาศาสตร์",
    "สร้างอนาคตที่ดีกว่า",
    "รับฟังเสียงของทุกคน",
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
