2025-02-16 13:24
Tags: #cloud/aws
##### Content
To migrate from on-prem data to S3, we can use AWS DataSync, Snow Family or through direct data transfer methods over internet.

#### Challenges with data migration
- Limited connectivity
- Limited bandwidth
- High network cost
- Connection stability

### The Snow Family
- Highly-secure, portable devices designed for data collection and processing at edge
- Data migration
	- Snowball Edge
	- Snowcone
	- Snowmobile
- Edge computing
	- Snowcone
	- Snowball Edge


#### Snowball Edge (for data transfers)
- A cost effective solution for huge data transfer
- Pay-per-Transfer jobs
- Provides S3 and Block storage
- Edge Storage Optimized: 80TB of HDD
- Edge Compute Optimized: 42TB of HDD or 28TB of NVMe
- Ideal for large data cloud migrations or disaster recovery

### Snowcone and Snowcone SSD
- Small, portable devices designed for use in harsh environments
- Lightweight, weighing 4.5 pounds / 2.1 kg
	#cloud/aws/important 
- Snowcone: 8TB HDD
- Snowcone SSD: 14TB SSD
- Ideal for space-constrained environments
- Must provide your own battery and cables
- Can be returned to AWS offline or used with DataSync online


#### Snowmobile
- Designed to transfer exabytes of data
- Each has a 100 PB capacity, multiple snowmobiles can be used in parallel
- Features high sec, temp control, GPS tracking and 24/7 video surveillance
- More suitable than Snowball for 10 PB+ transfers

![[Pasted image 20250216134240.png]]


##### References
