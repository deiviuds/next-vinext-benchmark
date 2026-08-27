const timing = {
  published: [
    { scenario: "Dev server cold start", framework: "Next.js", id: "next", median: 1910, min: 1830, max: 1950, rounds: 5 },
    { scenario: "Dev server cold start", framework: "vinext", id: "vinext", median: 2380, min: 2370, max: 2530, rounds: 5 },
    { scenario: "Production build time", framework: "Next.js", id: "next", median: 3390, min: 3360, max: 3420, rounds: 5 },
    { scenario: "Production build time", framework: "vinext", id: "vinext", median: 2630, min: 2620, max: 2680, rounds: 5 },
  ],
  baseline: [
    { scenario: "Dev server cold start", framework: "Next.js", id: "next", median: 2542.084, min: 2435.537, max: 2691.023, rounds: 5 },
    { scenario: "Dev server cold start", framework: "vinext", id: "vinext", median: 3199.462, min: 3167.752, max: 3239.595, rounds: 5 },
    { scenario: "Production build time", framework: "Next.js", id: "next", median: 4601.637, min: 4511.720, max: 4625.290, rounds: 5 },
    { scenario: "Production build time", framework: "vinext", id: "vinext", median: 3655.793, min: 3621.327, max: 3704.058, rounds: 5 },
  ],
  updated: [
    { scenario: "Dev server cold start", framework: "Next.js", id: "next", median: 2433.790, min: 2329.213, max: 2455.427, rounds: 5 },
    { scenario: "Dev server cold start", framework: "vinext", id: "vinext", median: 3246.185, min: 3193.339, max: 3275.825, rounds: 5 },
    { scenario: "Production build time", framework: "Next.js", id: "next", median: 6040.666, min: 5902.923, max: 6113.898, rounds: 5 },
    { scenario: "Production build time", framework: "vinext", id: "vinext", median: 3725.712, min: 3625.668, max: 3750.164, rounds: 5 },
  ],
};

const bundles = {
  published: [
    { scenario: "Client bundle size (gzip)", framework: "Next.js", id: "next", prior: "185.6 KB", median: 190048, change: 0, rounds: 5 },
    { scenario: "Client bundle size (gzip)", framework: "vinext", id: "vinext", prior: "141.4 KB", median: 145623, change: 0.6, rounds: 5 },
    { scenario: "Client entry size (gzip)", framework: "vinext", id: "vinext", prior: "128.8 KB", median: 132603, change: 0.5, rounds: 5 },
    { scenario: "RSC entry closure size (gzip)", framework: "vinext", id: "vinext", prior: "115.6 KB", median: 119403, change: 0.9, rounds: 5 },
    { scenario: "Server bundle size (gzip)", framework: "vinext", id: "vinext", prior: "196.8 KB", median: 202878, change: 0.7, rounds: 5 },
  ],
  baseline: [
    { scenario: "Client bundle size (gzip)", framework: "Next.js", id: "next", median: 190048, min: 190048, max: 190048, rounds: 5 },
    { scenario: "Client bundle size (gzip)", framework: "vinext", id: "vinext", median: 145623, min: 145623, max: 145623, rounds: 5 },
    { scenario: "Client entry size (gzip)", framework: "vinext", id: "vinext", median: 132603, min: 132603, max: 132603, rounds: 5 },
    { scenario: "RSC entry closure size (gzip)", framework: "vinext", id: "vinext", median: 119403, min: 119403, max: 119403, rounds: 5 },
    { scenario: "Server bundle size (gzip)", framework: "vinext", id: "vinext", median: 202878, min: 202878, max: 202878, rounds: 5 },
  ],
  updated: [
    { scenario: "Client bundle size (gzip)", framework: "Next.js", id: "next", median: 178385, min: 178385, max: 178385, rounds: 5 },
    { scenario: "Client bundle size (gzip)", framework: "vinext", id: "vinext", median: 145621, min: 145621, max: 145621, rounds: 5 },
    { scenario: "Client entry size (gzip)", framework: "vinext", id: "vinext", median: 132602, min: 132602, max: 132602, rounds: 5 },
    { scenario: "RSC entry closure size (gzip)", framework: "vinext", id: "vinext", median: 119392, min: 119392, max: 119392, rounds: 5 },
    { scenario: "Server bundle size (gzip)", framework: "vinext", id: "vinext", median: 202855, min: 202855, max: 202855, rounds: 5 },
  ],
};

