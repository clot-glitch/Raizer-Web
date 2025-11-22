import { renderHomepage } from "./components/homepage.js";
import { renderListings } from "./components/listings.js";
import { renderDetails } from "./components/details.js";
import { renderCompare } from "./components/compare.js";
import { renderTools } from "./components/tools.js";
import { renderNews } from "./components/news.js";
import { renderAccount } from "./components/account.js";
import { renderSeller } from "./components/seller.js";
import { renderContact } from "./components/contact.js";

const routes = {
  "/": renderHomepage,
  "/listings": renderListings,
  "/details": renderDetails,
  "/compare": renderCompare,
  "/tools": renderTools,
  "/news": renderNews,
  "/account": renderAccount,
  "/seller": renderSeller,
  "/contact": renderContact
};

export function navigate() {
  const app = document.getElementById("app");
  const [path, query] = location.hash.slice(1).split("?");
  const render = routes[path || "/"] || renderHomepage;
  app.innerHTML = "";
  render(app, new URLSearchParams(query || ""));
}

window.addEventListener("hashchange", navigate);
window.addEventListener("DOMContentLoaded", navigate);
