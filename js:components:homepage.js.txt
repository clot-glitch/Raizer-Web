import { CARS, NEWS } from "../data.js";
import { Store } from "../store.js";

export function renderHomepage(el) {
  el.innerHTML = `
    <section class="hero parallax">
      <div class="hero-content">
        <h1>Drive what's next.</h1>
        <p>Search by model, brand, price, or year. Explore featured rides and curated reviews.</p>
        <div class="search-bar">
          <input id="q-model" class="input" placeholder="Model" />
          <select id="q-brand" class="input">${["","Tesla","Toyota","Honda","Ford"].map(b=>`<option>${b}</option>`).join("")}</select>
          <input id="q-price" class="input" placeholder="Max price" type="number" />
          <input id="q-year" class="input" placeholder="Min year" type="number" />
          <button id="q-search" class="btn">Search</button>
        </div>
        <div class="row" style="margin-top:8px">
          <a class="tag" href="#/listings?new=true">New Cars</a>
          <a class="tag" href="#/listings?used=true">Used Cars</a>
          <a class="tag" href="#/compare">Compare</a>
          <a class="tag" href="#/news">Reviews</a>
        </div>
      </div>
    </section>

    <div class="neon-line" style="margin:16px 0"></div>

    <section class="card">
      <h2>Featured cars</h2>
      <div class="carousel">
        ${CARS.slice(0,5).map(c=>`
          <div class="car-card card" style="min-width:280px">
            <img src="${c.images[0]}" alt="${c.title}" loading="lazy" />
            <h3>${c.title}</h3>
            <p><span class="badge">$${c.price.toLocaleString()}</span> • ${c.engine} • ${c.transmission}</p>
            <div class="row">
              <a class="btn secondary" href="#/details?id=${c.id}">View</a>
              <button class="btn" data-id="${c.id}" data-action="wishlist">Wishlist</button>
              <button class="btn secondary" data-id="${c.id}" data-action="compare">Compare</button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="card">
      <h2>Car of the week</h2>
      ${renderCarOfWeek(CARS)}
    </section>

    <section class="card">
      <h2>Latest news</h2>
      <div class="list compact">
        ${NEWS.map(n=>`
          <div class="card">
            <h4>${n.title}</h4>
            <small>${n.date} • ${n.category}</small>
            <p>${n.excerpt}</p>
            <a class="btn secondary" href="${n.url}">Read</a>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  el.querySelector("#q-search").addEventListener("click", () => {
    const qs = new URLSearchParams({
      model: el.querySelector("#q-model").value || "",
      brand: el.querySelector("#q-brand").value || "",
      maxPrice: el.querySelector("#q-price").value || "",
      minYear: el.querySelector("#q-year").value || ""
    }).toString();
    location.hash = `#/listings?${qs}`;
  });

  el.querySelectorAll("button[data-action]").forEach(btn=>{
    const id = btn.getAttribute("data-id"), action = btn.getAttribute("data-action");
    btn.addEventListener("click", ()=>{
      if (action === "wishlist") { Store.addWishlist(id); toast("Added to wishlist."); }
      if (action === "compare") { Store.addCompare(id) ? toast("Added to compare.") : toast("Compare limit is 4 cars."); }
    });
  });

  function toast(m){ const t=document.createElement("div"); t.className="toast"; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2000); }
}

function renderCarOfWeek(cars) {
  const featured = [...cars].sort((a,b)=>b.popularity-a.popularity)[0];
  return `
    <div class="flex">
      <img src="${featured.images[0]}" alt="${featured.title}" style="width:260px;height:160px;object-fit:cover;border-radius:10px" />
      <div>
        <h3>${featured.title}</h3>
        <p>Horsepower: ${featured.horsepower} • Safety: ${featured.safety.rating}/5 • Pro score: ${featured.professionalScore}</p>
        <a class="btn" href="#/details?id=${featured.id}">Explore</a>
      </div>
    </div>
  `;
}
