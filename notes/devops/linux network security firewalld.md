2026-06-19 16:42
Tags: #linux #redhat 
##### Content

## Firewall Architecture

* **`nftables`:** The modern, high-performance kernel packet classification framework replacing legacy `iptables`.
* **`firewalld`:** The recommended front-end abstraction daemon managing `nftables` via dynamic zones and services.

## Firewalld Zones & Services

Zones define the trust level of incoming traffic based on network interfaces or source IPs. Services abstract raw port configurations into readable definitions.

| Predefined Zone | Trust Behavior                                                       |
| --------------- | -------------------------------------------------------------------- |
| `drop`          | Drops all incoming packets without any reply (ICMP error).           |
| `block`         | Rejects incoming packets with an ICMP `host-prohibited` message.     |
| `public`        | Default zone. Rejects everything except explicitly allowed services. |
| `trusted`       | Accepts all incoming network traffic blindly.                        |

| Common Service   | Underlying Port / Protocol |
| ---------------- | -------------------------- |
| `ssh`            | 22/tcp                     |
| `http` / `https` | 80/tcp, 443/tcp            |
| `nfs`            | 2049/tcp                   |

## Command Implementations

Modifications apply only to the live runtime environment unless `--permanent` is specified. If `--permanent` is used, the firewall must be reloaded to push the config to runtime.

```bash
# Display active zones and their bound interfaces/services
firewall-cmd --get-active-zones
firewall-cmd --list-all

# Add a service permanently and apply
firewall-cmd --permanent --add-service=http
firewall-cmd --reload

# Port forwarding (Rich Rule Example)
firewall-cmd --permanent --add-forward-port=port=8080:proto=tcp:toport=80
```


##### References
