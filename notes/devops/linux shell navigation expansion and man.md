2026-05-31 13:40
Tags: #linux #redhat
##### Content
### Terminal Navigation Keystrokes

| Shortcut       | Action                                                      |
| -------------- | ----------------------------------------------------------- |
| **`Ctrl`+`A**` | Jump to the beginning of the command line.                  |
| **`Ctrl`+`E**` | Jump to the end of the command line.                        |
| **`Ctrl`+`U**` | Clear from the cursor to the beginning of the command line. |
| **`Ctrl`+`K**` | Clear from the cursor to the end of the command line.       |

### Manual Pages (`man`) Architecture

The Linux manual is divided into 9 specific sections. When querying `man`, you can specify the section (e.g., `man 5 passwd` vs `man 1 passwd`) to target specific documentation.

| Section | Content Type      | Description                                               |
| ------- | ----------------- | --------------------------------------------------------- |
| **1**   | User commands     | Executable binaries and shell programs.                   |
| **2**   | System calls      | Kernel routines invoked from user space.                  |
| **3**   | Library functions | Provided by program libraries (e.g., glibc).              |
| **4**   | Special files     | Device files typically found in `/dev`.                   |
| **5**   | File formats      | Configuration files and structures (e.g., `/etc/passwd`). |
| **6**   | Games             | Historical section for amusing programs/screensavers.     |
| **7**   | Conventions       | Protocols, file systems, and miscellaneous standards.     |
| **8**   | Sysadmin commands | Privileged maintenance tasks (usually requires `root`).   |
| **9**   | Kernel API        | Internal kernel calls.                                    |

### Brace Expansion

Brace expansion generates strings or sequences using comma-separated lists or the double-dot (`..`) syntax. Expansions occur before the command is executed by the shell.

* **Sequence:** `echo file{1..3}.txt` $\rightarrow$ `file1.txt file2.txt file3.txt`
* **List:** `echo {Sun,Mon}.log` $\rightarrow$ `Sun.log Mon.log`
* **Nested:** `echo file{a{1,2},b}.txt` $\rightarrow$ `filea1.txt filea2.txt fileb.txt`

##### References
