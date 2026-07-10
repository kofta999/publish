2026-06-18 12:58
Tags: #linux #redhat 
##### Content

## Deferred Execution (`at`)

The `at` suite handles one-off, deferred task execution.
* **`at`:** Creates a deferred task. Execution priority is defined by queues ranging from `a-z` and `A-Z`
* **`atq`:** Displays pending task execution queues.
* **`atrm`:** Purges a scheduled job from the queue via Job ID.

## Cron Implementation

Standard periodic task scheduling.

* **Main Configuration:** `/etc/crontab` (Do not edit directly; use as reference).
* **Drop-in Configuration:** `/etc/cron.d/*` (Recommended location for system packages to drop schedule definitions, utilizing unique string identifiers to avoid namespace collisions).
* **Script Repositories:** Executable shell scripts (not crontab syntax) placed in `/etc/cron.hourly`, `/etc/cron.daily`, `/etc/cron.weekly`, or `/etc/cron.monthly`.
* **Offline Catch-up:** `anacron` works alongside `crond.service` to execute jobs that were missed during system downtime.

## Systemd Timers

The modern replacement for `cron`, utilizing `.timer` units coupled directly to `.service` execution files.

```ini
# /etc/systemd/system/backup.timer
[Unit]
Description=Daily Backup Timer

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target

```

```ini
# /etc/systemd/system/backup.service
[Unit]
Description=Execute Backup Script

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh

```

> **Note:** Setting `Persistent=true` in a systemd `.timer` instructs `systemd` to store the last execution timestamp on disk. If the system was powered down during a scheduled window, the service executes immediately upon boot, entirely obsoleting `anacron`.

##### References
