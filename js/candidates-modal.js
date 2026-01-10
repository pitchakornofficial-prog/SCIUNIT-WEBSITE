(function () {
  const modal = document.getElementById("candidateModal");
  if (!modal) return;

  const cmPhoto = document.getElementById("cmPhoto");
  const cmName = document.getElementById("cmName");
  const cmRole = document.getElementById("cmRole");
  const cmZone = document.getElementById("cmZone");
  // ❌ ลบ cmNumber ออก เพราะเราเอา "เลือกเบอร์" ออกจาก HTML แล้ว

  const cmTitle = document.getElementById("cmTitle");
  const cmArea = document.getElementById("cmArea");
  const cmWork = document.getElementById("cmWork");
  const cmEdu = document.getElementById("cmEdu");
  const cmMeta = document.getElementById("cmMeta");

  const openModal = (data) => {
    // รูป
    cmPhoto.src = data.image || "";
    cmPhoto.alt = data.name ? `รูปของ ${data.name}` : "รูปผู้สมัคร";

    // ข้อความ
    cmName.textContent = data.name || "ชื่อผู้สมัคร";
    cmRole.textContent = data.role || "";
    cmZone.textContent = data.zone || "";

    cmTitle.textContent = data.title || "รายละเอียดผู้สมัคร";
    cmArea.textContent = [data.area, data.subarea].filter(Boolean).join(" • ");

    // reset lists
    cmMeta.innerHTML = "";
    cmWork.innerHTML = "";
    cmEdu.innerHTML = "";

    // parse arrays
    const metaArr = safeParseArray(data.meta);
    const workArr = safeParseArray(data.work);
    const eduArr = safeParseArray(data.edu);

    // render list items
    metaArr.forEach((t) => cmMeta.appendChild(li(t)));
    workArr.forEach((t) => cmWork.appendChild(li(t)));
    eduArr.forEach((t) => cmEdu.appendChild(li(t)));

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // เลื่อนการ์ดขวากลับไปบนสุดทุกครั้ง
    const infoCard = modal.querySelector(".info-card");
    if (infoCard) infoCard.scrollTop = 0;
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  function li(text) {
    const el = document.createElement("li");
    el.textContent = text;
    return el;
  }

  function safeParseArray(value) {
    if (!value) return [];
    try {
      const arr = JSON.parse(value);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return String(value)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  // คลิกการ์ดผู้สมัคร
  document.querySelectorAll(".candidate-item").forEach((card) => {
    card.addEventListener("click", () => {
      openModal({
        name: card.dataset.name,
        role: card.dataset.role,
        meta: card.dataset.meta,
        zone: card.dataset.zone,
        image: card.dataset.image,

        title: card.dataset.title,
        area: card.dataset.area,
        subarea: card.dataset.subarea,

        work: card.dataset.work,
        edu: card.dataset.edu,
      });
    });
  });

  // ปิด modal ด้วย X หรือคลิกพื้นหลัง
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();
  });

  // ESC ปิด
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
