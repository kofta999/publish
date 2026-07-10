# Storage

Azure doesn't use SANs (mostly), focuses on [[software defined storage]]
uses a 3 tier arch:
stream (deals with streams of bits, durability, replication) -> partition (understands structures we interact with) -> front-end (API)

replicaton:
intra-stamp replication (stream layer) sync
inter-stamp replication (partition layer) async

#### Storage Accounts
 - Top-level namespace for storage services
 - Portal simplifies creation, API / CLI has more options

There's always 3 copies of data in any of the options

Redundency Options
- LRS: 3 in same AZ
- ZRS: one in each zone (a region has 3 AZs)
- GRS: 3  in same AZ, async'd to another region in 1 AZ
- GZRS: GRS + ZRS

![[Pasted image 20251224141719.png]]

secondary endpoint is used to communicate in GRS and GZRS

Capacity , IOPS and throughput vary based on performance tier and service
different access tiers

object level replication:
- enables block blobs / containers to be replicated to a container in another storage account
- GPv2 and premium block blob supported
- doesn't need to align to regional pairs
- flexibility in which blobs are replicated
- you can use different tiers for source/target
- it's async, costs network egress

![[Pasted image 20251224144627.png|500]]


#### Blob
Block blob
- flat structure (virutal directories)

If set in settings to hierarchical namespace ADLS will be used

Azure Data Lake Service (ADLS) Gen 2
- NFS 3.0
- SFTP

Page
not used 

Append
just appends to the end of file

Index tags: filter files within the storage



#### Files
- share smb or nfs 4.1 (premium acc)

Tables: entities k:v
Queues: messages
both exists but not really used


### Money
Standard performance and blob premium is consumption-based

##### Block Blob Tiering
- capacity pricing goes up to down, operation is other way around
- each blob has its own tier
- Premium
- Standard: 
	- hot
	- cool
	- cold
	- archive (offline) need to rehydrate to be online

##### Files Tiering
Pay as you go model (shared settings)
- Transaction optimized
- Hot
- Cool


For files premium and page blob premium its provision based
performance scales with capacity

V2 of this ^ is more dynamic (standard provisining v2)
you set capacity, iops and throughput (these 2 are changable after buying)

data transfer costs (replication)

### Data Lakes
- Builds on blob
- Storage became cheaper so raw data is more stored in lakes than ETL
- Can be accessed using standard APIs (e.g. DFS, hadoop)
- true directory structure
- POSIX and Entra ID data plane RBAC
- useful for analytics


### Access Control
- Access keys: 2 powerful keys, why 2? so i can rotate 1 while apps use 2 (not recommended)
-  Entra ID integration with data plane RBAC
	- Works with Blob, Queue, Tables
- Files use kerberos, ADDS, Entra DS, Entra Kerberos
- Shared Access Signatures and Policy
	- For granular and time-based access
	- Signed with Access Keys
	- Types
		- Account
		- Service

### Encryption
- Always encrypted at rest
- Infra encryption: another layer of enc
- Can use custom keys
- Encryption scopes
- Encryption at transit can be enforced

### Networking
- Service Endpoints: Vnets expose an endpoint for Storage Accounts to acess
- Private Endpoints: Vnets expose an IP Address for a specific Storage Account to access
- SAs has its own firewall
- Resource Instance Rules: Enable a resource to access SA

### Lifecycle Management
- Consider access tiers
- auto-tiering based on data modify / access
- Azure Storage Actions: provides more options
	- Task: Conditions
	- Assign to SAs

### Native Protection
- Snapshots: Incremental, killed off by all the following
- Versioning: 
- Change Feed: log of env changes
- Soft delete: when delete, keep it for x days
- Point in-time restore


### Azure File Sync
- SMB for cloud
- up to 100 servers (sync group)
- tiering to save space

### Azure Elastic SAN
- block storage via iSCSI
- LRS or ZRS
- base + capacity units (add info)
- you create volume groups and volumes on top with network and security boundaries

### Azure NetApp Files

### Managed Disks
- Abstracts storage accounts into managed disks
- Disks and snapshots become ARM resources
- SKUs
	Capacity Provisioned:
	- Standard HDD
	- Standard SSD
	- Premium SSD v1 (change perf tier)
	
	Dynamic Capacity (IOPS / Throughput)
	- Premium SSD v2
	- Ultra Disk
- Can set encryption


### VM Storage
- Can use ephemeral disks if state not required
- Attach to managed disks for persistence
- VMs has its own disk and network limits, be wary to not be  bottleneck