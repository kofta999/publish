2026-03-24 23:03
Tags: #cloud/aws/dr 
##### Content
### AWS Application Discovery Service
AWS Application Discovery Service helps you plan complex migration projects by gathering information about your on-premises data centers.

*   **Why use it:** It maps out server dependencies and collects server utilization data, which are critical for planning migrations.
*   **Integration:** The resulting data can be tracked and viewed directly within the **AWS Migration Hub**.
*   **Two Discovery Modes:**
    *   **Agentless Discovery (Connector):** Collects VM inventory, configuration, and performance history (like CPU, memory, and disk usage) without installing software directly on the VMs.
    *   **Agent-based Discovery (Agent):** Installed directly on servers to collect deeper metrics, including system configuration, system performance, running processes, and details of the **network connections between systems**.


#### AWS Application Migration Service (MGN)
AWS Application Migration Service (MGN) is a **lift-and-shift (rehost)** solution that simplifies migrating applications to AWS. It is the "AWS evolution" of CloudEndure Migration and fully replaces the older AWS Server Migration Service (SMS).

*   **How it works:** It converts your physical, virtual, and cloud-based servers to run natively on AWS by performing **incremental, continuous replication** of your live on-premises servers.
*   **Architecture:**
    *   An **AWS Replication Agent** on the source server constantly replicates data (OS, Apps, DBs, Disks) to a **Staging Area** in AWS.
    *   The staging area uses low-cost EC2 instances and EBS volumes to reduce costs.
    *   When you are ready, you perform a **cutover**, which launches fully-provisioned target EC2 instances and EBS volumes in your production environment with **minimal downtime**.


![[Pasted image 20260324230435.png]]

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Plan a migration by mapping server dependencies and analyzing network connections between on-premises systems." | **AWS Application Discovery Service (Agent-based)** |
| "Gather basic VM inventory, CPU, and memory usage for an on-premises data center without installing agents." | **AWS Application Discovery Service (Agentless Connector)** |
| "Lift-and-shift hundreds of on-premises servers to AWS with continuous replication and minimal downtime." | **AWS Application Migration Service (MGN)** |
| "View and track the progress of your application migrations and discovery data in a central location." | **AWS Migration Hub** |

##### References
