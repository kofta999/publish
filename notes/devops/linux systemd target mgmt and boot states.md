2026-06-19 16:38
Tags: #linux #redhat 
##### Content

## Core Targets

Targets are logical groupings of systemd units used to bring the system into a specific operational state (analogous to legacy SysV runlevels).

| Target              | Legacy Runlevel | Execution State                                                                                                       |
| ------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `poweroff.target`   | 0               | System halt.                                                                                                          |
| `rescue.target`     | 1               | Single-user mode. Mounts `/` as read-write, starts basic system logging, disables networking. Requires root password. |
| `emergency.target`  | N/A             | Failsafe shell. Mounts `/` strictly as read-only. Bypasses standard `sysinit.target`. Requires root password.         |
| `multi-user.target` | 3               | Full text-based, multi-user environment with networking.                                                              |
| `graphical.target`  | 5               | Multi-user environment coupled with a display manager (GUI).                                                          |

## Target Modification Utilities

```bash
# View target unit dependencies
systemctl list-dependencies graphical.target

# Transition runtime state (requires AllowIsolate=yes in the target unit config)
systemctl isolate multi-user.target

# Get / Set persistent default boot state
systemctl get-default
systemctl set-default multi-user.target
```

##### References
