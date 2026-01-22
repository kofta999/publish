2025-02-16 13:02
Tags: #cloud/aws
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
- Can be cross or same region
- Versioning must be enabled for both source and destination
- Buckets can be in different AWS accounts
- Copying of objects is async
- Proper IAM permissions must be granted to S3 for replication

#### Encryption
- Server Side Encryption (Default): Server encrypts the file after receiving it
- Client Side Encryption: The client encrypts the file before uploading it


**Note:** You can host static websites in S3
##### References
