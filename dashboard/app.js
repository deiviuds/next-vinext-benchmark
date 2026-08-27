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
    { scenario: "Client bundle size (gzip)", framework: "Next.js", id: "next", prior: "185.6 KB", median: 190048, change: "0.0%", rounds: 5 },
    { scenario: "Client bundle size (gzip)", framework: "vinext", id: "vinext", prior: "141.4 KB", median: 145623, change: "+0.6%", rounds: 5 },
    { scenario: "Client entry size (gzip)", framework: "vinext", id: "vinext", prior: "128.8 KB", median: 132603, change: "+0.5%", rounds: 5 },
    { scenario: "RSC entry closure size (gzip)", framework: "vinext", id: "vinext", prior: "115.6 KB", median: 119403, change: "+0.9%", rounds: 5 },
    { scenario: "Server bundle size (gzip)", framework: "vinext", id: "vinext", prior: "196.8 KB", median: 202878, change: "+0.7%", rounds: 5 },
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

function deployment(framework, id, platform, score, scoreMin, scoreMax, ttfb, ttfbMin, ttfbMax, fcp, fcpMin, fcpMax, lcp, lcpMin, lcpMax, js, page) {
  return { framework, id, platform, score, scoreMin, scoreMax, ttfb, ttfbMin, ttfbMax, fcp, fcpMin, fcpMax, lcp, lcpMin, lcpMax, js, page, rounds: 5 };
}

const chartMetrics = [
  { id: "client", label: "Client bundle size (gzip)", suite: "Build", unit: "bytes", values: seriesFrom("Client bundle size (gzip)") },
  { id: "entry", label: "Client entry size (gzip)", suite: "Build", unit: "bytes", values: seriesFrom("Client entry size (gzip)") },
  { id: "build", label: "Production build time", suite: "Build", unit: "ms", values: seriesFrom("Production build time") },
  { id: "rsc", label: "RSC entry closure size (gzip)", suite: "Build", unit: "bytes", values: seriesFrom("RSC entry closure size (gzip)") },
  { id: "server", label: "Server bundle size (gzip)", suite: "Build", unit: "bytes", values: seriesFrom("Server bundle size (gzip)") },
  { id: "dev", label: "Dev server cold start", suite: "Development", unit: "ms", values: seriesFrom("Dev server cold start") },
];

const deploymentMetrics = [
  { id: "score", label: "Performance score", unit: "score" },
  { id: "ttfb", label: "TTFB", unit: "ms" },
  { id: "fcp", label: "FCP", unit: "ms" },
  { id: "lcp", label: "LCP", unit: "ms" },
  { id: "js", label: "Transferred JavaScript", unit: "bytes" },
  { id: "page", label: "Page response size", unit: "bytes" },
];

function seriesFrom(scenario) {
  const source = scenario.includes("time") || scenario.includes("start") ? timing : bundles;
  return ["published", "baseline", "updated"].map((dataset) => ({
    next: source[dataset].find((row) => row.scenario === scenario && row.id === "next")?.median ?? null,
    vinext: source[dataset].find((row) => row.scenario === scenario && row.id === "vinext")?.median ?? null,
  }));
}

const state = {
  timing: "published",
  bundle: "published",
  deployment: "baseline",
  metric: "client",
  chartDataset: "published",
  deploymentMetric: "score",
  deploymentChartDataset: "baseline",
};
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

function smallerBadge(row, group) {
  if (group.length < 2) return "";
  const largest = Math.max(...group.map((item) => item.median));
  if (row.median !== Math.min(...group.map((item) => item.median))) return "";
  return `<span class="badge ${row.id}">${(((largest - row.median) / largest) * 100).toFixed(1)}% smaller</span>`;
}

