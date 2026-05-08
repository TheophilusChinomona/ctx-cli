# r/LocalLLaMA Post Draft

**Subreddit:** r/LocalLLaMA

---

**Title:** Playwright MCP: 13,700 tokens for tool descriptions. A CLI README: 225 tokens. This matters more when your context window is 8k.

**Body:**

Peter Steinberger (the guy behind PSPDFKit, 190k GitHub stars, recently hired by OpenAI) put it bluntly: "mcp were a mistake. bash is better."

He's not wrong, and the numbers back it up. Mario Zechner benchmarked Playwright's MCP server at 13,700 tokens just for tool descriptions. A minimal CLI README that teaches an LLM the same capabilities? 225 tokens. That ratio matters a lot less when you're on GPT-4o with 128k context. It matters enormously when you're running a 7B or 13B model with an 8k window.

I built a CLI that pulls version-specific library docs from Context7's database and outputs plain text to stdout. Context7 already has an MCP server for Cursor, but MCP is completely useless for local LLM workflows. `ctx` just gives you the docs as text you can pipe wherever you want.

**Examples with Ollama:**

```bash
# Pipe Vue docs into deepseek-coder via Ollama
ctx vue "composition api" | ollama run deepseek-coder "explain the setup function"

# Svelte reactivity docs into codellama
ctx svelte "runes" | ollama run codellama "summarize these patterns"

# Just grab docs for your own pipeline
ctx drizzle "schema" --tokens 3000 >> context.txt
```

The `--tokens` flag is especially useful for local models. You can cap the output to fit your context window instead of dumping 50k tokens of docs into a model that can only handle 4k.

```bash
ctx vue "reactivity" | ollama run deepseek-coder "write an example"
ctx svelte "stores" | cat -n | less
ctx drizzle "relations" | pbcopy  # copy to clipboard
```

**Why this approach wins for local:**

- Zero token overhead from protocol definitions. Your entire context budget goes to actual documentation.
- Cap output with `--tokens` to match your model's window.
- Works with Ollama, llama.cpp, text-generation-webui, koboldcpp, anything that reads stdin.
- No server process eating your GPU's VRAM.

Zero dependencies, pure Node.js. No API key required for basic usage.

**Install:**

```bash
npx @theo/ctx-cli vue "composition api"   # Zero install, runs immediately
npm install -g @theo/ctx-cli               # Or install globally
```

- GitHub: https://github.com/TheophilusChinomona/ctx-cli
- npm: https://www.npmjs.com/package/@theo/ctx-cli

If you're running local models with tight context windows, the difference between 13.7k tokens of MCP overhead and 0 tokens of CLI overhead is the difference between fitting the docs in context or not.
