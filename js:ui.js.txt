import { Store } from "./store.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  const themeToggle = document.getElementById("themeToggle");
  document.body.classList.toggle("theme-dark", Store.state.theme === "dark");
  document.body.classList.toggle("theme-light", Store.state.theme === "light");

  themeToggle.addEventListener("click", () => {
    Store.state.theme = Store.state.theme === "dark" ? "light" : "dark";
    Store.save();
    document.body.classList.toggle("theme-dark", Store.state.theme === "dark");
    document.body.classList.toggle("theme-light", Store.state.theme === "light");
  });

  // Simple live chat toggle (placeholder)
  const btnChat = document.getElementById("liveChatToggle");
  btnChat.addEventListener("click", () => showToast("Live chat coming soon. Leave a message in Contact."));
});

export function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 2500);
}
