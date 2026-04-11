2026-03-25 21:00
Tags: #cloud/aws 
##### Content
The cloud provides a flexible environment for HPC workloads (such as genomics, financial risk modeling, weather prediction, and machine learning) by allowing you to instantly provision vast amounts of resources and pay only for what you use. 

#### Data Management & Transfer
To perform HPC, you often need to move massive datasets into the cloud.
*   **AWS Direct Connect:** Moves data at GB/s over a private, secure network.
*   **AWS Snowball & Snowmobile:** Used to physically migrate Petabytes of data.
*   **AWS DataSync:** Automates moving large amounts of data between on-premises servers and AWS storage (S3, EFS, FSx).

#### Compute & Networking
*   **EC2 Instances & Purchasing:** Use CPU or GPU-optimized instances, and leverage **Spot Instances / Spot Fleets** combined with Auto Scaling for extreme cost savings.
*   **EC2 Placement Groups (Cluster):** Deploy your instances in a **Cluster Placement Group** (same rack, same AZ) to ensure the lowest possible latency and 10 Gbps network performance.
*   **Enhanced Networking (SR-IOV):** Provides higher bandwidth and lower latency. You can use the **Elastic Network Adapter (ENA)** for speeds up to 100 Gbps.
*   **Elastic Fabric Adapter (EFA):** An improved ENA built specifically for HPC. 
    *   It bypasses the underlying Linux OS to provide highly reliable, ultra-low latency transport.
    *   It is strictly for **Linux** and is ideal for tightly coupled workloads that leverage the **Message Passing Interface (MPI)** standard for inter-node communications.

#### Storage Architectures
HPC requires storage that can keep up with massive parallel compute demands.
*   **Instance-Attached:** Use **Instance Store** for millions of IOPS (ephemeral, low latency) or **EBS io2 Block Express** which scales up to 256,000 IOPS.
*   **Network Storage:** 
    *   **Amazon FSx for Lustre:** An HPC-optimized distributed file system capable of millions of IOPS. Crucially, it can seamlessly integrate with and be **backed by Amazon S3**.

#### Automation & Orchestration
*   **AWS Batch:** A fully managed service that allows you to easily schedule jobs and automatically launch EC2/Spot instances. It specifically supports **multi-node parallel jobs**, allowing a single job to span across multiple EC2 instances.
*   **AWS ParallelCluster:** An open-source cluster management tool used to deploy HPC environments on AWS. 
    *   It uses simple **text files** to automate the creation of your VPC, subnets, cluster type, and instance types.
    *   It automatically supports enabling **EFA** on the cluster for improved network performance.


### SAA Exam "Scenario" Table

| If the requirement is...                                                                                      | Use This Strategy:               |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------- |
| "Run tightly coupled HPC workloads requiring MPI and ultra-low latency inter-node communication."             | **Elastic Fabric Adapter (EFA)** |
| "Deploy a high-performance, distributed file system backed by Amazon S3 for an HPC workload."                 | **Amazon FSx for Lustre**        |
| "Easily schedule and run a multi-node parallel job that spans multiple EC2 instances."                        | **AWS Batch**                    |
| "Automate the deployment of a complete HPC cluster (VPC, subnets, instances) using text configuration files." | **AWS ParallelCluster**          |
| "Ensure the lowest possible network latency and highest throughput between EC2 instances in an HPC cluster."  | **EC2 Cluster Placement Group**  |

##### References
