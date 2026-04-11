2025-02-16 13:02
Tags: #cloud/aws/storage 
##### Content
#### Durability
- S3 offers (11 9's = 99.999999999%) level of durability, data is protected across multiple availability zones
- With this level of durability, if you store 10 Mil objects in S3, you can expect to lose a single object once every 10,000 years
- Applies to all storage classes

#### Availability
- Refers to how readily available a service is for use
- Depends on the storage class
- S3 standard has 99.99% availability = 53 mins of potential downtime per year

#### Versioning
- Must be enabled at bucket level
- Same key will overwrite the version
- Versioning is best practice (protection against unintended deletes / easy rollback)
- Any file not versioned before enabling versioning will have version `null`
- Suspending versioning won't remove any previously stored versions

#### Replication
- Can be Cross-Region (CRR), Same-Region (SRR)
- Versioning must be enabled for both source and destination
- Buckets can be in different AWS accounts
- Copying of objects is async
- Proper IAM permissions must be granted to S3 for replication
- Use cases
	- CRR: compliance, low latency access, replication across accounts
	- SRR: log aggregation, live replication between prod and test accounts
- **Notes**
	- Only new objects are replicated, but you can replicate existing ones using **S3 Batch Replication**
	- Delete markers can optionally be replicated, but deletions with a version ID are not replicated
	- No chaining of replication
##### References
