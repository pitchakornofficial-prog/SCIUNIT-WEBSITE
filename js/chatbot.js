(function () {
  const widget = document.getElementById("chatWidget");
  const body = document.getElementById("chatBody");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatText");
  const toggle = document.getElementById("chatToggle");
  const suggest = document.getElementById("chatSuggest");

  if (!widget || !body || !form || !input) return;

  // ===== 1) คลังความรู้ (แก้ไขตรงนี้ได้เลย) =====
  const knowledge = [
    {
      title: "นโยบายพรรค",
      keywords: [
        "นโยบายพรรค",
        "นโยบาย",
        "policy",
        "ทำอะไร",
        "เป้าหมาย",
        "แนวทาง",
      ],
      answer:
        "นโยบายหลักของ SCI UNIT (สรุป):\n" +
        "• ส่งเสริมกิจกรรมและความสามัคคีของนักศึกษา\n" +
        "• ส่งเสริมกิจกรรมจิตอาสาและการมีส่วนร่วม\n" +
        "• เสริมความกล้าแสดงออกและความมั่นใจ\n" +
        "• รับฟังความคิดเห็นและปัญหาของนักศึกษา\n" +
        "• สนับสนุนสิทธิเสรีภาพและความเท่าเทียม\n" +
        "• เพิ่มความปลอดภัยและสภาพแวดล้อมการอ่านหนังสือ\n" +
        "• สนับสนุนกิจกรรมนักศึกษาในคณะวิทยาศาสตร์",
    },
    {
      title: "ทำไมต้องเลือกพรรคเรา",
      keywords: ["ทำไม", "เลือก", "เหตุผล", "ต่างจาก", "why", "เลือกพรรคเรา"],
      answer:
        "เหตุผลที่ SCI UNIT แตกต่าง:\n" +
        "• โปร่งใส ตรวจสอบได้\n" +
        "• ทำได้จริง วัดผลได้\n" +
        "• เข้าใจนักศึกษาคณะวิทยาศาสตร์จากประสบการณ์จริง\n" +
        "• ไม่ทิ้งใครไว้ข้างหลัง เปิดโอกาสให้ทุกคนมีส่วนร่วม\n" +
        "• ลงมือทำจริง ไม่ใช่แค่คำสัญญา",
    },
    {
      title: "ติดต่อพรรค",
      keywords: [
        "ติดต่อ",
        "โทร",
        "เบอร์",
        "อีเมล",
        "email",
        "facebook",
        "เฟส",
        "ไอจี",
        "ig",
        "tiktok",
        "tt",
        "ติดตาม",
        "แชท",
      ],
      answer:
        "ติดต่อ & ติดตาม SCI UNIT:\n" +
        "• โทร: 093-526-2414\n" +
        "• อีเมล: smosci.sciunit@gmail.com\n" +
        "• ติดตาม: Facebook / Instagram / TikTok (พรรค SCI UNIT)",
    },
    {
      title: "วันเลือกตั้ง",
      keywords: [
        "วันเลือกตั้ง",
        "เลือกตั้ง",
        "กี่โมง",
        "เมื่อไหร่",
        "date",
        "เวลา",
      ],
      answer:
        "วันเลือกตั้ง: 27 กุมภาพันธ์ 2569\n" +
        "เวลา: 09:00 น. - 17:00 น. \n" +
        "สามารถมาใช้สิทธิ์ได้ ผ่านช่องทางออนไลน์ หรือ สอบถามเพิ่มเติมผ่านทางพรรคครับ",
    },
    {
      title: "เกี่ยวกับพรรค",
      keywords: ["เกี่ยวกับ", "วิสัยทัศน์", "พันธกิจ", "ที่มา", "about"],
      answer:
        "เกี่ยวกับ SCI UNIT:\n" +
        "• พรรคของนักศึกษาคณะวิทยาศาสตร์\n" +
        "• เน้นสิทธิ เสรีภาพ และความเท่าเทียม\n" +
        "• รวมพลังนักศึกษาหลากหลายสาขา เพื่อเดินไปข้างหน้าด้วยกัน",
    },
  ];

  // ===== 2) เครื่องมือช่วยตอบ =====
  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  function scoreMatch(query, item) {
    const q = normalize(query);
    let score = 0;

    for (const kw of item.keywords) {
      const k = normalize(kw);
      if (!k) continue;
      if (q.includes(k)) score += 3; // ตรง keyword
      else if (k.includes(q) && q.length > 2) score += 1; // ผู้ใช้พิมพ์สั้น
    }

    if (q.includes(normalize(item.title))) score += 2;
    return score;
  }

  function findBestAnswer(query) {
    let best = null;
    let bestScore = 0;
    for (const item of knowledge) {
      const s = scoreMatch(query, item);
      if (s > bestScore) {
        bestScore = s;
        best = item;
      }
    }
    return { best, bestScore };
  }

  function addBubble(text, who) {
    const div = document.createElement("div");
    div.className = `bubble ${who}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  // ===== 3) Spell Fix (Offline) =====
  // 3.1 typo map: คำผิดที่พบบ่อย
  const typoMap = {
    // พรค: "พรรค",
    // พัค: "พรรค",
    // พรร: "พรรค",
    // นโยบายพัก: "นโยบายพรรค",
    // นโยบย: "นโยบาย",
    // ตดต่อ: "ติดต่อ",
    // "ตด.": "ติดต่อ",
    // เฟสบุ๊ค: "facebook",
    // ติ้กต้อก: "tiktok",
    // ไอจี: "ig",
  };

  function fixTypo(text) {
    let out = String(text || "");
    for (const wrong in typoMap) {
      out = out.split(wrong).join(typoMap[wrong]);
    }
    return out;
  }

  // 3.2 Levenshtein distance
  function levenshtein(a, b) {
    a = String(a || "");
    b = String(b || "");
    const m = a.length,
      n = b.length;
    if (!m) return n;
    if (!n) return m;

    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[m][n];
  }

  // ดึง keyword ทั้งหมดจาก knowledge
  function collectKeywords() {
    const set = new Set();
    for (const item of knowledge) {
      if (item.title) set.add(normalize(item.title));
      for (const kw of item.keywords || []) set.add(normalize(kw));
    }
    return [...set].filter(Boolean);
  }

  const keywordPool = collectKeywords();

  // หา keyword ที่ใกล้ที่สุด
  function fuzzyCorrect(input) {
    const q = normalize(input);
    if (q.length < 3)
      return { corrected: input, changed: false, suggestion: null };

    // ถ้ามี keyword อยู่แล้ว ไม่ต้องแก้
    for (const k of keywordPool) {
      if (k && q.includes(k)) {
        return { corrected: input, changed: false, suggestion: null };
      }
    }

    let best = null;
    let bestDist = Infinity;

    for (const k of keywordPool) {
      if (!k) continue;
      const d = levenshtein(q, k);
      if (d < bestDist) {
        bestDist = d;
        best = k;
      }
    }

    // threshold: ยิ่งสั้น ยิ่งเข้ม (กันเดามั่ว)
    const threshold = Math.max(1, Math.floor(q.length * 0.35));
    if (best && bestDist <= threshold) {
      return { corrected: best, changed: true, suggestion: best };
    }

    return { corrected: input, changed: false, suggestion: null };
  }

  // ===== 4) เริ่มต้นข้อความต้อนรับ =====
  addBubble(
    "สวัสดี! ผมคือ SCI UNIT Assistant \nถามได้เลย เช่น “นโยบาย”, “ทำไมต้องเลือกพรรคเรา”, “ช่องติดต่อ”, “วันเลือกตั้ง”",
    "bot"
  );

  // ===== 5) ส่งข้อความ =====
  function handleAsk(q) {
    const raw = String(q || "").trim();
    if (!raw) return;

    // แสดงข้อความผู้ใช้ตามจริง
    addBubble(raw, "user");

    // 1) แก้คำผิดพื้นฐาน
    const fixed = fixTypo(raw);

    // 2) เดาด้วย fuzzy
    const fuzzy = fuzzyCorrect(fixed);
    const query = String(fuzzy.corrected || fixed).trim();

    // ถ้ามีการแก้ ให้บอกผู้ใช้อย่างสุภาพ
    if (normalize(raw) !== normalize(query)) {
      addBubble(`ผมเข้าใจว่าคุณหมายถึง “${query}” นะครับ`, "bot");
    }

    const { best, bestScore } = findBestAnswer(query);

    if (!best || bestScore < 2) {
      addBubble(
        "ผมยังไม่แน่ใจคำถามนี้ครับ TwT\nลองพิมพ์คำว่า “นโยบาย”, “ทำไมเลือกเรา”, “ติดต่อ”, หรือ “วันเลือกตั้ง” ได้เลย",
        "bot"
      );
      return;
    }

    addBubble(best.answer, "bot");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAsk(input.value);
    input.value = "";
    input.focus();
  });

  // ชิปคำถามแนะนำ
  if (suggest) {
    suggest.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      handleAsk(btn.getAttribute("data-q"));
    });
  }

  // ย่อ/ขยาย
  if (toggle) {
    toggle.addEventListener("click", () => {
      widget.classList.toggle("collapsed");
      toggle.textContent = widget.classList.contains("collapsed") ? "+" : "—";
    });
  }
})();
