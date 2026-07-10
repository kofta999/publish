2026-03-14 14:36
Tags: #cloud/aws/databases 
##### Content
#### 1. RDS Read Replicas (Read Scalability)
Read Replicas allow you to offload read traffic from your primary database, improving performance for read-heavy applications.

**Technical Characteristics**
* **Quantity:** Up to **15** Read Replicas per primary DB.
* **Placement:** Can be within the same AZ, Cross-AZ, or **Cross-Region**.
* **Replication:** **Asynchronous (ASYNC)**. This means there is a slight "replication lag," and reads are **eventually consistent**.
* **Promotion:** You can promote a replica to become its own independent standalone DB if needed.
* **Access:** Replicas have their own DNS endpoints. You **must** update your application code/connection strings to point to the replica for read queries.

**Use Cases & Cost**
* **Reporting/Analytics:** Run heavy "SELECT" queries on a replica so the production app's write performance isn't affected.
* **Network Costs:**
	* **Same Region:** Data transfer for replication is **free** (even across AZs).
	* **Cross-Region:** You **pay** data transfer fees for replication.

#### 2. RDS Multi-AZ (Disaster Recovery)
Multi-AZ is a high-availability feature that creates a "Standby" replica in a different AZ to protect against infrastructure failure.

**Technical Characteristics**
* **Replication:** **Synchronous (SYNC)**. Every write to the master is simultaneously written to the standby before the transaction is confirmed.
* **Failover:** **Automatic**. If the primary fails (AZ outage, hardware failure), AWS automatically updates the DNS record to point to the Standby.
* **DNS:** You use **one single DNS name**. The application doesn't need to change connection strings during a failover.
* **Not for Scaling:** You **cannot** read from or write to the Standby instance. It is strictly for failover.

#### 3. Comparison Summary

| Feature             | Read Replicas                 | Multi-AZ                      |
| ------------------- | ----------------------------- | ----------------------------- |
| **Primary Purpose** | Horizontal Scaling (Reads)    | High Availability (DR)        |
| **Replication**     | Asynchronous                  | Synchronous                   |
| **Consistency**     | Eventually Consistent         | Strong Consistency            |
| **Endpoints**       | Unique DNS for each replica   | Single DNS for Master/Standby |
| **Failover**        | Manual (must promote replica) | **Automatic**                 |
| **Read Access**     | Yes                           | No                            |

#### 4. Transitioning: Single-AZ to Multi-AZ
You can switch an existing Single-AZ database to Multi-AZ with **zero downtime**.
1. **Modify:** Click "Modify" on the DB instance and select "Multi-AZ Deployment."
2. **Snapshot:** AWS automatically takes a snapshot of your primary DB.
3. **Restore:** A new standby DB is restored from that snapshot in a different AZ.
4. **Sync:** AWS establishes synchronous replication between the two.
##### References
