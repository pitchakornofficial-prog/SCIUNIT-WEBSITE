// ทำให้เมนูไฮไลท์อัตโนมัติจากชื่อไฟล์ปัจจุบัน
(function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-link");

  links.forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
    if (path === "" && href === "index.html") a.classList.add("active");
  });
})();
