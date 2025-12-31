2025-12-28 11:42
Tags: #azure 
##### Content
### Network Virtual Appliances (NVA)

An NVA is a virtual machine image (typically from the Azure Marketplace) that performs specialized network functions like firewalls, WAN optimization, or routing.

### Common Use Cases
- **Next-Generation Firewalls (NGFW):** Using vendors like Fortinet, Check Point, or Palo Alto for deep packet inspection (L7) that exceeds native Azure Firewall capabilities.
- **SD-WAN Gateways:** Connecting branches to Azure using specialized protocols.
- **Traffic Inspection:** Acting as a "choke point" between the Perimeter (DMZ) and Production subnets.

### Admin Specifics: High Availability Patterns
- **Active-Passive:** One NVA handles traffic while another waits. Requires an API call or Azure Route Server to switch the User Defined Route (UDR) if the primary fails.
- **Active-Active with Load Balancer:** Two NVAs behind an **Internal Load Balancer** using **HA Ports**. This allows both NVAs to process traffic simultaneously and provides automatic failover.
- **Exam Trap:** NVAs are just VMs. You are responsible for their OS updates, licensing, and scaling, whereas Azure Firewall is a "zero-maintenance" PaaS service.

### Routing Logic
- To force traffic through an NVA, you must create a **User Defined Route (UDR)** on the subnets that need inspection. 
- Set the **Next Hop Type** to "Virtual Appliance" and the **Next Hop Address** to the NVA's private IP.

##### References