import { bindings, defineWorker } from "wrangler/experimental-config";
import * as entrypoint from "./.open-next/worker.js" with { type: "cf-worker" };

export default defineWorker({
  name: "next-vinext-bench-next",
  entrypoint,
  compatibilityDate: "2026-08-26",
  compatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"],
  env: { ASSETS: bindings.assets() },
  observability: { enabled: true },
});
