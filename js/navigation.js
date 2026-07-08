const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".sidebar nav a");

const closeSidebar = document.querySelector(".close-sidebar");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#" || !targetId.startsWith("#")) {
      return;
    }

    e.preventDefault();

    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    navLinks.forEach((item) => item.classList.remove("active"));

    link.classList.add("active");

    if (window.innerWidth <= 992) {
      sidebar.classList.remove("active");
    }
  });
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});
