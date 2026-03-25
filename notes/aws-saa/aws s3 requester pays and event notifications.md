2026-03-16 16:42
Tags: #cloud/aws/storage 
##### Content
#### 1. S3 Requester Pays
By default, the bucket owner pays for all storage and data transfer (egress) costs. **Requester Pays** flips this model.

* **Mechanism:** The person accessing the data (the requester) pays the cost of the request and the data download. The owner only pays for the storage.
* **Authentication Required:** Requesters **must** be authenticated in AWS; anonymous access is not supported for Requester Pays buckets.
* **Use Case:** Sharing massive datasets (e.g., genomic data or satellite imagery) with the research community or other organizations without incurring astronomical egress fees.

#### 2. S3 Event Notifications
This feature allows you to trigger automated workflows whenever a specific action occurs in your bucket (e.g., a file is uploaded or deleted).
* **Common Events:** `S3:ObjectCreated`, `S3:ObjectRemoved`, `S3:ObjectRestore`, and `S3:Replication`.
* **Filtering:** You can filter by prefix (folder) or suffix (file extension like `.jpg` or `.pdf`).
* **Destinations:**
	* **Lambda Functions:** To run code immediately (e.g., generate a thumbnail).
	* **SNS Topics:** To send notifications or fan-out to multiple subscribers.
	* **SQS Queues:** To decouple the process and handle events as they arrive in a queue.
* **Performance:** Typically delivers in seconds, but can occasionally take longer.

#### 3. S3 Event Notifications with Amazon EventBridge
For more complex architectural needs, you can route S3 events through **Amazon EventBridge**. This is generally the modern recommendation for advanced "Event-Driven" designs.

* **Advanced Filtering:** Use JSON rules to filter based on object size, specific metadata, or other attributes.
* **Expanded Destinations:** Send events to over 18 AWS services, including **Step Functions**, **Kinesis Firehose**, and **CloudWatch Logs**.
* **Key Capabilities:**
	* **Archive & Replay:** You can store events and "replay" them later—useful for debugging or re-processing data after a code change.
	* **Reliable Delivery:** EventBridge provides more robust retry logic and delivery guarantees.

#### Summary Comparison: Standard S3 Events vs. EventBridge

| Feature          | Standard S3 Notifications | S3 via EventBridge           |
| ---------------- | ------------------------- | ---------------------------- |
| **Complexity**   | Simple / Direct           | Advanced / Rule-based        |
| **Destinations** | SNS, SQS, Lambda          | 18+ AWS Services             |
| **Filtering**    | Prefix / Suffix only      | Full JSON body filtering     |
| **History**      | No archive                | **Archive & Replay support** |
##### References
