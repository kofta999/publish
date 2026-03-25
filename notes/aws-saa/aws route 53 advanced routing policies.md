2026-03-13 21:27
Tags: #cloud/aws/networking 
##### Content
These policies allow for complex traffic steering based on health, location, or specific network segments.

#### 1. Failover Routing
Used for **Active-Passive** failover configurations.
* **Primary Record:** Route 53 directs all traffic here as long as the resource is healthy.
* **Secondary Record:** Traffic is only diverted here if the primary health check fails (Disaster Recovery).
* **Requirement:** Must be associated with Health Checks.

#### 2. Geolocation Routing
Routes traffic based on the **geographic location** of your users.
* **Granularity:** You can specify by Continent, Country, or US State.
* **Specificity:** If a user matches multiple records (e.g., California and USA), Route 53 picks the most specific one.
* **Default Record:** Highly recommended to handle users from locations you haven't explicitly defined.
* **Use Cases:** Content localization (different languages), legal restrictions, or licensing compliance.

#### 3. Geoproximity Routing

Routes traffic based on the physical distance between users and resources, with the ability to "bend" the rules using **Bias**.
* **Bias:**
	* **Expand (1 to 99):** Increases the geographic reach of a resource (stealing more traffic).
	* **Shrink (-1 to -99):** Decreases the geographic reach (sending less traffic).
* **Flexibility:** Works for AWS Regions and non-AWS resources (via Latitude/Longitude).
* **Prerequisite:** Requires **Route 53 Traffic Flow**.

#### 4. IP-based Routing
Routes traffic based on the specific **CIDR blocks** of your clients.
* **Mechanism:** You provide a mapping of client IP ranges to endpoints.
* **Use Case:** Optimizing paths for specific ISPs or corporate office branches to reduce network costs or latency.

#### 5. Multi-Value Answer Routing
Returns multiple healthy resources in response to a single DNS query.
* **Mechanism:** Route 53 checks the health of up to 8 records and returns the healthy ones to the client.
* **Client Behavior:** The client receives a list and picks one to connect to.
* **Vs. ELB:** This is **not** a substitute for an Elastic Load Balancer; it is a DNS-level mechanism to improve availability and basic load sharing.

#### Summary Comparison

| Policy           | Logic               | Primary Driver           |
| ---------------- | ------------------- | ------------------------ |
| **Failover**     | Health Status       | Disaster Recovery        |
| **Geolocation**  | User's Region/State | Localization/Compliance  |
| **Geoproximity** | Physical Distance   | Traffic Shifting (Bias)  |
| **IP-based**     | Client IP/CIDR      | Network Optimization     |
| **Multi-Value**  | Health + Randomness | Simple High Availability |
##### References
