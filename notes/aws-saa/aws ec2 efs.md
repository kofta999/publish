2025-02-08 16:16
Tags: #cloud/aws/compute #cloud/aws/storage 
##### Content
### 1. Elastic File System (EFS)
A managed Network File System (NFSv4.1) that provides scalable, shared storage for Linux-based workloads.

**Core Characteristics**
* **Protocol:** Uses **NFSv4.1**; compatible with Linux-based AMIs (not Windows).
* **Connectivity:** Can be mounted on **thousands** of concurrent EC2 instances across multiple Availability Zones (Multi-AZ).
* **Management:** POSIX-compliant file system that scales automatically. Pay-per-use with no capacity planning required.
* **Security:** Uses **Security Groups** to control network access and **KMS** for encryption at rest.
* **Use Cases:** Content management (WordPress), web serving, data sharing, and home directories.

### 2. EFS Performance & Throughput Modes
EFS allows you to choose how the file system handles latency and data transfer speeds.

**Performance Modes (Set at Creation)**
* **General Purpose (Default):** Best for latency-sensitive use cases like web servers, CMS, and development environments.
* **Max I/O:** Optimized for high throughput and massive parallelism (Big Data, media processing) at the cost of slightly higher latency.

**Throughput Modes**
* **Bursting:** Throughput scales with the size of the file system (1 TiB = 50 MiB/s baseline + bursts up to 100 MiB/s).
* **Provisioned:** You specify a fixed throughput (e.g., 1 GiB/s) regardless of how much data is stored.
* **Elastic:** **(Recommended for unpredictable workloads)** Automatically scales throughput up to 3 GiB/s for reads and 1 GiB/s for writes based on actual demand.


### 3. EFS Storage Classes & Lifecycle Management
EFS uses Lifecycle Policies to automatically move files between tiers to optimize costs.

**Storage Tiers**
* **Standard:** For frequently accessed files.
* **Infrequent Access (EFS-IA):** Optimized for files not accessed daily. Offers up to 92% lower storage cost but charges a fee per GiB to retrieve data.
* **Archive:** For data accessed only a few times per year. 50% cheaper than IA.

**Availability & Durability Options**
* **Standard:** Replicated across **Multiple AZs**. Best for production and high availability.
* **One Zone:** Stored in a **Single AZ**. Over 90% cheaper than Standard; ideal for development, staging, or caches. Backup is enabled by default to mitigate the risk of AZ failure.
##### References
