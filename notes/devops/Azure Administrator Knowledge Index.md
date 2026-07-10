# Azure Administrator Knowledge Index
## Links
- [Official Microsoft's Practice Exam](https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications)
- [Another Practice Exam](https://examready.training/en/certifications/azure-administrator-az-104/) use [[random ahh script|this]] script to randomize questions
- [Reddit Tips (check other posts too)](https://www.reddit.com/r/AzureCertification/comments/1obypd0/how_i_passed_the_az104_as_a_20_year_old_with_no/)
- [John Savill's AZ-104 Playlist](https://www.youtube.com/playlist?list=PLlVtbbG169nGlGPWs9xaLKT1KfwqREHbs)
- [John Savill's Azure Master Class](https://www.youtube.com/playlist?list=PLlVtbbG169nGccbp8VSpAozu3w9xSQJoY)
- [Azure Master Class GitHub Repo](https://github.com/johnthebrit/AzureMasterClass)
- [Microsoft Learn Playlist](https://www.youtube.com/playlist?list=PLahhVEj9XNTcj4dwEwRHozO3xcxI_UHYG)
- [Microsoft Learn Full Course](https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/?practice-assessment-type=certification)
- [Microsoft Official Labs](https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/)
- [Mohamed Zohdy Course](https://www.youtube.com/playlist?list=PLDxVq3TlR9y1FFb1ZsVPalKbF79WvbAzS)
- [iTi Exam Dumps](https://drive.google.com/drive/folders/1-BlMEFS1m64-bLx4hLAl9ATHWRrjlgyr?usp=sharing)
- [Exam Dumps Website]([Exams | Examprepper](https://www.examprepper.co/exams))

---
## Identity
- [[azure identity fundamentals]]
- [[azure entra id overview]]
- [[azure entra id objects]]
- [[entra id hybrid identity and ad sync]]
- [[entra id authentication and mfa]]
- [[entra id securing registration and sspr]]
- [[entra id roles and administrative units]]
- [[entra id privileged identity management]]
- [[entra id permissions management and access reviews]]
- [[entra id conditional access]]
- [[entra id b2b and external id]]
- [[entra id managing licences]]

## Governance
- [[azure governance fundamentals]]
- [[azure management hierarchy and subscriptions]]
- [[azure resource groups and tagging]]
- [[azure rbac and abac]]
- [[azure resource manager]]
- [[azure policy]]
- [[azure resource locking]]
- [[azure cost management and optimization]]

## Storage
- [[azure storage account basics and redundancy]]
- [[azure storage account redundancy and object replication]]
- [[azure storage pricing and tiering models]]
- [[azure blob and data lakes]]
- [[azure files and file sync]]
- [[azure storage security and access control]]
- [[azure managed disks and vm storage]]
- [[azure elastic san and netapp files]]

## Networking
- [[azure vnet fundementals and ip addressing]]
- [[azure external access and outbound connectivity]]
- [[azure vnet connectivity peering and vpn]]
- [[azure expressroute]]
- [[azure traffic control nsg asg udr]]
- [[azure firewall vwan and vnet manager]]
- [[azure service endpoints private link and dns]]
- [[azure network virtual appliances]]
- [[azure application gateway]]
- [[azure load balancer]]

## Compute
#### VM and VMSS
- [[azure vm series and families]]
- [[azure burstable vms]]
- [[azure vm generations]]
- [[azure vm building blocks]]
- [[azure specialized vms hpc and infiniband]]
- [[azure vm only child options]]
- [[azure vm maintenance]]
- [[azure vm patching]]
- [[azure compute gallery]]
- [[azure vmware solution]]
- [[azure virtual machine scale set]]
- [[azure compute fleet]]
#### Containers and App Services
- [[azure containers and container instances]]
- [[azure kubernetes service]]
- [[azure container apps]]
- [[azure app service]]
- [[azure functions and logic apps]] 

## Others
- [[azure backup and restore]]
- [[azure log analytics workspaces]]

---
### Currently Missing Skills
- [ ] ARM Templates details
- [ ] Azure Powershell
- [ ] Monitoring, alerts, action groups
- [ ] DR

---
# Admin Skills
##### Phase 1: Basic Administration (The "Portal" Skills)
- [x] **User Management:** Create, delete, and invite guest users. Understand how to restore a deleted user (within 30 days).
- [x] **Bulk Operations:** Be able to use the **CSV templates** in the Portal to create or invite users in bulk.
- [x] **Group Management:** Create Security and Microsoft 365 groups. Practice creating a **Dynamic Group** based on a rule (e.g., `(user.department -eq "Sales")`).
- [x] **Administrative Units:** Create an AU and assign a "User Administrator" role scoped *only* to that AU.
- [x] **License Assignment:** Assign Entra ID P1/P2 licenses to individual users and groups.

##### Phase 2: Security & Governance
- [x] **SSPR Setup:** Enable Self-Service Password Reset for a specific group and configure the required number of authentication methods.
- [ ] **MFA Configuration:** Enable MFA for a test user and understand how to "Require re-register MFA" for a compromised account.
- [ ] **Conditional Access (CA):** Create a policy that "Blocks access for all users if they are outside the country" or "Requires MFA if the user is using a specific cloud app."
- [x] **Role-Based Access Control (RBAC):** Assign a "Contributor" role to a user for a specific Resource Group.

##### Phase 3: Identity Lifecycle
- [ ] **Managed Identities:** Enable a **System-Assigned** identity on a Virtual Machine and understand how it appears in Entra ID.
- [ ] **PIM Activation:** Configure a role as "Eligible" for a user and then walk through the "Activation" process (requesting time-limited access).
- [ ] **Access Reviews:** Set up a review for a group to ask owners if members still need access.

##### Phase 4: Hybrid & CLI (The "Pro" Level)
- [ ] **Sync Monitoring:** Check the status of the **Microsoft Entra Connect Sync** to ensure on-prem identities are reaching the cloud.
- [ ] **PowerShell Basics:** Be able to list all users using the command `Get-MgUser` (Microsoft Graph) or `Get-AzADUser`.

##### Phase 5: Governance & Resource Management (The "Admin" Tasks)

###### 1. Hierarchy & Subscription Management
* [x] **Management Groups:** Create a new Management Group and move an existing subscription into it.
* *Path:* `Management Groups > + Create` then `Details > Add Subscription`.
* [x] **Resource Movement:** Move a Resource (e.g., a Storage Account) from `RG-A` to `RG-B`.
* **Exam Trap:** Understand that the Resource ID changes after a move, which can break scripts or automation that reference the hardcoded ID.
* [x] **Tagging Enforcement:** Assign a tag to a Resource Group and use **Azure Policy** to ensure all resources created inside it inherit that tag.

###### 2. Policy & Compliance
* [ ] **Assign an Initiative:** Assign the "NIST 800-53" or "ISO 27001" built-in initiative to a subscription.
* [ ] **Policy Remediation:** Create a policy assignment with the `DeployIfNotExist` effect (e.g., "Deploy Log Analytics agent to VMs"). Then, manually trigger a **Remediation Task** for resources that were already deployed and are non-compliant.
* [ ] **Compliance Dashboard:** Use the Policy dashboard to identify "Non-compliant" resources and explain *why* they failed (e.g., missing specific tags or incorrect SKUs).

###### 3. Cost Control & Protection
* [ ] **Budgets & Alerts:** Create a budget for a Resource Group. Set an alert to email you at **80% of actual spend** and a separate alert for **100% of forecasted spend**.
* [x] **Resource Locks:** Apply a `CanNotDelete` lock to a production RG. Try to delete a resource inside it to verify the error message.
* **Admin Task:** Practice deleting the lock before deleting the resource; remember only Owners/User Access Admins can do this.
* [x] **Exporting Templates:** Go to a Resource Group, select **Export Template**, and understand how to download the JSON. This is key for learning how to redeploy environments.

##### Phase 6: Pro-Level Governance (CLI & Monitoring)
* [x] **Activity Logs:** Use the **Activity Log** to find out *who* deleted a specific resource in the last 7 days.
* [ ] **Resource Graph Explorer:** Run a basic Kusto (KQL) query to list all resources of a certain type across multiple subscriptions.
* *Example:* `resources | where type == "microsoft.compute/virtualmachines" | project name, location`
* [x] **CLI Governance:** Be able to apply a lock via CLI:
* `az lock create --name LockSite --lock-type CanNotDelete --resource-group MyResourceGroup`

##### Phase 7: Storage Provisioning and Redundancy
- [x] **Create a Storage Account (GPv2):** Configure basics including Region, Performance (Standard/Premium), and Redundancy (LRS/GRS/ZRS).
- [x] **Change Redundancy:** Practice converting an account from **LRS to GRS** and understand why you might need a manual "Live Migration" for other conversions.
- [ ] **Configure Object Replication:** Set up replication for a specific container between two different storage accounts.
    - _Dependency:_ Remember you must enable **Blob Versioning** and **Change Feed** first.
- [ ] **Enable Hierarchical Namespace:** Create a storage account with this enabled to explore **Azure Data Lake Storage (ADLS) Gen2** features.

##### Phase 8: Blob and File Management
- [ ] **Blob Tiering:** Manually change the access tier of a blob from **Hot to Archive** and then practice the **Rehydration** process (setting it back to Hot/Cool).
- [x] **Lifecycle Management:** Create a rule to automatically move blobs to **Cool** storage if they haven't been modified in 30 days and to **Archive** after 90 days.
- [ ] **Azure File Share:** Create a file share and "Mount" it to a local machine or a VM using the provided connection script.
- [ ] **Azure File Sync:** Deploy a **Storage Sync Service**, create a **Sync Group**, and register a "Server Endpoint" (requires a Windows Server agent).

##### Phase 9: Storage Security & Networking
- [ ] **Shared Access Signatures (SAS):** Generate a **Service SAS** for a specific container with "Read-only" permissions and an expiry time of 2 hours. Test the URL in a browser.
- [ ] **Access Key Rotation:** Practice "Regenerating" Key 2 while Key 1 is in use to understand the zero-downtime rotation strategy.
- [ ] **Storage Firewall:** Restrict a storage account so it is _only_ accessible from a specific **Virtual Network (VNet)** or a specific **Public IP address**.
- [ ] **Private Endpoints:** Configure a Private Endpoint for a storage account so it receives a private IP from your VNet.
- [ ] **Stored Access Policies:** Create a policy for a container and associate a SAS token with it. Practice "revoking" access by deleting the policy.

##### Phase 10: Managed Disks and Data Protection
- [ ] **Disk Performance Tiering:** Change the performance tier of a **Premium SSD (v1)** without resizing the disk.
- [x] **Soft Delete & Versioning:** Enable both features on a container. Delete a blob and then use the "Show deleted blobs" toggle to restore it.
- [ ] **Immutable Storage:** Configure a **Time-based retention policy** on a container to prevent any deletions for a set period.
- [ ] **Storage Explorer:** Download and use the **Azure Storage Explorer** desktop app to upload a large folder and manage ACLs.

##### Phase 11: CLI & PowerShell (Pro Skills)
- [ ] **AzCopy:** Use the `azcopy copy` command to move data from a local folder to an Azure Blob container.
- [ ] **CLI Storage Creation:** * `az storage account create --name <name> --resource-group <rg> --location <location> --sku Standard_LRS`

##### Phase 12: Virtual Networking
* [x] **VNet Peering:** Create a peering between two VNets and verify connectivity. Practice enabling "Gateway Transit."
* [x] **NSG Rules:** Create an NSG and a rule using an **Application Security Group (ASG)** as the source.
* [x] **Routing (UDR):** Create a Route Table and a route with a "Next Hop" of "Virtual Appliance."
* [ ] **NAT Gateway:** Deploy a NAT Gateway and associate it with a subnet to provide outbound internet access.
* [ ] **VPN Gateway:** Set up a Point-to-Site VPN and connect your local machine to an Azure VNet.
* [ ] **Private Endpoint:** Create a Private Endpoint for a Storage Account and verify that you can no longer access it via its Public IP.
* [x] **DNS Zones:** Create a Private DNS Zone, link it to a VNet, and create an 'A' record for a VM.
