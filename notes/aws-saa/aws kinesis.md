2026-03-21 13:48
Tags: #cloud/aws/messeging 
##### Content
### Amazon Kinesis
Amazon Kinesis makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information. For the SAA-C03 exam, you must distinguish between **Data Streams** (ingestion and custom processing) and **Data Firehose** (delivery to destinations).

#### 1. Kinesis Data Streams (KDS)
KDS is a massively scalable and durable real-time data streaming service. Use this when you need to build custom applications that process data in real-time.

* **Retention:** Data is stored for **24 hours by default**, up to **365 days**.
* **Immutability:** Once data is in the stream, it cannot be deleted until it expires.
* **Replayability:** Multiple consumers can read the same data at different times, or one consumer can "replay" data if a crash occurs.
* **Capacity Modes:**
    * **Provisioned Mode:** You specify the number of **Shards**. Each shard provides 1MB/s (or 1000 records) of "Ingest" and 2MB/s of "Egress." Use this when you have predictable traffic.
    * **On-Demand Mode:** AWS handles scaling automatically based on throughput peaks. Use this when traffic is unpredictable.

![[Pasted image 20260321134926.png]]


#### 2. Amazon Data Firehose (ADF)
*Formerly Kinesis Data Firehose.* This is a fully managed service for delivering real-time streaming data to destinations like S3, Redshift, or OpenSearch.

* **Fully Managed & Serverless:** No shards to manage; it scales automatically.
* **Near Real-Time:** Not "instant" like Data Streams. It buffers data by **size** (e.g., 1MB) or **time** (e.g., 60 seconds) before sending it to the destination.
* **Transformations:** Can use **AWS Lambda** to transform data on the fly (e.g., converting CSV to JSON).
* **Destinations:**
    * **AWS:** S3, Redshift (via S3 COPY), OpenSearch.
    * **3rd Party:** Datadog, Splunk, New Relic, MongoDB.
    * **Custom:** Any HTTP endpoint.

![[Pasted image 20260321134953.png]]

#### 3. Key Comparison: KDS vs. Firehose

| Feature          | Kinesis Data Streams (KDS)                 | Amazon Data Firehose (ADF)           |
| :--------------- | :----------------------------------------- | :----------------------------------- |
| **Primary Goal** | **Custom real-time processing** (KCL/SDK). | **Delivery** to storage/analytics.   |
| **Latency**      | Real-time (~200ms).                        | Near real-time (60s buffer minimum). |
| **Management**   | Shards (Provisioned) or On-demand.         | **Fully Managed (Serverless).**      |
| **Data Storage** | Yes (1–365 days).                          | No (Immediate delivery).             |
| **Replay**       | **Supported** (due to storage).            | Not Supported.                       |

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Service: |
| :--- | :--- |
| "Analyze website clickstream data in real-time to detect fraud." | **Kinesis Data Streams** |
| "Collect logs and store them in an S3 bucket for long-term audit." | **Amazon Data Firehose** |
| "A single stream needs to be processed by three different apps." | **Kinesis Data Streams** |
| "Load real-time IoT data into an Amazon Redshift cluster." | **Amazon Data Firehose** |
| "Convert streaming JSON data to Parquet before storing in S3." | **Amazon Data Firehose (+ Lambda)** |

### Pro-Tip for the Exam: The "Buffer"
If you see a question about **buffering**, **batching**, or **loading data into S3/Redshift**, the answer is almost always **Amazon Data Firehose**. If you see **real-time custom code** or **manual shard management**, look for **Kinesis Data Streams**.

##### References
