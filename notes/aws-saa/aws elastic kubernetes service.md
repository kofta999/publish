2026-03-21 14:51
Tags: #cloud/aws/compute 
##### Content
### Amazon EKS (Elastic Kubernetes Service)

Amazon EKS is a managed service that makes it easy for you to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane or nodes. As an aspiring Cloud Architect, think of EKS as the "open-standard" alternative to the AWS-proprietary ECS.
#### 1. Core Concepts & Use Cases
* **Migration:** The primary use case for EKS is when a company is already using Kubernetes elsewhere and wants to migrate to AWS without rewriting their deployment logic.
* **Multi-Region:** Unlike some global services, EKS is regional. To go global, you must deploy one EKS cluster per region.
* **Monitoring:** Use **CloudWatch Container Insights** to collect logs and metrics from your clusters and pods.

![[Pasted image 20260321145321.png]]

#### 2. EKS Node Types (Computing Power)
You have three ways to provide the "muscle" for your Kubernetes pods:

| Node Type               | Management Level | Key Characteristics                                                                                                    |
| :---------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Managed Node Groups** | **AWS Managed**  | EKS creates and updates the EC2 instances (ASG) for you. Supports **Spot Instances** for cost savings.                 |
| **Self-Managed Nodes**  | **User Managed** | You create the EC2 instances and register them to the cluster. Use the **Amazon EKS Optimized AMI** to simplify setup. |
| **AWS Fargate**         | **Serverless**   | No nodes to manage. You pay for the CPU/RAM used by the pods. Best for reducing operational overhead.                  |

#### 3. Data Volumes & Storage
EKS uses the **Container Storage Interface (CSI)** driver to connect pods to AWS storage services. You must specify a `StorageClass` in your Kubernetes manifest.

* **Amazon EBS:** Best for block storage (single-AZ).
* **Amazon EFS:** Ideal for **Multi-AZ** shared storage (required if using **Fargate**).
* **Amazon FSx:** Used for specialized high-performance needs like **Lustre** (HPC/ML) or **NetApp ONTAP** (Enterprise migration).


#### 4. ECS vs. EKS: Which one for the SAA Exam?
This is a frequent architectural decision point on the exam.
* **Choose ECS if:** The goal is simplicity, deep integration with AWS-native services, and the team has no prior Kubernetes experience.
* **Choose EKS if:** The company is already using Kubernetes, wants to avoid "cloud lock-in," or needs the specific advanced features of the Kubernetes ecosystem.

### SAA Exam "Cheat Sheet" Summary

| Requirement                                          | Use This Feature:                           |
| :--------------------------------------------------- | :------------------------------------------ |
| "Migrate a K8s application from on-prem to AWS."     | **Amazon EKS**                              |
| "Run K8s pods without managing EC2 instances."       | **EKS + Fargate**                           |
| "Persistent shared storage for EKS pods across AZs." | **EFS with EKS CSI Driver**                 |
| "Collect detailed performance metrics for K8s."      | **CloudWatch Container Insights**           |
| "Reduce costs for non-critical EKS workloads."       | **Managed Node Groups with Spot Instances** |
##### References
