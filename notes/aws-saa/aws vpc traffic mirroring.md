2026-03-25 15:06
Tags: #cloud/aws/networking 
##### Content
### VPC Traffic Mirroring
VPC Traffic Mirroring allows you to **capture and inspect network traffic** flowing through your VPC. Once captured, this traffic is routed to security appliances that you manage for further analysis.

#### Core Components & Configuration
*   **Source:** Traffic is captured directly from Elastic Network Interfaces (**ENIs**).
*   **Target:** The captured traffic can be routed to either another **ENI** or a **Network Load Balancer**.
*   **Scope:** The source and target can reside in the **same VPC**, or they can be in **different VPCs** connected via VPC Peering.
*   **Filtering:** You have the flexibility to capture **all packets** or apply filters to only capture packets of interest. You can also optionally **truncate packets**.

#### Use Cases
Because it provides a deep look at the actual packets (unlike VPC Flow Logs, which only provide metadata), Traffic Mirroring is used for:
*   **Content inspection**.
*   **Threat monitoring**.
*   **Troubleshooting** complex network issues.

![[Pasted image 20260325150655.png|261]]

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Capture and inspect network traffic from specific EC2 instances for deep packet analysis." | **VPC Traffic Mirroring** |
| "Route copied network traffic to a fleet of custom security appliances behind a load balancer." | **VPC Traffic Mirroring with a Network Load Balancer as the target** |
| "Send monitored network traffic from an ENI in VPC A to a security appliance located in VPC B." | **VPC Traffic Mirroring + VPC Peering** |

##### References
