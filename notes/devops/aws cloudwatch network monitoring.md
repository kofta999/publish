2026-03-23 22:43
Tags: #cloud/aws/monitoring 
##### Content

### Network & Synthetic Monitoring
Beyond simple resource metrics, CloudWatch offers tools to monitor the "outside-in" experience.

#### 1. CloudWatch Synthetics (Canaries)
* **What it is:** Small, configurable scripts (Node.js or Python) that mimic user behavior.
* **Function:** They "ping" your endpoints or click through your website **24/7**.
* **Capabilities:** Captures screenshots, measures load times, and alerts you if a UI element disappears or an API returns a 404 **before** your real users notice.

#### 2. CloudWatch Network Monitor (Network Synthetic)
* **Purpose:** Specifically designed to monitor the health of network paths between **AWS** and your **on-premises** data centers.
* **Mechanism:** Uses ICMP or TCP "probes" across **Direct Connect** or **Site-to-Site VPN**.
* **Benefit:** Agentless. It helps you identify if high latency or packet loss is happening on the AWS side or within your company's private network.

##### References
