import { CARS } from "../data.js";
import { Store } from "../store.js";

export function renderDetails(el, params) {
  const id = params.get("id");
  const car = CARS.find(c=>c.id===id);
  if (!car) { el.innerHTML = `<div class="card"><p>Car not found.</p></div>`; return; }

  Store.addRecentlyViewed(id);

  el.innerHTML = `
    <article class="card">
      <h2>${car.title}</h2>
      <div class="gallery">
        <img src="${car.images[0]}" alt="${car.title}" id="heroImg" />
        <div>
          ${car.images.map((src,i)=>`<img src="${src}" alt="${car.title} ${i}" class="thumb" style="height:76px;cursor:zoom-in" />`).join("")}
        </div>
      </div>
      <div class="kpi" style="margin-top:12px">
        <div class="cell"><strong>Price:</strong> $${car.price.toLocaleString()}</div>
        <div class="cell"><strong>Horsepower:</strong> ${car.horsepower} hp</div>
        <div class="cell"><strong>Fuel:</strong> ${car.fuelEconomy.city}/${car.fuelEconomy.highway} ${car.fuelEconomy.unit}</div>
        <div class="cell"><strong>Safety:</strong> ${car.safety.rating}/5 ${car.safety.agency}</div>
      </div>

      <h3>360° viewer</h3>
      <div class="card" style="height:260px; display:flex; align-items:center; justify-content:center; border-style:dashed">
        <p>Drag to rotate — plug in 360 asset or WebGL here.</p>
      </div>

      <h3>Specs</h3>
      <table class="table">
        <tr><th>Brand</th><td>${car.brand}</td></tr>
        <tr><th>Year</th><td>${car.year}</td></tr>
        <tr><th>Body</th><td>${car.body}</td></tr>
        <tr><th>Engine</th><td>${car.engine}</td></tr>
        <tr><th>Transmission</th><td>${car.transmission}</td></tr>
        <tr><th>Color</th><td>${car.color}</td></tr>
        <tr><th>VIN</th><td>${car.vin}</td></tr>
        <tr><th>Features</th><td>${car.features.join(", ")}</td></tr>
      </table>

      <h3>Engine performance</h3>
      <p>Estimated 0–60 mph in ~4.2s (LR), top speed ~145 mph. Battery/ICE specifics depend on trim.</p>

      <h3>Interior/Exterior</h3>
      <p>Minimalist cockpit, premium seats, aero-optimized exterior with LED lighting and panoramic roof.</p>

      <h3>Safety ratings</h3>
      <p>Overall ${car.safety.rating}/5 per ${car.safety.agency}. Check recalls in News & Reviews.</p>

      <h3>Review videos</h3>
      <div class="card">
        <iframe src="${car.video}" title="Car review" style="width:100%;height:300px" allowfullscreen></iframe>
      </div>

      <div class="row" style="margin-top:12px">
        <a class="btn" href="#/compare?add=${car.id}">Compare</a>
        <button class="btn secondary" id="finance">Financing calculator</button>
        <button class="btn secondary" id="contact">Contact seller</button>
        <button class="btn secondary" id="wishlist">Add to wishlist</button>
      </div>

      <div id="financePanel" class="card" style="display:none; margin-top:12px">
        <h4>Financing calculator</h4>
        <div class="input-group">
          <input id="loanPrice" class="input" type="number" value="${car.price}" />
          <input id="down" class="input" type="number" placeholder="Down payment" value="5000" />
          <input id="apr" class="input" type="number" placeholder="APR %" value="6.5" />
          <input id="term" class="input" type="number" placeholder="Months" value="60" />
          <button id="calcLoan" class="btn">Calculate</button>
        </div>
        <p id="loanOut" class="tag"></p>
      </div>

      <div id="contactPanel" class="card" style="display:none; margin-top:12px">
        <h4>Contact seller / Request quote</h4>
        <div class="input-group">
          <input id="name" class="input" placeholder="Your name" />
          <input id="email" class="input" placeholder="Your email" />
        </div>
        <textarea id="msg" class="input" rows="4" placeholder="Message"></textarea>
        <div class="row">
          <button id="sendMsg" class="btn">Send</button>
        </div>
      </div>
    </article>
  `;

  // gallery zoom
  el.querySelectorAll(".thumb").forEach(t => {
    t.addEventListener("click", () => { el.querySelector("#heroImg").src = t.src; el.querySelector("#heroImg").style.transform = "scale(1.02)"; setTimeout(()=> el.querySelector("#heroImg").style.transform = "none", 180); });
  });

  // wishlist
  el.querySelector("#wishlist").addEventListener("click", () => { Store.addWishlist(car.id); toast("Added to wishlist."); });

  // financing calc
  el.querySelector("#finance").addEventListener("click", () => toggle("financePanel"));
  el.querySelector("#calcLoan").addEventListener("click", () => {
    const P = Number(val("#loanPrice")) - Number(val("#down"));
    const r = Number(val("#apr"))/100/12;
    const n = Number(val("#term"));
    const m = r ? (P * r) / (1 - Math.pow(1 + r, -n)) : (P / n);
    el.querySelector("#loanOut").textContent = `Estimated monthly: $${m.toFixed(2)} (${n} months)`;
  });

  // contact
  el.querySelector("#contact").addEventListener("click", () => toggle("contactPanel"));
  el.querySelector("#sendMsg").addEventListener("click", () => {
    toast("Message sent. Seller will reach out via email.");
  });

  function toggle(id){ const p = el.querySelector(`#${id}`); p.style.display = p.style.display==="none" ? "block" : "none"; }
  function val(sel){ return el.querySelector(sel).value; }
  function toast(m){ const t=document.createElement("div"); t.className="toast"; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2000); }
}
