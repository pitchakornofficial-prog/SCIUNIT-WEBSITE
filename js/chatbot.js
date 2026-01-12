(function initChatbot() {
  const container = document.getElementById("contact-container");
  if (!container) return;

  // ============================================================
  // 1. RENDER CHAT WIDGET: สร้าง HTML ของแชทบอท
  // ============================================================
  const chatHTML = `
    <article class="card chat-card" id="chatWidget">
      <div class="chat-head">
        <div class="chat-title">SCI UNIT Assistant</div>
        <button class="chat-toggle" id="chatToggle" aria-label="ย่อ/ขยาย">—</button>
      </div>
      <div class="chat-body" id="chatBody" aria-live="polite"></div>
      <div class="chat-suggest" id="chatSuggest">
        <button class="chip" data-q="วันเลือกตั้งวันไหน">วันเลือกตั้ง</button>
        <button class="chip" data-q="นโยบายพรรค">นโยบาย</button>
        <button class="chip" data-q="ทำไมต้องเลือกพรรคเรา">ทำไมเลือกเรา</button>
        <button class="chip" data-q="ช่องทางติดต่อ">ติดต่อ</button>
      </div>
      <form class="chat-input" id="chatForm">
        <input id="chatText" type="text" placeholder="พิมพ์คำถาม..." autocomplete="off" />
        <button type="submit">ส่ง</button>
      </form>
    </article>
  `;
  container.insertAdjacentHTML("beforeend", chatHTML);

  // ============================================================
  // 2. KNOWLEDGE BASE: คลังความรู้
  // ============================================================
  const knowledge = [
    {
      title: "นโยบายพรรค",
      keywords: ["นโยบาย", "policy", "ทำอะไร", "เป้าหมาย"],
      answer:
        "นโยบายหลัก (สรุป):\n• ส่งเสริมกิจกรรมและความสามัคคี\n• กิจกรรมจิตอาสาและ กยศ.\n• เสริมความกล้าแสดงออก\n• รับฟังทุกความคิดเห็น\n• สิทธิเสรีภาพและความเท่าเทียม\n• เพิ่มความปลอดภัยพื้นที่อ่านหนังสือ",
    },
    {
      title: "ทำไมต้องเลือกพรรคเรา",
      keywords: ["ทำไม", "เลือก", "เหตุผล", "ดีกว่า", "why"],
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
      keywords: ["วันเลือกตั้ง", "เลือกตั้ง", "กี่โมง", "เมื่อไหร่", "date"],
      answer:
        "วันเลือกตั้ง: 27 กุมภาพันธ์ 2569\nเวลา: 09:00 - 17:00 น.\nอย่าลืมมาใช้สิทธิ์กันนะครับ!",
    },
    {
      title: "ทักทาย",
      keywords: ["สวัสดี", "ดีครับ", "ดีค่ะ", "hi", "hello"],
      answer: "สวัสดีครับ! มีอะไรให้ SCI UNIT ช่วยตอบไหมครับ?",
    },
  ];

  // ============================================================
  // 3. LOGIC & HELPERS
  // ============================================================
  const body = document.getElementById("chatBody");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  const toggle = document.getElementById("chatToggle");
  const widget = document.getElementById("chatWidget");

  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .trim();

  // Levenshtein Distance (คำนวณความห่างของคำ แก้คำผิด)
  const levenshtein = (a, b) => {
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
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
      // เช็ค Keyword ตรงๆ
      item.keywords.forEach((kw) => {
        if (q.includes(normalize(kw))) score += 5;
        // เช็คคำใกล้เคียง (Fuzzy)
        else if (levenshtein(q, kw) <= 2 && q.length > 3) score += 3;
      });

      if (score > maxScore) {
        maxScore = score;
        best = item;
      }
    });

    return { best, score: maxScore };
  };

  const addBubble = (text, type) => {
    const div = document.createElement("div");
    div.className = `bubble ${type}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  // เริ่มต้น
  addBubble(
    "สวัสดีครับ! สงสัยเรื่องนโยบาย หรือวันเลือกตั้ง ถามได้เลยครับ 👇",
    "bot"
  );

  const handleSend = (text) => {
    if (!text) return;
    addBubble(text, "user");

    const { best, score } = findBestAnswer(text);

    setTimeout(() => {
      if (best && score > 0) {
        addBubble(best.answer, "bot");
      } else {
        addBubble(
          "ขออภัยครับ ผมไม่แน่ใจคำถาม ลองถามเกี่ยวกับ 'นโยบาย' หรือ 'ติดต่อ' ดูนะครับ",
          "bot"
        );
      }
    }, 500);
  };

  // Event Listeners
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) {
      handleSend(val);
      input.value = "";
    }
  });

  document.getElementById("chatSuggest").addEventListener("click", (e) => {
    if (e.target.classList.contains("chip")) {
      handleSend(e.target.dataset.q);
    }
  });

  toggle.addEventListener("click", () => {
    widget.classList.toggle("collapsed");
    toggle.textContent = widget.classList.contains("collapsed") ? "+" : "—";
  });
})();
