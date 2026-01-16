document.addEventListener("DOMContentLoaded", () => {
  // เริ่มทำงานเมื่อโหลดหน้าเว็บเสร็จ
  initNavbar();
  initFooter();
});

// 1. ฟังก์ชันสร้างเมนูและไฮไลท์หน้าปัจจุบัน
function initNavbar() {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (!navbarPlaceholder) return; // ถ้าไม่มี placeholder ให้จบการทำงานทันที

  // 1.1 สร้าง HTML
  navbarPlaceholder.innerHTML = `
    <div class="top-nav-wrap">
      <nav class="top-nav" aria-label="เมนูหลัก">
        <div class="brand">
          <div>
            <span class="title">SCI UNIT</span>
            <span class="sub">พิทักษ์รักษาสิทธิ์ นำพาวิทยาก้าวไกล</span>
          </div>
        </div>
        <div class="nav-links">
          <a class="nav-link" href="index.html">หน้าแรก</a>
          <a class="nav-link" href="about.html">เกี่ยวกับพรรค</a>
          <a class="nav-link" href="candidates.html">ทำเนียบสมาชิก</a>
          <a class="nav-link" href="policies.html">นโยบายพรรค</a>
          <a class="nav-link" href="why-us.html">ทำไมต้องเลือกพรรคเรา</a>
          <a class="nav-link" href="contact.html">ติดต่อ & สอบถาม</a>
        </div>
      </nav>
    </div>
  `;

  // 1.2 ไฮไลท์เมนู (Active State)
  const path = location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    // ตรวจสอบชื่อไฟล์ ถ้าตรงกัน หรือเป็นหน้า index ว่างๆ ให้เติม class active
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// 2. ฟังก์ชันสร้าง Footer
function initFooter() {
  const footerElement = document.querySelector(".footer");
  if (!footerElement) return;

  const currentYear = new Date().getFullYear();

  footerElement.innerHTML = `
    © ${currentYear} SCI UNIT | เว็บไซต์นี้เป็นทรัพย์สินทางปัญญาของพรรค SCI UNIT
    แต่เพียงผู้เดียว | คณะวิทยาศาสตร์ มหาวิทยาลัยอุบลราชธานี
  `;
}
