2026-03-21 13:09
Tags: #cloud/aws/messeging 
##### Content
### Amazon SQS (Simple Queue Service)

Amazon SQS is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. It eliminates the complexity and overhead associated with managing and operating message-oriented middleware.

#### 1. SQS Standard Queue (The Default)
* **Throughput:** Unlimited throughput (unlimited messages per second).
* **Delivery:** **At-least-once delivery**. Occasionally, more than one copy of a message is delivered.
* **Ordering:** **Best-effort ordering**. Messages might occasionally be delivered in an order different from which they were sent.
* **Retention:** Default is **4 days**; maximum is **14 days**.
* **Message Size:** Maximum **1024 KB** (For larger messages up to 2 GB, use the **Amazon SQS Extended Client Library** with S3).

#### 2. Producing and Consuming Messages
* **Producers:** Send messages using the `SendMessage` API.
* **Consumers:**
	* Can be EC2 instances, Lambda, or on-premises servers.
    * Use **Polling** to retrieve messages (up to 10 at a time).
    * **Crucial Step:** The consumer must explicitly call the `DeleteMessage` API after processing to remove it from the queue.

#### 3. Message Visibility Timeout
This is a core SAA exam concept regarding how SQS handles consumer failures.
* **Mechanism:** When a consumer pulls a message, it becomes "invisible" to others for a set period (default **30 seconds**).
* **Success:** Consumer processes and deletes the message within 30 seconds.
* **Failure:** If the consumer crashes or takes too long, the timeout expires, the message becomes visible again, and another consumer picks it up.
* **Optimization:** If a consumer knows it needs more time, it can call the `ChangeMessageVisibility` API to extend the window.

#### 4. SQS Long Polling
Instead of constantly hitting the SQS API to see if a message is there (**Short Polling**), consumers can "wait" for a message to arrive.
* **Wait Time:** 1 to 20 seconds (20 is preferred).
* **Benefits:** 
	* **Reduces Cost:** Fewer empty API responses (you pay per request).
    * **Reduces Latency:** The message is sent to the consumer as soon as it arrives in the queue.

#### 5. SQS FIFO Queue (First-In-First-Out)
Use this when the order of operations is critical (e.g., price updates, bank transactions).
* **Ordering:** Guaranteed strict ordering.
* **Throughput:** Limited to **300 msg/s** (or **3,000 msg/s** with batching (1~10 messages per operation)).
* **Exactly-Once Processing:** Uses a **Message Deduplication ID** to ensure no duplicates are sent.
* **Message Group ID:** Allows you to have multiple "sub-queues" within one FIFO queue. Messages within the same Group ID are ordered relative to each other.

#### 6. Security & Access
* **Encryption:** HTTPS (In-flight) and KMS (At-rest).
* **Access Policies:** Similar to S3 Bucket Policies. Use these for **Cross-Account access** or to allow services like **SNS or S3** to write to your queue.

### SAA Exam "Scenario" Table

| If the requirement is...                                         | Use This Feature:                     |
| :--------------------------------------------------------------- | :------------------------------------ |
| "Decouple a frontend from a slow backend database."              | **SQS Standard**                      |
| "Ensure messages are processed exactly once and in order."       | **SQS FIFO**                          |
| "Reduce the number of empty 'ReceiveMessage' responses."         | **SQS Long Polling**                  |
| "A message is being processed twice by different consumers."     | **Increase Visibility Timeout**       |
| "A message is not reappearing fast enough after a worker fails." | **Decrease Visibility Timeout**       |
| "Handle a massive burst of incoming orders (Buffer)."            | **SQS + ASG (based on Queue Length)** |

##### References
