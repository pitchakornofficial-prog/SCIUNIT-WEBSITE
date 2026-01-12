(function () {
  const el = document.getElementById("typeTarget");
  if (!el) return;

  const path = location.pathname.split("/").pop() || "index.html";

  const wordConfigs = {
    "index.html": [
      "สร้างความเปลี่ยนแปลงให้คณะวิทยาศาสตร์",
      "ทำเพื่อนักศึกษาคณะวิทยาศาสตร์ทุกคน",
      "พัฒนาคณะวิทยาศาสตร์อย่างเป็นระบบ",
      "รับฟังทุกเสียงของนักศึกษา",
      "สร้างอนาคตที่ดีกว่าไปด้วยกัน",
    ],

    "about.html": [
      "ความซื่อสัตย์ในการทำงาน",
      "ความจริงใจต่อนักศึกษา",
      "การทำงานเป็นทีมอย่างสร้างสรรค์",
      "ความโปร่งใสทุกขั้นตอน",
    ],

    "candidates.html": [
      "คนรุ่นใหม่ที่เข้าใจนักศึกษา",
      "ผู้ที่มีความสามารถและความตั้งใจ",
      "ตัวแทนนักศึกษาที่พร้อมลงมือทำจริง",
      "ทีมงานที่พร้อมรับใช้คณะวิทยาศาสตร์",
    ],

    "policies.html": [
      "นโยบายที่ชัดเจนและตรวจสอบได้",
      "นโยบายที่สามารถทำได้จริง",
      "นโยบายที่ตอบโจทย์นักศึกษาคณะวิทยาศาสตร์",
      "นโยบายที่มาจากเสียงของนักศึกษา",
    ],

    "why-us.html": [
      "ทีมงานที่มีความพร้อมและแข็งแกร่ง",
      "วิสัยทัศน์ที่มองอนาคตคณะวิทยาศาสตร์",
      "แนวทางการทำงานที่ชัดเจนและเป็นระบบ",
      "ความตั้งใจจริงในการเปลี่ยนแปลง",
    ],

    "contact.html": [
      "พร้อมรับฟังทุกความคิดเห็น",
      "ตอบทุกคำถามอย่างจริงใจ",
      "ใส่ใจทุกปัญหาของนักศึกษา",
      "เปิดรับทุกข้อเสนอแนะ",
    ],
  };

  const words = wordConfigs[path] || wordConfigs["index.html"];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 70;
  const deleteSpeed = 40;
  const pauseAfterType = 900;
  const pauseAfterDelete = 250;

  function tick() {
    const current = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, pauseAfterType);
      }
      return setTimeout(tick, typeSpeed);
    } else {
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
