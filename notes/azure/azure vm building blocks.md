2025-12-28 18:38
Tags: #azure
##### Content
### VM Building Blocks: Mandatory vs. Optional

When deploying an IaaS Virtual Machine, Azure assembles several distinct resources.

### Mandatory (Required to Boot)
* **Compute Resource (VM):** The CPU/RAM metadata.
* **NIC (Network Interface Card):** At least one is required.
* **OS Disk:** A managed disk containing the boot loader and OS.
* **Virtual Network (VNet):** The VM must be placed in a Subnet.

### Optional (But Recommended)
* **Public IP Address:** Only needed if the VM must be reachable directly from the internet. (Use Bastion instead).
* **Data Disks:** Managed disks for application data (removes risk of filling the OS disk).
* **NSG (Network Security Group):** Technically optional, but the VM is "insecure by default" or unreachable without it.
* **Extensions:** Custom Script Extensions, Antimalware, or Azure Monitor Agents.
* **Managed Identity:** Required for the VM to securely access other Azure resources (Key Vault, Storage) without storing passwords.

### The "Free" Block
* **Temp Disk (D: on Windows / /dev/sdb on Linux):** Most VM sizes include a local "temporary" disk. 
* **Warning:** Data on the Temp disk is **not persistent**. It is lost during deallocation or hardware failure.

##### References
[[compute]]