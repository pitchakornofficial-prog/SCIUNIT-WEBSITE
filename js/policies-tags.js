(function initPolicyTags() {
  const waitForCards = (tries = 0) =>
    new Promise((resolve) => {
      const ok =
        document.querySelectorAll("#policies-container .policy-item").length >
        0;
      if (ok) return resolve(true);
      if (tries > 30) return resolve(false);
      setTimeout(() => resolve(waitForCards(tries + 1)), 100);
    });

  // ===== 1) Map แท็กให้แต่ละนโยบาย (ตาม index ใน policiesData เดิม) =====
  const TAGS_BY_INDEX = {
    0: ["กิจกรรม", "ความสามัคคี", "นักศึกษาทั่วไป"],
    1: ["จิตอาสา", "กยศ.", "กิจกรรม"],
    2: ["ทักษะ", "ความมั่นใจ", "การสื่อสาร"],
    3: ["เสียงนักศึกษา", "รับฟัง", "ช่วยเหลือ"],
    4: ["สิทธิ", "ความเท่าเทียม", "นักศึกษาทั่วไป"],
    5: ["การอ่าน", "ความปลอดภัย", "สภาพแวดล้อม"],
    6: ["กิจกรรม", "สนับสนุน", "นักศึกษาทั่วไป"],
  };

  // ===== 2) Inject CSS (แถบแท็กเลื่อนซ้าย-ขวา) =====
  function injectStyleOnce() {
    if (document.getElementById("policyTagsStyle")) return;
    const style = document.createElement("style");
    style.id = "policyTagsStyle";
    style.textContent = `
      /* ===== Horizontal Tags Bar (scroll X only) ===== */
      .policy-tags-shell{
        margin: 12px 0 14px;
      }

      .policy-tags-bar{
        display:flex;
        gap:8px;
        flex-wrap: nowrap;            /* ✅ ไม่ให้ขึ้นบรรทัดใหม่ */
        overflow-x: auto;             /* ✅ เลื่อนซ้าย-ขวา */
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        padding: 4px 2px 10px;
        scroll-behavior: smooth;
      }

      /* ซ่อน scrollbar (ยังเลื่อนได้) */
      .policy-tags-bar::-webkit-scrollbar { height: 0px; }
      .policy-tags-bar { scrollbar-width: none; }

      .policy-tag-btn{
        flex: 0 0 auto;               /* ✅ ไม่ยืด */
        border: 1px solid rgba(0,0,0,.10);
        background: rgba(0,0,0,.04);
        padding: 8px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
        cursor:pointer;
        white-space: nowrap;          /* ✅ ไม่ตัดบรรทัด */
        transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
        user-select: none;
      }
      .policy-tag-btn:hover{
        transform: translateY(-1px);
        background: rgba(0,0,0,.06);
        box-shadow: 0 8px 18px rgba(0,0,0,.08);
      }
      .policy-tag-btn.active{
        border: 0;
        background: linear-gradient(135deg, #ff7a00, #ffb300);
        color: #111;
        box-shadow: 0 10px 22px rgba(255,122,0,.22);
      }

      /* ===== Tags inside cards ===== */
      .policy-tags{
        display:flex;
        gap:6px;
        flex-wrap:wrap;
        margin-top: 10px;
      }
      .policy-tag{
        display:inline-flex;
        padding: 6px 8px;
        border-radius: 999px;
        border: 1px solid rgba(0,0,0,.10);
        background: rgba(0,0,0,.03);
        font-size: 11px;
        font-weight: 800;
        opacity: .9;
      }

      /* ===== Filter effect: dim (ยังเห็นทุกใบ) ===== */
      .policy-item.is-dim{
        opacity: .35;
        filter: grayscale(0.2);
        transform: none !important;
      }

      /* ===== Tags in Modal ===== */
      .modal-tags{
        display:flex;
        gap:6px;
        flex-wrap:wrap;
        margin: 8px 0 10px;
      }
      .modal-tag{
        display:inline-flex;
        padding: 6px 8px;
        border-radius: 999px;
        border: 1px solid rgba(0,0,0,.10);
        background: rgba(0,0,0,.03);
        font-size: 11px;
        font-weight: 800;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== 3) ใส่แท็กให้การ์ด และทำ dataset =====
  function attachTagsToCards() {
    const cards = Array.from(
      document.querySelectorAll("#policies-container .policy-item")
    );
    const tagSet = new Set();

    cards.forEach((card) => {
      const idx = Number(card.dataset.index);
      const tags = TAGS_BY_INDEX[idx] || ["นักศึกษาทั่วไป"];

      tags.forEach((t) => tagSet.add(t));
      card.dataset.tags = tags.join("|");

      const tagsWrap = document.createElement("div");
      tagsWrap.className = "policy-tags";
      tagsWrap.innerHTML = tags
        .map((t) => `<span class="policy-tag">${t}</span>`)
        .join("");
      card.appendChild(tagsWrap);
    });

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "th"));
  }

  // ===== 4) Filter/Highlight =====
  function applyFilter(tagOrNull) {
    const cards = Array.from(
      document.querySelectorAll("#policies-container .policy-item")
    );

    // ✅ ถ้าไม่เลือกแท็ก (null) = คืนสภาพปกติทั้งหมด
    if (!tagOrNull) {
      cards.forEach((c) => c.classList.remove("is-dim"));
      return;
    }

    cards.forEach((c) => {
      const tags = String(c.dataset.tags || "").split("|");
      const has = tags.includes(tagOrNull);
      c.classList.toggle("is-dim", !has);
    });
  }

  // ===== 5) สร้างแถบแท็กแบบเลื่อนซ้าย-ขวา =====
  function buildTagBar(allTags) {
    const shell = document.createElement("div");
    shell.className = "policy-tags-shell";

    const bar = document.createElement("div");
    bar.className = "policy-tags-bar";
    bar.setAttribute("aria-label", "แท็กนโยบาย (เลื่อนซ้าย-ขวา)");

    const makeBtn = (label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "policy-tag-btn";
      b.textContent = label;
      b.dataset.tag = label;
      return b;
    };

    allTags.forEach((t) => bar.appendChild(makeBtn(t)));
    shell.appendChild(bar);

    return { shell, bar };
  }

  function clearActive() {
    document
      .querySelectorAll(".policy-tag-btn")
      .forEach((b) => b.classList.remove("active"));
  }

  // ===== 6) ใส่แท็กใน Modal ตอนเปิด (ไม่แตะ openModal เดิม) =====
  function hookModalTags() {
    const modal = document.getElementById("policyModal");
    const titleEl = document.getElementById("modalTitle");
    const contentEl = document.getElementById("modalContent");
    if (!modal || !titleEl || !contentEl) return;

    let modalTagsWrap = modal.querySelector(".modal-tags");
    if (!modalTagsWrap) {
      modalTagsWrap = document.createElement("div");
      modalTagsWrap.className = "modal-tags";
      contentEl.parentNode.insertBefore(modalTagsWrap, contentEl);
    }

    const observer = new MutationObserver(() => {
      const isOpen = modal.classList.contains("show");
      if (!isOpen) return;

      const title = titleEl.textContent.trim();
      const card = Array.from(
        document.querySelectorAll("#policies-container .policy-item")
      ).find(
        (c) => (c.querySelector("h3")?.textContent || "").trim() === title
      );

      const tags = card
        ? String(card.dataset.tags || "")
            .split("|")
            .filter(Boolean)
        : [];

      modalTagsWrap.innerHTML =
        tags.length > 0
          ? tags.map((t) => `<span class="modal-tag">${t}</span>`).join("")
          : "";
    });

    observer.observe(modal, { attributes: true, attributeFilter: ["class"] });
  }

  // ===== INIT =====
  (async () => {
    const ok = await waitForCards();
    if (!ok) return;

    injectStyleOnce();

    const allTags = attachTagsToCards();

    // วาง bar ก่อน grid
    const page = document.querySelector("main.page");
    const grid = document.getElementById("policies-container");
    if (page && grid) {
      const { shell, bar } = buildTagBar(allTags);
      page.insertBefore(shell, grid);

      // ===== Toggle behavior: กดแท็กเดิมซ้ำ = ยกเลิก =====
      let selectedTag = null;

      bar.addEventListener("click", (e) => {
        const btn = e.target.closest(".policy-tag-btn");
        if (!btn) return;

        const tag = btn.dataset.tag;

        // ถ้ากดแท็กเดิมซ้ำ -> ยกเลิก
        if (selectedTag === tag) {
          selectedTag = null;
          clearActive();
          applyFilter(null);
          return;
        }

        // เลือกแท็กใหม่
        selectedTag = tag;
        clearActive();
        btn.classList.add("active");
        applyFilter(tag);

        // เลื่อนให้แท็กที่เลือกอยู่กลาง ๆ (เนียนขึ้น)
        btn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      });

      // เริ่มต้น = ไม่เลือกแท็ก
      applyFilter(null);
    }

    hookModalTags();
  })();
})();
