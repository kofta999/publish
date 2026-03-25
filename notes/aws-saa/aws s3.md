2025-02-16 12:49
Tags: #cloud/aws/storage
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

#### Objects
- Keys
	- The full path to the object
		- `s3://my-bucket/my_file.txt`
		- `s3://my-bucket/my_folder/my_file.txt`
	- Composed of prefix + object name
- Values
	- Max size is 5 TB
	- If uploading a file > 5 GB, must use "multi-part upload"
- Metadata
	- KV pairs
- Tags (Unicode KV pair up to 10, useful for security / lifecycles)
- Version ID (if versioning is enabled)

##### References
