2025-02-08 16:16
Tags: #cloud/aws
##### Content
### Elastic File System (EFS)
- Managed Network File System (NFS)
- Can be mounted on hundreds on EC2 instances
- Works with multi-AZ Linux instances
- Highly available, scalable, expensive, pay per use, no capacity planning 

#### EFS Infrequent Access (IA)
- Storage class optimized for cost
- Offers up to 92% lower cost compared to standard EFS
- EFS automatically moves files to IA based on last access time
- Can be enabled using lifecycle policies
- The transition to IA is transparent to applications using EFS

### FSx (Managed File Storage)
- For Windows File Server:
	- Managed Windows-native FS
	- Supports SMB and Active Directory

- For Lustre (High performance FS):
		- High performance FS for compute intensive workloads
		- Integrates with S3
	
- High performance, scalability, builtin backups
- Integration with AWS services

##### References
