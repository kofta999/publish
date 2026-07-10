2026-03-25 21:41
Tags: #cloud/aws 
##### Content
### AWS CloudFormation
AWS CloudFormation provides a declarative way to outline and provision your AWS infrastructure using Infrastructure as Code (IaC). 

*   **How it works:** You define the resources you need (e.g., an S3 bucket, a Security Group, two EC2 instances, and an ELB) within a template. CloudFormation then automatically creates these resources in the exact right order with your specified configuration.
*   **Key Benefits:**
    *   **Control & Productivity:** No resources are manually created, which is excellent for control and allows changes to be reviewed through code. It gives you the ability to easily destroy and re-create entire infrastructures on the fly.
    *   **Cost Management:** Resources within a stack are tagged so you can easily track costs, and you can estimate the price of your resources directly from the template. This enables cost-saving strategies, like safely deleting a Dev environment template at 5 PM and recreating it at 8 AM.
    *   **Flexibility:** It supports almost all AWS resources, and you can leverage "custom resources" for anything that is not natively supported.

#### CloudFormation Features & Concepts
*   **Infrastructure Composer:** A visual tool that integrates with CloudFormation, allowing you to see all your resources and the relationship connections between the components (like an automated diagram of your stack).
*   **Service Role:** An IAM role assigned directly to CloudFormation that grants it the ability to create, update, or delete stack resources on your behalf. This allows you to give users the ability to manage stacks without handing them direct IAM permissions to all the underlying services.


### Instance Scheduler on AWS
Instance Scheduler is **not a native AWS service**, but rather a pre-built AWS solution that you deploy using a CloudFormation template.

*   **Purpose:** It automatically starts and stops your AWS resources based on a defined schedule to drastically reduce costs (by up to 70%). A classic use case is stopping a company's development servers outside of normal business hours.
*   **Supported Resources:** It can control **EC2 instances, EC2 Auto Scaling Groups (ASGs), and Amazon RDS instances**. 
*   **How it works under the hood:** The schedules themselves are stored and managed inside an **Amazon DynamoDB table**. The solution relies on **resource tags** to identify targets and uses **AWS Lambda** to actually trigger the start and stop actions. It fully supports cross-account and cross-region scheduling.


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Automate the provisioning of an entire architecture in a repeatable, declarative manner without writing scripts." | **AWS CloudFormation** |
| "Safely grant users the ability to deploy an infrastructure stack without giving them direct IAM permissions to the individual services." | **CloudFormation Service Role** |
| "Visually design and map out the relationships between components in an infrastructure template." | **CloudFormation + Infrastructure Composer** |
| "Automatically stop a fleet of EC2 and RDS instances after 6 PM every weekday to drastically reduce costs." | **Instance Scheduler on AWS** |
| "Manage the schedules for an automated start/stop instance solution across multiple AWS accounts." | **Use Amazon DynamoDB within the Instance Scheduler solution** |

##### References
