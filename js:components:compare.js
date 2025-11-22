import { CARS } from "../data.js";
import { Store } from "../store.js";

export function renderCompare(el, params) {
  const add = params.get("add");
  if (add) Store.addCompare(add);

  const ids = Store.state.compareQueue;
  const selected = CARS.filter(c=>ids.includes(c.id));

  el.innerHTML = `
    <div class="card">
      <h2>Car comparison</h2>
      <div class="row">
        ${selected.map(c=>`<div class="tag">${c.title} <button class="btn-icon" data-remove="${c.id}">x</button></div>`).join("") || "<p>Add cars from listings or details.</p>"}
      </div>
    </div>

    ${selected.length ? `
      <div class="card">
        <h3>Overview</h3>
        <div class="list compact">
          ${selected.map(c=>`
            <div class="card">
              <img src="${c.images[0]}" alt="${c.title}" style="width:100%; height:140px; object-fit:cover; border-radius:8px" />
              <h4>${c.title}</h4>
              <p>$${c.price.toLocaleString()} • ${c.year} • ${c.engine}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="card">
        <h3>Specs, horsepower, fuel economy, features, safety, professional score</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Metric</th>
              ${selected.map(c=>`<th>${c.brand} ${c.year}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr><td>Price</td>${selected.map(c=>`<td>$${c.price.toLocaleString()}</td>`).join("")}</tr>
            <tr><td>Horsepower</td>${selected.map(c=>`<td>${c.horsepower} hp</td>`).join("")}</tr>
            <tr><td>Fuel economy</td>${selected.map(c=>`<td>${c.fuelEconomy.city}/${c.fuelEconomy.highway} ${c.fuelEconomy.unit}</td>`).join("")}</tr>
            <tr><td>Transmission</td>${selected.map(c=>`<td>${c.transmission}</td>`).join("")}</tr>
            <tr><td>Safety</td>${selected.map(c=>`<td>${c.safety.rating}/5 ${c.safety.agency}</td>`).join("")}</tr>
            <tr><td>Features</td>${selected.map(c=>`<td>${c.features.slice(0,6).join(", ")}</td>`).join("")}</tr>
            <tr><td>Pro score</td>${selected.map(c=>`<td>${c.professionalScore}</td>`).join("")}</tr>
          </tbody>
        </table>
      </div>
    ` : "" }
  `;

  el.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ Store.removeCompare(btn.getAttribute("data-remove")); location.hash = "#/compare"; });
  });
}
