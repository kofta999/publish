2026-03-25 21:33
Tags: #cloud/aws 
##### Content
AWS Systems Manager (SSM) is a suite of tools that helps you securely manage, operate, and automate tasks across your AWS resources and on-premises servers.

#### SSM Session Manager
Allows you to start a secure shell on your EC2 instances and on-premises servers.
*   **Security:** You do **not need SSH access, bastion hosts, or SSH keys**. It completely eliminates the need to open port 22, greatly improving security.
*   **Logging:** You can send your session log data directly to Amazon S3 or CloudWatch Logs for auditing.
*   **Support:** Works across Linux, macOS, and Windows.

#### SSM Run Command
Allows you to securely execute a document (script) or run a command across multiple instances at once using resource groups.
*   **Execution:** No need for SSH. The command output can be sent to the AWS Console, an S3 bucket, or CloudWatch Logs.
*   **Integration:** You can send SNS notifications about the command's status (Success, Failed, etc.), and it integrates fully with IAM and CloudTrail. It can also be invoked via EventBridge.

#### SSM Patch Manager
Automates the process of patching managed instances with OS updates, application updates, and security updates.
*   **Execution:** You can patch instances on-demand or schedule them using **SSM Maintenance Windows**.
*   **Compliance:** It can scan instances and generate a patch compliance report to show any missing patches. 

#### SSM Maintenance Windows
Defines a specific schedule for when to perform administrative actions on your instances, such as OS patching, updating drivers, or installing software. It requires a schedule, a duration, registered instances, and registered tasks.

#### SSM Automation
Simplifies common maintenance and deployment tasks (e.g., restarting instances, creating an AMI, or taking an EBS snapshot).
*   **Automation Runbooks:** Uses SSM Documents to define the exact actions performed on your resources.
*   **Triggers:** Can be triggered manually, via Amazon EventBridge, on a schedule via Maintenance Windows, or automatically by **AWS Config for rule remediations**.

#### SSM Parameter Store
Provides secure, serverless, and scalable storage for configuration data and secrets.
*   **Encryption & Security:** Offers optional seamless encryption using AWS KMS and tracks the versions of your configurations. 
*   **Hierarchy:** You can store parameters in a hierarchy (e.g., `/my-app/dev/db-password`), making it easy to manage environments.
*   **Parameter Policies:** For advanced usage, you can assign a **TTL (expiration date)** to a parameter to force the updating or deletion of sensitive data, like passwords.


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Securely shell into an EC2 instance without opening port 22 or managing SSH keys." | **SSM Session Manager** |
| "Run a script simultaneously across hundreds of EC2 instances without needing SSH." | **SSM Run Command** |
| "Automate OS security updates across EC2 instances every weekend." | **SSM Patch Manager + SSM Maintenance Windows** |
| "Automatically restart an EC2 instance or create an AMI when an AWS Config rule remediation is triggered." | **SSM Automation (Runbooks)** |
| "Store application configuration and secrets in a hierarchical structure with optional KMS encryption." | **SSM Parameter Store** |
| "Force a password stored in AWS to expire or require an update after 90 days." | **SSM Parameter Store (Parameter Policies with TTL)** |

##### References
