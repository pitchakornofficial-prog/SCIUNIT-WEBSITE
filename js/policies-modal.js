(function initPoliciesSystem() {
  const policiesData = [
    {
      title: "นโยบายส่งเสริมกิจกรรมและความสามัคคีของนักศึกษา",
      shortDesc:
        "จัดให้มีกิจกรรมที่เป็นประโยชน์และสร้างความสามัคคีให้แก่นักศึกษา",
      detail: `จัดให้มีกิจกรรมที่เป็นประโยชน์และสร้างความสามัคคีให้แก่นักศึกษาคณะวิทยาศาสตร์ เช่น
      - กิจกรรมรับน้องอย่างสร้างสรรค์
      - กิจกรรมกีฬาของคณะ
      - กิจกรรมค่ายต่าง ๆ`,
    },
    {
      title: "นโยบายส่งเสริมกิจกรรมจิตอาสาและนักศึกษากู้ กยศ.",
      shortDesc:
        "จัดให้มีกิจกรรมจิตอาสาและกิจกรรมสร้างสรรค์สำหรับนักศึกษาที่กู้ยืมกองทุน",
      detail:
        "จัดให้มีกิจกรรมจิตอาสาและกิจกรรมสร้างสรรค์สำหรับนักศึกษาที่กู้ยืมกองทุน กยศ. เพื่อเสริมสร้างจิตสาธารณะและการมีส่วนร่วมในสังคม",
    },
    {
      title: "นโยบายเสริมสร้างความกล้าแสดงออกและความมั่นใจ",
      shortDesc:
        "จัดกิจกรรมที่ช่วยส่งเสริมความกล้าแสดงออก พัฒนาความมั่นใจในตนเอง",
      detail:
        "จัดกิจกรรมที่ช่วยส่งเสริมความกล้าแสดงออก พัฒนาความมั่นใจในตนเอง และทักษะการสื่อสารของนักศึกษาคณะวิทยาศาสตร์",
    },
    {
      title: "นโยบายรับฟังความคิดเห็นและปัญหาของนักศึกษา",
      shortDesc: "เปิดช่องทางในการรับฟังปัญหาและข้อเสนอแนะของนักศึกษา",
      detail:
        "เปิดช่องทางในการรับฟังปัญหาและข้อเสนอแนะของนักศึกษา เพื่อให้สามารถพูดคุย ปรึกษา และแลกเปลี่ยนความคิดเห็นได้อย่างเป็นกันเอง",
    },
    {
      title: "นโยบายสนับสนุนสิทธิเสรีภาพและความเท่าเทียม",
      shortDesc: "สนับสนุนสิทธิเสรีภาพ ความเสมอภาค และความเท่าเทียมของนักศึกษา",
      detail:
        "สนับสนุนสิทธิเสรีภาพ ความเสมอภาค และความเท่าเทียมของนักศึกษาคณะวิทยาศาสตร์ทุกคน โดยไม่เลือกปฏิบัติ",
    },
    {
      title: "นโยบายเพิ่มความปลอดภัยและสภาพแวดล้อมการอ่านหนังสือ",
      shortDesc:
        "เพิ่มความสะดวก ความสว่าง และความปลอดภัยในบริเวณพื้นที่อ่านหนังสือ",
      detail:
        "เพิ่มความสะดวก ความสว่าง และความปลอดภัย ในบริเวณพื้นที่อ่านหนังสือของนักศึกษาคณะวิทยาศาสตร์",
    },
    {
      title: "นโยบายสนับสนุนกิจกรรมนักศึกษา",
      shortDesc: "ช่วยส่งเสริมและสนับสนุนกิจกรรมของนักศึกษาคณะวิทยาศาสตร์",
      detail:
        "ช่วยส่งเสริมและสนับสนุนกิจกรรมของนักศึกษาคณะวิทยาศาสตร์ เพื่อเปิดโอกาสให้นักศึกษาได้พัฒนาศักยภาพอย่างรอบด้าน",
    },
  ];

  const container = document.getElementById("policies-container");

  if (container) {
    const cardsHTML = policiesData
      .map(
        (policy, index) => `
      <article class="card policy-item" data-index="${index}">
        <h3>${policy.title}</h3>
        <p>${policy.shortDesc}</p>
      </article>
    `
      )
      .join("");

    container.innerHTML = cardsHTML;
  }

  const modalHTML = `
    <div class="modal" id="policyModal" aria-hidden="true">
      <div class="modal-backdrop" data-close="true"></div>
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button class="modal-close" data-close="true" aria-label="ปิด">✕</button>
        <h2 id="modalTitle">หัวข้อ</h2>
        <div class="modal-content" id="modalContent"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("policyModal");
  const titleEl = document.getElementById("modalTitle");
  const contentEl = document.getElementById("modalContent");

  const openModal = (index) => {
    const data = policiesData[index];
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
    container.querySelectorAll(".policy-item").forEach((card) => {
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
