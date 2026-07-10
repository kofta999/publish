2026-05-31 13:56
Tags: #linux #redhat 
##### Content

### Kernel Process States

| Flag | State                      | Description                                                      |
| ---- | -------------------------- | ---------------------------------------------------------------- |
| `R`  | Running                    | Executing on CPU or queued in the run-queue.                     |
| `S`  | Sleeping (Interruptible)   | Waiting on an event, hardware, or signal.                        |
| `D`  | Sleeping (Uninterruptible) | Ignoring signals; usually waiting on critical disk I/O.          |
| `K`  | Killable                   | Similar to `D`, but responds to fatal termination signals.       |
| `I`  | Idle                       | Kernel threads. Excluded from system load average calculations.  |
| `T`  | Stopped/Traced             | Suspended by a user signal (`SIGSTOP`/`SIGTSTP`) or a debugger.  |
| `Z`  | Zombie                     | Terminated process whose parent hasn't read its exit status yet. |
| `X`  | Dead                       | Fully released from the kernel process table.                    |

### Process Identification (`ps`)

```
  PPID     PID    PGID     SID TTY        TPGID STAT   UID   TIME COMMAND
  7072    7238    7238    7238 tty1        7238 Ssl+  1000   0:00 hyprland
  7566    8609    7238    7238 tty1        7238 Sl+   1000   5:27 noctalia-shell
```

* **PPID:** Parent Process ID (the process that invoked the `fork()` syscall).
* **PGID:** Process Group ID (leader of a pipeline of commands).
* **SID:** Session ID (usually the interactive shell managing the jobs).
* **TTY `?`**: Indicates a system daemon that has detached from any controlling terminal and cannot be brought to the foreground.

### Job Control

Jobs are process groups managed by a single shell session.

* `jobs`: Lists active/suspended jobs in the current shell.
* **Ctrl+Z**: Sends `SIGTSTP`, suspending the foreground process and pushing it to the background.
* `bg %1`: Instructs the kernel to resume job 1 execution in the background.
* `fg %1`: Brings job 1 to the foreground and attaches it to the terminal's `stdout`/`stdin`.

### System Signals

| ID  | Name      | Action                                                                                           |
| --- | --------- | ------------------------------------------------------------------------------------------------ |
| 1   | `SIGHUP`  | Terminal hangup. Often used to instruct daemons to cleanly reload config files.                  |
| 2   | `SIGINT`  | Keyboard interrupt (Ctrl+C).                                                                     |
| 3   | `SIGQUIT` | Keyboard quit (Ctrl+\\). Similar to SIGINT, but forces a core dump at termination for debugging. |
| 9   | `SIGKILL` | Absolute, unblockable kernel termination.                                                        |
| 15  | `SIGTERM` | Default termination. Allows the program to run cleanup routines.                                 |
| 18  | `SIGCONT` | Resumes a stopped process.                                                                       |
| 19  | `SIGSTOP` | Unblockable suspend.                                                                             |
| 20  | `SIGTSTP` | Keyboard suspend (Ctrl+Z). Blockable/handleable by the process.                                  |

### Targeted Termination
 
 Use `w -u` to find active TTY/PTS sessions, then use `pkill -t ttyN` to terminate all processes attached to that specific terminal session.

##### References
