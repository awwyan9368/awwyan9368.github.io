const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const path = window.location.pathname.replace(/\/$/, "") || "/";

if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll("[data-nav] a").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href) return;
  const normalized = href.replace(/\/$/, "") || "/";
  if (normalized === path) link.classList.add("active");
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = form.querySelector("[data-form-note]");
    const button = form.querySelector("button[type='submit']");
    const endpoint = form.dataset.endpoint || "/api/contact";
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setNote(note, "Sending your request...", "");
    if (button) button.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Please try again.");
      form.reset();
      setNote(note, result.message || "Received. RawReach will reach out soon.", "success");
    } catch (error) {
      setNote(note, error.message || "Please try again.", "error");
    } finally {
      if (button) button.disabled = false;
    }
  });
});

function setNote(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) element.classList.add(type);
}
