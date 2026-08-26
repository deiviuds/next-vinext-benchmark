#!/usr/bin/env node

import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";

const source = process.env.SOURCE_ROOT;
const output = process.env.DEPLOYMENT_ROOT;
const packages = process.env.PACKAGE_ROOT;

if (!source || !output || !packages) {
  throw new Error("SOURCE_ROOT, DEPLOYMENT_ROOT, and PACKAGE_ROOT are required");
}

const versions = {
  next: "16.3.3",
  react: "19.2.7",
  typescript: "5.9.3",
  openNext: "1.20.3",
  nitro: "3.0.1-20260826-135133-65a4e394",
  cloudflareVite: "1.31.0",
  wrangler: "4.125.0",
  vitePlus: "0.2.6",
};

const tarball = (name) => {
  const files = JSON.parse(process.env.PACKED_FILES);
  const pattern = name === "vinext" ? /^vinext-[0-9]/ : new RegExp(`^${name}-`);
  const file = files.find((candidate) => pattern.test(candidate) && candidate.endsWith(".tgz"));
  if (!file) throw new Error(`Missing ${name} tarball`);
  return `file:${join(packages, file)}`;
};

const vinextDependencies = {
  "@vinext/types": tarball("vinext-types"),
  "@vitejs/plugin-react": "6.1.0",
  "@vitejs/plugin-rsc": "0.5.34",
  react: versions.react,
  "react-dom": versions.react,
  "react-server-dom-webpack": versions.react,
  vite: `npm:@voidzero-dev/vite-plus-core@${versions.vitePlus}`,
  "vite-plus": versions.vitePlus,
  vinext: tarball("vinext"),
};