function deployment(framework, id, platform, score, scoreMin, scoreMax, ttfb, ttfbMin, ttfbMax, fcp, fcpMin, fcpMax, lcp, lcpMin, lcpMax, js, page) {
  return { framework, id, platform, score, scoreMin, scoreMax, ttfb, ttfbMin, ttfbMax, fcp, fcpMin, fcpMax, lcp, lcpMin, lcpMax, js, page, rounds: 5 };
}

const deployments = {
  baseline: [
    deployment("Next.js", "next", "Cloudflare", 100, 100, 100, 414, 326, 606, 787.060, 782.002, 804.057, 792.801, 782.002, 945.838, 155203, 157914),
    deployment("vinext", "vinext", "Cloudflare", 100, 100, 100, 145, 137, 266, 793.343, 787.771, 891.493, 793.343, 787.771, 891.493, 140550, 143577),
    deployment("Next.js", "next", "Vercel", 100, 100, 100, 3, 2, 3, 784.918, 781.181, 830.428, 830.428, 781.441, 1610.918, 151620, 154085),
    deployment("vinext", "vinext", "Vercel", 100, 100, 100, 2, 2, 3, 833.605, 777.067, 1363.082, 833.605, 777.067, 1513.082, 137868, 140666),
  ],
  updated: [
    deployment("Next.js", "next", "Cloudflare", 100, 100, 100, 389, 57, 549, 810.141, 791.893, 841.964, 810.141, 791.893, 841.964, 140855, 143518),
    deployment("vinext", "vinext", "Cloudflare", 100, 100, 100, 57, 49, 289, 809.211, 805.612, 826.917, 809.211, 805.612, 826.917, 140522, 143564),
    deployment("Next.js", "next", "Vercel", 100, 100, 100, 24, 24, 24, 795.566, 784.098, 984.959, 795.566, 784.098, 984.959, 137634, 140080),
    deployment("vinext", "vinext", "Vercel", 100, 100, 100, 24, 24, 24, 810.327, 807.623, 975.883, 810.327, 807.623, 1100.179, 137845, 140651),
  ],
};

// vinext is the same commit in both local and deployment runs. Average its
// two measurements so the page does not present ordinary run-to-run noise as
// a framework change. The raw reports remain unchanged in recorded-results.
function averageSharedVinextValues(datasets, fields) {
  const baselineRows = datasets.baseline;
  const updatedRows = datasets.updated;
  for (const baselineRow of baselineRows.filter((row) => row.id === "vinext")) {
    const updatedRow = updatedRows.find((row) => row.id === "vinext" && row.scenario === baselineRow.scenario && row.platform === baselineRow.platform);
    if (!updatedRow) continue;
    for (const field of fields) {
      if (typeof baselineRow[field] !== "number" || typeof updatedRow[field] !== "number") continue;
      const average = (baselineRow[field] + updatedRow[field]) / 2;
      baselineRow[field] = updatedRow[field] = field === "js" || field === "page" ? Math.round(average) : average;
    }
  }
}

averageSharedVinextValues(timing, ["median", "min", "max"]);
averageSharedVinextValues(bundles, ["median", "min", "max"]);
averageSharedVinextValues(deployments, ["score", "scoreMin", "scoreMax", "ttfb", "ttfbMin", "ttfbMax", "fcp", "fcpMin", "fcpMax", "lcp", "lcpMin", "lcpMax", "js", "page"]);

const localMetrics = [
  { id: "client", label: "Client bundle size (gzip)", unit: "bytes", lowerIsBetter: true, values: seriesFrom("Client bundle size (gzip)") },
  { id: "entry", label: "Client entry size (gzip)", unit: "bytes", lowerIsBetter: true, values: seriesFrom("Client entry size (gzip)") },
  { id: "build", label: "Production build time", unit: "ms", lowerIsBetter: true, values: seriesFrom("Production build time") },
  { id: "rsc", label: "RSC entry closure size (gzip)", unit: "bytes", lowerIsBetter: true, values: seriesFrom("RSC entry closure size (gzip)") },
  { id: "server", label: "Server bundle size (gzip)", unit: "bytes", lowerIsBetter: true, values: seriesFrom("Server bundle size (gzip)") },
  { id: "dev", label: "Dev server cold start", unit: "ms", lowerIsBetter: true, values: seriesFrom("Dev server cold start") },
];

