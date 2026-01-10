(function () {
  // ✅ แก้วันเลือกตั้งตรงนี้ (รูปแบบ: YYYY-MM-DDTHH:mm:ss+07:00)
  const ELECTION_DATE = "2026-02-22T09:00:00+07:00";

  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minsEl = document.getElementById("cdMins");
  const secsEl = document.getElementById("cdSecs");
  const noteEl = document.getElementById("cdNote");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const target = new Date(ELECTION_DATE).getTime();

  const pad2 = (n) => String(n).padStart(2, "0");

  const formatThaiDate = (d) => {
    // แสดงวันที่แบบไทยแบบง่าย ๆ
    const opts = { year: "numeric", month: "long", day: "numeric" };
    return new Date(d).toLocaleDateString("th-TH", opts);
  };

  if (noteEl) {
    noteEl.textContent = `วันเลือกตั้ง: ${formatThaiDate(
      target
    )} 09:00 น. - 17:00 น.`;
  }

  const tick = () => {
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minsEl.textContent = "0";
      secsEl.textContent = "0";
      if (noteEl) noteEl.textContent = "ถึงวันเลือกตั้งแล้ว ✅";
      return;
    }

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / (24 * 3600));
    const hours = Math.floor((sec % (24 * 3600)) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    daysEl.textContent = String(days);
    hoursEl.textContent = pad2(hours);
    minsEl.textContent = pad2(mins);
    secsEl.textContent = pad2(secs);
  };

  tick();
  setInterval(tick, 1000);
})();
