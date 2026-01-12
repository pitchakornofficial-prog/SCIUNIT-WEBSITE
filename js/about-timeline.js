(function initTimeline() {
  const container = document.getElementById("timeline-section");
  if (!container) return;

  const timelineData = [
    {
      date: "8 มกราคม 2569",
      head: "ประชุมพรรคครั้งแรก",
      summary: "เริ่มต้นก่อตั้งพรรค SCI UNIT อย่างเป็นทางการ",
      img: "images/800450.png",
      detail: "รายละเอียดการประชุมก่อตั้งพรรค และแผนงานในอนาคต",
      link: "https://example.com/source1",
    },
    {
      date: "ธันวาคม 2567",
      head: "เริ่มต้นรวมทีม",
      summary: "รวบรวมทีมงานและแบ่งหน้าที่เบื้องต้น",
      img: "images/600800.png",
      detail: "รายละเอียดการรวมทีม การแบ่งหน้าที่ และการทำงานร่วมกัน",
      link: "https://example.com/source2",
    },
  ];

  const generateHTML = () => {
    const itemsHTML = timelineData
      .map((item, index) => {
        const position = index % 2 === 0 ? "left" : "right";

        const linkHTML = item.link
          ? `<a class="tl-ref" href="${item.link}" target="_blank" rel="noopener">ลิงก์อ้างอิง</a>`
          : "";

        return `
        <div class="tl-item ${position} tl-item-collapsed">
          <span class="tl-dot"></span>
          <div class="tl-card">
            <div class="tl-date">${item.date}</div>
            <div class="tl-head">${item.head}</div>
            <div class="tl-summary">${item.summary}</div>
            <img class="tl-img" src="${item.img}" alt="${item.head}" loading="lazy" />
            <div class="tl-detail">
              ${item.detail}
              ${linkHTML}
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    return `
      <article class="card tl">
        <div class="tl-header" id="tlToggle">
          <div>
            <h3 class="tl-title">ความเป็นมาของพรรค (Timeline)</h3>
            <p class="tl-sub">เลื่อนดูจากบนลงล่าง • กดเพื่อดูรายละเอียดทั้งหมด</p>
          </div>
          <span class="tl-arrow">▾</span>
        </div>
        <div class="tl-body tl-collapsed" id="tlBody">
          <div class="tl-line"></div>
          ${itemsHTML}
        </div>
      </article>
    `;
  };

  container.innerHTML = generateHTML();

  const tlArticle = container.querySelector(".tl");
  const toggleBtn = document.getElementById("tlToggle");
  const tlBody = document.getElementById("tlBody");

  if (toggleBtn && tlBody) {
    toggleBtn.addEventListener("click", () => {
      tlBody.classList.toggle("tl-collapsed");
      tlArticle.classList.toggle("open");
    });
  }

  container.querySelectorAll(".tl-item").forEach((item) => {
    const card = item.querySelector(".tl-card");
    card.addEventListener("click", (e) => {
      if (e.target.closest(".tl-ref")) return;
      item.classList.toggle("tl-item-collapsed");
    });
  });
})();
