// js/guard.js
(() => {
  // ปิดคลิกขวา
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // ดักคีย์ลัดที่คนใช้เปิด DevTools บ่อยๆ
  document.addEventListener("keydown", (e) => {
    const key = (e.key || "").toLowerCase();

    const isF12 = e.key === "F12";
    const isCtrlShiftI = e.ctrlKey && e.shiftKey && key === "i";
    const isCtrlShiftJ = e.ctrlKey && e.shiftKey && key === "j";
    const isCtrlShiftC = e.ctrlKey && e.shiftKey && key === "c";
    const isCtrlU = e.ctrlKey && key === "u";

    if (isF12 || isCtrlShiftI || isCtrlShiftJ || isCtrlShiftC || isCtrlU) {
      e.preventDefault();
      e.stopPropagation();
      alert("ไม่อนุญาตให้ตรวจสอบโค้ด หรือกด F12");
      return false;
    }
  });

  // ตรวจ DevTools แบบหยาบๆ (กันคนทั่วไปได้บางส่วน)
  const threshold = 160;
  setInterval(() => {
    const devtoolsOpen =
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold;

    if (devtoolsOpen) {
      // เลือกอย่างใดอย่างหนึ่ง:
      // 1) เตือน
      console.log("DevTools detected");
      // 2) หรือ redirect ไปหน้าอื่น (ถ้าคุณอยากแรงขึ้น)
      // window.location.href = "/";
    }
  }, 800);
})();
