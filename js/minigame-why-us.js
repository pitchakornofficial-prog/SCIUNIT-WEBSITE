(() => {
  // ====== CONFIG ======
  const CONTAINER_ID = "why-container";
  const CARD_ID = "minigameWhyUsCard";
  const MODAL_ID = "minigameWhyUsModal";

  // ค่าหลักที่อยากสะท้อน (ปรับได้)
  const VALUES = {
    transparency: "โปร่งใส ตรวจสอบได้",
    practical: "ทำได้จริง วัดผลได้",
    studentVoice: "เข้าใจนักศึกษาจริง",
    inclusion: "ไม่ทิ้งใครไว้ข้างหลัง",
  };

  // คำถาม (ปรับได้)
  const QUESTIONS = [
    {
      tag: "การสื่อสาร",
      title: "ถ้าพรรคสัญญาไว้ คุณอยากเห็นอะไรที่สุด?",
      choices: [
        {
          title: "อัปเดตความคืบหน้าให้เห็นชัด",
          desc: "ทำถึงไหนแล้ว มีหลักฐาน ตรวจสอบได้",
          score: { transparency: 2, practical: 1 },
        },
        {
          title: "ทำจริงให้เห็นผล",
          desc: "มีตัวชี้วัด งานไม่ค้าง",
          score: { practical: 2 },
        },
        {
          title: "รับฟังและตอบกลับจริง",
          desc: "มีช่องทางเสนอปัญหา และติดตามได้",
          score: { studentVoice: 2, inclusion: 1 },
        },
      ],
    },
    {
      tag: "กิจกรรม",
      title: "กิจกรรมแบบไหนที่คุณรู้สึกว่า ‘ใช่’ สำหรับคณะ?",
      choices: [
        {
          title: "เข้าถึงง่าย ไม่ทับตารางเรียน",
          desc: "ทุกสาขามีโอกาสเข้าร่วม",
          score: { inclusion: 2, practical: 1 },
        },
        {
          title: "พัฒนาทักษะจริง",
          desc: "เวิร์กช็อป/แนะแนว ที่ต่อยอดได้",
          score: { practical: 2 },
        },
        {
          title: "เปิดให้เสนอไอเดียร่วมกัน",
          desc: "อยากให้เสียงนักศึกษามีส่วนร่วม",
          score: { studentVoice: 2, inclusion: 1 },
        },
      ],
    },
    {
      tag: "การแก้ปัญหา",
      title: "ถ้าเจอปัญหาในคณะ คุณคาดหวังอะไรจากพรรค?",
      choices: [
        {
          title: "รวบรวมปัญหาเป็นระบบ แล้วผลักดันต่อ",
          desc: "จัดหมวดหมู่ ชี้ฝ่ายที่เกี่ยวข้องให้ชัด",
          score: { practical: 2, studentVoice: 1 },
        },
        {
          title: "ติดตามเรื่องแบบโปร่งใส",
          desc: "รู้ว่าเรื่องไปถึงไหนแล้ว",
          score: { transparency: 2 },
        },
        {
          title: "ไม่ทิ้งใครไว้ข้างหลัง",
          desc: "ดูแลทั้งคนเก่งและคนที่ต้องการพื้นที่",
          score: { inclusion: 2 },
        },
      ],
    },
    {
      tag: "ทีมเวิร์ก",
      title: "คุณคิดว่า ‘ทีมที่ดี’ ควรเป็นแบบไหน?",
      choices: [
        {
          title: "ทำงานเป็นระบบ แบ่งหน้าที่ชัด",
          desc: "งานเดินต่อได้จริง",
          score: { practical: 2 },
        },
        {
          title: "สื่อสารตรงไปตรงมา ตรวจสอบได้",
          desc: "ไม่พูดลอย ๆ",
          score: { transparency: 2, practical: 1 },
        },
        {
          title: "รับฟังกันและกัน",
          desc: "ให้ทุกคนมีส่วนร่วมจริง",
          score: { studentVoice: 2, inclusion: 1 },
        },
      ],
    },
    {
      tag: "ความคาดหวัง",
      title: "ถ้าเลือกได้ 1 อย่าง คุณอยากเห็นอะไรในคณะมากที่สุด?",
      choices: [
        {
          title: "โอกาสที่เข้าถึงได้สำหรับทุกคน",
          desc: "ไม่ว่าอยู่สาขาไหนก็มีทาง",
          score: { inclusion: 2, studentVoice: 1 },
        },
        {
          title: "งานที่ทำได้จริงและวัดผลได้",
          desc: "เห็นผลเป็นรูปธรรม",
          score: { practical: 2, transparency: 1 },
        },
        {
          title: "การทำงานที่โปร่งใส",
          desc: "ติดตามได้ ตรวจสอบได้",
          score: { transparency: 2 },
        },
      ],
    },
  ];

  // ====== UTIL ======
  const esc = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function injectStylesOnce() {
    if (document.getElementById("minigameWhyUsStyles")) return;

    const style = document.createElement("style");
    style.id = "minigameWhyUsStyles";
    style.textContent = `
      /* ===== MiniGame Card (เด่นขึ้น แต่ยังเข้าธีมเดิม) ===== */
      #${CARD_ID} {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0.10);
        background: linear-gradient(135deg, rgba(255,140,0,0.16), rgba(255,220,170,0.28));
        transition: transform 160ms ease;
      }
      #${CARD_ID}:hover { transform: translateY(-2px); }
      #${CARD_ID} .mg-badge {
        display: inline-flex;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
        background: #111;
        color: #fff;
        width: fit-content;
        margin-bottom: 10px;
      }
      #${CARD_ID} .mg-cta {
        font-weight: 800;
        margin-top: 10px;
      }
      #${CARD_ID}::after{
        content:"";
        position:absolute;
        inset:-60px;
        background: radial-gradient(circle at 25% 20%, rgba(255,140,0,0.22), transparent 60%),
                    radial-gradient(circle at 80% 75%, rgba(0,180,255,0.14), transparent 55%);
        pointer-events:none;
      }
      #${CARD_ID} > * { position: relative; z-index: 1; }

      /* ===== Modal ===== */
      #${MODAL_ID} {
        position: fixed;
        inset: 0;
        z-index: 9999;
      }
      #${MODAL_ID}[hidden] { display: none; }
      #${MODAL_ID} .mg-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.45);
      }
      #${MODAL_ID} .mg-panel {
        position: relative;
        width: min(980px, 94vw);
        height: min(760px, 88vh);
        margin: 6vh auto 0;
        background: #fff;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 20px 80px rgba(0,0,0,0.25);
        display: grid;
        grid-template-rows: auto 1fr;
      }
      #${MODAL_ID} .mg-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-bottom: 1px solid rgba(0,0,0,0.08);
        background: rgba(255,255,255,0.96);
      }
      #${MODAL_ID} .mg-title {
        margin: 0;
        font-size: 14px;
        font-weight: 900;
      }
      #${MODAL_ID} .mg-sub {
        margin: 2px 0 0;
        font-size: 12px;
        opacity: .7;
      }
      #${MODAL_ID} .mg-close {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        border: 1px solid rgba(0,0,0,0.10);
        background: rgba(255,255,255,0.95);
        cursor: pointer;
        font-weight: 900;
      }

      #${MODAL_ID} .mg-body {
        padding: 14px;
        overflow: auto;
      }

      /* ===== Game UI ===== */
      #${MODAL_ID} .mg-progress {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 12px;
      }
      #${MODAL_ID} .mg-pill {
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid rgba(0,0,0,0.10);
        background: rgba(0,0,0,0.04);
        font-size: 12px;
        font-weight: 800;
      }
      #${MODAL_ID} .mg-bar {
        flex: 1;
        height: 10px;
        border-radius: 999px;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0.10);
        background: rgba(0,0,0,0.05);
      }
      #${MODAL_ID} .mg-fill {
        height: 100%;
        width: 0%;
        background: rgba(0,0,0,0.65);
        transition: width 200ms ease;
      }

      #${MODAL_ID} .mg-qtag {
        display: inline-flex;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 900;
        background: rgba(0,0,0,0.06);
        border: 1px solid rgba(0,0,0,0.10);
        width: fit-content;
        margin-bottom: 10px;
      }
      #${MODAL_ID} .mg-qtitle {
        margin: 0 0 6px;
        font-size: 18px;
        font-weight: 900;
      }
      #${MODAL_ID} .mg-qsub {
        margin: 0 0 12px;
        font-size: 13px;
        opacity: .75;
      }

      #${MODAL_ID} .mg-choices {
        display: grid;
        gap: 10px;
      }

      /* ====== UPDATED: Choices (shadow + nicer hover) ====== */
      #${MODAL_ID} .mg-choice {
        text-align: left;
        border: 1px solid rgba(0,0,0,0.10);
        background: #fff;
        padding: 12px 12px;
        border-radius: 14px;
        cursor: pointer;
        box-shadow: 0 6px 18px rgba(0,0,0,0.10);
        transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
      }
      #${MODAL_ID} .mg-choice:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(0,0,0,0.14);
        background: rgba(255,140,0,0.06);
      }
      #${MODAL_ID} .mg-choice:active {
        transform: translateY(0px);
        box-shadow: 0 6px 18px rgba(0,0,0,0.12);
      }

      #${MODAL_ID} .mg-choice .t { font-weight: 900; margin-bottom: 4px; }
      #${MODAL_ID} .mg-choice .d { font-size: 13px; opacity: .8; line-height: 1.35; }

      #${MODAL_ID} .mg-actions {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 12px;
        flex-wrap: wrap;
      }

      /* ====== UPDATED: Buttons (color + shadow) ====== */
      #${MODAL_ID} .mg-btn {
        border: 1px solid rgba(0,0,0,0.10);
        background: rgba(0,0,0,0.04);
        padding: 10px 12px;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 900;
        box-shadow: 0 6px 16px rgba(0,0,0,0.10);
        transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
      }
      #${MODAL_ID} .mg-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 22px rgba(0,0,0,0.14);
        background: rgba(0,0,0,0.06);
      }
      #${MODAL_ID} .mg-btn:active {
        transform: translateY(0px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.12);
      }
      #${MODAL_ID} .mg-btn.primary {
        border: 0;
        background: linear-gradient(135deg, #ff7a00, #ffb300);
        color: #111;
        box-shadow: 0 12px 28px rgba(255,122,0,0.26);
      }
      #${MODAL_ID} .mg-btn.primary:hover {
        box-shadow: 0 16px 36px rgba(255,122,0,0.32);
      }

      #${MODAL_ID} .mg-result {
        border: 1px solid rgba(0,0,0,0.10);
        background: rgba(0,0,0,0.03);
        padding: 12px;
        border-radius: 14px;
      }
      #${MODAL_ID} .mg-result h3 { margin: 0 0 8px; }
      #${MODAL_ID} .mg-result ul { margin: 0; padding-left: 18px; }
      #${MODAL_ID} .mg-result li { margin: 6px 0; opacity: .9; }

      body.mg-lock { overflow: hidden; }
    `;
    document.head.appendChild(style);
  }

  function createQuizCard() {
    const card = document.createElement("article");
    card.id = CARD_ID;

    // ใช้ class เดิมของการ์ด ถ้าคุณมี (ไม่รู้ชื่อจริง) ก็ไม่เป็นไร
    // ถ้าเว็บคุณใช้ .card อยู่แล้ว มันจะติดสไตล์เดิมอัตโนมัติ
    card.className = "card";

    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "เปิดแบบทดสอบ 60 วิ");

    card.innerHTML = `
      <div class="mg-badge">แบบทดสอบ 60 วิ</div>
      <h3 style="margin:0 0 6px; font-weight:900;">ลองทำแบบทดสอบดูว่า “คุณให้ความสำคัญกับอะไร?”</h3>
      <p style="margin:0; opacity:.85; line-height:1.5;">
        ตอบสั้น ๆ 5 ข้อ แล้วดูผลว่าแนวคิดคุณตรงกับ SCI UNIT แค่ไหน
      </p>
      <div class="mg-cta">กดเพื่อเริ่ม →</div>
    `;
    return card;
  }

  function createModal() {
    if (document.getElementById(MODAL_ID)) return;

    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="mg-backdrop" data-close="1"></div>
      <div class="mg-panel" role="dialog" aria-modal="true" aria-label="แบบทดสอบ 60 วิ">
        <div class="mg-top">
          <div>
            <p class="mg-title">แบบทดสอบ 60 วิ</p>
            <p class="mg-sub">ตอบ 5 ข้อ แล้วดูผลลัพธ์ของคุณ</p>
          </div>
          <button class="mg-close" type="button" data-close="1" aria-label="ปิด">✕</button>
        </div>
        <div class="mg-body">
          <div id="mgApp"></div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // ===== Game State =====
  let step = 0;
  let answers = [];
  let totals = {};

  function resetState() {
    step = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    totals = Object.fromEntries(Object.keys(VALUES).map((k) => [k, 0]));
  }

  function pct() {
    const done = answers.filter(Boolean).length;
    return QUESTIONS.length ? (done / QUESTIONS.length) * 100 : 0;
  }

  function applyScore(score, sign) {
    for (const [k, v] of Object.entries(score)) totals[k] += v * sign;
  }

  function renderApp() {
    const app = document.getElementById("mgApp");
    if (!app) return;

    const q = QUESTIONS[step];
    const progress = `
      <div class="mg-progress">
        <div class="mg-pill">ข้อ ${step + 1}/${QUESTIONS.length}</div>
        <div class="mg-bar"><div class="mg-fill" style="width:${pct()}%"></div></div>
      </div>
    `;

    const questionUI = `
      ${progress}
      <div class="mg-qtag">${esc(q.tag)}</div>
      <h2 class="mg-qtitle">${esc(q.title)}</h2>
      <p class="mg-qsub">เลือกคำตอบที่ใกล้ตัวคุณที่สุด</p>
      <div class="mg-choices">
        ${q.choices
          .map(
            (c, idx) => `
          <button class="mg-choice" type="button" data-choose="${idx}">
            <div class="t">${esc(c.title)}</div>
            <div class="d">${esc(c.desc)}</div>
          </button>
        `
          )
          .join("")}
      </div>
      <div class="mg-actions">
        <button class="mg-btn" type="button" data-back="1" ${
          step === 0 ? "disabled" : ""
        }>
          ย้อนกลับ
        </button>
        <button class="mg-btn" type="button" data-skip="1">
          ข้าม
        </button>
      </div>
    `;

    app.innerHTML = questionUI;

    app.querySelectorAll("[data-choose]").forEach((btn) => {
      btn.addEventListener("click", () => choose(Number(btn.dataset.choose)));
    });
    app.querySelector("[data-back]")?.addEventListener("click", back);
    app.querySelector("[data-skip]")?.addEventListener("click", skip);
  }

  function showResult() {
    const app = document.getElementById("mgApp");
    if (!app) return;

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const top3 = sorted.slice(0, 3).filter(([, v]) => v > 0);

    const lead =
      top3.length === 0
        ? "คุณข้ามหลายข้อ—ลองเล่นใหม่อีกครั้งเพื่อให้ผลลัพธ์ตรงกับตัวคุณมากขึ้น"
        : "จากคำตอบของคุณ แนวคิดของคุณสอดคล้องกับแนวทางของ SCI UNIT ในหลายมุม";

    const reasons = [];
    if ((totals.transparency || 0) >= 3)
      reasons.push("คุณชอบความโปร่งใส — เราเน้นตรวจสอบได้และสื่อสารชัดเจน");
    if ((totals.practical || 0) >= 3)
      reasons.push(
        "คุณชอบงานที่ทำได้จริง — เรามุ่งเน้นผลลัพธ์และความเป็นรูปธรรม"
      );
    if ((totals.studentVoice || 0) >= 3)
      reasons.push(
        "คุณให้ความสำคัญกับเสียงนักศึกษา — เราเน้นรับฟังและตอบกลับจริง"
      );
    if ((totals.inclusion || 0) >= 3)
      reasons.push(
        "คุณไม่อยากให้ใครถูกทิ้งไว้ข้างหลัง — เราออกแบบให้ทุกคนเข้าถึงได้"
      );

    if (reasons.length === 0) {
      reasons.push(
        "คำตอบของคุณหลากหลาย — เราจึงอยากเปิดพื้นที่รับฟังเพื่อออกแบบงานให้ตรงกับทุกคน"
      );
    }

    app.innerHTML = `
      <div class="mg-result">
        <h3 style="margin:0 0 6px; font-weight:900;">ผลลัพธ์ของคุณ</h3>
        <p style="margin:0 0 12px; opacity:.8;">${esc(lead)}</p>

        <h4 style="margin:0 0 8px; font-weight:900;">คุณให้ความสำคัญกับ</h4>
        <ul>
          ${
            top3.length === 0
              ? "<li>ยังไม่พอข้อมูล</li>"
              : top3
                  .map(([k, v]) => `<li>${esc(VALUES[k])} (คะแนน ${v})</li>`)
                  .join("")
          }
        </ul>

        <h4 style="margin:12px 0 8px; font-weight:900;">ทำไม SCI UNIT ถึงเข้ากับคุณ</h4>
        <ul>
          ${reasons.map((r) => `<li>${esc(r)}</li>`).join("")}
        </ul>

        <div class="mg-actions" style="margin-top:12px;">
          <button class="mg-btn primary" type="button" data-restart="1">เล่นใหม่</button>
          <button class="mg-btn" type="button" data-close="1">ปิด</button>
        </div>
      </div>
    `;

    app.querySelector("[data-restart]")?.addEventListener("click", () => {
      resetState();
      renderApp();
    });
    app
      .querySelectorAll("[data-close]")
      .forEach((el) => el.addEventListener("click", closeModal));
  }

  function choose(idx) {
    const q = QUESTIONS[step];

    // ถ้าเคยตอบไว้ ถอดคะแนนก่อน
    if (answers[step]) applyScore(answers[step].score, -1);

    const chosen = q.choices[idx];
    answers[step] = chosen;
    applyScore(chosen.score, +1);

    next();
  }

  function next() {
    if (step < QUESTIONS.length - 1) {
      step += 1;
      renderApp();
      return;
    }
    showResult();
  }

  function back() {
    if (step === 0) return;
    step -= 1;
    renderApp();
  }

  function skip() {
    next();
  }

  // ===== Modal controls =====
  function openModal() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("mg-lock");

    resetState();
    renderApp();
  }

  function closeModal() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("mg-lock");
  }

  function bindModalCloseEvents() {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    modal.addEventListener("click", (e) => {
      const target = e.target.closest("[data-close]");
      if (target) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      const m = document.getElementById(MODAL_ID);
      if (e.key === "Escape" && m && !m.hidden) closeModal();
    });
  }

  // ===== Append card to END of #why-container (ไม่แตะ why-us-modal.js) =====
  function appendCardAtEnd() {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return false;

    // กันซ้ำ
    if (document.getElementById(CARD_ID)) return true;

    const card = createQuizCard();
    container.appendChild(card);

    // คลิก/กด Enter/Space เปิด modal
    card.addEventListener("click", openModal);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    });

    return true;
  }

  function init() {
    injectStylesOnce();
    createModal();
    bindModalCloseEvents();

    // try หลายครั้ง เผื่อ why-us-modal.js สร้างการ์ดทีหลัง
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      const ok = appendCardAtEnd();
      if (ok || tries >= 20) clearInterval(timer); // ~ 2 วินาที
    }, 100);

    // เผื่อบางกรณี render ช้ากว่า
    window.addEventListener("load", () => appendCardAtEnd());
  }

  document.addEventListener("DOMContentLoaded", init);
})();
