2025-02-24 11:58
Tags: #cloud/aws/important
##### Content
## **AWS Organizations**
- **Overview**: Centralized management service for consolidating multiple AWS accounts into a single organization.
- **Key Features**:
  - **Consolidated Billing**: Single payment method, aggregated usage discounts, and Reserved Instance pooling.
  - **Account Management**: Acts as a master account for managing multiple accounts.
  - **Service Control Policies (SCPs)**: Restrict account privileges for security and compliance.
- **API Support**: Automates AWS account creation.

---

## **Multi-Account Strategies**
- **Account Separation**: Create separate accounts for departments, cost centers, and environments (dev/test/prod).
- **Resource Isolation**: Use VPCs for isolation within accounts.
- **Compliance**: Implement Service Control Policies (SCP) for regulatory requirements.
- **Logging and Monitoring**:
  - Centralize CloudTrail logs in an S3 bucket.
  - Direct CloudWatch Logs to a dedicated logging account.
- **Tagging**: Standardize tags for efficient billing and resource management.

---

## **Organizational Units (OUs)**
- **Purpose**: Group related accounts into OUs for uniform policy administration and streamlined operations.
- **Use Case**: Simplify account management and enforce consistent policies across accounts.

---

## **Service Control Policies (SCPs)**
- **Function**: Whitelist or blacklist IAM actions at the OU or account level.
- **Scope**: Applies to all users and roles (except service-linked roles).
- **Use Cases**:
  - Restrict access to specific services.
  - Enforce compliance standards (e.g., PCI).
- **Rule Requirement**: SCPs must have explicit Allow rules.

---

## **AWS Organizations – Consolidated Billing**
- **Features**:
  - **Combined Usage**: Aggregate usage for volume pricing, Reserved Instances, and Savings Plans.
  - **Single Bill**: Consolidated invoice for all accounts.
  - **Discount Control**: Management account can disable sharing of Reserved Instance discounts.

---

## **AWS Control Tower**
- **Purpose**: Simplifies setting up and managing secure, compliant multi-account AWS environments.
- **Key Features**:
  - **Automated Setup**: Minimal configuration for environment setup.
  - **Policy Enforcement**: Automates guardrails for compliance.
  - **Dashboard**: Monitors compliance and identifies policy breaches.
- **Use Cases**: Restrict access to services and enforce compliance standards (e.g., PCI).

---

## **AWS Resource Access Manager (RAM)**
- **Purpose**: Share AWS resources across accounts or within an organization.
- **Supported Resources**: Aurora databases, VPC subnets, Transit Gateway attachments, Route 53 hosted zones, EC2 Dedicated Hosts, and License Manager configurations.
- **Benefits**:
  - Prevent resource duplication.
  - Enhance collaboration and resource utilization.
- **Security**: Ensure robust IAM policies and monitor resource usage.

---

## **AWS Service Catalog**
- **Purpose**: Provides a self-service portal for pre-approved AWS resources.
- **Use Case**: Simplifies access to compliant and consistent stacks (e.g., virtual machines, databases, storage).
- **Benefits**: Reduces non-compliant or inconsistent resource deployments.

##### References
