# awesome-mcp-servers PR Draft

---

## PR Title

Add ctx — Context7 CLI for piping library docs to terminal/LLMs

## PR Body

### Description

Adding [ctx](https://github.com/TheophilusChinomona/ctx-cli) — a CLI that pulls documentation from Context7's database and outputs it as plain text to stdout.

While Context7's MCP server works inside AI editors, ctx makes the same docs available in the terminal for piping into any LLM, script, or Unix tool.

```bash
ctx react hooks | claude "summarize"
ctx express middleware | ollama run codellama "explain"
ctx nextjs "app router" | grep "layout"
```

- Zero dependencies
- Works without API key
- npm: [@theo/ctx-cli](https://www.npmjs.com/package/@theo/ctx-cli)

### Category

This is a CLI companion to the Context7 MCP server, providing terminal access to the same documentation database. Suggested section: **Developer Tools** or **Documentation** (depending on repo structure).

## Line to Add

```markdown
- [ctx](https://github.com/TheophilusChinomona/ctx-cli) - CLI for Context7 docs — pipe up-to-date library documentation into any LLM or terminal tool. Zero dependencies.
```

## Submission Notes

- The awesome-mcp-servers repo is at `punkpeye/awesome-mcp-servers` on GitHub
- The official `upstash/context7` MCP server is already listed under Knowledge & Memory
- **Auto-PR was skipped** — this repo specifically lists MCP servers, and ctx is a CLI companion, not an MCP server. The PR might be rejected as off-topic. Consider submitting manually with a note explaining it's a CLI frontend for the same Context7 data, or find an "awesome-cli-tools" or "awesome-ai-tools" list instead.
- Alternative repos to submit to:
  - `agarrharr/awesome-cli-apps`
  - `rothgar/awesome-tuis` (if relevant)
  - `f/awesome-chatgpt-prompts` (as a tool mention)
  - `korben4ik/awesome-ai-tools`
