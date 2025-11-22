import { CARS, BRANDS } from "../data.js";
import { Store } from "../store.js";

export function renderListings(el, params) {
  const layout = params.get("layout") === "list" ? "compact" : "";
  const filters = {
    brand: params.get("brand") || "",
    minYear: Number(params.get("minYear") || 0),
    maxPrice: Number(params.get("maxPrice") || 0),
    body: params.get("body") || "",
    engine: params.get("engine") || "",
    transmission: params.get("transmission") || "",
    color: params.get("color") || "",
    mileageMax: Number(params.get("mileageMax") || 0),
    sort: params.get("sort") || ""
  };

  const list = applyFilters(CARS, filters);
  el.innerHTML = `
    <div class="card">
      <h2>Car listings</h2>
      <div class="input-group row">
        <select id="brand" class="input">${["","All",...BRANDS].map(b=>`<option value="${b}">${b}</option>`).join("")}</select>
        <input id="price" class="input" placeholder="Max price" type="number" />
        <input id="mileage" class="input" placeholder="Max mileage" type="number" />
        <input id="year" class="input" placeholder="Min year" type="number" />
        <select id="body" class="input">
          ${["","Sedan","SUV","Hatchback","Pickup","Coupe"].map(b=>`<option>${b}</option>`)}
        </select>
        <select id="engine" class="input">
          ${["","Electric","Hybrid","Gas","Diesel"].map(e=>`<option>${e}</option>`)}
        </select>
        <select id="trans" class="input">${["","Automatic","Manual"].map(t=>`<option>${t}</option>`)}</select>
        <input id="color" class="input" placeholder="Color" />
        <select id="sort" class="input">
          <option value="">Sort</option>
          <option value="priceAsc">Price Low→High</option>
          <option value="priceDesc">Price High→Low</option>
          <option value="yearDesc">Year Newest</option>
          <option value="mileageAsc">Mileage Low→High</option>
          <option value="popDesc">Popularity</option>
        </select>
        <button id="apply" class="btn">Apply</button>
        <button id="saveSearch" class="btn secondary">Save search</button>
        <button id="layoutToggle" class="btn secondary">${layout ? "Grid" : "List"}</button>
      </div>
    </div>

    <div class="list ${layout}">
      ${list.map(c=>renderCard(c)).join("") || `<div class="card"><p>No cars match your filters.</p></div>`}
    </div>
  `;

  el.querySelector("#apply").addEventListener("click", ()=> {
    const qs = new URLSearchParams({
      brand: val("#brand"), maxPrice: val("#price"), mileageMax: val("#mileage"),
      minYear: val("#year"), body: val("#body"), engine: val("#engine"), transmission: val("#trans"),
      color: val("#color"), sort: val("#sort"), layout
    }).toString();
    location.hash = `#/listings?${qs}`;
  });

  el.querySelector("#saveSearch").addEventListener("click", ()=> {
    Store.state.savedSearches.push({ id: crypto.randomUUID(), date: Date.now(), filters });
    Store.save();
    toast("Search saved. View in Account.");
  });

  el.querySelector("#layoutToggle").addEventListener("click", ()=> {
    const qs = new URLSearchParams(location.hash.split("?")[1] || "");
    qs.set("layout", layout ? "grid" : "list");
    location.hash = `#/listings?${qs.toString()}`;
  });

  function val(sel){ return el.querySelector(sel).value || ""; }
  function toast(m){ const t=document.createElement("div"); t.className="toast"; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2000); }
}

function applyFilters(cars, f) {
  let out = [...cars];
  if (f.brand && f.brand!=="All") out = out.filter(c=>c.brand===f.brand);
  if (f.minYear) out = out.filter(c=>c.year>=f.minYear);
  if (f.maxPrice) out = out.filter(c=>c.price<=f.maxPrice);
  if (f.body) out = out.filter(c=>c.body===f.body);
  if (f.engine) out = out.filter(c=>c.engine===f.engine);
  if (f.transmission) out = out.filter(c=>c.transmission===f.transmission);
  if (f.color) out = out.filter(c=>c.color.toLowerCase().includes(f.color.toLowerCase()));
  if (f.mileageMax) out = out.filter(c=>c.mileage<=f.mileageMax);
  if (f.sort==="priceAsc") out.sort((a,b)=>a.price-b.price);
  if (f.sort==="priceDesc") out.sort((a,b)=>b.price-a.price);
  if (f.sort==="yearDesc") out.sort((a,b)=>b.year-a.year);
  if (f.sort==="mileageAsc") out.sort((a,b)=>a.mileage-b.mileage);
  if (f.sort==="popDesc") out.sort((a,b)=>b.popularity-a.popularity);
  return out;
}

function renderCard(c) {
  return `
    <div class="car-card card">
      <img src="${c.images[0]}" alt="${c.title}" loading="lazy" />
      <h3>${c.title}</h3>
      <p>$${c.price.toLocaleString()} • ${c.year} • ${c.mileage.toLocaleString()} mi • ${c.engine} • ${c.transmission}</p>
      <div class="row">
        <a class="btn" href="#/details?id=${c.id}">Details</a>
        <button class="btn secondary" onclick="location.hash='#/compare?add=${c.id}'">Compare</button>
        <button class="btn secondary" onclick="window.__wishlist && window.__wishlist('${c.id}')">Wishlist</button>
      </div>
    </div>
  `;
}
