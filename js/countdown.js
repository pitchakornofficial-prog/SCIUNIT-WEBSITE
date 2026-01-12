(function initCountdown() {
  // 1. หาตำแหน่งที่จะวาง
  const placeholder = document.getElementById("countdown-placeholder");
  if (!placeholder) return; // ถ้าหน้านี้ไม่มี placeholder ก็ไม่ต้องทำอะไร

  // 2. สร้างโครงสร้าง HTML ยัดเข้าไป
  placeholder.innerHTML = `
    <article class="card countdown-card" id="countdownCard">
      <h3>นับถอยหลังวันเลือกตั้ง</h3>
      <p class="countdown-sub">เหลือเวลาอีก</p>
      <div class="countdown-box">
        <div class="cd-item">
          <div class="cd-num" id="cdDays">0</div>
          <div class="cd-label">วัน</div>
        </div>
        <div class="cd-item">
          <div class="cd-num" id="cdHours">0</div>
          <div class="cd-label">ชั่วโมง</div>
        </div>
        <div class="cd-item">
          <div class="cd-num" id="cdMins">0</div>
          <div class="cd-label">นาที</div>
        </div>
        <div class="cd-item">
          <div class="cd-num" id="cdSecs">0</div>
          <div class="cd-label">วินาที</div>
        </div>
      </div>
      <p class="countdown-note" id="cdNote">กำลังโหลด...</p>
    </article>
  `;

  // --- 3. ส่วน Logic การทำงาน (เหมือนเดิม) ---
  const ELECTION_DATE = "2026-02-27T09:00:00+07:00"; // ตั้งวันเลือกตั้งที่นี่

  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minsEl = document.getElementById("cdMins");
  const secsEl = document.getElementById("cdSecs");
  const noteEl = document.getElementById("cdNote");
  const box = document.getElementById("countdownCard");

  const target = new Date(ELECTION_DATE).getTime();
  const pad2 = (n) => String(n).padStart(2, "0");

  const formatThaiDate = (ms) => {
    const opts = { year: "numeric", month: "long", day: "numeric" };
    return new Date(ms).toLocaleDateString("th-TH", opts);
  };

  // อัปเดตข้อความวันที่ด้านล่าง
  if (noteEl) {
    noteEl.textContent = `วันเลือกตั้ง : ${formatThaiDate(
      target
    )} 09:00 น. - 17:00 น.`;
  }

  let prev = { d: "", h: "", m: "", s: "" };

  // ฟังก์ชันเอฟเฟกต์เด้ง (Pop) เมื่อตัวเลขเปลี่ยน
  const popIfChanged = (el, next, key) => {
    if (prev[key] !== next) {
      el.textContent = next;
      el.classList.remove("pop");
      void el.offsetWidth; // Trigger Reflow
      el.classList.add("pop");
      prev[key] = next;
    }
  };

  const tick = () => {
    const now = Date.now();
    let diff = target - now;

    // ถ้าหมดเวลาแล้ว
    if (diff <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      if (noteEl) noteEl.textContent = "ถึงวันเลือกตั้งแล้ว";
      if (box) box.classList.remove("urgent");
      return;
    }

    // คำนวณเวลา
    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / (24 * 3600));
    const hours = Math.floor((sec % (24 * 3600)) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    popIfChanged(daysEl, String(days), "d");
    popIfChanged(hoursEl, pad2(hours), "h");
    popIfChanged(minsEl, pad2(mins), "m");
    popIfChanged(secsEl, pad2(secs), "s");

    // ถ้าเหลือน้อยกว่า 3 วัน ให้เติม class urgent (ตัวแดง/กระพริบ แล้วแต่ CSS)
    if (box) {
      if (days < 3) box.classList.add("urgent");
      else box.classList.remove("urgent");
    }
  };

  tick();
  setInterval(tick, 1000);
})();
