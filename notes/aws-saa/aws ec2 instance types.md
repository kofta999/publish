2025-02-08 13:39
Tags: #cloud/aws/compute
##### Content
#### Instance Types
Syntax: `m5.2xlarge`
- `m`: instance class
- `5`: generation (AWS improves them over time)
- `2xlarge`: size within the instance class

##### General Purpose:
- Great for diverse workloads, web servers / code repos
- Balances: Compute / Memory / Networking Resources
##### Compute Optimized:
- `c` family
- Ideal for compute-intensive tasks
- Suitable for: Batch processing, media transcoding, high performance computing, etc
##### Memory Optimized:
- `r` family
- Best performance for workloads processing large data sets in memory
- Suitable for: High performance DBs, cache stores, real time processing of big data, etc
##### Storage Optimized:
- `i` / `d` / `h1` families
- Ideal for storage-intensive tasks
- Suitable for: High-freq OLTP systems, DBs, Redis, data warehousing, DFS

##### References
