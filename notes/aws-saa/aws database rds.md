2026-03-14 14:34
Tags: #cloud/aws/databases 
##### Content
RDS (Relational Database Service) is a managed service that simplifies the setup, operation, and scaling of relational databases in the AWS Cloud using SQL as the query language.

#### 1. Supported Engines
* **Open Source:** MySQL, PostgreSQL, MariaDB.
* **Commercial:** Oracle, Microsoft SQL Server, IBM DB2.
* **AWS Proprietary:** **Amazon Aurora** (MySQL and PostgreSQL compatible).

#### 2. RDS vs. DB on EC2 (The "Managed" Advantage)
When you run a database on EC2, you manage everything (OS, DB software, backups). With RDS, AWS handles the "undifferentiated heavy lifting."

| Feature                     | RDS (Managed)                        | DB on EC2 (Self-Managed)           |
| --------------------------- | ------------------------------------ | ---------------------------------- |
| **Provisioning & Patching** | Automated (OS & DB)                  | Manual                             |
| **Backups**                 | Automated + Point-in-Time Restore    | Manual setup                       |
| **High Availability**       | Multi-AZ (One-click setup)           | Complex manual replication         |
| **Scaling**                 | Vertical & Horizontal (Push-button)  | Manual hardware/instance migration |
| **Access**                  | **No SSH access** (API/Console only) | Full Root/SSH access               |

### RDS Storage Auto Scaling
RDS can dynamically increase its storage capacity so you don't have to manually monitor disk space or worry about "Out of Space" errors.

**How it Works:**
* **Detection:** RDS monitors your free space. It triggers a scale-up if:
	1. Free storage is **less than 10%** of allocated storage.
	2. This low-storage condition lasts for at least **5 minutes**.
	3. At least **6 hours** have passed since the last storage modification.
* **Configuration:** You must define a **Maximum Storage Threshold** to prevent runaway costs.
* **Engines:** Supported by all RDS engines.
* **Use Case:** Critical for applications with unpredictable data growth or large batch imports.

### RDS Custom
- Managed Oracle and SQL Server Database with **OS and database customization**
- **You can:**
	- Configure DB settings
	- Install patches
	- Enable native features
	- Access the underlying EC2 instance using **SSH** or **SSM Session Manager**
- **De-activate Automation Mode** to perform your customization

### Important Technical Details
* **Storage Backend:** RDS uses **EBS (Elastic Block Store)** for its volumes.
	* *Note:* Because it's EBS-backed, you can choose between General Purpose (gp2/gp3) or Provisioned IOPS (io1) depending on your performance needs.
* **Maintenance Windows:** You can define a specific time block (e.g., Sunday at 3 AM) when AWS is allowed to perform engine updates or OS patching.
* **Point-in-Time Restore (PITR):** Allows you to restore your database to any second during your retention period (up to 35 days).

##### References
