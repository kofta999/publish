2025-02-08 13:39
Tags: #cloud/aws
##### Content
#### EC2 Configuration
- OS: Linux, Windows, macOS
- CPU: Capacity, # of cores
- RAM: Amount
- Storage Space:
	- Network-attached: Elastic Block Store (EBS) and Elastic File System (EFS)
	- Hardware: Storage options provided by EC2 instance store
 - Network Card: Speed and Public IP address
 - Firewall Rules: Security rules for inbound / outbound traffic
 - Bootstrap Script: Scripts during the **initial setup** of the instance


#### Instance Types
Syntax: `m5.2xlarge`
- m: instance class
- 5: generation (AWS improves them over time)
- 2xlarge: size within the instance class

###### General Purpose:
- Great for diverse workloads, web servers / code repos
- Balances: Compute / Memory / Networking Resources

###### Compute Optimized:
 - Ideal for compute-intensive tasks
 - Suitable for: Batch processing, media transcoding, high performance computing, etc

###### Memory Optimized:
- Best performance for workloads processing large data sets in memory
- Suitable for: High performance DBs, cache stores, real time processing, etc

###### Storage Optimized:
- Ideal for storage-intensive tasks
- Suitable for: High-freq OLTP systems, DBs, Redis, data warehousing, DFS

##### References
