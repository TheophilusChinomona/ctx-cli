# r/commandline Post Draft

**Subreddit:** r/commandline

---

**Title:** ctx — Fetch library docs to stdout, pipe into anything (zero deps)

**Body:**

The OneUptime team wrote something recently that I think this sub would appreciate: "The best interface for AI agents isn't a new protocol — it's the one that's been on every Unix system since 1971."

There's been a whole wave of developers building MCP servers (a protocol Anthropic made for connecting AI tools) and it's gotten absurd. Someone literally made `mcp-grep`. An MCP wrapper around grep. LLMs already know how grep works from their training data. They don't need a special protocol to call it.

`ctx` queries a documentation database and prints results to stdout. Designed to compose with standard Unix tools, not replace them.

```bash
# Basic usage
ctx drizzle "queries"                       # Print Drizzle ORM query docs
ctx hono "middleware" --tokens 3000         # Limit output size

# Compose with pipes
ctx zod "schemas" | grep "z.object"         # Filter for object schemas
ctx drizzle "schema" | less                 # Page through docs
ctx hono "context" | pbcopy                 # Copy to clipboard
ctx zod "validation" | wc -l               # Count lines
ctx drizzle "migrations" >> prompt.txt      # Append to file

# Feed into LLMs
ctx zod "transforms" | claude "summarize"
ctx hono "routing" | ollama run deepseek-coder "explain"
```

**What it does:** Resolves a library name against Context7's database, fetches version-specific documentation with code examples, and prints it.

**Why it exists:** Context7 has an MCP server for AI editors, but I wanted the data accessible through the interface I already use. Eric Holmes summed it up well: "Ship a good API, then ship a good CLI. The agents will figure it out." LLMs are trained on millions of man pages and CLI help texts. They already know how to work with stdout. You don't need to teach them a new protocol.

**Stats:**
- Zero dependencies — just Node.js built-in `fetch`
- Works on Node 18+

**Install:**

```bash
npx @theo/ctx-cli           # Run without installing
npm install -g @theo/ctx-cli # Or install globally for `ctx`
```

Source: https://github.com/TheophilusChinomona/ctx-cli
npm: https://www.npmjs.com/package/@theo/ctx-cli
