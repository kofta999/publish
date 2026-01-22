2025-02-16 12:49
Tags: #cloud/aws
##### Content
- It's a highly scalable, durable and secure **object storage** service (often called infinitely scaling storage)
- Offers versioning, lifecycle policies and fine-grained access controls
- Used for backup and recovery, data archiving, content distribution and as a data lake for big data analytics

#### Buckets
- Buckets (directories) -> objects (files)
- Must be globally unique across all regions and accounts
- Established at the regional level (bound to a specific region)
- Naming conventions
	- No uppercase or underscores
	- Between 3 and 63 characters
	- Not in an IP address format
	- Starts with a lowercase letter or number
	- Excluding `xn--` prefix and `-s3alias` suffix

#### Policies
- Uses JSON
- Used for
	- Enable public access to the bucket
	- Mandate encryption on uploaded objects
	- Provide access permissions to another account (Cross-Account Access)

##### References
