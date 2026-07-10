2026-03-23 14:34
Tags: #cloud/aws/analytics 
##### Content
#### 1. Amazon Managed Service for Apache Flink
*Formerly Kinesis Data Analytics.* This service allows you to run **Apache Flink** applications to process and analyze streaming data without managing any infrastructure.

* **Capability:** Use Flink (Java, Scala, or SQL) to perform complex time-windowed aggregations, filtering, and transformations on data *while it is in motion*.
* **Scaling:** Automatically scales compute resources (KPUs - Kinesis Processing Units) to match the data throughput.
* **Integrations:**
    * **Inputs:** Kinesis Data Streams, Amazon MSK.
    * **Outputs:** S3, Redshift, OpenSearch, Kinesis Data Streams.
    * **Important Exam Tip:** Flink **cannot** read directly from Amazon Data Firehose (Firehose is for delivery/output, not for being a source for Flink).


#### 2. Amazon MSK (Managed Streaming for Apache Kafka)
MSK is the managed AWS version of **Apache Kafka**, a popular open-source distributed event streaming platform.
* **Managed Infrastructure:** AWS handles the provisioning, patching, and high availability of the Kafka brokers and ZooKeeper nodes.
* **Deployment:** Always deployed within your **VPC** across multiple AZs (up to 3) for high availability.
* **Storage:** Data is stored on **EBS volumes**. Unlike Kinesis, storage is only limited by the size of the volumes you provision (or you can use **Tiered Storage** to offload old data to S3).
* **MSK Serverless:** A newer mode where you don't manage brokers; AWS automatically handles capacity and scaling.
* **Express Brokers (2025+):** A high-performance broker type that offers up to 3x higher throughput and faster scaling compared to standard brokers.

#### 3. Kinesis Data Streams vs. Amazon MSK
This is a frequent architectural decision on the SAA-C03 exam.

| Feature | Kinesis Data Streams | Amazon MSK |
| :--- | :--- | :--- |
| **Philosophy** | AWS-Native (API driven) | Open-Source (Kafka Protocol) |
| **Scaling Unit** | Shards | Brokers & Partitions |
| **Max Message Size** | **1 MB** (Hard limit) | **1 MB** (Configurable to much higher) |
| **Retention** | 24 hours to 365 days | Virtually unlimited (disk-based) |
| **Management** | Zero (fully serverless feel) | Managed (you still manage topics/configs) |
| **Security** | IAM Policies | IAM, TLS, SASL/SCRAM |
#### 4. Amazon MSK Consumers
Since MSK is 100% Kafka-compatible, it supports a wide variety of consumers:
* **Managed Flink:** For real-time, stateful stream processing.
* **AWS Glue Streaming ETL:** For real-time data cleaning and loading into a data lake.
* **AWS Lambda:** Can be triggered by MSK topics to process messages serverlessly.
* **Custom Apps:** Any application running on **EC2, ECS, or EKS** using standard Kafka client libraries.
### SAA Exam "Scenario" Table

| If the requirement is... | Use This Service: |
| :--- | :--- |
| "Migrate an existing on-premises Kafka cluster to AWS with minimal changes." | **Amazon MSK** |
| "Calculate a rolling average of IoT sensor data every 5 minutes in real-time." | **Managed Service for Apache Flink** |
| "Process messages larger than 1MB in a streaming environment." | **Amazon MSK** (Kinesis is limited to 1MB). |
| "Standardize on a cloud-agnostic streaming platform to avoid lock-in." | **Amazon MSK** |
| "Store streaming data for 2 years for regulatory compliance." | **Amazon MSK with Tiered Storage** (Kinesis max is 1 year). |

##### References
