2026-03-24 14:58
Tags: #cloud/aws/security 
##### Content
Amazon GuardDuty provides **intelligent threat discovery** to protect your AWS account. It uses **Machine Learning algorithms**, anomaly detection, and 3rd-party data to identify threats.

#### GuardDuty: Features & Data Sources
*   **Deployment:** One click to enable (30-day trial), with **no software to install**.
*   **Input Data Sources:**
    *   **CloudTrail Logs:** Unusual API calls, unauthorized deployments, management events (e.g., creating VPCs), and S3 data events.
    *   **VPC Flow Logs:** Detects unusual internal traffic or unusual IP addresses.
    *   **DNS Logs:** Detects compromised EC2 instances sending encoded data within DNS queries.
    *   *Optional:* EKS Audit Logs, RDS & Aurora, EBS, Lambda.
*   **Threats:** Specifically protects against **CryptoCurrency attacks** (has a dedicated finding).
*   **Automation:** Set up **EventBridge rules** to trigger SNS notifications or Lambda functions in response to findings.

#### Amazon Inspector
Provides **automated security assessments** and continuous infrastructure scanning (only when needed). It assigns a **risk score** to all vulnerabilities for easy prioritization.
*   **Supported Resources (Only these 3):**
    *   **EC2 Instances:** Analyzes against unintended network reachability and running OS known vulnerabilities. *Requires the AWS Systems Manager (SSM) agent*.
    *   **Container Images (Amazon ECR):** Assesses container images as they are pushed.
    *   **Lambda Functions:** Identifies software vulnerabilities in function code and package dependencies as they are deployed.
*   **Integrations:** Reports findings to **AWS Security Hub** and sends findings to **Amazon EventBridge**.

#### Amazon Macie
A fully managed data security and data privacy service focused entirely on **Amazon S3**.
*   **How it works:** Uses machine learning and pattern matching to discover and protect sensitive data, such as **Personally Identifiable Information (PII)**.
*   **Automation:** Integrates with **Amazon EventBridge** to analyze and notify you of discovered sensitive data.

---

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Detect compromised EC2 instances, unusual API calls, or cryptocurrency mining using ML." | **Amazon GuardDuty** |
| "Assess EC2 instances, Lambda functions, or ECR container images for CVEs (package vulnerabilities)." | **Amazon Inspector** |
| "Scan and discover sensitive data or PII hidden in Amazon S3 buckets." | **Amazon Macie** |
| "Automatically notify an administrator when GuardDuty, Inspector, or Macie find a security issue." | **Amazon EventBridge + SNS** |
| "Check an EC2 instance for unintended network reachability." | **Amazon Inspector (Network Reachability scan)** |

##### References
