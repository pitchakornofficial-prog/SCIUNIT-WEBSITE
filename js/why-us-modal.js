(function initWhyUsSystem() {
  const reasonsData = [
    {
      title: "โปร่งใส ตรวจสอบได้",
      shortDesc: "อธิบายกลไกหรือแนวคิดด้านความโปร่งใส",
      detail: `อธิบายกลไกหรือแนวคิดด้านความโปร่งใส เช่น
      • เปิดเผยการทำงานและการตัดสินใจ
      • รับฟังเสียงนักศึกษาและสรุปผลการดำเนินงาน
      • ตรวจสอบได้และมีหลักฐานชัดเจน`,
    },
    {
      title: "ทำได้จริง วัดผลได้",
      shortDesc: "ใส่ตัวอย่างแผนงานที่ชัดเจนและมีตัวชี้วัด",
      detail: `ใส่ตัวอย่างแผนงานที่ชัดเจนและมีตัวชี้วัด เช่น
      • มีเป้าหมายเป็นรูปธรรม
      • มีระยะเวลาและขั้นตอน
      • มีวิธีติดตามผลและรายงานความคืบหน้า`,
    },
    {
      title: "เราเข้าใจนักศึกษาจริง",
      shortDesc: "SCI UNIT เกิดจากนักศึกษาคณะวิทยาศาสตร์ที่ล้วนแต่มีประสบการณ์",
      detail:
        "SCI UNIT เกิดจากนักศึกษาคณะวิทยาศาสตร์ที่ล้วนแต่มีประสบการณ์ เรารู้ว่าปัญหาอยู่ตรงไหน ความต้องการคืออะไร และเราพร้อมเป็นเสียงแทนทุกคนอย่างเท่าเทียม",
    },
    {
      title: "เราจะไม่ทิ้งใครไว้ข้างหลัง",
      shortDesc:
        "ไม่ว่านักศึกษากยศ. รวมถึงนักศึกษาที่ต้องการพื้นที่ในการแสดงออก",
      detail:
        "ไม่ว่านักศึกษากยศ. รวมถึงนักศึกษาที่ต้องการพื้นที่ในการแสดงออก หรือคนที่ไม่เคยมีพื้นที่พูด SCI UNIT จะเป็นพื้นที่ของทุกคน",
    },
    {
      title: "เราสร้างการเปลี่ยนแปลงไม่ใช่แค่สัญญา",
      shortDesc: "นโยบายของเราเน้น ทำเพื่อนักศึกษา ความปลอดภัย",
      detail: `นโยบายของเราเน้น
      • ทำเพื่อนักศึกษา
      • ความปลอดภัย
      • สร้างโอกาส
      • พื้นที่แสดงความคิดเห็น
      • การพัฒนานักศึกษาอย่างรอบด้าน`,
    },
  ];

  const container = document.getElementById("why-container");

  if (container) {
    const cardsHTML = reasonsData
      .map(
        (item, index) => `
      <article class="card why-item" data-index="${index}">
        <h3>${item.title}</h3>
        <p>${item.shortDesc}</p>
      </article>
    `
      )
      .join("");

    container.innerHTML = cardsHTML;
  }

  const modalHTML = `
    <div class="modal" id="whyModal" aria-hidden="true">
      <div class="modal-backdrop" data-close="true"></div>
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="whyModalTitle">
        <button class="modal-close" data-close="true" aria-label="ปิด">✕</button>
        <h2 id="whyModalTitle">หัวข้อ</h2>
        <div class="modal-content" id="whyModalContent"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("whyModal");
  const titleEl = document.getElementById("whyModalTitle");
  const contentEl = document.getElementById("whyModalContent");

  const openModal = (index) => {
    const data = reasonsData[index];
    if (!data) return;

    titleEl.textContent = data.title;
    contentEl.innerText = data.detail;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (container) {
    container.querySelectorAll(".why-item").forEach((card) => {
      card.addEventListener("click", () => {
        openModal(card.dataset.index);
      });
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.dataset.close === "true") closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("show"))
      closeModal();
  });
})();
