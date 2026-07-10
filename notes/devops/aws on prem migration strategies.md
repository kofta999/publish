2026-03-24 22:49
Tags: #cloud/aws/dr 
##### Content
For hybrid environments or customers planning a migration, AWS provides several specialized services.

*   **VM Import / Export:** Migrate existing applications into EC2, create a DR repository strategy for on-premises VMs, or export VMs from EC2 back to your on-premises environment.
*   **AWS Application Discovery Service:** Helps plan complex migration projects by gathering information about your on-premises servers, such as utilization data and dependency mappings.
    *   *Agentless Discovery:* Collects VM inventory, configuration, and performance history (CPU, memory, disk usage).
    *   *Agent-based Discovery:* Collects deeper system configuration, running processes, and network details.
*   **AWS Migration Hub:** A central location to track the progress of your migrations.
*   **AWS Application Migration Service (MGN):** Performs incremental replication of on-premises live servers to AWS.
*   **VMware Cloud on AWS:** Allows you to extend your on-premises VMware Data Center capacity to AWS while continuing to use your existing VMware vSphere software to manage it.

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Quickly recover physical or virtual on-premises servers into AWS with continuous block-level replication." | **AWS Elastic Disaster Recovery (DRS)** |
| "Migrate a live production database to AWS with near-zero downtime." | **AWS DMS (Database Migration Service)** |
| "Migrate an on-premises Microsoft SQL Server to Amazon Aurora MySQL." | **AWS DMS + AWS Schema Conversion Tool (SCT)** |
| "Map out on-premises server dependencies and utilization to plan a large-scale cloud migration." | **AWS Application Discovery Service** |
| "Migrate on-premises VMs to AWS as EC2 AMIs, or export EC2 instances back to on-premises virtualization." | **AWS VM Import / Export** |
| "Extend an existing on-premises data center to AWS without changing the virtualization software." | **VMware Cloud on AWS** |



##### References
