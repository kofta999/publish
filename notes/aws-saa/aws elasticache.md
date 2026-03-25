2026-03-14 15:26
Tags: #cloud/aws/databases 
##### Content
Amazon ElastiCache is a managed in-memory data store service, used primarily as a cache to improve application performance (sub-millisecond latency) or as a fast state provider.

> **Note:** Implementing ElastiCache typically requires **heavy application code changes**, as the app must be logic-aware of when to hit the cache vs. the database.
#### 1. Common Architectures
* **DB Cache:** The application first checks ElastiCache. If the data is missing (**Cache Miss**), it queries the database (RDS) and stores the result in ElastiCache for future requests. This significantly reduces the read load on your primary database.
* **User Session Store:** Instead of using Sticky Sessions on a Load Balancer, the application stores session data (e.g., login state, shopping cart) in ElastiCache. This allows your application to be **stateless**, as any web server can retrieve the session from the central cache.

![[Pasted image 20260314152720.png|346]]
![[Pasted image 20260314152738.png|346]]

---

#### 2. Redis vs. Memcached
Choosing the right engine depends on your requirements for data persistence and complexity.

| Feature          | **Redis**                                | **Memcached**               |
| ---------------- | ---------------------------------------- | --------------------------- |
| **Availability** | **Multi-AZ with Auto-Failover**          | No High Availability (HA)   |
| **Replication**  | Supports Read Replicas                   | None (Sharding only)        |
| **Persistence**  | **Yes** (AOF and Snapshots)              | No (Volatile)               |
| **Data Types**   | Complex (Sets, Sorted Sets, Lists, etc.) | Simple (Key-Value only)     |
| **Backups**      | Backup and Restore supported             | Only for Serverless version |
| **Architecture** | Single-threaded (mostly)                 | **Multi-threaded**          |
![[Pasted image 20260314152806.png]]


#### 3. Redis Use Case: Gaming Leaderboards
Redis **Sorted Sets** are perfect for leaderboards because they provide:
1. **Uniqueness:** Each player appears only once.
2. **Ordering:** Elements are automatically ranked in real-time as scores are updated.
3. **Efficiency:** Computationally complex ranking is handled by Redis in-memory rather than by slow SQL queries.

![[Pasted image 20260314152936.png]]

#### 4. Security
* **Network:** Managed via **Security Groups** (Inbound rules for port 6379 for Redis or 11211 for Memcached).
* **Authentication:** 
	* **Redis:** Supports **Redis AUTH** (password/token) and **IAM Authentication**.
	* **Memcached:** Supports SASL-based authentication.
* **Encryption:** Supports **SSL/TLS** for data in-flight and KMS for data at-rest.
##### References
