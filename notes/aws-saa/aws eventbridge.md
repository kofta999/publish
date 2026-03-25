2026-03-23 22:45
Tags: #cloud/aws/monitoring 
##### Content
Amazon EventBridge is a serverless event bus that makes it easier to build event-driven applications at scale. It replaces the legacy CloudWatch Events, providing a more robust platform for connecting your applications with data from a variety of sources.

#### 1. How It Works: Source $\rightarrow$ Bus $\rightarrow$ Rule $\rightarrow$ Target
* **Event Sources:** Can be **AWS Services** (e.g., an S3 object upload, an EC2 state change), **Custom Apps**, or **SaaS Apps** (e.g., Zendesk, Shopify).
* **Event Bus:** The pipeline that receives events. Every account has a **Default Event Bus** for AWS services, but you can create **Custom Event Buses** for your own applications.
* **Rules:** These act as filters. A rule matches incoming events based on a **JSON Pattern** or a **Schedule** (Cron/Rate).
* **Targets:** If an event matches a rule, EventBridge sends the JSON payload to a target, such as **Lambda**, **SQS**, **SNS**, **Step Functions**, or **Kinesis**.

![[Pasted image 20260323224542.png]]

#### 2. Key Features for the SAA-C03 Exam
* **Archiving & Replay:** You can archive events sent to a bus (indefinitely or for a set period). If your code had a bug or you need to backfill data, you can **replay** those archived events to your targets.
* **Schema Registry:** EventBridge can "sniff" your events and infer their structure. It stores these in a registry, allowing you to download code bindings (Java, Python, TypeScript) so your application knows exactly what the incoming data looks like.
* **Resource-Based Policies:** These allow you to grant other AWS accounts or services permission to send events to your bus.
    * **Use Case:** Centralizing security alerts from multiple accounts into one "Security Operations" account.

---

### SAA Exam "Scenario" Table

| If the requirement is...                                                   | Use This EventBridge Feature:             |
| :------------------------------------------------------------------------- | :---------------------------------------- |
| "Run a cleanup script every night at 12:00 AM."                            | **Scheduled Rule (Cron)**                 |
| "Notify a DevOps team via Slack (SNS) whenever a CodeBuild project fails." | **Event Pattern Rule (CodeBuild Source)** |
| "Capture every API call made in an account and send it to an SQS queue."   | **CloudTrail + EventBridge**              |
| "Test a new Lambda function using last week's production traffic."         | **Event Archiving & Replay**              |
| "Automatically generate code classes for events in your custom app."       | **Schema Registry**                       |
| "Consolidate events from all accounts in an AWS Organization."             | **Resource-Based Policy (Cross-Account)** |

### EventBridge vs. SNS
A common exam point is deciding between these two:
* **Use SNS if:** You need high fan-out (thousands of subscribers) and simple "push" notifications to humans or mobile devices.
* **Use EventBridge if:** You need to filter events based on the **content** of the JSON payload, or you need to connect to 3rd party SaaS providers.

##### References
