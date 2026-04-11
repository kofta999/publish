2026-03-10 16:46
Tags: #cloud/aws/compute #cloud/aws/storage 
##### Content

Elastic Block Store (EBS) volumes are categorized by their underlying storage media (SSD vs. HDD) and their performance characteristics (IOPS vs. Throughput).
#### 1. General Purpose SSD (gp2 / gp3)
A balanced storage option for a wide variety of transactional workloads. These are the default choice for most applications.

**Common Features:**
* **Use Cases:** System boot volumes, virtual desktops, development and test environments.
* **Size:** 1 GiB to 16 TiB.
* **Max IOPS:** 16,000.

**gp3 (Next Generation):**
* **Baseline:** 3,000 IOPS and 125 MiB/s throughput included with the price.
* **Decoupled Scaling:** You can increase IOPS (up to 16,000) and Throughput (up to 1,000 MiB/s) **independently** from the storage size.
* **Value:** Generally 20% cheaper per GiB than gp2.

**gp2 (Older Generation):**
* **Coupled Scaling:** Performance is linked to size. You get **3 IOPS per GiB**.
* **Max Performance:** To hit the 16,000 IOPS cap, you need a volume size of at least 5,334 GiB.
* **Bursting:** Small volumes can "burst" to 3,000 IOPS using a credit system.

---
#### 2. Provisioned IOPS SSD (io1 / io2 Block Express)
Highest-performance SSD volumes designed for mission-critical, low-latency, or high-throughput workloads, especially large databases.

**io2 Block Express:**
* **Performance:** Sub-millisecond latency and the highest reliability.
* **Size:** 4 GiB to 64 TiB.
* **Max IOPS:** 256,000 (with a 1,000:1 IOPS-to-GiB ratio).
* **Multi-Attach:** Supports **EBS Multi-Attach**, allowing a single volume to be attached to multiple Nitro-based instances simultaneously. *(max 16 instances at a time, same AZ only, use fs that's cluster-aware)*

**io1:**
* **Size:** 4 GiB to 16 TiB.
* **Max IOPS:** 64,000 for Nitro instances (32,000 for others).
* **Scaling:** IOPS can be increased independently of storage size.

---
#### 3. Hard Disk Drives (st1 / sc1)
Magnetic storage optimized for throughput rather than IOPS. These **cannot** be used as boot volumes.

**Common Features:**
* **Size:** 125 GiB to 16 TiB.
* **Metric:** Characterized primarily by **Throughput** (MiB/s) rather than IOPS.

**Throughput Optimized HDD (st1):**
* **Use Cases:** Big Data, Data Warehousing, Log Processing, and MapReduce.
* **Max Throughput:** 500 MiB/s.
* **Max IOPS:** 500.

**Cold HDD (sc1):**
* **Use Cases:** Infrequently accessed data where the absolute lowest cost is the priority.
* **Max Throughput:** 250 MiB/s.
* **Max IOPS:** 250.

---

#### Summary Comparison Table

| Volume Type | Max IOPS | Max Throughput | Bootable? | Key Attribute                     |
| ----------- | -------- | -------------- | --------- | --------------------------------- |
| **gp3**     | 16,000   | 1,000 MiB/s    | **Yes**   | Performance scales independently. |
| **gp2**     | 16,000   | 250 MiB/s      | **Yes**   | Performance scales with size.     |
| **io2 BX**  | 256,000  | 4,000 MiB/s    | **Yes**   | Sub-ms latency / Multi-attach.    |
| **st1**     | 500      | 500 MiB/s      | No        | Low-cost throughput (Big Data).   |
| **sc1**     | 250      | 250 MiB/s      | No        | Lowest cost (Archive).            |

##### References
