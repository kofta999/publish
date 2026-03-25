2026-03-23 22:43
Tags: #cloud/aws/monitoring 
##### Content
This is a specific "High Availability" feature in CloudWatch.
* **Status Checks:**
    * **System Status Check:** Monitors the underlying AWS hardware.
    * **Instance Status Check:** Monitors the software/network configuration of your VM.
* **Recovery Action:** If the **System Status Check** fails (hardware issue), a CloudWatch Alarm can automatically move your instance to new hardware.
    * **Preserved:** It keeps the same **Private/Public IP**, **Elastic IP**, **Metadata**, and **Placement Group**.

##### References
