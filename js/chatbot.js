(function initChatbot() {
  const container = document.getElementById("contact-container");
  if (!container) return;

  const chatHTML = `
    <article class="card chat-card" id="chatWidget">
      <div class="chat-head">
        <div class="chat-title">SCI UNIT Assistant</div>
        <button class="chat-toggle" id="chatToggle" aria-label="ย่อ/ขยาย">—</button>
      </div>
      <div class="chat-body" id="chatBody" aria-live="polite"></div>
      <div class="chat-suggest" id="chatSuggest">
        <button class="chip" data-q="วันเลือกตั้ง">วันเลือกตั้ง</button>
        <button class="chip" data-q="นโยบาย">นโยบาย</button>
        <button class="chip" data-q="ทำไมต้องเลือกพรรคเรา">ทำไมต้องเลือกพรรคเรา</button>
        <button class="chip" data-q="ช่องทางติดต่อ">ช่องทางติดต่อ</button>
      </div>
      <form class="chat-input" id="chatForm">
        <input id="chatText" type="text" placeholder="พิมพ์คำถาม..." autocomplete="off" />
        <button type="submit">ส่ง</button>
      </form>
    </article>
  `;
  container.insertAdjacentHTML("beforeend", chatHTML);

  const style = document.createElement("style");
  style.textContent = `
    .bubble.typing {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 12px;
    }
    .typing-dots {
      display: inline-flex;
      gap: 4px;
      align-items: center;
    }
    .typing-dots span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      opacity: .55;
      animation: dotBounce 1s infinite;
    }
    .typing-dots span:nth-child(2) { animation-delay: .15s; }
    .typing-dots span:nth-child(3) { animation-delay: .30s; }
    @keyframes dotBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: .45; }
      30% { transform: translateY(-4px); opacity: .9; }
    }
  `;
  document.head.appendChild(style);

  const knowledge = [
    {
      title: "นโยบายพรรค",
      keywords: ["นโยบาย", "policy", "ทำอะไร", "เป้าหมาย"],
      answer:
        "นโยบายหลัก (สรุป):\n• ส่งเสริมกิจกรรมและความสามัคคี\n• กิจกรรมจิตอาสาและ กยศ.\n• เสริมความกล้าแสดงออก\n• รับฟังทุกความคิดเห็น\n• สิทธิเสรีภาพและความเท่าเทียม\n• เพิ่มความปลอดภัยพื้นที่อ่านหนังสือ",
    },
    {
      title: "ทำไมต้องเลือกพรรคเรา",
      keywords: ["ทำไม", "ทำไมต้องเลือก", "เลือกเรา"],
      answer:
        "เหตุผลที่ SCI UNIT แตกต่าง:\n• โปร่งใส ตรวจสอบได้\n• ทำได้จริง วัดผลได้\n• เข้าใจปัญหาจากประสบการณ์จริง\n• ไม่ทิ้งใครไว้ข้างหลัง",
    },
    {
      title: "ช่องทางติดต่อ",
      keywords: ["ติดต่อ", "โทร", "เบอร์", "อีเมล", "facebook", "ig", "tiktok"],
      answer:
        "ติดต่อ & ติดตาม:\n• โทร: 093-526-2414\n• อีเมล: smosci.sciunit@gmail.com\n• Facebook / IG / TikTok: พรรค SCI UNIT",
    },
    {
      title: "วันเลือกตั้ง",
      keywords: ["วันเลือกตั้ง", "เลือกตั้ง"],
      answer:
        "วันเลือกตั้ง: 27 กุมภาพันธ์ 2569\nเวลา: 09:00 - 17:00 น.\nทางช่อทางออนไลน์ อย่าลืมมาใช้สิทธิ์กันนะครับ!",
    },
    {
      title: "ทักทาย",
      keywords: ["สวัสดี", "ดีครับ", "ดีค่ะ", "hi", "hello"],
      answer: "สวัสดีครับ! มีอะไรให้ SCI UNIT ช่วยตอบไหมครับ?",
    },
  ];

  const body = document.getElementById("chatBody");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  const toggle = document.getElementById("chatToggle");
  const widget = document.getElementById("chatWidget");
  const suggest = document.getElementById("chatSuggest");

  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .trim();

  const levenshtein = (a, b) => {
    a = String(a || "");
    b = String(b || "");
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1,
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const findBestAnswer = (query) => {
    let best = null;
    let maxScore = 0;
    const q = normalize(query);

    knowledge.forEach((item) => {
      let score = 0;

      item.keywords.forEach((kw) => {
        const nkw = normalize(kw);

        if (q.includes(nkw)) score += 5;
        else if (levenshtein(q, nkw) <= 2 && q.length > 3) score += 3;
      });

      if (score > maxScore) {
        maxScore = score;
        best = item;
      }
    });

    return { best, score: maxScore };
  };

  const scrollToBottom = () => {
    body.scrollTop = body.scrollHeight;
  };

  const addBubble = (text, type) => {
    const div = document.createElement("div");
    div.className = `bubble ${type}`;
    div.textContent = text;
    body.appendChild(div);
    scrollToBottom();
    return div;
  };

  const addTypingBubble = () => {
    const div = document.createElement("div");
    div.className = "bubble bot typing";
    div.innerHTML = `
      <span>กำลังพิมพ์</span>
      <span class="typing-dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
    `;
    body.appendChild(div);
    scrollToBottom();
    return div;
  };

  const removeBubble = (el) => {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const typeTextIntoBubble = async (bubbleEl, fullText, speedMs = 14) => {
    const len = String(fullText || "").length;
    const base = speedMs;
    const dynamic = len > 220 ? 10 : len > 120 ? 12 : base;

    bubbleEl.textContent = "";
    const text = String(fullText || "");

    for (let i = 0; i < text.length; i++) {
      bubbleEl.textContent += text[i];
      const ch = text[i];
      if (ch === "\n") await sleep(120);
      else if (ch === "!" || ch === "?" || ch === ".") await sleep(80);
      else await sleep(dynamic);
      scrollToBottom();
    }
  };

  let isBotBusy = false;

  const handleSend = async (text) => {
    if (!text || isBotBusy) return;

    addBubble(text, "user");

    const { best, score } = findBestAnswer(text);

    isBotBusy = true;

    const typing = addTypingBubble();

    const thinkDelay = Math.min(900, 320 + text.length * 18);
    await sleep(thinkDelay);

    removeBubble(typing);

    const botBubble = document.createElement("div");
    botBubble.className = "bubble bot";
    body.appendChild(botBubble);
    scrollToBottom();

    const reply =
      best && score > 0
        ? best.answer
        : "ขออภัยครับ ผมไม่แน่ใจคำถาม ลองถามเกี่ยวกับ 'นโยบาย' หรือ 'ติดต่อ' ดูนะครับ";

    await typeTextIntoBubble(botBubble, reply, 14);

    isBotBusy = false;
  };

  (async () => {
    const intro =
      "สวัสดีครับ! สงสัยเรื่องนโยบาย หรือวันเลือกตั้ง ถามได้เลยครับ (เดโม่อาจจะความผิดพลาดในการตอบคำถาม)";
    const botBubble = document.createElement("div");
    botBubble.className = "bubble bot";
    body.appendChild(botBubble);
    await typeTextIntoBubble(botBubble, intro, 12);
  })();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    handleSend(val);
    input.value = "";
    input.focus();
  });

  suggest.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    handleSend(btn.dataset.q);
  });

  toggle.addEventListener("click", () => {
    widget.classList.toggle("collapsed");
    toggle.textContent = widget.classList.contains("collapsed") ? "+" : "—";
  });
})();
