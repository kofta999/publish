2026-06-18 12:55
Tags: #linux #redhat 
##### Content
## Environment Variable Scopes

Execution state and variable persistence depend on initialization commands, dictating whether variables traverse to child processes.

* **`set`:** Binds variables locally to the current shell. These are **not** inherited by child processes. Executing `set` without arguments dumps all local variables, functions, and environment variables into `stdout`.
* **`export`:** Promotes variables to a global state for the current shell and all subsequent child processes. Executing `export` alone lists only exported environment variables.

## Regular Expression Mechanics

Command line text-processing utilities utilize varying regex engines, fundamentally shifting how escape sequences are interpreted.

| Concept                | Basic Regular Expressions (BRE)                                                   | Extended Regular Expressions (ERE)                                               |
| ---------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Engine Support**     | `grep`, `sed`, `vim`                                                              | `grep -E`, `sed -E`, `less`                                                      |
| **Special Characters** | `&#124;`, `+`, `?`, `()`, `{}` have special meaning **only if** prefixed with `\` | `&#124;`, `+`, `?`, `()`, `{}` have special meaning **unless** prefixed with `\` |
| **Command Flags**      | Default execution                                                                 | Requires `-E` flag                                                               |

```bash
# Basic regex (requires escaping the pipe and parentheses)
grep '\(foo\|bar\)' /var/log/messages

# Extended regex (no escaping required for special operators)
grep -E '(foo|bar)' /var/log/messages

```

##### References