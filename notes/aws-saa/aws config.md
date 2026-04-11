2026-03-23 23:30
Tags: #cloud/aws/monitoring 
##### Content
AWS Config is a managed service that provides a detailed inventory of your AWS resources and their configuration history. While CloudTrail records "who" made a change, AWS Config records **"what" the resource looks like** and whether it complies with your organization's policies.

#### 1. Core Concepts
* **Configuration Item (CI):** A point-in-time "snapshot" of a resource's attributes (e.g., a Security Group's rules or an S3 bucket's tags).
* **Configuration History:** A stream of CIs that allows you to see how a resource was configured at any point in the past.
* **Configuration Recorder:** The "engine" that detects changes and stores them in an **S3 Bucket**.
* **Regional Service:** AWS Config must be enabled in each region separately, but you can use **Aggregators** to view a multi-account, multi-region dashboard.


#### 2. Config Rules: The Compliance Engine
Rules define the "desired state" of your resources. Config evaluates your resources against these rules and marks them as `COMPLIANT` or `NON_COMPLIANT`.

* **Managed Rules:** Over 300+ pre-built rules by AWS (e.g., `s3-bucket-public-read-prohibited`, `iam-password-policy`).
* **Custom Rules:** 
	* **Lambda-based:** You write custom Python/Java code to evaluate complex logic.
    * **Guard-based:** A newer, simpler "Policy-as-Code" language (DSL) to define rules without writing full Lambda code.
* **Evaluation Triggers:**
    * **Configuration Changes:** Evaluated as soon as a resource is created or modified.
    * **Periodic:** Evaluated at a set interval (e.g., every 24 hours).

#### 3. Automated Remediation
Finding a problem is only half the battle. AWS Config can automatically fix non-compliant resources using **SSM Automation Documents**.

* **Manual Remediation:** You see the non-compliant resource in the console and click "Remediate."
* **Automatic Remediation:** Config immediately triggers an action (e.g., a script to close an open port or enable encryption) the moment a resource is flagged.
* **Retries:** You can set "Maximum Automatic Attempts" if the fix fails the first time.

#### 4. The "Audit Trifecta" (CloudWatch vs. CloudTrail vs. Config)
This is a high-priority topic for the SAA-C03 exam.

| Service               | Primary Focus                  | Analogy                                         |
| :-------------------- | :----------------------------- | :---------------------------------------------- |
| **Amazon CloudWatch** | **Performance & Health**       | Is the car's engine overheating? (Metrics/Logs) |
| **AWS CloudTrail**    | **Accountability (API Calls)** | Who was driving the car at 2:00 PM? (Who/When)  |
| **AWS Config**        | **Compliance (Configuration)** | Is the car's seatbelt buckled? (State/Rules)    |

#### 5. SAA Exam "Scenario" Table

| If the requirement is...                                                       | Use This Feature:                            |
| :----------------------------------------------------------------------------- | :------------------------------------------- |
| "Receive an alert whenever a Security Group rule allows 0.0.0.0/0 on port 22." | **AWS Config Rule** + **SNS**                |
| "Automatically enable encryption on any S3 bucket created without it."         | **Config Rule** + **Auto-Remediation (SSM)** |
| "Review the exact state of an EC2 instance's networking 3 months ago."         | **Config Resource Timeline**                 |
| "Aggregate compliance status for 100 AWS accounts into a central dashboard."   | **Config Aggregator**                        |
| "Find out who deleted an RDS database yesterday."                              | **CloudTrail** (Not Config!)                 |

##### References
