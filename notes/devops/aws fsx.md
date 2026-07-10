2026-03-20 16:20
Tags: #cloud/aws/storage 
##### Content
### Amazon FSx Overview
Amazon FSx makes it easy and cost-effective to launch, run, and scale feature-rich, high-performance file systems in the cloud. It supports four widely used file systems: **Windows File Server**, **Lustre**, **NetApp ONTAP**, and **OpenZFS**.

---
#### 1. FSx for Windows File Server
A fully managed native Windows file system. It is the go-to choice for migrating Windows-based applications to AWS.
* **Protocols:** Supports **SMB** and Windows **NTFS**.
* **Integration:** Seamlessly integrates with **Microsoft Active Directory** for security and ACLs.
* **Features:** Supports **DFS Namespaces** (grouping multiple file systems under one path).
* **High Availability:** Can be deployed as **Multi-AZ** for automatic failover.
* **Performance:** Scales to tens of GB/s and millions of IOPS using either **SSD** (databases/analytics) or **HDD** (home directories/CMS).

---
#### 2. FSx for Lustre
Lustre is a parallel distributed file system designed for compute-intensive workloads ("Linux" + "Cluster").
* **Use Cases:** Machine Learning, **High Performance Computing (HPC)**, and Video Processing.
* **S3 Integration:** Can link directly to an S3 bucket. You can "read S3" as a file system, process the data, and write the output back to S3.
* **Deployment Options:**
    * **Scratch:** High burst, no replication. Best for **temporary/short-term** cost-optimized processing.
    * **Persistent:** Data is replicated within an AZ. Best for **long-term** sensitive data processing.

---
#### 3. FSx for NetApp ONTAP
A managed version of the popular NetApp ONTAP storage software.
* **Multi-Protocol:** Simultaneously supports **NFS, SMB, and iSCSI**.
* **OS Support:** Works with Linux, Windows, MacOS, and VMware Cloud on AWS.
* **Efficiency:** Features built-in **compression, de-duplication**, and **instantaneous cloning** (perfect for testing/staging).
* **Scaling:** Storage capacity grows and shrinks automatically.

---
#### 4. FSx for OpenZFS
A managed file system based on the open-source ZFS file system.
* **Protocol:** Compatible with **NFS** (v3 through v4.2).
* **Performance:** Ultra-low latency (**< 0.5ms**) and up to 1,000,000 IOPS.
* **Use Case:** Migrating specialized ZFS-based workloads from on-premises to AWS with high performance and snapshot capabilities.

---

### SAA Exam "Cheat Sheet" Summary

| File System Type        | Target Use Case / Keyword                      | Key Protocol    |
| :---------------------- | :--------------------------------------------- | :-------------- |
| **Windows File Server** | **Active Directory**, SMB, Windows apps.       | SMB / NTFS      |
| **Lustre**              | **HPC**, Machine Learning, **S3 integration**. | Lustre          |
| **NetApp ONTAP**        | Migrating **NAS/ONTAP**, iSCSI support.        | NFS, SMB, iSCSI |
| **OpenZFS**             | ZFS migration, ultra-low latency NFS.          | NFS             |

---

#### Comparison: FSx vs. EFS
* **EFS:** Native AWS Linux-only file system (NFS). Scales automatically. No Windows/SMB support.
* **FSx:** Specialized 3rd party file systems. Use when you need **Windows (SMB)**, **High Performance (Lustre)**, or specific **Enterprise features (NetApp)**.
##### References
