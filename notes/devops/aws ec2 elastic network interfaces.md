2026-03-09 15:34
Tags: #cloud/aws/compute 
##### Content
An **ENI** is a logical networking component in a VPC that represents a virtual network card. It is the primary way an EC2 instance connects to the network.

### Fundamentals
An ENI is bound to a specific **Availability Zone (AZ)** and **Subnet**. You cannot move an ENI across different AZs.

**What an ENI Includes:**
* **Primary Private IPv4:** A required internal IP from the subnet range.
* **Secondary Private IPv4s:** You can add multiple secondary IPs for hosting multiple websites on one server.
* **Elastic IP (IPv4):** One optional public Elastic IP address associated with one of the private IPs.
* **Public IPv4:** One optional auto-assigned public IP.
* **MAC Address:** A persistent hardware address.
* **Security Groups:** One or more security groups applied directly to the interface.

**Primary vs. Secondary ENIs:**
* **eth0 (Primary):** Created automatically when the instance is launched. It cannot be detached from the instance.
* **eth1+ (Secondary):** Can be created independently and attached/detached to any instance in the same AZ.

### Use Cases
ENIs provide flexibility for networking and security architectures.
* **Management Networks:** Create a dual-homed instance with `eth0` on a public subnet (for internet traffic) and `eth1` on a private subnet (for management/backup).
* **Network & Security Appliances:** Used by Firewalls, Load Balancers, or NAT instances that need to route traffic between multiple subnets.
* **License Management:** Some software licenses are tied to a MAC address. By using a standalone ENI, you can move the license between instances by moving the ENI.
* **Low-Budget High Availability:** If an instance fails, you can quickly detach its ENI and attach it to a standby instance. The IP and network configuration "follow" the interface, minimizing DNS update delays.

### Implementation Details
* **Limits:** The number of ENIs you can attach depends on the **Instance Type**. Larger instances (e.g., `m5.4xlarge`) support many more ENIs and IPs than smaller ones (e.g., `t3.micro`).
* **Warm Attach:** Attaching an ENI while the instance is running.
* **Hot Plug:** Supported by most modern Amazon Linux and Windows AMIs; the OS recognizes the new interface immediately.
* **Source/Dest Check:** By default, an instance must be the source or destination of any traffic it handles. For **NAT instances** or **Firewalls**, you must **disable** this attribute so the ENI can forward traffic meant for other IPs.

##### References
