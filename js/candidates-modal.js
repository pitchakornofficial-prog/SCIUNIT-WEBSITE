(function initCandidatesSystem() {
  const candidatesData = [
    {
      name: "นายธเนศ เฉลียวยิ่ง demo",
      role: "หัวหน้าพรรค #1",
      image: "images/1001.png",
      year: "ปี 2",
      major: "คณิตศาสตร์",
      zone: "SCI UNIT",
      meta: [
        "ชื่อเล่น: มะอะอุ",
        "สาขา: คณิตศาสตร์",
        "ชั้นปีที่ 2",
        "IG: maou_tanet",
      ],
      work: [
        "กรรมการฝ่ายวิชาการสภาเด็กและเยาวชนตำบลสวาย (2565)",
        "ประธานฝ่ายวิชาการสภาเด็กและเยาวชนตำบลสวาย (2566)",
        "ที่ปรึกษาสภาเด็กและเยาวชนตำบลสวาย (2567)",
        "อนุกรรมการฝ่ายวิชาการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2567)",
        "ประธานฝ่ายวิชาการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2568)",
      ],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายวงศธร นามประกอบ",
      role: "รองหัวหน้าพรรค 1 #2",
      image: "images/1001.png",
      year: "ปี 2",
      major: "คณิตศาสตร์",
      zone: "SCI UNIT",
      meta: ["ชื่อเล่น: ซี", "สาขา: คณิตศาสตร์", "ชั้นปีที่ 2"],
      work: [
        "อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2567)",
        "ประธานฝ่ายกีฬาปี68 (2568)",
      ],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นางสาววราภรณ์ ฟอมไธสง",
      role: "รองหัวหน้าพรรค 2 #3",
      image: "images/1001.png",
      year: "ปี 2",
      major: "ชีววิทยา",
      zone: "SCI UNIT",
      meta: ["ชื่อเล่น: ลาวา", "สาขา: ชีววิทยา", "ชั้นปีที่ 2"],
      work: [
        "อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2567)",
        "ประธานฝ่ายประชาสัมพันธ์ (2568)",
      ],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นางสาวอัญชลี คุมดี",
      role: "การเงินและงบประมาณ #4",
      image: "images/1001.png",
      year: "ปี 3",
      major: "อาชีวอนามัยและความปลอดภัย",
      zone: "SCI UNIT",
      meta: [
        "ชื่อเล่น: จ๊ะจ๋า",
        "สาขา: อาชีวอนามัยและความปลอดภัย",
        "ชั้นปีที่ 3",
      ],
      work: [
        "อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2566)",
        "ประธานประชาสัมพันธ์ (2567)",
        "ประธานฝ่ายการเงิน (2568)",
      ],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายพิชชากร คำพรม",
      role: "ฝ่ายประชาสัมพันธ์ #5",
      image: "images/1001.png",
      year: "ปี 1",
      major: "วิทยาการข้อมูลและนวัตกรรมซอฟต์แวร์",
      zone: "SCI UNIT",
      meta: [
        "ชื่อเล่น: เฟิร์ส",
        "สาขา: วิทยาการข้อมูลและนวัตกรรมซอฟต์แวร์",
        "ชั้นปีที่ 1",
        "IG: p1tch4_a",
      ],
      work: ["อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นางสาวรุจิศยา อุปนิ",
      role: "เลขานุการพรรค #6",
      image: "images/1001.png",
      year: "ปี 2",
      major: "คณิตศาสตร์",
      zone: "SCI UNIT",
      meta: ["ชื่อเล่น: มิ้นท์", "สาขา: คณิตศาสตร์", "ชั้นปีที่ 2"],
      work: ["กรรมการฝ่ายวิชาการสโมนักศึกษาคณะวิทยาศาสตร์ (2567)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายอานนท์ เมืองโคตร",
      role: "ฝ่ายยุทธศาสตร์การเลือกตั้ง #7",
      image: "images/1001.png",
      year: "ปี 2",
      major: "คณิตศาสตร์",
      zone: "SCI UNIT",
      meta: ["ชื่อเล่น: อานนท์", "สาขา: คณิตศาสตร์", "ชั้นปีที่ 2"],
      work: [
        "กรรมการฝ่ายกีฬาสโมสรนักศึกษาคณะวิทยาศาสตร์ (2568)",
        "กรรมการนักเรียน",
      ],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นางสาวญานิกา คำศิลา",
      role: "นายทะเบียนพรรค #8",
      image: "images/1001.png",
      year: "ปี 2",
      major: "คณิตศาสตร์",
      zone: "SCI UNIT",
      meta: ["ชื่อเล่น: แพรไหม", "สาขา: คณิตศาสตร์", "ชั้นปีที่ 2"],
      work: [
        "อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2566)",
        "ประธานฝ่ายสโมสรนักศึกษาคณะวิทยาศาสตร์ (2567)",
        "รองนายกสโมสรนักศึกษาคณะวิทยาศาสตร์ (2568)",
      ],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายรัฐศาสตร์ ครองยุติ",
      role: "โฆษกพรรค #9",
      image: "images/1001.png",
      year: "ปี 2",
      major: "ชีววิทยา",
      zone: "SCI UNIT",
      meta: ["สาขา: ชีววิทยา", "ชั้นปีที่ 2"],
      work: ["ผู้ช่วยโครงการ A (2567)", "หัวหน้าทีมกิจกรรมคณะ (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นางสาวรุจินทรา บุษราคัม",
      role: "กรรมการบริหาร #10",
      image: "images/1001.png",
      year: "ปี 1",
      major: "จุลชีววิทยา",
      zone: "SCI UNIT",
      meta: [
        "ชื่อเล่น: น้ำขิง",
        "สาขา: จุลชีววิทยา",
        "ชั้นปีที่ 1",
        "IG: _rujintra_",
      ],
      work: ["อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นางสาวโยชิตา กองสุข",
      role: "กรรมการบริหาร #11",
      image: "images/1001.png",
      year: "ปี 2",
      major: "ฟิสิกส์ชีวการแพทย์",
      zone: "SCI UNIT",
      meta: [
        "ชื่อเล่น: โย",
        "สาขา: ฟิสิกส์ชีวการแพทย์",
        "ชั้นปีที่ 1",
        "IG: yappyiii",
      ],
      work: ["อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายธนากร ศรีคำ",
      role: "กรรมการบริหาร #12",
      image: "images/1001.png",
      year: "ปี 1",
      major: "จุลชีววิทยา",
      zone: "SCI UNIT",
      meta: ["สาขา: จุลชีววิทยา", "ชั้นปีที่ 1"],
      work: ["ผู้ช่วยโครงการ A (2567)", "หัวหน้าทีมกิจกรรมคณะ (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายอนันต์โชคไพฑูรย์ ยืนยง",
      role: "กรรมการบริหาร #13",
      image: "images/1001.png",
      year: "ปี 2",
      major: "คณิตศาสตร์",
      zone: "SCI UNIT",
      meta: ["สาขา: คณิตศาสตร์", "ชั้นปีที่ 2"],
      work: ["ผู้ช่วยโครงการ A (2567)", "หัวหน้าทีมกิจกรรมคณะ (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายจักรพันธ์ แก่นลา",
      role: "กรรมการบริหาร #14",
      image: "images/1001.png",
      year: "ปี 1",
      major: "ชีววิทยา",
      zone: "SCI UNIT",
      meta: [
        "ชื่อเล่น: เปตอง",
        "สาขา: ชีววิทยา",
        "ชั้นปีที่ 1",
        "IG: p3t0nx_16 ",
      ],
      work: ["อนุกรรมการสโมสรนักศึกษาคณะวิทยาศาสตร์ ปี (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
    {
      name: "นายปิยพงษ์ หมื่นขัน",
      role: "ที่ปรึกษาพรรค #15",
      image: "images/1001.png",
      year: "ปี 1",
      major: "จุลชีววิทยา",
      zone: "SCI UNIT",
      meta: ["สาขา: จุลชีววิทยา", "ชั้นปีที่ 1"],
      work: ["ผู้ช่วยโครงการ A (2567)", "หัวหน้าทีมกิจกรรมคณะ (2568)"],
      edu: ["ปัจจุบัน: มหาวิทยาลัยอุบลราชธานี"],
    },
  ];

  const container = document.getElementById("candidates-container");

  if (container) {
    const cardsHTML = candidatesData
      .map(
        (person, index) => `
      <article class="card candidate-item" data-index="${index}">
        <div class="candidate-card">
          <img class="candidate-avatar" src="${person.image}" alt="${person.name}" loading="lazy" />
          <div class="candidate-text">
            <h3 class="candidate-role">${person.role}</h3>
            <p class="candidate-meta">
              ${person.name} / ${person.major} / ${person.year}
            </p>
          </div>
        </div>
      </article>
    `,
      )
      .join("");

    container.innerHTML = cardsHTML;
  }

  const modalHTML = `
    <div class="modal" id="candidateModal" aria-hidden="true">
      <div class="modal-backdrop" data-close="true"></div>
      <div class="candidate-modal" role="dialog" aria-modal="true">
        <button class="modal-close" data-close="true">✕</button>
        <div class="candidate-modal-grid">
          <div class="candidate-left">
            <div class="floating-card photo-card">
              <img id="cmPhoto" class="photo-img" src="" alt="" />
              <div class="photo-bottom">
                <div class="photo-name" id="cmName"></div>
                <div class="photo-role" id="cmRole"></div>
                <div class="photo-zone" id="cmZone"></div>
              </div>
            </div>
          </div>
          <div class="candidate-right">
            <div class="floating-card info-card">
              <h2 class="info-title">รายละเอียดผู้สมัคร</h2>
              <div class="info-sub">คณะวิทยาศาสตร์ • มหาวิทยาลัยอุบลราชธานี</div>
              
              <div class="info-section">
                <div class="pill">ข้อมูลส่วนตัว</div>
                <ul class="info-list" id="cmMeta"></ul>
              </div>
              <div class="info-section">
                <div class="pill">ประวัติการทำงาน</div>
                <ul class="info-list" id="cmWork"></ul>
              </div>
              <div class="info-section">
                <div class="pill">ประวัติการศึกษา</div>
                <ul class="info-list" id="cmEdu"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("candidateModal");
  const cmPhoto = document.getElementById("cmPhoto");
  const cmName = document.getElementById("cmName");
  const cmRole = document.getElementById("cmRole");
  const cmZone = document.getElementById("cmZone");
  const cmMeta = document.getElementById("cmMeta");
  const cmWork = document.getElementById("cmWork");
  const cmEdu = document.getElementById("cmEdu");

  const createList = (arr) => {
    if (!arr || arr.length === 0) return "<li>-</li>";
    return arr.map((text) => `<li>${text}</li>`).join("");
  };

  const openModal = (index) => {
    const data = candidatesData[index];
    if (!data) return;

    cmPhoto.src = data.image;
    cmName.textContent = data.name;
    cmRole.textContent = data.role;
    cmZone.textContent = data.zone || "SCI UNIT";

    cmMeta.innerHTML = createList(data.meta);
    cmWork.innerHTML = createList(data.work);
    cmEdu.innerHTML = createList(data.edu);

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".candidate-item").forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.dataset.index);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
  });
})();
