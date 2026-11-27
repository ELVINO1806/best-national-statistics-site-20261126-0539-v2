// NusaStat chart module: draws every chart as inline SVG from the data module.
// No library, no network. One job: turn arrays of numbers into readable charts.

const PALETTE = ["#0b5563", "#c8102e", "#e07b00", "#2e7d4f", "#5b4a8a", "#0077b6"];

function fmtNum(v, decimals) {
  if (v === null || v === undefined || Number.isNaN(v)) return "—";
  const d = decimals === undefined ? (Math.abs(v) < 10 && v % 1 !== 0 ? 2 : 0) : decimals;
  return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
}

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const raw = span / (count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = norm <= 1 ? mag : norm <= 2 ? 2 * mag : norm <= 5 ? 5 * mag : 10 * mag;
  const lo = Math.floor(min / step) * step;
  const ticks = [];
  for (let t = lo; t <= max + step * 0.001; t += step) ticks.push(t);
  return ticks;
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Line chart. series: [{label, color, values, years}]. years default to YEARS.
function lineChart(el, opts) {
  const series = opts.series;
  const years = opts.years || YEARS;
  const W = 760, H = 320, PL = 64, PR = 16, PT = 14, PB = 34;
  const iw = W - PL - PR, ih = H - PT - PB;
  let min = Infinity, max = -Infinity;
  series.forEach((s) => s.values.forEach((v) => { if (v < min) min = v; if (v > max) max = v; }));
  const pad = (max - min) * 0.08 || 1;
  min -= pad; max += pad;
  const x = (i) => PL + (i / (years.length - 1)) * iw;
  const y = (v) => PT + (1 - (v - min) / (max - min)) * ih;
  const ticks = niceTicks(min, max, 5);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.title)} chart" preserveAspectRatio="xMidYMid meet">`;
  ticks.forEach((t) => {
    s += `<line x1="${PL}" y1="${y(t)}" x2="${W - PR}" y2="${y(t)}" stroke="#e3e0d8" stroke-width="1"/>`;
    s += `<text x="${PL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="#5c6b70">${fmtNum(t)}</text>`;
  });
  if (min < 0 && max > 0) {
    s += `<line x1="${PL}" y1="${y(0)}" x2="${W - PR}" y2="${y(0)}" stroke="#9aa5a8" stroke-width="1.5"/>`;
  }
  years.forEach((yr, i) => {
    if (i % 2 === 0 || i === years.length - 1) {
      s += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="12" fill="#5c6b70">${yr}</text>`;
    }
  });
  series.forEach((sr) => {
    const pts = sr.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    s += `<polyline points="${pts}" fill="none" stroke="${sr.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    sr.values.forEach((v, i) => {
      s += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${sr.color}"><title>${years[i]}: ${fmtNum(v)} ${esc(opts.unit || "")}</title></circle>`;
    });
    const last = sr.values.length - 1;
    s += `<text x="${x(last) + 8}" y="${y(sr.values[last]) + 4}" font-size="13" font-weight="700" fill="${sr.color}">${fmtNum(sr.values[last])}</text>`;
  });
  s += "</svg>";
  let legend = "";
  if (series.length > 1) {
    legend = '<div class="legend">' + series.map((sr) =>
      `<span><i style="background:${sr.color}"></i>${esc(sr.label)}</span>`).join("") + "</div>";
  }
  el.innerHTML = legend + s;
}

// Bar chart. labels + values. Horizontal bars when opts.horizontal is true.
function barChart(el, opts) {
  const labels = opts.labels, values = opts.values;
  const color = opts.color || PALETTE[0];
  if (opts.horizontal) {
    const W = 760, rowH = 34, H = opts.labels.length * rowH + 46;
    const PL = 170, PR = 70, PT = 8, PB = 30;
    const iw = W - PL - PR;
    const max = Math.max.apply(null, values) * 1.08;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.title)} chart" preserveAspectRatio="xMidYMid meet">`;
    labels.forEach((lb, i) => {
      const y = PT + i * rowH;
      const bw = (values[i] / max) * iw;
      s += `<text x="${PL - 10}" y="${y + 19}" text-anchor="end" font-size="13" fill="#1a2a2e">${esc(lb)}</text>`;
      s += `<rect x="${PL}" y="${y + 4}" width="${bw.toFixed(1)}" height="20" rx="3" fill="${color}"><title>${esc(lb)}: ${fmtNum(values[i])} ${esc(opts.unit || "")}</title></rect>`;
      s += `<text x="${PL + bw + 8}" y="${y + 19}" font-size="13" font-weight="700" fill="#1a2a2e">${fmtNum(values[i])}</text>`;
    });
    s += `<text x="${PL}" y="${H - 8}" font-size="12" fill="#5c6b70">${esc(opts.unit || "")} — ${esc(opts.source || "")} ${opts.year || ""}</text>`;
    s += "</svg>";
    el.innerHTML = s;
    return;
  }
  const W = 760, H = 320, PL = 64, PR = 16, PT = 14, PB = 52;
  const iw = W - PL - PR, ih = H - PT - PB;
  let min = Math.min(0, Math.min.apply(null, values));
  let max = Math.max.apply(null, values) * 1.08;
  const ticks = niceTicks(min, max, 5);
  const bw = iw / labels.length;
  const y = (v) => PT + (1 - (v - min) / (max - min)) * ih;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.title)} chart" preserveAspectRatio="xMidYMid meet">`;
  ticks.forEach((t) => {
    s += `<line x1="${PL}" y1="${y(t)}" x2="${W - PR}" y2="${y(t)}" stroke="#e3e0d8" stroke-width="1"/>`;
    s += `<text x="${PL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="#5c6b70">${fmtNum(t)}</text>`;
  });
  labels.forEach((lb, i) => {
    const barW = Math.min(46, bw * 0.62);
    const bx = PL + i * bw + (bw - barW) / 2;
    s += `<rect x="${bx.toFixed(1)}" y="${y(values[i]).toFixed(1)}" width="${barW.toFixed(1)}" height="${(y(min) - y(values[i])).toFixed(1)}" rx="3" fill="${color}"><title>${esc(lb)}: ${fmtNum(values[i])} ${esc(opts.unit || "")}</title></rect>`;
    s += `<text x="${(PL + i * bw + bw / 2).toFixed(1)}" y="${H - 30}" text-anchor="middle" font-size="12" fill="#5c6b70">${esc(lb)}</text>`;
    s += `<text x="${(PL + i * bw + bw / 2).toFixed(1)}" y="${(y(values[i]) - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1a2a2e">${fmtNum(values[i])}</text>`;
  });
  s += "</svg>";
  el.innerHTML = s;
}
