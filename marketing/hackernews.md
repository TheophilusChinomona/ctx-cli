# Hacker News — Show HN Draft

---

**Title:** Show HN: ctx – Pipe up-to-date library docs into any LLM from the terminal

**URL:** https://github.com/TheophilusChinomona/ctx-cli

**First comment:**

Mario Zechner benchmarked Playwright's MCP server at 13.7k tokens just for tool descriptions. A minimal CLI README covering the same capabilities: 225 tokens. Jannik Reinhard found similar numbers with the GitHub MCP server — 93 tools consuming ~55k tokens in definitions alone.

Eric Holmes put the alternative well: "Ship a good API, then ship a good CLI. The agents will figure it out."

ctx is that approach applied to library documentation. Context7 indexes docs from library source repos. Their MCP server feeds this into Cursor, but it requires a compatible client. ctx gives you the same data as plain text on stdout.

```
ctx astro "routing" | claude "summarize the key patterns"
ctx zod "schemas" | ollama run deepseek-coder "explain"
ctx svelte "reactivity" | grep "rune"
```

Zero dependencies. Works without an API key.

Install: `npx @theo/ctx-cli`

GitHub: https://github.com/TheophilusChinomona/ctx-cli
npm: https://www.npmjs.com/package/@theo/ctx-cli
