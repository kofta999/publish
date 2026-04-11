2026-03-22 13:03
Tags: #cloud/aws/databases 
##### Content
DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability.
#### 1. Core Concepts & Item Structure
Unlike relational databases (RDS), DynamoDB is **schema-less** (except for the Primary Key).
* **Tables:** The top-level resource. 
* **Primary Key:** Must be defined at creation. It can be a **Partition Key** (Hash) or a combination of a **Partition Key + Sort Key** (Range).
* **Items:** Similar to rows. Each item can have different attributes.
* **Size Limit:** Maximum item size is **400 KB**. 
* **Data Types:** Supports Scalars (String, Number, Binary, Boolean), Documents (List, Map), and Sets.

#### 2. Read/Write Capacity Modes
Choosing the right mode is a common SAA exam decision point based on cost and predictability.

| Mode         | **Provisioned (Default)**                               | **On-Demand**                                 |
| :----------- | :------------------------------------------------------ | :-------------------------------------------- |
| **Scaling**  | You specify RCU/WCU. Can use Auto Scaling.              | Scales automatically with workload.           |
| **Planning** | Requires capacity planning.                             | No planning needed.                           |
| **Cost**     | Pay for provisioned capacity (cheaper for steady load). | Pay per request (expensive for high volume).  |
| **Use Case** | **Predictable traffic** or steady growth.               | **Unpredictable spikes** or new/unknown apps. |
#### 3. Table Classes
* **Standard:** Best for most workloads where throughput is the dominant cost.
* **Standard-Infrequent Access (Standard-IA):** Optimized for tables where **storage** is the dominant cost (e.g., logs or old social media posts). It has lower storage costs but higher read/write costs.
#### 4. Advanced Performance (DAX)
* **DynamoDB Accelerator (DAX):** A fully managed, highly available, **in-memory cache** for DynamoDB.
* **Benefit:** Reduces read latency from single-digit milliseconds to **microseconds**.
* **Use Case:** "Hot" keys (e.g., a viral product on an e-commerce site) where thousands of users read the same item simultaneously.

### SAA Exam "Scenario" Table

| If the requirement is...                                             | Use This Feature/Mode:                         |
| :------------------------------------------------------------------- | :--------------------------------------------- |
| "Handle a sudden, massive spike in traffic for a new app."           | **On-Demand Mode**                             |
| "Reduce costs for a stable application with known traffic patterns." | **Provisioned Mode + Auto Scaling**            |
| "Achieve microsecond latency for read-heavy workloads."              | **DynamoDB Accelerator (DAX)**                 |
| "Store years of historical data that is rarely accessed."            | **DynamoDB Standard-IA**                       |
| "Store a single record larger than 400KB."                           | **Store in S3** and save the link in DynamoDB. |

##### References
