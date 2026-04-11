2026-03-21 13:25
Tags: #cloud/aws/messeging 
##### Content
### SNS + SQS: Fan-Out Pattern
The **Fan-Out** pattern is a cornerstone of AWS architectural design. it occurs when a message published to an **SNS Topic** is replicated and pushed to multiple **SQS Queues** (or other endpoints) simultaneously.

#### 1. Why use Fan-Out?
* **Single Publish, Multiple Actions:** The "Producer" only needs to send one message. SNS handles the heavy lifting of replicating that message to every subscriber.
* **True Decoupling:** You can add or remove SQS subscribers (new microservices) without ever touching the code of the producer application.
* **Resilience:** SQS provides the **data persistence** that SNS lacks. If a downstream service is down, the message stays safe in the SQS queue until the service recovers.
* **Cross-Region Support:** You can fan out messages to SQS queues located in different AWS regions for global architectures.

#### 2. Deep Dive: S3 Events to Multiple Queues
A common SAA exam "gotcha" involves S3 Event Notifications.
* **The Limitation:** For a specific combination of event type (e.g., `ObjectCreated`) and prefix (e.g., `images/`), S3 only allows **one** destination rule.
* **The Solution:** Send the S3 Event to an **SNS Topic** first. Then, use the **Fan-Out** pattern to send that notification to as many SQS queues as you need.


![[Pasted image 20260321132628.png]]
#### 3. SNS to S3 (via Kinesis Data Firehose)
While SNS cannot write directly to S3, it can send data to **Kinesis Data Firehose**. 
* **The Flow:** `SNS Topic` → `Kinesis Data Firehose` → `Amazon S3`.
* **Use Case:** This is ideal for **long-term logging** or archiving every notification sent through your system for later analysis or compliance.

![[Pasted image 20260321132644.png]]

#### 4. SNS FIFO + SQS FIFO: Ordered Fan-Out
If your architecture requires the messages to be processed in a strict sequence across multiple services:
* **Requirement:** Use an **SNS FIFO Topic** subscribed to by multiple **SQS FIFO Queues**.
* **Benefits:** You maintain **First-In-First-Out** ordering and **Deduplication** across the entire fan-out pipeline.
* **Restriction:** Standard SQS queues cannot maintain the ordering if subscribed to a FIFO topic; the entire chain must be FIFO.

![[Pasted image 20260321132658.png]]

### SAA Exam "Scenario" Table

| Requirement                                                                                               | Correct Architecture                                                            |
| :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| "A single S3 upload must trigger an image thumbnail service AND an analytics service."                    | **S3 Event** $\rightarrow$ **SNS** $\rightarrow$ **2 SQS Queues**               |
| "A message must be processed by three different services, but one service is often down for maintenance." | **SNS Fan-out to SQS** (SQS buffers the messages for the service that is down). |
| "Archive all SNS notifications into an S3 bucket for auditing."                                           | **SNS** $\rightarrow$ **Kinesis Data Firehose** $\rightarrow$ **S3**.           |
| "Fan out bank transaction alerts that MUST be processed in order."                                        | **SNS FIFO** $\rightarrow$ **Multiple SQS FIFO Queues**.                        |
##### References