function renderStandardTable(rows, formatter) {
  const body = groups(rows).flatMap(([, group]) => group.map((row, index) => `
    <tr>
      ${index === 0 ? `<td class="scenario" rowspan="${group.length}">${row.scenario}</td>` : ""}
      <td class="framework">${frameworkCell(row)}</td>
      <td><div class="value">${formatter(row.median)}${smallerBadge(row, group)}</div></td>
      <td class="muted">${formatter(row.min)}–${formatter(row.max)}</td>
      <td>${row.rounds}</td>
    </tr>`)).join("");
  return `<div class="table-shell"><table><thead><tr><th>Scenario</th><th>Framework</th><th>Median</th><th>Range</th><th>Rounds</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderTiming() {
  document.querySelector("#timing-table").innerHTML = renderStandardTable(timing[state.timing], formatMs);
}

function renderBundle() {
  const note = document.querySelector("#bundle-note");
  if (state.bundle !== "published") {
    note.textContent = "five rounds";
    document.querySelector("#bundle-table").innerHTML = renderStandardTable(bundles[state.bundle], formatBytes);
    return;
  }
  note.textContent = "vs prior 10-run median";
  const body = groups(bundles.published).flatMap(([, group]) => group.map((row, index) => `
    <tr>
      ${index === 0 ? `<td class="scenario" rowspan="${group.length}">${row.scenario}</td>` : ""}
      <td class="framework">${frameworkCell(row)}</td>
      <td class="value">${row.prior}</td>
      <td class="value">${formatBytes(row.median)}</td>
      <td><span class="badge neutral">${row.change}</span></td>
      <td class="muted">${formatBytes(row.median)}–${formatBytes(row.median)}</td>
      <td>${row.rounds}</td>
    </tr>`)).join("");
  document.querySelector("#bundle-table").innerHTML = `<div class="table-shell"><table><thead><tr><th>Scenario</th><th>Framework</th><th>Prior 10-run median</th><th>Current</th><th>Change</th><th>Range</th><th>Rounds</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function metric(value, min, max, formatter) {
  return `<td class="metric-cell">${formatter(value)}<small>${formatter(min)}–${formatter(max)}</small></td>`;
}

function renderDeployment() {
  const body = deployments[state.deployment].map((row) => `
    <tr>
      <td class="scenario">${row.platform}</td>
      <td class="framework">${frameworkCell(row)}</td>
      ${metric(row.score, row.scoreMin, row.scoreMax, String)}
      ${metric(row.ttfb, row.ttfbMin, row.ttfbMax, formatShortMs)}
      ${metric(row.fcp, row.fcpMin, row.fcpMax, formatShortMs)}
      ${metric(row.lcp, row.lcpMin, row.lcpMax, formatShortMs)}
      <td class="metric-cell">${formatBytes(row.js)}</td>
      <td class="metric-cell">${formatBytes(row.page)}</td>
      <td>${row.rounds}</td>
    </tr>`).join("");
  document.querySelector("#deployment-table").innerHTML = `<div class="table-shell"><table class="deployment-table"><thead><tr><th>Platform</th><th>Framework</th><th>Performance</th><th>TTFB</th><th>FCP</th><th>LCP</th><th>Transferred JS</th><th>Page response</th><th>Rounds</th></tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderMetricTabs() {
  document.querySelector('[data-tabs="metrics"]').innerHTML = chartMetrics.map((item) => `<button type="button" role="tab" data-value="${item.id}" aria-selected="${item.id === state.metric}">${item.label}</button>`).join("");
}

function renderDeploymentMetricTabs() {
  document.querySelector('[data-tabs="deployment-metrics"]').innerHTML = deploymentMetrics.map((item) => `<button type="button" role="tab" data-value="${item.id}" aria-selected="${item.id === state.deploymentMetric}">${item.label}</button>`).join("");
}

function renderChart() {
  const metricData = chartMetrics.find((item) => item.id === state.metric);
  const all = metricData.values.flatMap((point) => [point.next, point.vinext]).filter((value) => value !== null);
  const min = Math.min(...all) * .9;
  const max = Math.max(...all) * 1.1;
  const x = [120, 400, 680];
  const y = (value) => 24 + 236 - ((value - min) / (max - min || 1)) * 236;
  const tick = (index) => min + ((max - min) * index) / 4;
  const path = (key) => metricData.values.map((point, index) => point[key] === null ? null : `${index === 0 || metricData.values[index - 1][key] === null ? "M" : "L"} ${x[index]} ${y(point[key])}`).filter(Boolean).join(" ");
  const focusIndex = ["published", "baseline", "updated"].indexOf(state.chartDataset);
  const series = [{ key: "next", label: "Next.js", color: "#f97316" }, { key: "vinext", label: "vinext", color: "#3b82f6" }];
  const grid = [0, 1, 2, 3, 4].map((index) => {
    const value = tick(index);
    const py = y(value);
    return `<line x1="80" y1="${py}" x2="720" y2="${py}" stroke="#e5e7eb" stroke-dasharray="5 5"/><text x="70" y="${py + 4}" text-anchor="end" fill="#9ca3af" font-size="11">${formatChartValue(value, metricData.unit)}</text>`;
  }).join("");
  const lines = series.map((item) => {
    const dots = metricData.values.map((point, index) => point[item.key] === null ? "" : `<circle cx="${x[index]}" cy="${y(point[item.key])}" r="${index === focusIndex ? 5 : 4}" fill="${item.color}" stroke="white" stroke-width="2"><title>${datasetLabels[index]} · ${item.label}: ${formatChartValue(point[item.key], metricData.unit)}</title></circle>`).join("");
    return `<path d="${path(item.key)}" fill="none" stroke="${item.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
  }).join("");
  const labels = datasetLabels.map((label, index) => `<text x="${x[index]}" y="300" text-anchor="middle" fill="${index === focusIndex ? "#262626" : "#9ca3af"}" font-size="11" font-weight="${index === focusIndex ? 600 : 400}">${label}</text>`).join("");
  const legend = series.filter((item) => metricData.values.some((point) => point[item.key] !== null)).map((item) => `<span class="legend-item"><span class="dot" style="background:${item.color}"></span>${item.label}</span>`).join("");
  document.querySelector("#chart").innerHTML = `<div class="chart-card"><div class="chart-title">${metricData.label}</div><div class="chart-subtitle">${metricData.suite} · Lower is better</div><div class="chart-wrap"><svg viewBox="0 0 800 320" role="img" aria-label="${metricData.label} comparison"><rect x="${x[focusIndex] - 72}" y="15" width="144" height="262" rx="8" fill="#f8fafc"/>${grid}${lines}${labels}<text x="18" y="150" text-anchor="middle" transform="rotate(-90 18 150)" fill="#6b7280" font-size="11">${metricData.unit}</text></svg></div><div class="chart-legend">${legend}</div><div class="chart-focus">Selected result: ${datasetLabels[focusIndex]}</div></div>`;
}

