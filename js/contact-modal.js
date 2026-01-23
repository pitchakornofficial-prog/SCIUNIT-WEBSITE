(function initContactSystem() {
  const contactData = [
    {
      title: "ช่องทางติดต่อ",
      shortDesc: "โทร : 093-526-2414<br />อีเมล : sciunit.partylist@gmail.com",
      detail: "โทร: 093-526-2414\nอีเมล: sciunit.partylist@gmail.com",
      links: {},
    },
    {
      title: "ติดตามเรา",
      shortDesc: "Facebook / Instagram / TikTok<br />พรรค SCI UNIT",
      detail: "เลือกช่องทางที่ต้องการติดตามได้เลย",
      links: {
        facebook: "https://www.facebook.com/profile.php?id=61586475865124",
        instagram: "https://www.instagram.com/sciunit_official/",
        tiktok: "https://www.tiktok.com/@smovidyaubu.official",
      },
    },
  ];

  const container = document.getElementById("contact-container");

  if (container) {
    const cardsHTML = contactData
      .map(
        (item, index) => `
      <article class="card contact-item" data-index="${index}">
        <h3>${item.title}</h3>
        <p>${item.shortDesc}</p>
      </article>
    `,
      )
      .join("");

    container.insertAdjacentHTML("afterbegin", cardsHTML);
  }

  const modalHTML = `
    <div class="modal" id="contactModal" aria-hidden="true">
      <div class="modal-backdrop" data-close="true"></div>
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="contactModalTitle">
        <button class="modal-close" data-close="true" aria-label="ปิด">✕</button>
        <h2 id="contactModalTitle">หัวข้อ</h2>
        <div class="modal-content" id="contactModalContent"></div>
        
        <div class="social-actions" id="socialActions" style="display:none;">
          <a class="social-card" id="btnFacebook" target="_blank" rel="noopener">Facebook</a>
          <a class="social-card" id="btnInstagram" target="_blank" rel="noopener">Instagram</a>
          <a class="social-card" id="btnTikTok" target="_blank" rel="noopener">TikTok</a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("contactModal");
  const titleEl = document.getElementById("contactModalTitle");
  const contentEl = document.getElementById("contactModalContent");
  const socialWrap = document.getElementById("socialActions");
  const btnFb = document.getElementById("btnFacebook");
  const btnIg = document.getElementById("btnInstagram");
  const btnTt = document.getElementById("btnTikTok");

  const openModal = (index) => {
    const data = contactData[index];
    if (!data) return;

    titleEl.textContent = data.title;
    contentEl.innerText = data.detail;

    const l = data.links || {};
    const hasAny = l.facebook || l.instagram || l.tiktok;

    socialWrap.style.display = hasAny ? "flex" : "none";

    if (l.facebook) {
      btnFb.href = l.facebook;
      btnFb.style.display = "inline-flex";
    } else btnFb.style.display = "none";

    if (l.instagram) {
      btnIg.href = l.instagram;
      btnIg.style.display = "inline-flex";
    } else btnIg.style.display = "none";

    if (l.tiktok) {
      btnTt.href = l.tiktok;
      btnTt.style.display = "inline-flex";
    } else btnTt.style.display = "none";

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
    container.querySelectorAll(".contact-item").forEach((card) => {
      card.addEventListener("click", () => openModal(card.dataset.index));
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
