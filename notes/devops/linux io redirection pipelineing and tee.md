2026-05-31 13:43
Tags: #linux #redhat 
##### Content

### Stream Redirection Operators

Linux processes typically utilize three standard streams: `stdin` (0), `stdout` (1), and `stderr` (2).

* `1>` or `>`: Redirect Standard Output.
* `2>`: Redirect Standard Error.
* `&>`: Redirect both `stdout` and `stderr` (Bash-specific merging).
* `<`: Redirect Standard Input.

### Appending vs. Overwriting

| Syntax         | Behavior                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------- |
| `> FILE 2>&1`  | **Overwrite:** Redirects `stdout` to FILE, then points `stderr` to wherever `stdout` is pointing. |
| `&> FILE`      | **Overwrite:** Merged redirection (Bash 4+).                                                      |
| `>> FILE 2>&1` | **Append:** Redirects `stdout` and `stderr` to append to the same file.                           |
| `&>> FILE`     | **Append:** Merged redirection (Bash 4+).                                                         |

> **Technical Note on Order:** `> output.log 2>&1` correctly sends both streams to the file. Conversely, `2>&1 > output.log` points `stderr` to the terminal *first*, and *then* points `stdout` to the file, splitting the streams.

### Process Pipelining & `tee`

The pipe (`|`) redirects the `stdout` of one command into the `stdin` of the next. However, standard pipes cannot handle `stderr` without merging operators.

The `tee` command acts as a T-junction within a pipeline. It reads from `stdin` and writes the data simultaneously to `stdout` (for the next piped command or the terminal) and to one or more specified files.

* **Overwrite file while viewing:** `ls -l | tee /tmp/output.txt | less`
* **Append to file while viewing:** `ls -l | tee -a /tmp/output.txt | less`

##### References
