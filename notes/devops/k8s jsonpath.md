2026-04-19 19:09
Tags: #kubernetes 
##### Content
### Summary/Purpose
JSONPath is the query language used by Kubernetes to filter and format the massive JSON outputs returned by the API. While `kubectl` usually outputs YAML for humans, it processes everything as JSON internally. Mastering JSONPath allows you to create custom reports and extract specific metadata (like IP addresses or container images) without using external tools like `jq`.

---

### Core Syntax Reference

| Symbol      | Description                              | Example                                      |
| :---------- | :--------------------------------------- | :------------------------------------------- |
| `$`         | The root object/document.                | `$`                                          |
| `.` or `[]` | Child member operator.                   | `$.metadata.name` or `$['metadata']['name']` |
| `*`         | Wildcard (all elements).                 | `$.spec.containers[*].image`                 |
| `..`        | Deep scan (recursive descent).           | `$..image` (Finds all `image` keys anywhere) |
| `@`         | The current node being processed.        | Used inside filter expressions.              |
| `?()`       | Filter expression (applies a predicate). | `$.items[?(@.status.phase=="Running")]`      |

---

### Advanced Slicing & Filters
JSONPath follows a Python-like slicing syntax for arrays:
* **Slicing:** `[start:end:step]`. Example: `[0:5:2]` gets the 1st, 3rd, and 5th elements.
* **Negative Slicing:** `[-1:]` gets the last element. Note: `[-1]` (as a single index) is inconsistent in some older K8s versions; `[-1:]` is safer.
* **Logic Operators:** Use `&&` (AND), `||` (OR), and `!` (NOT).
* **In/NotIn:** `@.name in ["web", "db"]` or `@.type nin ["LoadBalancer"]`.

---

### The `range` Keyword (Kubernetes Specific)
In `kubectl`, the `range` keyword allows you to iterate over a list and format the output for each item. It behaves similarly to a `for` loop in programming.

**Syntax:** `{range .items[*]} ... {end}`

* **Example:** Print the name and status of every Pod on a new line.
  ```bash
  kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  ```
* **Explanation:**
    * `{range .items[*]}`: Start a loop over every item in the list.
    * `{"\t"}` and `{"\n"}`: Insert a tab and a newline (standard JSONPath doesn't handle these; `kubectl` requires the quotes).
    * `{end}`: Closes the loop.

---

### Missing Info: Formatting & Sorting

#### 1. Custom Columns
If JSONPath feels too verbose for a quick table, use `-o custom-columns`. This automatically handles headers and spacing.
```bash
# Syntax: HEADER:JSONPATH
kubectl get pods -o custom-columns=NAME:.metadata.name,IMAGE:.spec.containers[*].image
```

#### 2. Server-Side Sorting
You can ask the API server to sort the results before they even reach your terminal using `--sort-by`.
```bash
# Sort pods by their creation timestamp
kubectl get pods --sort-by=.metadata.creationTimestamp
```

#### 3. Handling "Missing" Keys
In K8s, some fields (like `externalIPs`) might not exist on all objects. If your JSONPath hits a missing key, `kubectl` may return an error or empty string. To see exactly what is available for your query, always start by looking at the raw JSON: `kubectl get pod <name> -o json`.

---

### Practical Example: Finding Host IPs
This command iterates through all nodes and prints the Internal IP:
```bash
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.addresses[?(@.type=="InternalIP")].address}{"\n"}{end}'
```

### Technical Note: OS Internals & The Parser
On the **OS Internals** level, when you run a `kubectl -o jsonpath` command, the filtering happens **locally** on your machine (the client-side). The `kubectl` binary (written in Go) uses the `client-go` library's JSONPath implementation. It downloads the entire JSON blob from the API server into memory and then applies your query string as a regular expression/pointer logic. For massive clusters, using `--sort-by` is more efficient because that specific operation happens on the server side (the [[k8s cluster components#1. kube-apiserver|kube-apiserver]]), reducing the amount of processing your local terminal has to do.

##### References
