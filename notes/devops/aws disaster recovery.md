2026-03-24 22:33
Tags: #cloud/aws/dr 
##### Content
Disaster recovery is about preparing for and recovering from any event that negatively impacts a company's business continuity or finances. 
#### Two Key Metrics
*   **RPO (Recovery Point Objective):** Determines how much **data loss** you are willing to tolerate (measured in time, e.g., backing up every hour means an RPO of 1 hour).
*   **RTO (Recovery Time Objective):** Determines how much **downtime** you are willing to tolerate before the system is recovered and accessible again.

### Disaster Recovery Strategies
Strategies are categorized from highest RTO (slowest, cheapest) to lowest RTO (fastest, most expensive).

#### 1. Backup and Restore
*   **How it works:** Data and configurations are regularly backed up to cheaper storage (like Amazon S3, Glacier, or EBS/RDS Snapshots). In a disaster, you manually provision the infrastructure and restore the data.
*   **Cost & Speed:** Cheapest option, but has the highest RTO and RPO.

#### 2. Pilot Light
*   **How it works:** A small version of the application (usually the **critical core**, like the database) is always running in the cloud. Other resources (like EC2 instances for the web tier) are configured but stopped or not running. 
*   **Upon Disaster:** You turn on and scale up the missing pieces (e.g., spin up the EC2 instances).
*   **Benefit:** Faster RTO than Backup and Restore because the critical systems are already up and synced.

#### 3. Warm Standby
*   **How it works:** The **full system is up and running**, but at a **minimum size**.
*   **Upon Disaster:** You scale up the environment to handle full production load (e.g., Auto Scaling kicks in).
*   **Benefit:** Faster recovery than Pilot Light, but costs more since the entire stack is running 24/7.

#### 4. Multi-Site / Hot Site Approach
*   **How it works:** The **full production scale** is running concurrently in two different regions or between On-Premises and AWS (**Active-Active** setup).
*   **Upon Disaster:** Traffic is instantly routed to the healthy site using Route 53.
*   **Benefit:** Very low RTO (minutes or seconds), but it is the most expensive strategy.

---

### Disaster Recovery General Tips
*   **High Availability:** Use Route 53 to migrate DNS from region to region, and rely on Multi-AZ architectures for RDS, ElastiCache, and EFS. Use a Site-to-Site VPN as a backup in case an AWS Direct Connect connection fails.
*   **Replication:** Utilize Cross-Region RDS Replication or Aurora Global Databases for fast database failover.
*   **Automation:** Use CloudFormation or Elastic Beanstalk to quickly recreate a whole new environment. Use CloudWatch alarms to recover or reboot failed EC2 instances automatically.

---

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Lowest possible cost for DR, and the business can tolerate several hours of downtime and data loss." | **Backup and Restore** |
| "Keep the core database running and synced, but leave web/app servers stopped until a disaster occurs to save money." | **Pilot Light** |
| "Maintain a fully functional but scaled-down version of the application that can quickly scale up in a disaster." | **Warm Standby** |
| "Achieve near-zero downtime and zero data loss with an active-active setup across multiple regions." | **Multi-Site / Hot Site** |
| "Ensure a heavily customized EC2 environment can be perfectly replicated in another region if the primary region fails." | **AMI copying / Backup and Restore** |

##### References