const write = (directory, file, value) => {
  const path = join(output, directory, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
};

const copyApp = (directory, framework) => {
  const target = join(output, directory);
  mkdirSync(target, { recursive: true });
  cpSync(join(source, "benchmarks", framework, "app"), join(target, "app"), { recursive: true });
  cpSync(join(source, "benchmarks", framework, "tsconfig.json"), join(target, "tsconfig.json"));
};

for (const directory of ["next-vercel", "next-cloudflare"]) {
  copyApp(directory, "nextjs");
  cpSync(join(source, "benchmarks/nextjs/next.config.ts"), join(output, directory, "next.config.ts"));
}

for (const directory of ["vinext-vercel", "vinext-cloudflare"]) {
  copyApp(directory, "vinext");
}

write("next-vercel", "package.json", {
  name: "vinext-benchmark-next-vercel",
  private: true,
  scripts: { build: "next build --turbopack", start: "next start" },
  dependencies: { next: versions.next, react: versions.react, "react-dom": versions.react },
  devDependencies: {
    "@types/node": "25.9.2",
    "@types/react": "19.2.16",
    typescript: versions.typescript,
  },
});

write("next-cloudflare", "package.json", {
  name: "vinext-benchmark-next-cloudflare",
  private: true,
  scripts: { build: "opennextjs-cloudflare build" },
  dependencies: { next: versions.next, react: versions.react, "react-dom": versions.react },
  devDependencies: {
    "@opennextjs/cloudflare": versions.openNext,
    "@types/node": "25.9.2",
    "@types/react": "19.2.16",
    typescript: versions.typescript,
    wrangler: versions.wrangler,
  },
});
write(
  "next-cloudflare",
  "open-next.config.ts",
  'import { defineCloudflareConfig } from "@opennextjs/cloudflare";\n\nexport default defineCloudflareConfig();\n',
);
write("next-cloudflare", "wrangler.jsonc", {
  $schema: "node_modules/wrangler/config-schema.json",
  name: "next-vinext-bench-next",
  main: ".open-next/worker.js",
  compatibility_date: "2026-08-26",
  compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"],
  assets: { binding: "ASSETS", directory: ".open-next/assets" },
  observability: { enabled: true },
});

write("vinext-vercel", "package.json", {
  name: "vinext-benchmark-vinext-vercel",
  private: true,
  type: "module",
  packageManager: "pnpm@11.1.1",
  scripts: { build: "NITRO_PRESET=vercel vite build" },
  dependencies: { ...vinextDependencies, nitro: `npm:nitro-nightly@${versions.nitro}` },
});
write(
  "vinext-vercel",
  "pnpm-workspace.yaml",
  'peerDependencyRules:\n  allowedVersions:\n    vite: "*"\n\nallowBuilds:\n  esbuild: true\n  sharp: true\n',
);
write(
  "vinext-vercel",
  "vite.config.ts",
  'import { defineConfig } from "vite";\nimport vinext from "vinext";\nimport { nitro } from "nitro/vite";\n\nexport default defineConfig({ plugins: [vinext(), nitro()] });\n',
);

write("vinext-cloudflare", "package.json", {
  name: "vinext-benchmark-vinext-cloudflare",
  private: true,
  type: "module",
  packageManager: "pnpm@11.1.1",
  scripts: { build: "vite build" },
  dependencies: {
    ...vinextDependencies,
    "@cloudflare/vite-plugin": versions.cloudflareVite,
    "@vinext/cloudflare": tarball("vinext-cloudflare"),
    wrangler: versions.wrangler,
  },
});
write(
  "vinext-cloudflare",
  "pnpm-workspace.yaml",
  'peerDependencyRules:\n  allowedVersions:\n    vite: "*"\n\nallowBuilds:\n  esbuild: true\n  sharp: true\n  workerd: true\n',
);
write(
  "vinext-cloudflare",
  "vite.config.ts",
  'import { defineConfig } from "vite";\nimport { cloudflare } from "@cloudflare/vite-plugin";\nimport vinext from "vinext";\n\nexport default defineConfig({\n  plugins: [\n    vinext(),\n    cloudflare({ viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] } }),\n  ],\n});\n',
);
write("vinext-cloudflare", "wrangler.jsonc", {
  $schema: "node_modules/wrangler/config-schema.json",
  name: "next-vinext-bench-vinext",
  compatibility_date: "2026-08-26",
  compatibility_flags: ["nodejs_compat"],
  main: "vinext/server/fetch-handler",
  assets: { directory: "dist/client", not_found_handling: "none", binding: "ASSETS" },
  observability: { enabled: true },
});

const hashTree = (directory) => {
  const hash = createHash("sha256");
  const walk = (path) => {
    for (const entry of readdirSync(path, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const child = join(path, entry.name);
      if (entry.isDirectory()) walk(child);
      else hash.update(child.slice(directory.length)).update(readFileSync(child));
    }
  };
  walk(directory);
  return hash.digest("hex");
};

const appHashes = Object.fromEntries(
  ["next-vercel", "next-cloudflare", "vinext-vercel", "vinext-cloudflare"].map((directory) => [
    directory,
    hashTree(join(output, directory, "app")),
  ]),
);

const countRoutes = (directory) => {
  let count = 0;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const child = join(directory, entry.name);
    if (entry.isDirectory()) count += countRoutes(child);
    else if (entry.name === "page.tsx" || entry.name === "route.ts") count++;
  }
  return count;
};

if (new Set(Object.values(appHashes)).size !== 1) {
  throw new Error(`Deployment workloads differ: ${JSON.stringify(appHashes)}`);
}
if (countRoutes(join(output, "next-vercel", "app")) !== 33) {
  throw new Error("Deployment workload is not the generated 33-route benchmark app");
}

writeFileSync(
  join(output, "deployment-manifest.json"),
  `${JSON.stringify(
    {
      vinextCommit: "bdafcf41a77a68e5647be3f0fcf6ee4fed08ac78",
      appSha256: Object.values(appHashes)[0],
      routes: 33,
      appHashes,
      versions,
      adapters: {
        nextVercel: "native Vercel Next.js adapter",
        nextCloudflare: `@opennextjs/cloudflare ${versions.openNext}`,
        vinextVercel: `Nitro ${versions.nitro} with the vercel preset`,
        vinextCloudflare: `native @cloudflare/vite-plugin ${versions.cloudflareVite}`,
      },
    },
    null,
    2,
  )}\n`,
);

console.log(`Prepared four identical deployment workloads: ${Object.values(appHashes)[0]}`);
