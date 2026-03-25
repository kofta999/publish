2026-03-24 12:04
Tags: #cloud/aws/iam 
##### Content
AWS Directory Service provides multiple ways to use Microsoft Active Directory (AD) with other AWS services. For the SAA-C03 exam, the "Golden Rule" is knowing when to **migrate** (Managed AD), when to **proxy** (AD Connector), and when to go **standalone** (Simple AD).

#### 1. AWS Managed Microsoft AD
This is a **real Microsoft Active Directory** running on Windows Server, managed by AWS.
* **Redundancy:** Deployed across two Availability Zones (AZs) by default.
* **Trust Relationships:** This is the *only* option that supports a **Trust Relationship** (One-way or Two-way) with your on-premises AD.
    * *Use Case:* You want to keep your users on-premises but allow them to log in to AWS resources using their existing corporate credentials.
* **Features:** Supports Group Policy Objects (GPOs), Kerberos, and MFA.

#### 2. AD Connector
The AD Connector is a **directory gateway (proxy)**. It does **not** store any user data and does **not** cache credentials.
* **Mechanism:** It redirects directory requests to your on-premises Microsoft Active Directory.
* **Use Case:** Best when you want to continue managing all users strictly on-premises and don't want the overhead of a complex Trust Relationship or a managed instance in the cloud.
* **Requirement:** Requires a VPN or Direct Connect to reach your on-premises domain controllers.

#### 3. Simple AD
A standalone, managed directory based on **Samba 4**. 
* **Compatibility:** Supports basic AD features like joining domains and managing users/groups.
* **Limitation:** **Cannot** establish trust relationships with on-premises AD. It is strictly for small, simple workloads that need basic AD functionality without the cost of a full Microsoft license.

---

### IAM Identity Center + Active Directory
When setting up **IAM Identity Center** with an existing directory, your choice of Directory Service determines the workflow:

| Identity Source | Integration Method |
| :--- | :--- |
| **AWS Managed Microsoft AD** | **Direct/Native:** Identity Center connects directly to the managed directory. |
| **Self-Managed (On-Prem) AD** | **Two-Way Trust:** Use AWS Managed AD as a bridge with a trust relationship. |
| **Self-Managed (On-Prem) AD** | **AD Connector:** Use the connector as a proxy to reach your local servers. |


### SAA Exam "Scenario" Table

| If the requirement is...                                                     | Use This Service:                            |
| :--------------------------------------------------------------------------- | :------------------------------------------- |
| "A managed AD in AWS that can share resources with an on-premises AD."       | **AWS Managed Microsoft AD (Trust)**         |
| "A low-cost, standalone AD-compatible directory for a few Linux instances."  | **Simple AD**                                |
| "Provide SSO to AWS for on-premises users without migrating their data."     | **AD Connector**                             |
| "Support MFA for on-premises users logging into the AWS Management Console." | **AD Connector** or **Managed Microsoft AD** |
| "Enable RDS for SQL Server to use Windows Authentication for on-prem users." | **AWS Managed Microsoft AD (Trust)**         |

##### References
