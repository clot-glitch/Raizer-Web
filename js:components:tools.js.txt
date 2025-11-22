import { loanPayment } from "../calculators/loan.js";
import { estimateInsurance } from "../calculators/insurance.js";
import { estimateMaintenance } from "../calculators/maintenance.js";
import { estimateTradeIn } from "../calculators/tradein.js";

export function renderTools(el) {
  el.innerHTML = `
    <div class="card">
      <h2>Advanced tools</h2>
      <div class="grid cols-3">
        <div class="card">
          <h3>Loan calculator</h3>
          <input id="t-price" class="input" type="number" placeholder="Price" />
          <input id="t-down" class="input" type="number" placeholder="Down payment" />
          <input id="t-apr" class="input" type="number" placeholder="APR %" />
          <input id="t-term" class="input" type="number" placeholder="Months" />
          <button id="t-calc" class="btn">Calculate</button>
          <p id="t-out" class="tag"></p>
        </div>

        <div class="card">
          <h3>Insurance calculator</h3>
          <input id="i-age" class="input" type="number" placeholder="Driver age" />
          <input id="i-region" class="input" placeholder="Region" />
          <input id="i-value" class="input" type="number" placeholder="Car value" />
          <button id="i-calc" class="btn">Estimate</button>
          <p id="i-out" class="tag"></p>
        </div>

        <div class="card">
          <h3>Maintenance estimator</h3>
          <input id="m-brand" class="input" placeholder="Brand" />
          <input id="m-year" class="input" type="number" placeholder="Year" />
          <input id="m-mileage" class="input" type="number" placeholder="Mileage" />
          <button id="m-calc" class="btn">Estimate</button>
