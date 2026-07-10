2026-03-25 14:52
Tags: #cloud/aws/networking 
##### Content
AWS Site-to-Site VPN allows you to securely connect your on-premises corporate data center to your AWS VPC. Unlike Direct Connect, a Site-to-Site VPN routes encrypted traffic over the **public internet**.

#### Core Components
To establish a Site-to-Site VPN, you must configure two sides of the connection:
*   **Virtual Private Gateway (VGW):** The VPN concentrator on the **AWS side**. You create this and attach it to your VPC. You also have the option to customize its ASN (Autonomous System Number).
*   **Customer Gateway (CGW):** A software application or physical device on the **customer (on-premises) side**. 
    *   **IP Address Requirement:** You must use a public, internet-routable IP address for the CGW device. If the device is behind a NAT device enabled for NAT traversal (NAT-T), you must use the public IP address of that NAT device.

![[Pasted image 20260325145313.png|263]]

#### Crucial Configuration Steps
*   **Route Propagation:** After setting up the VPN, an important step is to **enable Route Propagation** for the Virtual Private Gateway in the route table associated with your subnets.
*   **Ping / ICMP:** If you need to ping your EC2 instances from your on-premises network, you must explicitly add the **ICMP protocol** to the inbound rules of your EC2 Security Groups.

#### Advanced VPN Architectures
*   **AWS VPN CloudHub:** If you have multiple branch offices or sites, CloudHub provides a low-cost, hub-and-spoke model for secure communication between them. You connect multiple VPN connections to the **same VGW**, set up dynamic routing, and configure route tables.
*   **ECMP (Equal-cost multi-path routing):** By default, VPN bandwidth is limited. However, if you attach your VPNs to an **AWS Transit Gateway** instead of a VGW, you can use ECMP. This strategy allows you to forward packets over multiple best paths, letting you aggregate multiple Site-to-Site VPN connections to **increase overall bandwidth**.
*   **Direct Connect Backup & Encryption:** A Site-to-Site VPN can be used as a cost-effective backup in case an AWS Direct Connect connection fails. You can also combine Direct Connect with a VPN to provide an IPsec-encrypted private connection for an extra level of security.


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Connect an on-premises data center to a VPC over the public internet." | **Site-to-Site VPN (VGW on AWS, CGW on-premises)** |
| "You set up a VPN, but your VPC subnets cannot reach the on-premises network." | **Enable Route Propagation for the VGW in the Route Table** |
| "You need a low-cost hub-and-spoke model to connect multiple remote branch offices together via AWS." | **AWS VPN CloudHub** |
| "You need to drastically increase the bandwidth of your VPN connection to AWS by aggregating multiple tunnels." | **AWS Transit Gateway + ECMP (Equal-cost multi-path routing)** |
| "You want to ping an EC2 instance via the VPN to test connectivity, but requests time out." | **Allow the ICMP protocol on the EC2 Security Group's inbound rules** |
| "Provide a highly resilient, cost-effective backup for a dedicated Direct Connect line." | **AWS Site-to-Site VPN** |

##### References
