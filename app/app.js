// NusaStat page logic: draws the charts, fills the tables, wires the controls.
// Every chart and table on every page is built here from data.js.

function seriesOf(key) {
  const s = SERIES[key];
  return { label: s.title, color: PALETTE[0], values: s.values, years: s.years || YEARS };
}

function drawCharts(root) {
  (root || document).querySelectorAll("[data-chart]").forEach((el) => {
    const kind = el.getAttribute("data-chart");
    const keys = el.getAttribute("data-series").split(",");
    const title = el.getAttribute("data-title") || "";
    const unit = el.getAttribute("data-unit") || "";
    if (kind === "line") {
      const series = keys.map((k, i) => {
        const s = seriesOf(k.trim());
        s.color = PALETTE[i % PALETTE.length];
        return s;
      });
      lineChart(el, { title, unit, series });
    } else if (kind === "bars") {
      const s = SERIES[keys[0].trim()];
      barChart(el, { title, unit, labels: (s.years || YEARS).map(String), values: s.values,
        color: el.getAttribute("data-color") || PALETTE[0] });
    }
  });
}

function tableHTML(headers, rows) {
  let h = "<table><thead><tr>" + headers.map((x) => `<th>${x}</th>`).join("") + "</tr></thead><tbody>";
  rows.forEach((r) => { h += "<tr>" + r.map((c) => `<td>${c}</td>`).join("") + "</tr>"; });
  return h + "</tbody></table>";
}

function fillTables() {
  document.querySelectorAll("[data-table]").forEach((el) => {
    const kind = el.getAttribute("data-table");
    if (kind === "series") {
      const s = SERIES[el.getAttribute("data-series")];
      const yrs = s.years || YEARS;
      el.innerHTML = tableHTML(["Year", s.title + " (" + s.unit + ")"],
        yrs.map((y, i) => [String(y), fmtNum(s.values[i])])) +
        `<p class="src">Source: ${s.source}, ${s.year}. Latest value ${fmtNum(s.values[s.values.length - 1])} ${s.unit}.</p>`;
    } else if (kind === "bps-latest") {
      el.innerHTML = tableHTML(["Indicator", "Latest value", "Detail", "Source"],
        BPS_LATEST.map((r) => [r.label, `<strong>${r.value}</strong>`, r.detail, `${r.source}, ${r.year}`]));
    } else if (kind === "prov-top10") {
      el.innerHTML = tableHTML(["Rank", "Province", "Population (thousands)", "Share of Indonesia"],
        PROV_TOP10.map((p) => [String(p.rank), p.name, fmtNum(p.pop, 1), p.share.toFixed(2) + "%"])) +
        `<p class="src">Source: BPS, interim population projection mid-year 2024. Indonesia total ${fmtNum(PROV_TOP10_TOTAL, 1)} thousand.</p>`;
    } else if (kind === "prov-density") {
      el.innerHTML = tableHTML(["Province", "People per km²"],
        PROV_DENSITY.map((r) => [r[0], fmtNum(r[1])])) +
        `<p class="src">Source: BPS, population density by province 2024.</p>`;
    } else if (kind === "islands") {
      el.innerHTML = tableHTML(["Island group", "Population", "Share"],
        ISLANDS.map((r) => [r.name, fmtNum(r.pop), r.share.toFixed(2) + "%"])) +
        `<p class="src">Source: Dukcapil, Ministry of Home Affairs, Semester I 2024.</p>`;
    } else if (kind === "headlines") {
      el.innerHTML = tableHTML(["Indicator", "Value", "Note", "Source"],
        HEADLINES.map((r) => [r.label, `<strong>${r.display}</strong>`, r.note, `${r.source}, ${r.year}`]));
    }
  });
}

function wireToggles() {
  document.querySelectorAll("[data-toggle-group]").forEach((group) => {
    const targetId = group.getAttribute("data-toggle-group");
    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        const target = document.getElementById(targetId);
        if (!target) return;
        const keys = btn.getAttribute("data-series").split(",");
        const series = keys.map((k, i) => {
          const s = seriesOf(k.trim());
          s.color = PALETTE[i % PALETTE.length];
          return s;
        });
        lineChart(target, { title: target.getAttribute("data-title") || "",
          unit: target.getAttribute("data-unit") || "", series });
        const cap = target.parentElement.querySelector(".chart-cap");
        if (cap) cap.textContent = btn.getAttribute("data-caption") || cap.textContent;
      });
    });
  });
}

function wireSearch() {
  const box = document.getElementById("figure-search");
  if (!box) return;
  const count = document.getElementById("search-count");
  box.addEventListener("input", () => {
    const q = box.value.trim().toLowerCase();
    let shown = 0, total = 0;
    document.querySelectorAll("#figure-grid .card, #figure-grid .panel").forEach((card) => {
      total++;
      const hit = !q || card.textContent.toLowerCase().includes(q);
      card.style.display = hit ? "" : "none";
      if (hit) shown++;
    });
    if (count) count.textContent = q ? `Showing ${shown} of ${total} sections matching “${box.value.trim()}”.` : "";
  });
}

function wireProvinceFilter() {
  const box = document.getElementById("province-filter");
  if (!box) return;
  const count = document.getElementById("province-count");
  box.addEventListener("input", () => {
    const q = box.value.trim().toLowerCase();
    let shown = 0, total = 0;
    document.querySelectorAll("#density-table tbody tr").forEach((row) => {
      total++;
      const hit = !q || row.textContent.toLowerCase().includes(q);
      row.style.display = hit ? "" : "none";
      if (hit) shown++;
    });
    if (count) count.textContent = q ? `Showing ${shown} of ${total} provinces matching “${box.value.trim()}”.` : "";
  });
}

function wireProvinceBars() {
  const el = document.getElementById("prov-bars");
  if (!el) return;
  barChart(el, { title: "Largest provinces by population", unit: "thousands of people",
    labels: PROV_TOP10.map((p) => p.name), values: PROV_TOP10.map((p) => p.pop),
    color: PALETTE[0], horizontal: true, source: "BPS", year: 2024 });
  const isl = document.getElementById("island-bars");
  if (isl) {
    barChart(isl, { title: "Population by island group", unit: "share of population, %",
      labels: ISLANDS.map((r) => r.name), values: ISLANDS.map((r) => r.share),
      color: PALETTE[3], horizontal: true, source: "Dukcapil", year: 2024 });
  }
  const den = document.getElementById("density-bars");
  if (den) {
    const top = PROV_DENSITY.slice(0, 12);
    barChart(den, { title: "Densest provinces", unit: "people per km²",
      labels: top.map((r) => r[0]), values: top.map((r) => r[1]),
      color: PALETTE[2], horizontal: true, source: "BPS", year: 2024 });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  drawCharts(document);
  fillTables();
  wireToggles();
  wireSearch();
  wireProvinceFilter();
  wireProvinceBars();
  const y = document.getElementById("year-now");
  if (y) y.textContent = "2026";
});
