2025-02-18 13:17
Tags: #cloud/aws
##### Content

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
