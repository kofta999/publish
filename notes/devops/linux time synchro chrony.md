2026-06-18 13:47
Tags: #linux #redhat 
##### Content
## NTP Architecture & Stratum Hierarchy

`chronyd` replaces older `ntpd` implementations for local Real-Time Clock (RTC) synchronization against remote stratum endpoints.

* **Stratum 0:** Reference hardware clocks (atomic, GPS, radio clocks). These are strictly hardware and not directly accessible over the network.
* **Stratum 1:** Servers physically attached directly to Stratum 0 devices.
* **Stratum 2-15:** Downstream network synchronization targets. A machine syncing from a Stratum 1 server operates as a Stratum 2 server.
* **Stratum 16:** Indicates an entirely unsynchronized device.

## Core Configuration Schema

The primary initialization and synchronization parameters are defined in `/etc/chrony.conf`.

| Directive | Execution Behavior |
| --- | --- |
| `pool 2.rhel.pool.ntp.org` | Instructs the daemon to resolve the DNS name and connect to multiple independent servers returned by the query. |
| `server 192.168.1.50` | Explicitly targets a single, specific NTP endpoint. |
| `iburst` | Appended to a `server` or `pool` directive. Triggers a rapid burst of 8 network packets (instead of 1) during initial synchronization to drastically accelerate time resolution. |
| `makestep 1.0 3` | Forces a hard system clock step if the drift exceeds `1.0` seconds, but **only** during the first `3` clock updates. Prevents catastrophic database/log corruption caused by sudden time jumps during normal system uptime. |
| `allow 192.168.1.0/24` | Opens port `123/UDP` to allow `chronyd` to act as an NTP server for the specified subnet. |

> **Technical Note:** If network I/O is severed, `chronyd` reads the rate of hardware drift previously recorded in the `/var/lib/chrony/drift` file. It then directly instructs the kernel to incrementally speed up or slow down the software clock frequency, seamlessly compensating for the hardware RTC's inherent physical oscillator drift without requiring active network polling.

## Operational Diagnostics (`chronyc`)

The `chronyc` command-line utility provides a direct interface to the running `chronyd` daemon to trace synchronization states and enforce immediate updates.

```bash
# Display system clock performance, current stratum level, and reference ID
chronyc tracking

# Output the current time sources, their polling states, and network delays
chronyc sources -v

# Force an immediate clock step, overriding the makestep configuration constraints
chronyc makestep
```

### Source Polling States

When executing `chronyc sources -v`, the first column identifies the algorithmic state of the connection:

| State Symbol | Definition                                                                     |
| ------------ | ------------------------------------------------------------------------------ |
| `^*`         | The current optimal source to which the system clock is actively synchronized. |
| `^+`         | A highly accurate source currently included in the combining algorithm.        |
| `^-`         | An acceptable source that is currently excluded by the combining algorithm.    |
| `^?`         | The source is unreachable or its time measurements have been rejected.         |

## Lightweight Alternative (`systemd-timesyncd`)

`systemd` natively provisions a minimalist SNTP (Simple Network Time Protocol) client for nodes not requiring the heavy complexity or server capabilities of `chronyd`.

* **Execution Constraints:** It operates **strictly** as a client. It cannot serve time to downstream machines, nor does it support complex combining algorithms across multiple upstream servers.
* **Configuration Target:** Managed via `/etc/systemd/timesyncd.conf`.
* **State Verification:** Current synchronization status is read via the `timedatectl status` native binary.

##### References
