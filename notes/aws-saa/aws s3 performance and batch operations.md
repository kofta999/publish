2026-03-16 16:45
Tags: #cloud/aws/storage 
##### Content
#### 1. Baseline Performance & Scaling
Amazon S3 automatically scales to handle high request rates. Performance limits are applied **per prefix** within a bucket.
* **Request Limits:**
	* **3,500** PUT/COPY/POST/DELETE requests per second per prefix.
	* **5,500** GET/HEAD requests per second per prefix.

* **The Power of Prefixes:** Since there is no limit to the number of prefixes in a bucket, you can achieve massive parallel throughput by spreading your data across different paths.
* *Example:* If you have 10 prefixes and spread your reads evenly, you can achieve **55,000 GET requests per second** for the entire bucket.
* *Prefix Definition:* The prefix is everything between the bucket name and the object name (e.g., in `bucket/project/logs/file.txt`, the prefix is `/project/logs/`).

#### 2. Upload & Download Optimization
* **Multi-Part Upload:** Breaks large objects into parts to be uploaded concurrently. **Recommended** for files > 100 MB; **Required** for files > 5 GB. It improves speed and resilience (retry only failed parts).
* **S3 Transfer Acceleration:** Speeds up transfers over long distances by using **AWS Edge Locations** and the optimized AWS private network.
* **Byte-Range Fetches:** Parallelizes the **download** (GET) process by requesting specific segments of an object simultaneously. Also used to retrieve only partial data (like headers).

#### 3. S3 Batch Operations
A managed way to perform repetitive actions on millions or billions of objects simultaneously with a single request.

* **Core Actions:** Copying objects, modifying metadata/tags, encrypting unencrypted objects, and restoring from Glacier.
* **Lambda Integration:** You can invoke a custom Lambda function to perform complex, per-object transformations during a batch job.
* **Management:** AWS handles retries, tracks progress, and generates completion reports.

#### Performance Summary Table

| Feature                   | Direction    | Primary Benefit                                          |
| ------------------------- | ------------ | -------------------------------------------------------- |
| **Prefix Sharding**       | Request Rate | Scales throughput (3,500 Write / 5,500 Read per prefix). |
| **Multi-Part Upload**     | Upload       | Parallelization & reliability for large files (> 100MB). |
| **Transfer Acceleration** | Both         | Speed over long distances via Edge Locations.            |
| **Byte-Range Fetch**      | Download     | Fetching specific parts or parallelizing downloads.      |
| **Batch Operations**      | Management   | Performing actions on millions of existing objects.      |
##### References