function renderDeploymentChart() {
  const metricData = deploymentMetrics.find((item) => item.id === state.deploymentMetric);
  const targets = [
    { id: "next", platform: "Cloudflare", label: "Next.js · Cloudflare", color: "#f97316" },
    { id: "vinext", platform: "Cloudflare", label: "vinext · Cloudflare", color: "#3b82f6" },
    { id: "next", platform: "Vercel", label: "Next.js · Vercel", color: "#fb923c" },
    { id: "vinext", platform: "Vercel", label: "vinext · Vercel", color: "#60a5fa" },
  ];
  const values = ["baseline", "updated"].map((dataset) => targets.map((target) => deployments[dataset].find((row) => row.id === target.id && row.platform === target.platform)[metricData.id]));
  const all = values.flat();
  const min = Math.min(...all) * .9;
  const max = Math.max(...all) * 1.1;
  const x = [260, 540];
  const y = (value) => 24 + 236 - ((value - min) / (max - min || 1)) * 236;
  const tick = (index) => min + ((max - min) * index) / 4;
  const focusIndex = state.deploymentChartDataset === "baseline" ? 0 : 1;
  const grid = [0, 1, 2, 3, 4].map((index) => {
    const value = tick(index);
    const py = y(value);
    return `<line x1="80" y1="${py}" x2="720" y2="${py}" stroke="#e5e7eb" stroke-dasharray="5 5"/><text x="70" y="${py + 4}" text-anchor="end" fill="#9ca3af" font-size="11">${formatChartValue(value, metricData.unit)}</text>`;
  }).join("");
  const lines = targets.map((target, targetIndex) => {
    const path = values.map((point, index) => `${index === 0 ? "M" : "L"} ${x[index]} ${y(point[targetIndex])}`).join(" ");
    const dots = values.map((point, index) => `<circle cx="${x[index]}" cy="${y(point[targetIndex])}" r="${index === focusIndex ? 5 : 4}" fill="${target.color}" stroke="white" stroke-width="2"><title>${datasetLabels[index + 1]} · ${target.label}: ${formatChartValue(point[targetIndex], metricData.unit)}</title></circle>`).join("");
    return `<path d="${path}" fill="none" stroke="${target.color}" stroke-width="2.5" stroke-linecap="round"/>${dots}`;
  }).join("");
  const labels = ["Next 16.2.7", "Next 16.3.3"].map((label, index) => `<text x="${x[index]}" y="300" text-anchor="middle" fill="${index === focusIndex ? "#262626" : "#9ca3af"}" font-size="11" font-weight="${index === focusIndex ? 600 : 400}">${label}</text>`).join("");
  const legend = targets.map((target) => `<span class="legend-item"><span class="dot" style="background:${target.color}"></span>${target.label}</span>`).join("");
  const focusLabel = focusIndex === 0 ? "Next 16.2.7" : "Next 16.3.3";
  document.querySelector("#deployment-chart").innerHTML = `<div class="chart-card"><div class="chart-title">${metricData.label}</div><div class="chart-subtitle">Deployment · ${metricData.id === "score" ? "Higher is better" : "Lower is better"}</div><div class="chart-wrap"><svg viewBox="0 0 800 320" role="img" aria-label="${metricData.label} deployment comparison"><rect x="${x[focusIndex] - 92}" y="15" width="184" height="262" rx="8" fill="#f8fafc"/>${grid}${lines}${labels}<text x="18" y="150" text-anchor="middle" transform="rotate(-90 18 150)" fill="#6b7280" font-size="11">${metricData.unit}</text></svg></div><div class="chart-legend">${legend}</div><div class="chart-focus">Selected result: ${focusLabel}</div></div>`;
}

function formatMs(value) { return `${(value / 1000).toFixed(2)} s`; }
function formatShortMs(value) { return `${Math.round(value)} ms`; }
function formatBytes(value) { return `${(value / 1024).toFixed(1)} KB`; }
function formatChartValue(value, unit) {
  if (unit === "bytes") return formatBytes(value);
  if (unit === "score") return String(Math.round(value));
  return value < 1000 ? formatShortMs(value) : formatMs(value);
}

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
renderDeploymentMetricTabs();
renderDeploymentChart();
bindTabs("timing", "timing", renderTiming);
bindTabs("bundle", "bundle", renderBundle);
bindTabs("deployment", "deployment", renderDeployment);
bindTabs("metrics", "metric", renderChart);
bindTabs("chart-dataset", "chartDataset", renderChart);
bindTabs("deployment-metrics", "deploymentMetric", renderDeploymentChart);
bindTabs("deployment-chart-dataset", "deploymentChartDataset", renderDeploymentChart);

console.assert(timing.baseline.length === 4 && bundles.updated.length === 5, "Local benchmark data is incomplete");
console.assert(deployments.baseline.length === 4 && deployments.updated.length === 4, "Deployment data is incomplete");
