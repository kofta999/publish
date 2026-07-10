2026-05-31 13:47
Tags: #linux #redhat
##### Content

### Configuration Defaults

* `/etc/login.defs`: Controls default attributes for new user creation (UID/GID ranges, mailbox directories, etc.).
* `/etc/pwquality.conf`: Enforces password complexity and dictionary-check policies.

### Privilege Escalation & User Switching

| Command                 | Environment Behavior                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| `su`                    | Non-login shell. Partially retains original user's environment variables.   |
| `su -`                  | Login shell. Initializes a clean, isolated environment for the target user. |
| `sudo su`               | Mixes the `root` environment with the executing user's environment.         |
| `sudo -i` / `sudo su -` | Spawns a fresh shell as `root`. Recommended for strict security auditing.   |

### Sudo Configuration (`/etc/sudoers`)

Syntax breakdown: `%wheel ALL=(ALL:ALL) ALL`

1. `%wheel`: The target group (indicated by `%`).
2. `ALL=`: Applies on any host sharing this configuration.
3. `(ALL:ALL)`: Can run commands as any user and any group.
4. `ALL`: Can execute any command.

* **Passwordless execution:** `ec2-user ALL=(ALL) NOPASSWD: ALL`

### Account Control & Lifecycle

* **Locking:** `usermod -L <user>`. Invalidates the password string, but **does not disable SSH key-based logins**.
* **Expiring:** `usermod -e YYYY-MM-DD <user>`. Disables the account entirely at the kernel level, blocking both password and SSH key access.
* **Safe Retirement:** Never use `userdel` without `-r` (delete owned files in `/home/<user>`) in a shared environment. If the UID is reassigned to a new employee, they will automatically inherit the old user's orphaned files. Lock/expire the account instead.

### Service Accounts

System daemons require user accounts but must not allow interactive human login.

* **`/sbin/nologin`**: Rejects interactive login but displays a refusal message (customizable via `/etc/nologin.txt`).
* **`/bin/false`**: Silently fails and immediately exits. Used for highly restrictive service accounts (like `mysql` or `apache`).

### Group Management

* **Primary Group:** Tracked in `/etc/passwd`. Determines the default group ownership of newly created files. Changed via `usermod -g` (Note: This does *not* automatically move the old primary group to the supplementary list).
* **Supplementary Groups:** Tracked in `/etc/group`. Users are added via `usermod -aG` or `groupmod -a -U`.
* **Runtime Shift:** The `newgrp` command changes the primary group for the current active shell session without logging out.


##### References
