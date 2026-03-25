2025-02-16 13:11
Tags: #cloud/aws/storage 
##### Content
S3 offers a range of storage classes tailored for different use cases, balancing access frequency, performance, and cost.

#### 1. General Purpose & High Performance
* **S3 Standard:**
	* The default for frequently accessed data.
    * High throughput and low latency.
    * **Resilience:** Sustains the loss of 2 concurrent facilities.
* **S3 Express One Zone:**
	* **Performance:** 10x faster than Standard; single-digit millisecond latency.
    * **Design:** Uses **Directory Buckets** in a single AZ to co-locate storage with compute (AI/ML training, HPC).
    * **Scale:** Handles hundreds of thousands of requests per second.

#### 2. Infrequent Access (IA)
Designed for data accessed less often but requiring immediate availability when requested.

* **S3 Standard-IA:**
	* Lower storage cost than Standard but includes a retrieval fee.
    * **Use Case:** Disaster recovery and long-term backups.
* **S3 One Zone-IA:**
	* Data is stored in a **single AZ**. 
    * **Risk:** If the AZ is destroyed, data is lost.
    * **Use Case:** Storing secondary backup copies or data that can be easily recreated.

#### 3. Archive (S3 Glacier)
The lowest-cost tiers for long-term data retention and "cold" backups.

* **S3 Glacier Instant Retrieval:** Millisecond access for data needed once a quarter.
* **S3 Glacier Flexible Retrieval:**
	* **Expedited:** 1–5 minutes.
    * **Standard:** 3–5 hours.
    * **Bulk:** 5–12 hours (Free).
* **S3 Glacier Deep Archive:**
	* The cheapest storage in AWS.
    * **Retrieval:** 12 to 48 hours.
    * **Retention:** Minimum 180 days.

#### 4. Automatic Optimization: S3 Intelligent-Tiering
If you have unpredictable access patterns, Intelligent-Tiering automatically moves your data between tiers to save costs without operational overhead.
* **How it works:** Moves objects between "Frequent," "Infrequent," and "Instant Archive" tiers based on the last access time.
* **Benefit:** **No retrieval fees.**
* **Cost:** A small monthly monitoring/automation fee per object.

#### Storage Class Comparison Table

| Storage Class        | Durability | Availability | AZs | Min Duration |
| -------------------- | ---------- | ------------ | --- | ------------ |
| **Standard**         | 11 9s      | 99.99%       | 3+  | None         |
| **Express One Zone** | 11 9s      | 99.95%       | 1   | None         |
| **Standard-IA**      | 11 9s      | 99.9%        | 3+  | 30 days      |
| **One Zone-IA**      | 11 9s      | 99.5%        | 1   | 30 days      |
| **Glacier Instant**  | 11 9s      | 99.9%        | 3+  | 90 days      |
| **Deep Archive**     | 11 9s      | 99.9%        | 3+  | 180 days     |

![[Pasted image 20250216131719.png]]

##### References
https://youtu.be/EqqtzKqewaA