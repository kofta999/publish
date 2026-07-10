2025-03-18 21:45
Tags: #cloud/aws/important
##### Content

### AWS Security Tools Overview
- **Purpose**: Protect AWS resources using specialized services.
- **Key Tools**:
  - **AWS Secrets Manager**: Securely stores and rotates secrets (e.g., passwords) and integrates with RDS and KMS.
  - **AWS Artifact**: Provides access to compliance documents (e.g., ISO, PCI, SOC) and agreements (e.g., HIPAA, BAA).
  - **Amazon GuardDuty**: Threat detection using ML, analyzing CloudTrail logs, VPC flow logs, and S3 data events.
  - **Amazon Inspector**: Automated security assessments for EC2, ECR container images, and Lambda functions.
  - **AWS Config**: Tracks resource configurations and changes, enabling compliance auditing and SNS alerts.
  - **AWS CloudTrail**: Logs API calls and events for governance, compliance, and auditing (enabled by default).
  - **AWS Macie**: Identifies and protects sensitive data (e.g., PII) using ML.
  - **AWS Security Hub**: Centralized security management, aggregating alerts from Config, GuardDuty, Inspector, etc.
  - **AWS Detective**: Investigates security incidents using ML and graph analysis from logs (e.g., CloudTrail, GuardDuty).
  - **IAM Access Analyzer**: Identifies resources shared outside your trust zone (e.g., S3 buckets, IAM roles).
  - **Root User Privileges**: The root user has full access but should be restricted; certain actions (e.g., closing accounts) require root.
  - **AWS Abuse**: Report abusive or illegal activities (e.g., spam, DDoS) via the AWS Abuse form or email.

---

### Key Features
- **Secrets Manager**: Automates secret rotation, integrates with RDS, and uses KMS encryption.
- **GuardDuty**: Detects threats like cryptocurrency attacks and integrates with EventBridge for alerts.
- **Inspector**: Assesses EC2, ECR, and Lambda for vulnerabilities and unintended network access.
- **Config**: Stores configuration history in S3, supports cross-region aggregation, and sends SNS alerts.
- **CloudTrail**: Logs API activity across AWS services, stored in S3 or CloudWatch.
- **Macie**: Uses ML to detect sensitive data and provides alerts.
- **Security Hub**: Centralizes security findings and requires AWS Config for activation.
- **Detective**: Visualizes security incidents using logs from CloudTrail, GuardDuty, and VPC Flow Logs.
- **IAM Access Analyzer**: Flags external access to S3, IAM roles, KMS keys, etc.
- **Root User**: Avoid using for daily tasks; lock away access keys.
- **AWS Abuse**: Report misuse of AWS resources (e.g., spam, malware).

### Summary
- **Secrets & Compliance**: Use Secrets Manager for secrets and Artifact for compliance docs.
- **Threat Detection**: GuardDuty and Inspector for threat detection and vulnerability assessments.
- **Auditing & Monitoring**: Config and CloudTrail for tracking changes and API activity.
- **Data Protection**: Macie for sensitive data detection and protection.
- **Centralized Security**: Security Hub for aggregated security insights.
- **Incident Investigation**: Detective for analyzing security incidents.
- **Access Control**: IAM Access Analyzer to monitor resource sharing.
- **Root User**: Restrict root user access and use it only for critical tasks.
- **Abuse Reporting**: Report abusive activities to AWS Abuse.

##### References
