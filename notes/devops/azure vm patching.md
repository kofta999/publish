2025-12-28 18:44
Tags: #cloud/azure
##### Content
### Patching: Guest OS Orchestration

Managing updates *inside* the VM is an administrative requirement to stay compliant.

### Patching Approaches
1. **Manual:** High effort, high risk. (Avoid for exam).
2. **Automatic Guest Patching:**
    * **Orchestration:** Azure handles the sequence.
    * **Availability-First:** Patches are rolled out to one Availability Set/Zone member at a time.
    * **Critical/Security Only:** It only installs high-priority patches.
3. **Azure Update Manager:**
    * The evolution of "Update Management."
    * Provides a single dashboard for both Azure and Arc-enabled (on-prem) VMs.
    * Allows for custom schedules and "Hotpatching" (applying updates without a reboot—exclusive to **Windows Server Azure Edition**).

### Technical Constraint: 169.254.169.254
The **Instance Metadata Service (IMDS)** is a REST API available at this non-routable IP. The VM can query this to find out if a "Scheduled Event" (like a reboot for maintenance) is coming, allowing your app to gracefully shut down.

##### References
[[compute]]