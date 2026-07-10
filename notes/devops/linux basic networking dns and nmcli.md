2026-05-31 14:12
Tags: #linux #redhat 
##### Content

### Predictable Network Naming

Modern Linux utilizes firmware and PCI topology to generate consistent network interface names that survive reboots, abandoning the old `eth0`/`eth1` detection-order naming convention.

* **Prefixes:** `en` (Ethernet), `wl` (WLAN), `ww` (WWAN).
* **Topology Indicators:** `oN` (Onboard), `sN` (PCI hotplug slot), `pMsN` (PCI bus M, slot N), `fN` (Multifunction card index). Example: `enp2s3`.

### NetworkManager CLI (`nmcli`)

* **Storage:** Connection profiles are saved persistently in `/etc/NetworkManager/system-connections`.
* **List Modification:** When modifying arrays (like DNS servers), use `+` or `-` (e.g., `+ipv4.dns 8.8.8.8`). If you omit the symbol, the specified value completely overwrites the existing list.
* **Reloading:** If configuration files are edited directly via `vim`, `nmcli con reload` must be executed to load changes into memory.

### DNS Resolution Mechanics

* `/etc/nsswitch.conf`: The Name Service Switch dictates the order of resolution (usually prioritizing local `/etc/hosts` before querying remote DNS).
* `/etc/resolv.conf`: Stores the IP addresses of the querying nameservers.
* *Warning:* NetworkManager automatically overwrites this file upon DHCP lease renewal. To prevent this, set `ignore-auto-dns yes` via `nmcli`.


* **Diagnostic Tools:**
	* `host` and `dig`: Query remote DNS servers directly, actively bypassing local `/etc/hosts` entries.
	* `getent hosts`: Uses the OS's native resolution stack, respecting the order defined in `nsswitch.conf`.
* **Socket States:** Use `netstat`, `ss`, and `route` to inspect active listening ports and routing tables.

##### References
