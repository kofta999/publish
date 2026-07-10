2025-12-28 18:43
Tags: #cloud/azure
##### Content
### VM Maintenance: Planned vs. Unplanned

Availability is managed differently depending on whether the "interruption" is expected or a surprise.

### 1. Unplanned Maintenance
* **Hardware Failure:** If a physical component (disk, power) fails, Azure uses **Service Healing**. It automatically migrates the VM to a healthy host. 
* **Unexpected Downtime:** The VM reboots, and you lose the data on the **Temp Disk**.

### 2. Planned Maintenance
* **Updates:** Microsoft periodically updates the underlying fabric (Hyper-V).
* **Maintenance Window:** For most updates, Azure performs "In-place updates" (no reboot).
* **Self-Service Window:** If a reboot *is* required, Azure gives you a 30-day window to trigger the reboot yourself at a convenient time. If you don't, Azure will force the reboot at the end of the window.

### 3. Availability Strategy (The SLA Hierarchy)
To protect against these events, use the following:
* **Availability Sets:** Protects against hardware failure within a single datacenter.
    * **Fault Domains (FD):** Different physical racks (Shared power/network). Max **3 domains**
    * **Update Domains (UD):** Logical groups for patching (Only one UD reboots at a time). **20 domains**
* **Availability Zones (AZ):** Protects against an entire datacenter failure (Unique power/cooling/network within a region).
* **Region Pairs:** Protects against a full region outage (geographically separated).

### Exam-Trap: Proximity Placement Groups (PPG)
While Availability Sets/Zones spread VMs apart for safety, a **PPG** forces VMs to be as close as possible (same spine switch) to reduce **latency**. This is the opposite of an Availability Set's goal.

##### References
[[compute]]