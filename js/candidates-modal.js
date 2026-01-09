(function () {
  const modal = document.getElementById("candidateModal");
  if (!modal) return;

  const cmPhoto = document.getElementById("cmPhoto");
  const cmName = document.getElementById("cmName");
  const cmRole = document.getElementById("cmRole");
  const cmZone = document.getElementById("cmZone");
  const cmNumber = document.getElementById("cmNumber");

  const cmTitle = document.getElementById("cmTitle");
  const cmArea = document.getElementById("cmArea");
  const cmWork = document.getElementById("cmWork");
  const cmEdu = document.getElementById("cmEdu");
  const cmMeta = document.getElementById("cmMeta");

  const openModal = (data) => {
    cmPhoto.src = data.image || "";
    cmName.textContent = data.name || "ชื่อผู้สมัคร";
    cmRole.textContent = data.role || "";
    cmZone.textContent = data.zone || "";
    cmNumber.textContent = data.number || "1";

    cmTitle.textContent = data.title || "รายละเอียดผู้สมัคร";
    cmArea.textContent = [data.area, data.subarea].filter(Boolean).join(" • ");
    cmMeta.textContent = data.meta || "";

    // reset lists
    cmWork.innerHTML = "";
    cmEdu.innerHTML = "";

    const workArr = safeParseArray(data.work);
    const eduArr = safeParseArray(data.edu);

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
      // ถ้าคุณอยากพิมพ์แบบขึ้นบรรทัดใหม่ ก็รองรับให้ด้วย
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
        number: card.dataset.number,
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
