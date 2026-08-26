# vinext benchmark reproduction

Run date: 2026-08-26

This project reproduced Cloudflare's vinext benchmark from commit `bdafcf41a77a68e5647be3f0fcf6ee4fed08ac78`. The baseline ran only on GitHub Actions `ubuntu-latest`. Nothing was measured on the Mac that prepared this repository.

The successful runs are public:

- [Baseline run 32987739378](https://github.com/deiviuds/next-vinext-benchmark/actions/runs/32987739378)
- [Deployment and Lighthouse run 32993645467](https://github.com/deiviuds/next-vinext-benchmark/actions/runs/32993645467)
- [Cloudflare's published vinext benchmark](https://vinext.dev/benchmarks)

The complete downloaded artifacts are checked into `recorded-results/`. This includes every raw benchmark sample, normalized output, exact dependency tree, lock snapshot, runner record, deployment log, platform config, and raw Lighthouse report.

## Baseline method

The workflow used the upstream benchmark generator, generated 33 routes, and called the upstream benchmark runner with `--rounds=5`. It first measured the frozen checkout with Next.js 16.2.7. It then ran `npm install --no-save --package-lock=false --ignore-scripts next@16.3.3` inside the generated Next.js benchmark directory. That replaced only the installed Next.js version. The second set used the same job, runner, app, command, settings, and five rounds.

The job ran Node 24.20.0 and npm 11.19.0 on Ubuntu 24, image `20260816.277.1`. The runner exposed 4 logical CPUs from an AMD EPYC 7763 and 15 GiB of memory. The frozen workspace contains Vite+ and `@voidzero-dev/vite-plus-core` 0.2.6. The pinned upstream `setup-vp` action supplied the `vp` 0.3.0 command used for installation.

Git identified the baseline as:

- Commit: `bdafcf41a77a68e5647be3f0fcf6ee4fed08ac78`
- Tree: `bca8bf8cd6787aa37dc10004236d69979d281452`
- Tracked status before: empty
- Tracked status after: empty
- Working tree diff after: empty
- Index diff after: empty

Vite+ found one empty fixture importer that the pinned lock did not list and rewrote `pnpm-lock.yaml` during the frozen install. The workflow restored that tracked file immediately, checked an empty diff before measurement, and checked the same commit, tree, status, working diff, and index diff afterward. No upstream lockfile, workspace config, catalog, generator, app, benchmark runner, or adapter was edited.

## Baseline medians and ranges

Times are milliseconds. Sizes are gzip bytes. Every range covers exactly five rounds.

| Installed Next.js | Implementation | Dev start median | Dev range | Build median | Build range | Client bundle median | Bundle range |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 16.2.7 | Next.js | 2542.084 | 2435.537 to 2691.023 | 4601.637 | 4511.720 to 4625.290 | 190048 | 190048 to 190048 |
| 16.2.7 | vinext | 3199.462 | 3167.752 to 3239.595 | 3655.793 | 3621.327 to 3704.058 | 145623 | 145623 to 145623 |
| 16.3.3 | Next.js | 2433.790 | 2329.213 to 2455.427 | 6040.666 | 5902.923 to 6113.898 | 178385 | 178385 to 178385 |
| 16.3.3 | vinext | 3246.185 | 3193.339 to 3275.825 | 3725.712 | 3625.668 to 3750.164 | 145621 | 145621 to 145621 |

The interesting change is in Next.js itself. Moving from 16.2.7 to 16.3.3 cut its median cold dev start by 4.26% and its gzip client output by 6.14%, but raised its median production build time by 31.27%. vinext changed little under the same installed Next.js replacement. Its dev median rose 1.46%, and its build median rose 1.91%.

With Next.js 16.2.7 installed, vinext's client bundle was 23.38% smaller and its build was 20.55% faster than Next.js. Its cold dev start was 25.86% slower. With 16.3.3 installed, vinext's client bundle was 18.37% smaller and its build was 38.32% faster. Its cold dev start was 33.38% slower.

## Raw baseline timing rounds

| Installed Next.js | Measurement | Round 1 | Round 2 | Round 3 | Round 4 | Round 5 |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 16.2.7 | Next.js dev | 2435.537 | 2691.023 | 2512.546 | 2542.084 | 2573.240 |
| 16.2.7 | vinext dev | 3239.595 | 3203.314 | 3167.752 | 3181.974 | 3199.462 |
| 16.2.7 | Next.js build | 4621.171 | 4625.290 | 4561.469 | 4511.720 | 4601.637 |
| 16.2.7 | vinext build | 3643.071 | 3704.058 | 3683.757 | 3655.793 | 3621.327 |
| 16.3.3 | Next.js dev | 2455.427 | 2433.790 | 2398.363 | 2329.213 | 2436.856 |
| 16.3.3 | vinext dev | 3213.453 | 3275.825 | 3246.185 | 3193.339 | 3270.171 |
| 16.3.3 | Next.js build | 6110.202 | 6113.898 | 5999.239 | 6040.666 | 5902.923 |
| 16.3.3 | vinext build | 3625.668 | 3732.250 | 3750.164 | 3725.712 | 3681.831 |

## Other bundle measurements

Each size below stayed identical across all five rounds.

| Installed Next.js | vinext client entry | vinext RSC entry closure | vinext server bundle |
| --- | ---: | ---: | ---: |
| 16.2.7 | 132603 | 119403 | 202878 |
| 16.3.3 | 132602 | 119392 | 202855 |

The full raw samples live in:

- `recorded-results/baseline-run-32987739378/next-16.2.7/perf-samples.jsonl`
- `recorded-results/baseline-run-32987739378/next-16.3.3/perf-samples.jsonl`

The exact resolved trees are the `npm-tree.json` and `workspace-tree.json` files beside those samples. They are large because the workspace tree records every package and transitive dependency.

## Comparison with Cloudflare's published numbers

The pinned dashboard reports these medians and ranges:

| Implementation | Published dev median and range | Published build median and range | Published client gzip size |
| --- | ---: | ---: | ---: |
| Next.js | 1.91 s, 1.83 to 1.95 | 3.39 s, 3.36 to 3.42 | 185.6 KB |
| vinext | 2.38 s, 2.37 to 2.53 | 2.63 s, 2.62 to 2.68 | 142.2 KB |

Our 16.2.7 bundle bytes match the dashboard's formatted sizes exactly. The dashboard formats 190048 bytes as 185.6 KB and 145623 bytes as 142.2 KB. Its vinext client entry, RSC closure, and server sizes also match our byte counts after formatting.

The absolute times did not match. Our 16.2.7 medians were 2.542 s and 3.199 s for dev start, then 4.602 s and 3.656 s for builds. The workflow used the same public `ubuntu-latest` runner label, but that label is a moving pool rather than fixed hardware. This run records the exact image and CPU so nobody has to pretend those absolute timings came from an identical machine allocation. The within-job Next.js versus vinext comparisons are the sound part of this reproduction.

## Deployment setup

Deployment copies lived under the runner's temporary directory, outside the baseline checkout. The script verified the same SHA-256, `dc4d79d3d753159972074bfa0fb745b1cd03e6ba8214633e9580470e82511847`, for the generated app in all four copies.

| Framework | Platform | Version and adapter | Result |
| --- | --- | --- | --- |
| Next.js | Vercel | Next.js 16.3.3, native Vercel adapter | Deployed and measured |
| vinext | Vercel | Pinned vinext tarballs, Nitro nightly `3.0.1-20260826-135133-65a4e394`, `vercel` preset | Deployed and measured |
| Next.js | Cloudflare | Next.js 16.3.3, OpenNext `1.20.3` | Deployed and measured |
| vinext | Cloudflare | Pinned vinext tarballs, native Cloudflare Vite plugin `1.54.0` | Not deployable with the required `cf` CLI path |

The job pinned `cf` 0.8.0, Vercel CLI 59.5.0, Wrangler 4.126.0 inside the adapter projects, OpenNext 1.20.3, Cloudflare Vite plugin 1.54.0, Lighthouse 13.4.1, and Chrome for Testing 152.0.7977.64. It called `cf build` and `cf deploy --prebuilt`. It never called Wrangler directly.

OpenNext 1.20.3 accepts Next.js `>=15.5.24 <16 || >=16.3.3`, so the deployment comparison uses Next.js 16.3.3. It cannot deploy 16.2.7 through that current adapter. This restriction does not affect the local baseline, which measured both requested Next.js versions.

The current `cf` Vite delegate cannot produce Build Output when a project uses `viteEnvironment.childEnvironments`. The pinned vinext Cloudflare adapter needs `rsc` and `ssr` child environments. The CLI stopped with the exact message, `Child environments are not yet supported in the Build Output Specification.` Direct Wrangler could deploy this shape, but the test rules banned that fallback. The workflow records this combination as unsupported and saves the raw failure log instead of silently changing the adapter or CLI.

## Lighthouse results

All supported deployments ran in one Ubuntu job with the same Chrome binary and Lighthouse config. Lighthouse used its default mobile preset and only the performance category. Each target ran exactly five sequential rounds. Performance is a score out of 100. Other values are milliseconds.

| Deployment | Performance median and range | TTFB median and range | FCP median and range | LCP median and range |
| --- | ---: | ---: | ---: | ---: |
| Next.js on Vercel | 100, 99 to 100 | 13, 13 to 14 | 792.894, 786.965 to 1018.514 | 796.346, 786.965 to 1223.143 |
| vinext on Vercel | 100, 100 to 100 | 13, 13 to 13 | 799.414, 790.777 to 998.606 | 799.414, 790.777 to 998.606 |
| Next.js on Cloudflare | 100, 100 to 100 | 530, 43 to 828 | 798.637, 779.242 to 957.743 | 798.637, 779.242 to 957.743 |

Cloudflare's TTFB range is noisy, including two warm-looking samples at 43 ms and 54 ms and three much slower samples at 530 ms, 743 ms, and 828 ms. Five rounds are enough to match the published method, but not enough to explain that distribution. The report leaves it visible instead of smoothing it away.

## Raw Lighthouse rounds

| Deployment | Round | Performance | TTFB | FCP | LCP |
| --- | ---: | ---: | ---: | ---: | ---: |
| Next.js on Vercel | 1 | 100 | 13 | 1018.514 | 1018.514 |
| Next.js on Vercel | 2 | 100 | 14 | 790.143 | 1223.143 |
| Next.js on Vercel | 3 | 100 | 13 | 786.965 | 786.965 |
| Next.js on Vercel | 4 | 99 | 13 | 792.894 | 792.894 |
| Next.js on Vercel | 5 | 99 | 13 | 796.346 | 796.346 |
| vinext on Vercel | 1 | 100 | 13 | 998.606 | 998.606 |
| vinext on Vercel | 2 | 100 | 13 | 811.403 | 811.403 |
| vinext on Vercel | 3 | 100 | 13 | 794.971 | 794.971 |
| vinext on Vercel | 4 | 100 | 13 | 799.414 | 799.414 |
| vinext on Vercel | 5 | 100 | 13 | 790.777 | 790.777 |
| Next.js on Cloudflare | 1 | 100 | 743 | 957.743 | 957.743 |
| Next.js on Cloudflare | 2 | 100 | 828 | 812.737 | 812.737 |
| Next.js on Cloudflare | 3 | 100 | 54 | 798.637 | 798.637 |
| Next.js on Cloudflare | 4 | 100 | 43 | 779.242 | 779.242 |
| Next.js on Cloudflare | 5 | 100 | 530 | 792.212 | 792.212 |

## One-time transfer samples

The transfer sample comes from round 1 for each deployment. `Total page` is Lighthouse's complete transferred resource total. `Document response` is the transferred HTML document response.

| Deployment | Transferred JavaScript | Total page | Document response |
| --- | ---: | ---: | ---: |
| Next.js on Vercel | 137658 bytes | 140105 bytes | 2447 bytes |
| vinext on Vercel | 137827 bytes | 140631 bytes | 2804 bytes |
| Next.js on Cloudflare | 140572 bytes | 143234 bytes | 2662 bytes |

The 15 untouched Lighthouse JSON reports and generated summary are under `recorded-results/deployment-run-32993645467/lighthouse/raw/`. The deployment dependency trees, locks, build logs, public URLs, Vercel protection state, Cloudflare config, and unsupported vinext Cloudflare record sit next to that directory.

## Reproducing it

Fork the public repository, add `VERCEL_TOKEN` and `CF_AUTH_CONFIG` as Actions secrets, then dispatch the two workflows in this order:

1. `Baseline benchmark`
2. `Deploy and Lighthouse`

The baseline workflow needs no deployment credentials. The deployment workflow makes the two named Vercel benchmark projects public, deploys supported targets, checks each page for `Benchmark App`, and only then starts Lighthouse. Both workflows upload their raw artifacts even when a later step fails.
