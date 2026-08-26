#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = process.argv[2];
if (!root) throw new Error("Usage: summarize-lighthouse.mjs <raw-report-directory>");

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const range = (values) => ({ min: Math.min(...values), max: Math.max(...values) });
const reports = readdirSync(root).filter((file) => file.endsWith(".json")).sort();
const targets = Map.groupBy(reports, (file) => file.replace(/-round-[1-5]\.json$/, ""));
const summary = {};

for (const [target, files] of targets) {
  if (files.length !== 5) throw new Error(`${target} has ${files.length} reports, expected 5`);
  const samples = files.map((file) => {
    const report = JSON.parse(readFileSync(join(root, file), "utf8"));
    return {
      file: basename(file),
      url: report.finalDisplayedUrl,
      performanceScore: report.categories.performance.score * 100,
      ttfbMs: report.audits["server-response-time"].numericValue,
      fcpMs: report.audits["first-contentful-paint"].numericValue,
      lcpMs: report.audits["largest-contentful-paint"].numericValue,
    };
  });
  const first = JSON.parse(readFileSync(join(root, files[0]), "utf8"));
  const resources = first.audits["resource-summary"].details.items;
  const requests = first.audits["network-requests"].details.items;
  const scripts = resources.find((item) => item.resourceType === "script");
  const total = resources.find((item) => item.resourceType === "total");
  const document = requests.find((item) => item.resourceType === "Document");
  const metrics = {};
  for (const field of ["performanceScore", "ttfbMs", "fcpMs", "lcpMs"]) {
    const values = samples.map((sample) => sample[field]);
    metrics[field] = { median: median(values), ...range(values) };
  }
  summary[target] = {
    samples,
    metrics,
    transferSample: {
      report: files[0],
      totalJavaScriptBytes: scripts.transferSize,
      totalPageBytes: total.transferSize,
      documentResponseBytes: document.transferSize,
    },
  };
}

writeFileSync(join(root, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