const deploymentMetrics = [
  { id: "score", label: "Performance score", unit: "score", lowerIsBetter: false },
  { id: "ttfb", label: "TTFB", unit: "ms", lowerIsBetter: true },
  { id: "fcp", label: "FCP", unit: "ms", lowerIsBetter: true },
  { id: "lcp", label: "LCP", unit: "ms", lowerIsBetter: true },
  { id: "js", label: "Transferred JavaScript", unit: "bytes", lowerIsBetter: true },
  { id: "page", label: "Page response size", unit: "bytes", lowerIsBetter: true },
];

function seriesFrom(scenario) {
  const source = scenario.includes("time") || scenario.includes("start") ? timing : bundles;
  return ["published", "baseline", "updated"].map((dataset) => ({
    next: source[dataset].find((row) => row.scenario === scenario && row.id === "next")?.median ?? null,
    vinext: source[dataset].find((row) => row.scenario === scenario && row.id === "vinext")?.median ?? null,
  }));
}

const state = { timing: "published", bundle: "published", deployment: "baseline", metric: "client" };
const datasetLabels = ["Published", "Our baseline", "Next 16.3.3"];

function frameworkCell(row) {
  return `<div class="framework-label"><span class="dot ${row.id}"></span>${row.framework}</div>`;
}

function groups(rows) {
  return rows.reduce((result, row) => {
    const group = result.find(([scenario]) => scenario === row.scenario);
    if (group) group[1].push(row);
    else result.push([row.scenario, [row]]);
    return result;
  }, []);
}

function timingWinner(group) {
  if (group.length < 2) return null;
  return group.reduce((winner, row) => !winner || row.median < winner.median ? row : winner, null);
}

function timingBadge(row, group) {
  const winner = timingWinner(group);
  if (!winner || winner !== row) return "";
  const other = group.find((item) => item !== row);
  return `<span class="badge ${row.id}">${(((other.median - row.median) / other.median) * 100).toFixed(1)}% smaller</span>`;
}

