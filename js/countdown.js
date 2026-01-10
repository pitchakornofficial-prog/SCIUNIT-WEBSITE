(function () {
  // ✅ แก้วันเลือกตั้งตรงนี้ (รูปแบบ: YYYY-MM-DDTHH:mm:ss+07:00)
  const ELECTION_DATE = "2026-02-27T09:00:00+07:00";

  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minsEl = document.getElementById("cdMins");
  const secsEl = document.getElementById("cdSecs");
  const noteEl = document.getElementById("cdNote");

  // ✅ กล่องที่จะติดคลาส urgent (เลือก 1 ตัวตามที่คุณใส่ไว้)
  const box =
    document.getElementById("countdownCard") ||
    document.getElementById("countdownBox");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const target = new Date(ELECTION_DATE).getTime();
  const pad2 = (n) => String(n).padStart(2, "0");

  const formatThaiDate = (ms) => {
    const opts = { year: "numeric", month: "long", day: "numeric" };
    return new Date(ms).toLocaleDateString("th-TH", opts);
  };

  if (noteEl) {
    noteEl.textContent = `วันเลือกตั้ง: ${formatThaiDate(
      target
    )} 09:00 น. - 17:00 น.`;
  }

  // ใช้ไว้เช็ค “เลขเปลี่ยน” เพื่อใส่ pop
  let prev = { d: "", h: "", m: "", s: "" };

  const popIfChanged = (el, next, key) => {
    if (prev[key] !== next) {
      el.textContent = next;
      el.classList.remove("pop"); // reset
      void el.offsetWidth; // force reflow
      el.classList.add("pop");
      prev[key] = next;
    }
  };

  const tick = () => {
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      if (noteEl) noteEl.textContent = "ถึงวันเลือกตั้งแล้ว";
      if (box) box.classList.remove("urgent");
      return;
    }

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / (24 * 3600));
    const hours = Math.floor((sec % (24 * 3600)) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    const dStr = String(days);
    const hStr = pad2(hours);
    const mStr = pad2(mins);
    const sStr = pad2(secs);

    // ✅ อัปเดต + เด้งเมื่อเปลี่ยน
    popIfChanged(daysEl, dStr, "d");
    popIfChanged(hoursEl, hStr, "h");
    popIfChanged(minsEl, mStr, "m");
    popIfChanged(secsEl, sStr, "s");

    // ✅ โหมดใกล้วันเลือกตั้ง
    if (box) {
      if (days < 3) box.classList.add("urgent");
      else box.classList.remove("urgent");
    }
  };

  tick();
  setInterval(tick, 1000);
})();
