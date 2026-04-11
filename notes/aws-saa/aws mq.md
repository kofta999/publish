2026-03-21 13:55
Tags: #cloud/aws/messeging 
##### Content
### Amazon MQ
Amazon MQ is a managed message broker service for **Apache ActiveMQ** and **RabbitMQ**. It is designed specifically for customers migrating traditional applications to the cloud that rely on industry-standard messaging protocols.

#### 1. Why use Amazon MQ?
While **SQS** and **SNS** are "cloud-native" and highly scalable, they use proprietary AWS APIs. If you have an existing on-premises application that uses standard protocols, rewriting the code to use SQS/SNS can be expensive and time-consuming. 
* **Goal:** "Lift and shift" migration with minimal code changes.
* **Supported Protocols:**
    * **AMQP** (Advanced Message Queuing Protocol)
    * **STOMP** (Streaming Text Oriented Messaging Protocol)
    * **MQTT** (Message Queuing Telemetry Transport)
    * **OpenWire**
    * **WSS** (WebSockets)

#### 2. Key Characteristics
* **Features:** It provides both **queues** (point-to-point, like SQS) and **topics** (pub/sub, like SNS) in a single service.
* **Architecture:** Unlike SQS/SNS (which are serverless), Amazon MQ runs on **dedicated instances**.
* **High Availability:** Can be deployed in a **Multi-AZ** configuration with an active/standby setup. If the active broker fails, Amazon MQ automatically fails over to the standby instance.
* **Storage:** Uses **Amazon EFS** or **Amazon EBS** for the backend data store to ensure message durability.

#### 3. SAA Exam Comparison: SQS/SNS vs. Amazon MQ

| Feature         | SQS & SNS                  | Amazon MQ                               |
| :-------------- | :------------------------- | :-------------------------------------- |
| **Type**        | Cloud-native / Proprietary | Managed Open-Source (ActiveMQ/RabbitMQ) |
| **Protocols**   | AWS API / SDK              | **AMQP, MQTT, STOMP, etc.**             |
| **Scaling**     | **Infinite/Elastic**       | Vertical (scaling instance size)        |
| **Maintenance** | Serverless (No management) | Managed (AWS handles patching/setup)    |
| **Best For**    | New cloud applications     | **Migrating existing applications**     |

### SAA Exam "Scenario" Table

| If the requirement is...                                              | Use This Service: |
| :-------------------------------------------------------------------- | :---------------- |
| "A new serverless application needs a scalable queue."                | **Amazon SQS**    |
| "Migrate an on-premise app using **MQTT** with minimal code changes." | **Amazon MQ**     |
| "Fan-out messages to 10 million mobile devices."                      | **Amazon SNS**    |
| "An application requires **RabbitMQ** features in the cloud."         | **Amazon MQ**     |

![[Pasted image 20260321135523.png]]
##### References
