2026-03-21 13:24
Tags: #cloud/aws/messeging 
##### Content
Amazon SNS is a fully managed **Pub/Sub (Publish/Subscribe)** messaging service. While SQS is used for decoupling via a "Pull" model, SNS is used for high-throughput, "Push" notifications to multiple subscribers simultaneously.

#### 1. Core Concepts
* **Topics:** The central access point and communication channel. Producers send messages to the Topic.
* **Subscribers:** Any "Event Receiver" that listens to the topic. Every subscriber receives a copy of the message (unless filtered).
* **Scale:** Supports up to **100,000 topics** and **12,500,000 subscriptions** per topic.
* **Protocols:** SNS can push messages to:
    * **AWS Services:** SQS, Lambda, Kinesis Data Firehose.
    * **External:** HTTP/S (Webhooks), Email, SMS, Mobile Push (GCM, APNS, ADM).

#### 2. SNS FIFO Topic
Just like SQS FIFO, SNS now supports strict ordering and deduplication.
* **Features:**
	* **Ordering:** Guaranteed by **Message Group ID**.
    * **Deduplication:** Uses **Deduplication ID**.
* **Compatibility:** Can only have **SQS FIFO** queues as subscribers if you want to maintain end-to-end ordering.
* **Throughput:** Matches SQS FIFO limits (300 msg/s or 3,000 msg/s with batching).

#### 4. Message Filtering
By default, every subscriber gets every message sent to the topic. 
* **Mechanism:** Use a **JSON Filter Policy** on the subscription.
* **Logic:** If the message attributes match the policy, the subscriber gets the message. If they don't, it is skipped for that specific subscriber.

#### 5. Security & Access
* **Encryption:** HTTPS (In-flight) and KMS (At-rest).
* **Access Policies:** (SNS Topics Policies) Essential for:
    * **Cross-Account Access.**
    * **Service Integration:** Allowing S3 "Bucket Events" to publish to an SNS topic.

### SAA Exam "Scenario" Table

| If the requirement is...                                           | Use This Feature:                    |
| :----------------------------------------------------------------- | :----------------------------------- |
| "Send a single message to multiple SQS queues at once."            | **SNS Fan-out**                      |
| "Send a notification only if the 'order_type' is 'critical'."      | **SNS Message Filtering**            |
| "Push a mobile notification to millions of users."                 | **SNS Mobile Push**                  |
| "Ensure that order notifications are sent and processed in order." | **SNS FIFO Topic + SQS FIFO Queue**  |
| "Allow an S3 bucket in Account A to notify a Lambda in Account B." | **SNS Topic Policy (Cross-Account)** |

### Summary: SQS vs. SNS

| Feature         | SQS                        | SNS                                     |
| :-------------- | :------------------------- | :-------------------------------------- |
| **Model**       | Pull (Polling)             | Push (Instant)                          |
| **Persistence** | Durable (up to 14 days)    | Ephemeral (if not delivered, it's gone) |
| **Consumers**   | 1 consumer per message     | Multiple (Fan-out)                      |
| **Decoupling**  | Buffering / Smoothing Load | Real-time notifications                 |

##### References
