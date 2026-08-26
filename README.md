# vinext benchmark reproduction

This repository reproduces the vinext performance benchmark at commit
`bdafcf41a77a68e5647be3f0fcf6ee4fed08ac78` on the same standard
`ubuntu-latest` GitHub-hosted runner class used by Cloudflare.

The workflow keeps the upstream checkout unchanged, measures Next.js 16.2.7
for five rounds, replaces only the installed Next.js package with 16.3.3, and
runs the same five rounds again. Raw samples, normalized results, dependency
trees, runner metadata, and Git integrity checks are uploaded as artifacts.

Deployment projects and Lighthouse measurements are kept separate from the
baseline workflow and its results.

