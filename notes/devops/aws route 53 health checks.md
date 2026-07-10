2026-03-13 21:32
Tags: #cloud/aws/networking 
##### Content
Health checks are the "eyes" of Route 53, enabling automated DNS failover by monitoring the status of your resources. If a resource is flagged as unhealthy, Route 53 stops returning its record in DNS queries.

#### 1. Monitoring an Endpoint
This is the most common type of health check, where Route 53 actively "pings" your resource.
* **Mechanism:** Approximately 15 global health checkers probe your endpoint.
* **The 18% Rule:** An endpoint is considered **Healthy** if more than 18% of the health checkers report a success.
* **Thresholds & Intervals:**
* **Default Interval:** 30 seconds (10 seconds available for "Fast" health checks at a higher cost).
* **Healthy/Unhealthy Threshold:** Default is 3 consecutive checks.
* **Protocols:** Supports HTTP, HTTPS, and TCP.
* **Success Criteria:** Must return a **2xx or 3xx** status code.
* **Advanced Feature:** You can perform **String Matching** to search for specific text within the first 5120 bytes of the response.

> **Note:** Ensure your Security Groups/Firewalls allow incoming traffic from [Route 53 Health Checker IP ranges](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/route-53-ip-addresses.html#ip-addresses-route53-healthchecks).

#### 2. Calculated Health Checks
These allow you to combine multiple health checks into a single parent status.
* **Logic:** Supports **AND, OR, and NOT** operations.
* **Capacity:** Can monitor up to **256 child health checks**.
* **Use Case:** Useful for maintaining "Maintenance Mode." You can specify that a parent passes only if a certain number of children pass, allowing you to take specific servers offline for updates without triggering a full site failover.

#### 3. Monitoring Private Resources (CloudWatch Alarms)
Standard Route 53 health checkers live on the public internet and **cannot** reach inside a private VPC or an on-premises network.

* **The Workaround:**
1. Create a **CloudWatch Alarm** based on a metric (e.g., RDS CPU usage, a custom "heartbeat" metric, or DynamoDB throttles).
2. Create a Route 53 Health Check that monitors the **Alarm State**.
3. If the Alarm triggers (e.g., your private DB goes down), the health check fails, and Route 53 initiates failover.

#### Summary of Health Check Types

| Type           | Target              | Best For...                                    |
| -------------- | ------------------- | ---------------------------------------------- |
| **Endpoint**   | Public IP/Hostname  | Web servers, ALBs, public APIs.                |
| **Calculated** | Other Health Checks | Complex logic and maintenance windows.         |
| **CW Alarm**   | Metric/Threshold    | **Private resources**, DBs, and internal apps. |
##### References
