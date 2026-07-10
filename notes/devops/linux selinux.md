2026-06-18 13:52
Tags: #linux #redhat
##### Content

# Mandatory Access Control (SELinux)

## Architecture & Execution Modes

SELinux is an implementation of MAC (Mandatory Access Control) in the Linux kernel. It assigns labels (contexts) to every file, process, directory, and port, enforcing access control irrespective of standard UNIX DAC (Discretionary Access Control) permissions.

* **Configuration Target:** `/etc/selinux/config` (or `/etc/sysconfig/selinux` via symlink).
* **State Verification:** Execute `sestatus` to view the current mode, mount point, and loaded policy name.

**Execution Modes:**

* **Enforcing (`1`):** Active policy enforcement. Violations are blocked and logged. Swapped live via `setenforcing 1`.
* **Permissive (`0`):** Policies are evaluated but **not** enforced. Violations are allowed but logged to `/var/log/audit/audit.log`. Swapped live via `setenforcing 0`.
* **Disabled:** Kernel module is entirely unloaded. Requires editing the config file and a full system reboot to toggle.

**Policy Types:**

* **Targeted:** The RHEL default. Protects specific, confined daemons (like `httpd` or `sshd`) while leaving standard user space unconfined.
* **Minimum:** A stripped-down targeted policy applied only to selected processes.
* **MLS (Multi-Level Security):** Advanced, strict hierarchical protection used in highly cleared environments.

## Context Anatomy & Inheritance

View live contexts by appending the `-Z` flag to standard commands (e.g., `ls -Z`, `ps -Z`, `id -Z`).

Contexts are built on three primary pillars, though the **Type** is the most critical for targeted policies:

1. **User:** SELinux specific user identity (e.g., `unconfined_u`).
2. **Role:** RBAC gateway (e.g., `object_r`).
3. **Type:** The core identifier for the process domain or file target (e.g., `httpd_sys_content_t` or `admin_home_t`).

**File Operations & Context Shifts:**

* **Copying (`cp`):** Creates a new inode. The new file automatically inherits the SELinux context of the destination directory unless `--preserve=context` is invoked.
* **Moving (`mv`):** Retains the original inode (if on the same file system). The file keeps its original context, which often leads to `Access Denied` errors if moved into a strictly confined directory (like `/var/www/html`).

## Context Modification Binaries

* **`chcon`:** Volatile, immediate context assignment directly to the file system. It survives a reboot but is entirely wiped during an FS relabel or `restorecon` execution.
* **`semanage fcontext`:** Persistent context definition. Writes the desired state to the SELinux database (`/etc/selinux/targeted/contexts/files/file_contexts`) but does not apply it to the live files.
* **`restorecon`:** Reads the SELinux DB and forcefully applies the defined contexts to the live file system (`-R` for recursive, `-v` for verbose).

When defining policies in `semanage fcontext`, you will frequently see the `(/.*)?` regex pattern. Colloquially known as the "pirate" pattern (resembling a face with an eye patch and a hook), it recursively targets the declared directory and all nested child inodes to guarantee context inheritance down the tree.

```bash
# Add a persistent rule to the DB for a custom web directory
semanage fcontext -a -t httpd_sys_content_t '/custom/www(/.*)?'

# Apply the new rule to the live file system
restorecon -R -v /custom/www
```

## Port & Process Management

SELinux restricts confined services to strictly defined network ports. If you change a service's listening port (e.g., moving SSH from 22 to 2222), SELinux will block the daemon from binding to the socket.

```bash
# List all current port assignments
semanage port -l

# Add a custom port (8080) to the HTTP port type context
semanage port -a -t http_port_t -p tcp 8080
```

If a specific process needs to be excluded from enforcement without disabling SELinux globally, you can set that specific domain to permissive mode:

```bash
semanage permissive -a httpd_t
```

## Booleans

Booleans are runtime `if-then` toggles that adjust confined policy rules (e.g., allowing an FTP server to read home directories) without requiring custom module compilation.

| Command                 | Execution Behavior                                                       |
| ----------------------- | ------------------------------------------------------------------------ |
| `getsebool -a`          | Lists all booleans and their current state (on/off).                     |
| `semanage boolean -l`   | Lists all booleans with highly detailed descriptions of what they allow. |
| `setsebool <bool> 1`    | Toggles a boolean on temporarily (in memory).                            |
| `setsebool -P <bool> 1` | Toggles a boolean on persistently across reboots.                        |

## Troubleshooting & Diagnostics

When access is denied and standard Linux permissions (`rwx`) look correct, SELinux is the primary suspect.

* **Raw Logs:** `/var/log/audit/audit.log` (Contains raw `type=AVC` denial messages) and `/var/log/messages` (Contains forwarded `setroubleshoot` summaries).
* **`sealert`:** An analysis tool that parses the audit log and provides highly readable explanations and exact remediation commands to fix the denial.
```bash
sealert -a /var/log/audit/audit.log

```


* **Documentation:** By installing `selinux-policy-devel` and running `mandb`, RHEL generates dynamic man pages for every context label currently loaded on the system (e.g., `man httpd_selinux`), providing a massive reference for available booleans and file types for specific services.
##### References
