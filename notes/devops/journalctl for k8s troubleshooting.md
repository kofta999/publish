2026-04-08 19:37
Tags: #linux #kubernetes 
##### Content

### Summary/Purpose
While `kubectl logs` is your primary tool for application-level debugging, **journalctl** is indispensable for investigating node-level failures. It allows you to query the **systemd journal**, which collects data from the kernel, initrd, and system services (like the `kubelet` or `containerd`). In Kubernetes, if the API server is down or a node is `NotReady`, journalctl is often your only way to see what the OS-level processes are doing.

### Core Logic/Mechanism
* **Binary Logging:** Unlike traditional syslog (text files in `/var/log`), systemd stores logs in a structured binary format. This allows for significantly faster searching and filtering by metadata (PID, service name, priority).
* **Persistence:** By default, logs may be stored in `/run/log/journal` (volatile, lost on reboot). On most modern distros, they are persisted in `/var/log/journal`.
* **Structured Metadata:** Every log entry is tagged with fields like `_SYSTEMD_UNIT`, `_PID`, and `_HOSTNAME`, which `journalctl` uses to filter without needing complex regex/grep.

### Key Parameters: Common Filters

| Command                           | Purpose                                                                    |
| :-------------------------------- | :------------------------------------------------------------------------- |
| `journalctl -u kubelet`           | View logs for a specific systemd unit (e.g., the kubelet).                 |
| `journalctl -xe`                  | Open the end of the journal with "catalog" explanations for errors.        |
| `journalctl -f`                   | Tail the logs in real-time (equivalent to `tail -f`).                      |
| `journalctl -k`                   | View only kernel-level messages (useful for OOM kills or hardware issues). |
| `journalctl -p err..emerg`        | Filter by priority (Error, Critical, Alert, Emergency).                    |
| `journalctl --since "1 hour ago"` | Filter by time relative to now.                                            |

### Usage Patterns: Kubernetes Debugging
* **Kubelet Crashlooping:** If the kubelet fails to start, use `journalctl -u kubelet -f`. Check for "invalid configuration" or "failed to run cbr0" (CNI issues).
* **Container Runtime Issues:** If pods won't start, check the runtime logs: `journalctl -u containerd` or `journalctl -u docker`.
* **OOM Killer Investigation:** If a process vanishes without a trace, the kernel likely killed it. Use `journalctl -k | grep -i oom`.
* **Boot Issues:** Use `journalctl -b -1` to see the logs from the *previous* boot if the node recently crashed and restarted.

### Example: Advanced Querying
```bash
# Combine filters for a specific time window and service
journalctl -u kubelet --since "2026-04-08 18:00:00" --until "2026-04-08 19:00:00"

# Show logs in JSON format for external parsing
journalctl -u containerd -o json | jq .

# Verify how much disk space the logs are taking
journalctl --disk-usage

# Clean up old logs to free up space
journalctl --vacuum-time=7d
```

### Technical Note: OS Internals & cgroups
The journal is deeply integrated with Linux **cgroups**. When a service runs, systemd assigns it a cgroup, and any process spawned within that cgroup has its `stdout` and `stderr` automatically captured by the journal. This is why you can see logs for complex services with many child processes just by filtering for the parent unit name. In Kubernetes, the kubelet uses this to ensure that even if a container runtime crashes, the logs leading up to the crash are preserved in the system journal.

##### References 