function renderTiming() {
  const dataset = state.timing;
  const previousRows = dataset === "baseline" ? timing.published : timing.baseline;
  const previousByKey = new Map(previousRows.map((row) => [`${row.scenario}:${row.id}`, row.median]));
  const body = groups(timing[dataset]).flatMap(([, group]) => group.map((row, index) => {
    const previous = previousByKey.get(`${row.scenario}:${row.id}`) ?? null;
    const percent = dataset === "published" ? null : changePercent(row.median, previous);
    return `<tr>
      ${index === 0 ? `<td class="scenario" rowspan="${group.length}">${row.scenario}</td>` : ""}
      <td class="framework">${frameworkCell(row)}</td>
      <td><div class="value">${formatMs(row.median)}${timingBadge(row, group)}</div></td>
      <td>${changeBadge(percent)}</td>
      <td class="muted">${formatMs(row.min)}–${formatMs(row.max)}</td>
      <td>${row.rounds}</td>
    </tr>`;
  })).join("");
  document.querySelector("#timing-table").innerHTML = `<div class="table-shell"><table class="timing-table"><thead><tr><th>Scenario</th><th>Framework</th><th>Median</th><th>Change</th><th>Range</th><th>Rounds</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function changePercent(current, previous) {
  return previous === null || previous === undefined || previous === 0 ? null : ((current - previous) / previous) * 100;
}

function changeBadge(percent, original = false, lowerIsBetter = true) {
  if (percent === null) return `<span class="change-empty">—</span>`;
  const rounded = Math.abs(percent) < 0.05 ? 0 : percent;
  const sign = rounded > 0 ? "+" : "";
  const direction = rounded === 0 ? "neutral" : lowerIsBetter ? (rounded < 0 ? "good" : "bad") : (rounded > 0 ? "good" : "bad");
  return `<span class="badge ${direction}">${sign}${rounded.toFixed(1)}%</span>`;
}

function renderBundle() {
  const dataset = state.bundle;
  const rows = bundles[dataset];
  const previousRows = dataset === "baseline" ? bundles.published : bundles.baseline;
  const previousByKey = new Map(previousRows.map((row) => [`${row.scenario}:${row.id}`, row.median]));
  const original = dataset === "published";
  const body = groups(rows).flatMap(([, group]) => group.map((row, index) => {
    const previous = previousByKey.get(`${row.scenario}:${row.id}`) ?? null;
    const percent = original ? row.change : changePercent(row.median, previous);
    const winner = !original && group.length > 1 && group.reduce((best, item) => item.median < best.median ? item : best, group[0]) === row;
    const other = winner ? group.find((item) => item !== row) : null;
    const winnerAmount = winner && other ? `<span class="badge ${row.id}">${(((other.median - row.median) / other.median) * 100).toFixed(1)}% smaller</span>` : "";
    return `<tr>
      ${index === 0 ? `<td class="scenario" rowspan="${group.length}">${row.scenario}</td>` : ""}
      <td class="framework">${frameworkCell(row)}</td>
      <td class="prior-cell">${original ? row.prior : winnerAmount}</td>
      <td class="numeric">${formatBytes(row.median)}</td>
      <td>${changeBadge(percent, original)}</td>
      <td class="muted">${formatBytes(row.min ?? row.median)}–${formatBytes(row.max ?? row.median)}</td>
      <td>${row.rounds}</td>
    </tr>`;
  })).join("");
  document.querySelector("#bundle-note").textContent = original ? "vs prior 10-run median" : `vs ${dataset === "baseline" ? "Published" : "Our baseline"}`;
  document.querySelector("#bundle-table").innerHTML = `<div class="table-shell"><table class="bundle-table"><thead><tr><th>Scenario</th><th>Framework</th><th>${original ? "Prior 10-run median" : "Winner"}</th><th>Current</th><th>Change</th><th>Range</th><th>Rounds</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function platformCell(row) {
  return `<div class="platform-label"><span class="platform-marker ${row.platform.toLowerCase()}"></span>${row.platform}</div>`;
}

function deploymentWinner(rows, metric, platform) {
  const group = rows.filter((row) => row.platform === platform);
  const best = group.reduce((winner, row) => !winner || (metric === "score" ? row[metric] > winner[metric] : row[metric] < winner[metric]) ? row : winner, null);
  return best && group.filter((row) => row[metric] === best[metric]).length === 1 ? best : null;
}

function deploymentValue(row, metric) {
  return metric === "score" ? String(Math.round(row[metric])) : metric === "js" || metric === "page" ? formatBytes(row[metric]) : formatShortMs(row[metric]);
}

function deploymentWinnerBadge(row, metric, rows) {
  const winner = deploymentWinner(rows, metric, row.platform);
  if (winner !== row) return `<span class="winner-mark placeholder">Winner</span>`;
  const other = rows.find((item) => item.platform === row.platform && item !== row);
  const difference = metric === "score" ? ((row[metric] - other[metric]) / other[metric]) * 100 : ((other[metric] - row[metric]) / other[metric]) * 100;
  const unit = metric === "score" ? "higher" : "smaller";
  return `<span class="winner-mark ${row.id}">${Math.abs(difference).toFixed(1)}% ${unit}</span>`;
}

function deploymentChange(row, metric) {
  if (state.deployment === "baseline") return null;
  const previous = deployments.baseline.find((item) => item.platform === row.platform && item.id === row.id);
  return changePercent(row[metric], previous?.[metric]);
}

function deploymentPair(row, metric, rows) {
  return `<td class="metric-cell"><div class="metric-value">${deploymentValue(row, metric)}${deploymentWinnerBadge(row, metric, rows)}</div></td><td class="change-cell">${changeBadge(deploymentChange(row, metric), false, metric !== "score")}</td>`;
}

function renderDeployment() {
  const rows = deployments[state.deployment];
  const summary = rows.map((row) => `<tr><td class="scenario">${platformCell(row)}</td><td class="framework">${frameworkCell(row)}</td>${deploymentPair(row, "score", rows)}<td>${row.rounds}</td></tr>`).join("");
  const vitals = rows.map((row) => `<tr><td class="scenario">${platformCell(row)}</td><td class="framework">${frameworkCell(row)}</td>${deploymentPair(row, "ttfb", rows)}${deploymentPair(row, "fcp", rows)}${deploymentPair(row, "lcp", rows)}<td>${row.rounds}</td></tr>`).join("");
  const assets = rows.map((row) => `<tr><td class="scenario">${platformCell(row)}</td><td class="framework">${frameworkCell(row)}</td>${deploymentPair(row, "js", rows)}${deploymentPair(row, "page", rows)}<td>${row.rounds}</td></tr>`).join("");
  document.querySelector("#deployment-table").innerHTML = `<div class="deployment-tables">
    <div class="table-shell"><table class="deployment-table deployment-summary"><thead><tr><th>Platform</th><th>Framework</th><th>Performance<br><small>Current</small></th><th>Change</th><th>Rounds</th></tr></thead><tbody>${summary}</tbody></table></div>
    <div class="table-shell"><table class="deployment-table deployment-vitals"><thead><tr><th>Platform</th><th>Framework</th><th>TTFB<br><small>Current</small></th><th>Change</th><th>FCP<br><small>Current</small></th><th>Change</th><th>LCP<br><small>Current</small></th><th>Change</th><th>Rounds</th></tr></thead><tbody>${vitals}</tbody></table></div>
    <div class="table-shell"><table class="deployment-table deployment-assets"><thead><tr><th>Platform</th><th>Framework</th><th>Transferred JS<br><small>Current</small></th><th>Change</th><th>Page response<br><small>Current</small></th><th>Change</th><th>Rounds</th></tr></thead><tbody>${assets}</tbody></table></div>
  </div>`;
}

function renderMetricTabs() {
  document.querySelector('[data-tabs="metrics"]').innerHTML = localMetrics.map((item) => `<button type="button" role="tab" data-value="${item.id}" aria-selected="${item.id === state.metric}">${item.label}</button>`).join("");
  document.querySelector('[data-tabs="deployment-metrics"]').innerHTML = deploymentMetrics.map((item) => `<button type="button" role="tab" data-value="deployment:${item.id}" aria-selected="${state.metric === `deployment:${item.id}`}">${item.label}</button>`).join("");
}

function chartCard(metricData, grid, content, legend, note) {
  const direction = metricData.lowerIsBetter ? "Lower is better" : "Higher is better";
  document.querySelector("#chart").innerHTML = `<div class="chart-card"><div class="chart-title">${metricData.label}</div><div class="chart-subtitle">${direction}</div><div class="chart-wrap"><svg viewBox="0 0 800 320" role="img" aria-label="${metricData.label} comparison"><rect x="0" y="0" width="800" height="320" fill="white"/>${grid}${content}<text x="18" y="150" text-anchor="middle" transform="rotate(-90 18 150)" fill="#6b7280" font-size="11">${metricData.unit}</text></svg></div><div class="chart-legend">${legend}</div><div class="chart-focus">${note}</div></div>`;
}

function localChart(metricData) {
  const all = metricData.values.flatMap((point) => [point.next, point.vinext]).filter((value) => value !== null);
  const min = Math.min(...all) * .9;
  const max = Math.max(...all) * 1.1;
  const x = [120, 400, 680];
  const y = (value) => 24 + 236 - ((value - min) / (max - min || 1)) * 236;
  const tick = (index) => min + ((max - min) * index) / 4;
  const grid = [0, 1, 2, 3, 4].map((index) => { const value = tick(index); const py = y(value); return `<line x1="80" y1="${py}" x2="720" y2="${py}" stroke="#e5e7eb" stroke-dasharray="5 5"/><text x="70" y="${py + 4}" text-anchor="end" fill="#9ca3af" font-size="11">${formatChartValue(value, metricData.unit)}</text>`; }).join("");
  const series = [{ key: "next", label: "Next.js", color: "#5b6169" }, { key: "vinext", label: "vinext", color: "#2f855a" }];
  const lines = series.map((item) => {
    const path = metricData.values.map((point, index) => point[item.key] === null ? null : `${index === 0 || metricData.values[index - 1][item.key] === null ? "M" : "L"} ${x[index]} ${y(point[item.key])}`).filter(Boolean).join(" ");
    const markers = metricData.values.map((point, index) => point[item.key] === null ? "" : `<circle cx="${x[index]}" cy="${y(point[item.key])}" r="4.5" fill="${item.color}" stroke="white" stroke-width="2"><title>${datasetLabels[index]} · ${item.label}: ${formatChartValue(point[item.key], metricData.unit)}</title></circle>`).join("");
    return `<path d="${path}" fill="none" stroke="${item.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${markers}`;
  }).join("");
  const labels = datasetLabels.map((label, index) => `<text x="${x[index]}" y="300" text-anchor="middle" fill="#6b7280" font-size="11">${label}</text>`).join("");
  const legend = series.filter((item) => metricData.values.some((point) => point[item.key] !== null)).map((item) => `<span class="legend-item"><span class="legend-swatch" style="background:${item.color}"></span>${item.label}</span>`).join("");
  chartCard(metricData, grid, `${lines}${labels}`, legend, "Published, our baseline, and Next 16.3.3");
}

function deploymentChart(metricData) {
  const targets = [
    { id: "next", platform: "Cloudflare", label: "Next.js · Cloudflare", color: "#5b6169", shape: "dot", dash: "" },
    { id: "vinext", platform: "Cloudflare", label: "vinext · Cloudflare", color: "#2f855a", shape: "dot", dash: "" },
    { id: "next", platform: "Vercel", label: "Next.js · Vercel", color: "#5b6169", shape: "triangle", dash: "6 5" },
    { id: "vinext", platform: "Vercel", label: "vinext · Vercel", color: "#2f855a", shape: "triangle", dash: "6 5" },
  ];
  const values = ["baseline", "updated"].map((dataset) => targets.map((target) => deployments[dataset].find((row) => row.id === target.id && row.platform === target.platform)[metricData.id]));
  const all = values.flat();
  const min = Math.min(...all) * .9;
  const max = Math.max(...all) * 1.1;
  const x = [260, 540];
  const y = (value) => 24 + 236 - ((value - min) / (max - min || 1)) * 236;
  const tick = (index) => min + ((max - min) * index) / 4;
  const grid = [0, 1, 2, 3, 4].map((index) => { const value = tick(index); const py = y(value); return `<line x1="80" y1="${py}" x2="720" y2="${py}" stroke="#e5e7eb" stroke-dasharray="5 5"/><text x="70" y="${py + 4}" text-anchor="end" fill="#9ca3af" font-size="11">${formatChartValue(value, metricData.unit)}</text>`; }).join("");
  const lines = targets.map((target, targetIndex) => {
    const path = values.map((point, index) => `${index === 0 ? "M" : "L"} ${x[index]} ${y(point[targetIndex])}`).join(" ");
    const markers = values.map((point, index) => { const px = x[index]; const py = y(point[targetIndex]); const title = `${datasetLabels[index + 1]} · ${target.label}: ${formatChartValue(point[targetIndex], metricData.unit)}`; return target.shape === "triangle" ? `<polygon points="${px},${py - 6} ${px - 6},${py + 5} ${px + 6},${py + 5}" fill="${target.color}" stroke="white" stroke-width="2"><title>${title}</title></polygon>` : `<circle cx="${px}" cy="${py}" r="5" fill="${target.color}" stroke="white" stroke-width="2"><title>${title}</title></circle>`; }).join("");
    return `<path d="${path}" fill="none" stroke="${target.color}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${target.dash}"/>${markers}`;
  }).join("");
  const labels = ["Our baseline", "Next 16.3.3"].map((label, index) => `<text x="${x[index]}" y="300" text-anchor="middle" fill="#6b7280" font-size="11">${label}</text>`).join("");
  const legend = targets.map((target) => `<span class="legend-item"><span class="legend-marker ${target.shape}" style="background:${target.color}"></span>${target.label}</span>`).join("");
  chartCard(metricData, grid, `${lines}${labels}`, legend, "Our baseline and Next 16.3.3");
}

function renderChart() {
  if (state.metric.startsWith("deployment:")) deploymentChart(deploymentMetrics.find((item) => `deployment:${item.id}` === state.metric));
  else localChart(localMetrics.find((item) => item.id === state.metric));
}

function formatMs(value) { return `${(value / 1000).toFixed(2)} s`; }
function formatShortMs(value) { return `${Math.round(value)} ms`; }
function formatBytes(value) { return `${(value / 1024).toFixed(1)} KB`; }
function formatChartValue(value, unit) { if (unit === "bytes") return formatBytes(value); if (unit === "score") return String(Math.round(value)); return value < 1000 ? formatShortMs(value) : formatMs(value); }

function bindTabs(name, stateKey, render) {
  document.querySelector(`[data-tabs="${name}"]`).addEventListener("click", (event) => {
    const button = event.target.closest("button:not(:disabled)");
    if (!button) return;
    state[stateKey] = button.dataset.value;
    event.currentTarget.querySelectorAll("button").forEach((item) => item.setAttribute("aria-selected", String(item === button)));
    render();
  });
}

renderTiming();
renderBundle();
renderDeployment();
renderMetricTabs();
renderChart();
bindTabs("timing", "timing", renderTiming);
bindTabs("bundle", "bundle", renderBundle);
bindTabs("deployment", "deployment", renderDeployment);
bindTabs("metrics", "metric", renderChart);
bindTabs("deployment-metrics", "metric", renderChart);

console.assert(timing.baseline.length === 4 && bundles.updated.length === 5, "Local benchmark data is incomplete");
console.assert(deployments.baseline.length === 4 && deployments.updated.length === 4, "Deployment data is incomplete");
