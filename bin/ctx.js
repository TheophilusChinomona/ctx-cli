#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve, getDocs } from '../lib/api.js';

const HELP = `
  ctx — Up-to-date library docs from your terminal

  Usage:
    ctx resolve <library>              Find Context7 library ID
    ctx docs <library> [topic]         Get docs (resolves library automatically)
    ctx docs <context7-id> [topic]     Get docs by exact Context7 ID

  Options:
    --tokens <n>       Max tokens to return (default: 5000)
    --api-key <key>    Context7 API key (or set CONTEXT7_API_KEY)
    --json             Output raw JSON (resolve only)
    --version, -v      Show version
    --help, -h         Show this help

  Examples:
    ctx resolve nextjs
    ctx docs react "server components"
    ctx docs nextjs "app router middleware" --tokens 10000
    ctx docs /vercel/next.js "image optimization"

  Pipe-friendly:
    ctx docs react hooks | pbcopy
    ctx docs express middleware >> prompt.txt
`.trim();

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tokens' && argv[i + 1]) { args.tokens = parseInt(argv[++i]); }
    else if (a === '--api-key' && argv[i + 1]) { args.apiKey = argv[++i]; }
    else if (a === '--json') { args.json = true; }
    else if (a === '--help' || a === '-h') { args.help = true; }
    else if (a === '--version' || a === '-v') { args.version = true; }
    else { args._.push(a); }
  }
  return args;
}

function isContext7Id(s) {
  return s.startsWith('/') && s.split('/').length >= 3;
}

async function cmdResolve(libraryName, opts) {
  const results = await resolve(libraryName, opts.apiKey);

  if (opts.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  if (!Array.isArray(results) || results.length === 0) {
    console.error(`No libraries found for "${libraryName}"`);
    process.exit(1);
  }

  const maxId = Math.max(...results.map(r => (r.id || '').length));
  for (const r of results) {
    const id = (r.id || '').padEnd(maxId + 2);
    const desc = r.description || r.title || '';
    console.log(`  ${id}${desc}`);
  }
}

async function cmdDocs(libraryOrId, topic, opts) {
  let libraryId = libraryOrId;

  if (!isContext7Id(libraryOrId)) {
    const results = await resolve(libraryOrId, opts.apiKey);
    if (!Array.isArray(results) || results.length === 0) {
      console.error(`No libraries found for "${libraryOrId}"`);
      process.exit(1);
    }
    libraryId = results[0].id;
    if (process.stdout.isTTY) {
      console.error(`\u2192 ${libraryId}`);
    }
  }

  const docs = await getDocs(libraryId, topic, opts.apiKey, opts.tokens || 5000);
  if (!docs) {
    console.error('No docs found');
    process.exit(1);
  }
  console.log(docs);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  opts.apiKey = opts.apiKey || process.env.CONTEXT7_API_KEY;

  if (opts.version) {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    console.log(pkg.version);
    process.exit(0);
  }

  if (opts.help || opts._.length === 0) {
    console.log(HELP);
    process.exit(0);
  }

  const [cmd, ...rest] = opts._;

  try {
    switch (cmd) {
      case 'resolve':
      case 'r':
        if (!rest[0]) { console.error('Usage: ctx resolve <library>'); process.exit(1); }
        await cmdResolve(rest[0], opts);
        break;

      case 'docs':
      case 'd':
        if (!rest[0]) { console.error('Usage: ctx docs <library> [topic]'); process.exit(1); }
        await cmdDocs(rest[0], rest.slice(1).join(' ') || undefined, opts);
        break;

      default:
        await cmdDocs(cmd, rest.join(' ') || undefined, opts);
        break;
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
