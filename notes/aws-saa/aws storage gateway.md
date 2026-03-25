2026-03-20 16:26
Tags:  #cloud/aws/storage 
##### Content
### AWS Storage Gateway
AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. It acts as a **bridge** between your local data center and AWS.

---
#### 1. S3 File Gateway
Provides a file-level interface to store files as objects in Amazon S3.
* **Protocols:** Supports **NFS** (Linux) and **SMB** (Windows).
* **Caching:** Recently used data is cached locally for low-latency access.
* **Tiers:** Supports all S3 storage classes (Standard, IA, Intelligent-Tiering). You can use **S3 Lifecycle Policies** to transition data to Glacier.
* **Security:** Supports **IAM Roles** for bucket access and **Active Directory (AD)** integration for SMB user authentication.
* **Use Case:** "Cloud-extending" local file shares or migrating on-premises backups to S3.

---
#### 2. Volume Gateway
Provides block storage volumes using the **iSCSI** protocol, backed by S3. It essentially creates "cloud-backed" local hard drives.
* **Stored Volumes:** The **entire dataset** is stored on-premises. The gateway periodically takes snapshots and stores them in S3 as **EBS Snapshots**. (Best for local performance with cloud backup).
* **Cached Volumes:** Only the **frequently accessed data** is stored locally; the full dataset is in S3. (Best for saving on-premises hardware costs while maintaining speed).
* **Recovery:** Snapshots can be restored as on-premises volumes or directly as **EBS Volumes** to be attached to EC2 instances.

---
#### 3. Tape Gateway
For organizations with legacy backup workflows that use physical tapes.
* **Mechanism:** Replaces physical tape libraries with a **Virtual Tape Library (VTL)**.
* **Storage:** Data is backed by **Amazon S3** (for active tapes) and **Amazon S3 Glacier/Deep Archive** (for archived tapes).
* **Integration:** Uses the **iSCSI** interface to work with existing backup software (like Veeam, Veritas, or Dell EMC).
* **Benefit:** Eliminates the cost of managing physical tapes and offsite vaulting facilities.

---
### SAA Exam "Scenario" Table

| If the requirement is... | Use This Gateway Type: |
| :--- | :--- |
| "Access S3 objects as a local file share (NFS/SMB)." | **S3 File Gateway** |
| "Low-latency block storage for on-premises servers." | **Volume Gateway (Cached)** |
| "Replace physical tapes but keep the same backup software." | **Tape Gateway** |
| "Store local backups in S3 while keeping the full copy local." | **Volume Gateway (Stored)** |

---
### Comparison: Storage Gateway vs. FSx
* **FSx:** Use when you need a **high-performance** cloud-native file system (Lustre, NetApp, Windows) primarily for EC2/Cloud workloads.
* **Storage Gateway:** Use when you need to **bridge on-premises** servers to AWS storage (S3/EBS).


![[Pasted image 20260320163405.png]]

##### References
