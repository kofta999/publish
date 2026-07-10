2026-05-16 15:37
Tags: #o11y
##### Content
Prometheus is an open-source, **pull-based** monitoring and alerting toolkit designed for microservices and cloud-native infrastructure. Unlike push-based systems (like InfluxDB or Graphite), Prometheus actively polls ("scrapes") targets for metrics.

---
### 1. Architectural Components

* **Time Series Database (TSDB):** The storage engine. It can run on the same node or utilize remote storage endpoints for long-term retention.
	* *Storage Mechanism:* It saves data in fixed-size blocks (typically 2-hour windows) containing raw samples, metadata, and index files. It relies on **Gorilla compression** to reduce floating-point metric sizes by up to 13x, optimizing disk I/O.

* **Retrieval Engine:** The component responsible for pulling metrics via HTTP/HTTPS. It discovers what to scrape using **Service Discovery** or static configurations.

* **Pushgateway:** A buffer for short-lived, ephemeral jobs (e.g., cron jobs). Since these jobs exit before Prometheus can scrape them, they *push* metrics to the Pushgateway, which Prometheus then pulls from normally.

* **HTTP Server & Web UI:** Exposes an API on port `9090` for queries, dashboard integration (Grafana), and native web UI access.

* **Alertmanager:** Handles alerts sent by Prometheus expression rules. It manages deduplication, grouping, silencing, and routing alerts to external systems (Slack, PagerDuty, Webhooks).

---

### 2. Core Metric Types

| Type          | Characteristics                                                                                                                        | Use Case                                                        | PromQL Rule                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- |
| **Counter**   | **Monotonically increasing** values (only goes up or resets to 0 on reboot).                                                           | Total requests, system uptime, exceptions thrown.               | Always wrap in `rate()` or `increase()`.                   |
| **Gauge**     | Values that can go up or down arbitrarily. A numerical snapshot.                                                                       | CPU usage, memory footprint, thread pool count.                 | Safe to use raw or with `avg_over_time()`.                 |
| **Histogram** | Counts samples into configurable, **cumulative boundaries (buckets)**. Tracks a total sum and count.                                   | Client-side or API response latency, payload sizes.             | Use `histogram_quantile()` to calculate percentiles.       |
| **Summary**   | Similar to Histogram, but calculates **configurable quantiles** (e.g., p95, p99) over a sliding time window *on the application side*. | Server-side request latencies where bucket configs are unknown. | Cannot be aggregated across multiple instances via PromQL. |

---

### 3. Configuration Management (`prometheus.yml`)

Located at `/etc/prometheus/prometheus.yml`, this file controls global defaults, alerting rules, and scrape configurations.

```yaml
global:
  scrape_interval: 15s     # Default rate for all jobs
  evaluation_interval: 15s # Rate at which alerting rules are calculated

rule_files:
  - "alert.rules.yml"      # Path to alerting logic

scrape_configs:
  - job_name: "prometheus" # Native self-monitoring
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "node-servers"
    scrape_interval: 5s    # Override global config for high-resolution metrics
    static_configs:
      - targets: ["10.0.0.5:9100", "10.0.0.6:9100"]

```

---

### 4. Service Discovery (SD)

In dynamic, automated environments (like Kubernetes or Cloud platforms), static IPs change too fast for manual entry. Service Discovery automates target lists dynamically.

* **Kubernetes SD (`kubernetes_sd_config`):** Scrapes endpoints, pods, nodes, or services automatically by talking to the `kube-apiserver`.
* **Cloud SD (`aws_ec2_sd_config`, `gce_sd_config`):** Queries cloud APIs to discover VMs using specific resource tags or security groups.
* **File SD (`file_sd_config`):** Relies on an external automation script (Ansible, custom daemon) to write JSON or YAML target lists to a watched file. Prometheus dynamically reloads targets without process restarts.

---

### 5. PromQL Foundation

#### Matcher Types

Selectors filter time series using label values:

* `=`: Exactly equal (e.g., `method="GET"`).
* `!=`: Not equal.
* `=~`: Regex match (e.g., `handler=~"/api/v1/.*"`).
* `!~`: Regex negative match.

#### Vector Types

##### Instant Vectors

A collection of time series containing a **single sample** for each time series, all at the exact same timestamp.

* *Example:* `http_requests_total{status="200"}`
* *Output:* Graphing engines use instant vectors to plot single points over time coordinates.

##### Range Vectors

A collection of time series containing a **buffer of samples** going back over a specified time duration. Syntax uses `[duration]` where duration values include `s` (seconds), `m` (minutes), `h` (hours), or `d` (days).

* *Example:* `node_cpu_seconds_total[5m]`
* *Output:* Returns a matrix of data points captured over the last 5 minutes. You cannot plot raw range vectors directly; they must be wrapped in functions like `rate()`, `irate()`, or `increase()`.

---

### OS & Memory Internals: TSDB Page Cache

On the **OS level**, Prometheus relies heavily on the Linux **Page Cache** rather than managing an extensive internal memory cache for old blocks.

* **Memory-Mapped Files (`mmap`):** Prometheus maps the most recent chunks of data directly into the application space using memory-mapped files. The OS kernel decides when to flush this data to physical disk storage or page out idle blocks.
* **Head Block:** The current active 2-hour block is kept entirely in memory. To prevent data loss from a sudden system crash or kernel panic, writes are concurrently appended to a **Write-Ahead Log (WAL)** on the underlying storage drive. Upon restart, Prometheus replays the WAL to restore the memory state before continuing its pull cycle.

##### References
