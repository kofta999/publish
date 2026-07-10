2025-02-08 13:28
Tags: #cloud/aws/compute  
##### Content
#### Features
- Renting VMs (EC2)
- Storing data on virtual drives (EBS)
- Distributing load across machines (ELB)
- Scaling using auto-scaling group (ASG)

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

##### User Data Script
- Used to bootstrap machines on startup (executes only once)
- Used to automate tasks like:
	- Installing updates / software
	- Downloading files from internet
- Runs as **root** user

**Note:** Public IP changes on VM restart
##### References
https://youtu.be/eo0sp1xzYCY