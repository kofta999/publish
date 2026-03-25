2026-03-21 14:45
Tags: #cloud/aws/compute 
##### Content
### Amazon ECS (Elastic Container Service)
Amazon ECS is a highly scalable, fast, container management service that makes it easy to run, stop, and manage Docker containers on a cluster.

#### 1. ECS Launch Types: EC2 vs. Fargate
The primary difference is **who manages the underlying servers**.

| Feature            | **EC2 Launch Type**                          | **Fargate Launch Type**                          |
| :----------------- | :------------------------------------------- | :----------------------------------------------- |
| **Infrastructure** | You provision and manage EC2 instances.      | **Serverless** (AWS manages the infrastructure). |
| **Responsibility** | You patch, scale, and secure the OS/Docker.  | You only manage the Container/Task.              |
| **Cost**           | Pay for the EC2 instances provisioned.       | Pay for the CPU/RAM requested per task.          |
| **Configuration**  | Must run the **ECS Agent** on each instance. | No agent management required.                    |

#### 2. IAM Roles for ECS
For the SAA exam, you must distinguish between the role for the **instance** and the role for the **application**.

* **EC2 Instance Profile (EC2 Launch Type only):** Used by the ECS Agent to pull images from ECR and send logs to CloudWatch.
* **ECS Task Role:** Used by the **application** inside the container to access other AWS services (e.g., S3, DynamoDB). This is defined in the Task Definition and follows the principle of least privilege.

![[Pasted image 20260321144630.png]]

#### 3. Storage & Networking
* **Data Volumes (EFS):** You can mount **Amazon EFS** onto ECS tasks for both EC2 and Fargate. This provides **persistent, multi-AZ shared storage**.
    * *Note:* S3 cannot be mounted as a native file system for ECS.
* **Load Balancing:**
    * **ALB:** The default and recommended choice for most web applications.
    * **NLB:** Used for ultra-high performance or static IP requirements.
    * *Note:* Classic Load Balancer (CLB) does not support Fargate.

#### 4. Scaling in ECS
Scaling happens at two distinct layers:
1.  **ECS Service Auto Scaling (Task Level):** Increases the number of containers based on CPU, RAM, or ALB Request Count. This uses **Target Tracking**, **Step Scaling**, or **Scheduled Scaling**.
2.  **Cluster Auto Scaling (Instance Level - EC2 only):** Adds more EC2 instances to the cluster when there isn't enough capacity to place new tasks. This is managed by **ECS Capacity Providers**.

#### 5. Event-Driven ECS
ECS integrates deeply with **Amazon EventBridge** to automate workflows:
* **Scheduled Tasks:** Run a task like a "Cron job" (e.g., every night at 2 AM).
* **Event-Triggered:** Run a task based on an S3 upload or a specific system state change.
* **Monitoring:** Use EventBridge to catch "Stopped Tasks" and send a notification (SNS) to alert DevOps engineers of a failure.

### SAA Exam "Cheat Sheet" Summary

| If the requirement is...                                | Use This Service/Feature:                           |
| :------------------------------------------------------ | :-------------------------------------------------- |
| "Minimize operational overhead (Serverless)."           | **ECS Fargate**                                     |
| "Persistent shared storage across multiple containers." | **Amazon EFS**                                      |
| "Allow a container to write to a DynamoDB table."       | **ECS Task Role**                                   |
| "Scale tasks based on the number of hits to a website." | **ALB Request Count Per Target**                    |
| "Run a batch job every Sunday at midnight."             | **EventBridge Schedule** $\rightarrow$ **ECS Task** |
##### References
