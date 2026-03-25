2026-03-20 16:42
Tags: #cloud/aws/storage 
##### Content
### AWS Transfer Family & AWS DataSync
For the SAA-C03 exam, you must distinguish between **Transfer Family** (providing a standardized interface for users/clients) and **DataSync** (automating large-scale data migrations between storage systems).

---
#### 1. AWS Transfer Family
A fully managed service that allows you to move files into and out of **Amazon S3** or **Amazon EFS** using legacy file transfer protocols.

* **Supported Protocols:**
    * **SFTP** (Secure Shell File Transfer Protocol) - *Most common for secure transfers.*
    * **FTPS** (FTP over SSL).
    * **FTP** (File Transfer Protocol).
* **Authentication:** 
	* Store credentials natively within the service.
    * Integrate with **Active Directory**, LDAP, Okta, or **Amazon Cognito**.
* **Use Case:** Providing a "drop zone" for external partners or vendors to upload files using their existing SFTP tools without them needing to learn the AWS CLI or S3 API.

![[Pasted image 20260320164330.png]]

---
#### 2. AWS DataSync
A managed data discovery and transfer service that simplifies and accelerates moving data between on-premises storage and AWS, or between AWS storage services.

* **Core Function:** High-speed data synchronization (migration or replication).
* **Connectivity:**
    * **On-premises to AWS:** Requires an **Agent** installed on a local VM (supports NFS, SMB, HDFS, S3 API).
    * **AWS to AWS:** No agent needed (e.g., migrating data from S3 to EFS or between different FSx types).
* **Targets:** S3 (all classes), EFS, and all flavors of **Amazon FSx** (Windows, Lustre, ONTAP, OpenZFS).
* **Features:**
    * **Scheduling:** Tasks can be automated (hourly, daily, weekly).
    * **Metadata Preservation:** Keeps permissions (POSIX, ACLs) and timestamps intact.
    * **Performance:** A single task can utilize up to **10 Gbps**.

![[Pasted image 20260320164344.png]]

---

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Service: |
| :--- | :--- |
| "Provide an **SFTP endpoint** for external vendors to upload logs to S3." | **AWS Transfer Family** |
| "Migrate 100TB of data from **on-premises NAS** to Amazon EFS." | **AWS DataSync** |
| "Periodically sync data between an **S3 bucket** and an **FSx for Windows** file system." | **AWS DataSync** |
| "Allow users to use their **existing FTP clients** to access EFS files." | **AWS Transfer Family** |

---

### Summary: Transfer Family vs. DataSync vs. Storage Gateway
* **Transfer Family:** A **User Interface** (SFTP/FTP) to interact with S3/EFS.
* **DataSync:** A **Migration Tool** to move data in bulk between systems.
* **Storage Gateway:** A **Hybrid Bridge** to give on-premises servers "local-feeling" access to cloud storage.

##### References
