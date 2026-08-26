import { bindings, defineWorker } from "@cloudflare/vite-plugin/experimental-config";
import * as entrypoint from "vinext/server/fetch-handler" with { type: "cf-worker" };

export default defineWorker({
  name: "next-vinext-bench-vinext",
  entrypoint,
  compatibilityDate: "2026-08-26",
  compatibilityFlags: ["nodejs_compat"],
  assets: { notFoundHandling: "none" },
  env: { ASSETS: bindings.assets() },
  observability: { enabled: true },
});
