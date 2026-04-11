2026-03-13 19:15
Tags: #cloud/aws/networking 
##### Content
### Route 53 Routing Policies
Routing policies determine how Route 53 responds to DNS queries. It is crucial to remember that **DNS does not route actual traffic**; it simply tells the client which IP address or hostname to connect to.

#### 1. Simple Routing
The most basic policy, typically used to map a domain to a single resource.
* **Behavior:** Returns a single value (IP or Alias) or a list of multiple values.
* **Client Handling:** If multiple values are returned, the client picks one at random.
* **Limitations:**
	* No health checks associated.
	* If using an **Alias**, you can only point to one AWS resource per record.

#### 2. Weighted Routing
Allows you to split traffic between multiple resources based on assigned weights.
* **The Math:** The probability of a record being returned is:
$$\text{Traffic (\%)} = \frac{\text{Weight for a specific record}}{\sum\text{Weights of all records in the group}}$$
* **Key Specs:**
	* Weights can be any value from 0 to 255.
	* If all records have a weight of 0, traffic is distributed equally.

* **Use Cases:**
	* **Canary Releases:** Send 5% of traffic to a new app version to test stability.
	* **Blue/Green Deployment:** Gradually shift traffic from an old stack to a new one.
	* **Regional Balancing:** Split traffic between two AWS regions.

#### 3. Latency-based Routing
Routes users to the AWS Region that provides the lowest network latency (fastest response time).
* **Mechanism:** Route 53 maintains a database of latency measurements between users and AWS Regions.
* **Important Note:** This is based on **latency**, not necessarily distance. A user in Germany might be routed to a US region if that specific network path is currently faster than the path to Ireland.
* **Failover:** Can be paired with Health Checks. If the "fastest" region is unhealthy, Route 53 will return the next best latency-optimized record.

#### 4. Summary Table

| Policy       | Primary Use Case                                     | Health Checks? |
| ------------ | ---------------------------------------------------- | -------------- |
| **Simple**   | Standard 1-to-1 mapping.                             | No             |
| **Weighted** | Canary releases, load balancing, or version testing. | Yes            |
| **Latency**  | Speed/Performance for global users.                  | Yes            |


##### References
