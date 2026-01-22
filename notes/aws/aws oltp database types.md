2025-02-18 13:17
Tags: #cloud/aws
##### Content
## Relational Databases
### RDS
- Managed DB service, to create cloud DBs managed by AWS
- Supports PostgreSQL, MySQL, MariaDB, Oracle, Microsoft SQL Server, IBM DB2, and Amazon Aurora
- Backup storage is free for free tier
##### Deployment Types
- Read Replicas
	- Up to 15 replicas
	- Primary DB handles writes, with async replication from primary
- Multi AZ
	- Failover for high availability, activates during an AZ outage
	- Main DB handles all r/w operations
	- Limited to 1 alternative AZ
- Multi-Region (Read Replicas)
	- Disaster recovery
	- More replication cost

### Aurora
- AWS cloud-optimized DB by AWS
- Claims 5x improvement over MySQL and 3x over PostgreSQL on RDS
- Storage scales in increments of 10GB, up to 128TB
- Costs 20% more than RDS
- Not in free tier
- Has a serverless version that scales automatically with pay-per-second

## NoSQL Databases
### Dynamo DB
- KV store with dynamic scaling
- Similar to Aurora
- Global tables: multiple region, low latency DynamoDB access with active replication (r/w to any region)

### Document DB
- MongoDB compat
- Similar deployment concepts as aurora
- 3 AZ replication
- 10GB storage increments
- Auto scaling

### ElasiCache
- Similar to RDS but for Redis / Memcached
- AWS handles all infra

### Dynamo DB Accelerator - DAX
- Fully managed in-memory cache for DynamoDB
- Offers up to 10x performance improvements

##### References
