function renderPage(pageId) {
  const pages = document.querySelectorAll("#app > div");
  pages.forEach((page) => (page.style.display = "none"));

  const page = document.getElementById(pageId);
  if (page) page.style.display = "block";
}
