2026-03-25 15:21
Tags: #cloud/aws/networking 
##### Content
### Network Protection on AWS
To secure your network on AWS, you typically use a combination of several services: Network Access Control Lists (NACLs), Amazon VPC Security Groups, AWS WAF (for malicious web requests), AWS Shield (for DDoS protection), and AWS Firewall Manager to centrally manage these rules. 

However, when you need sophisticated, comprehensive protection for your **entire Amazon VPC**, you use the **AWS Network Firewall**.

#### AWS Network Firewall Overview
AWS Network Firewall is a managed service that protects your entire VPC by offering **Layer 3 to Layer 7 protection**. 
*   **Under the hood:** Internally, the service leverages the **AWS Gateway Load Balancer**.
*   **Traffic Inspection:** It can inspect traffic in any direction, including:
    *   VPC-to-VPC traffic.
    *   Outbound traffic to the internet.
    *   Inbound traffic from the internet.
    *   Traffic to and from AWS Direct Connect & Site-to-Site VPN connections.
*   **Central Management:** You can centrally manage Network Firewall rules across multiple AWS accounts and apply them to many VPCs using **AWS Firewall Manager**.

#### Fine-Grained Controls & Rule Types
The Network Firewall supports thousands of rules and advanced filtering capabilities:
*   **IP & Port Filtering:** Can filter based on tens of thousands of IP addresses.
*   **Protocol Filtering:** You can block specific protocols (e.g., blocking the SMB protocol for outbound communications).
*   **Stateful Domain Lists:** You can restrict outbound traffic so that instances can only connect to approved domains (e.g., `*.mycorp.com` or specific third-party software repositories).
*   **Pattern Matching:** Supports general pattern matching using regex.
*   **Action Routing:** Traffic that matches your rules can be configured to **Allow, Drop, or Alert**.
*   **Intrusion Prevention:** Provides active flow inspection to protect against advanced network threats using an intrusion-prevention system.

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Deploy an intrusion-prevention system to inspect all traffic entering and leaving an entire VPC at Layers 3-7." | **AWS Network Firewall** |
| "Ensure EC2 instances in a VPC can only initiate outbound connections to `*.mycompany.com`." | **AWS Network Firewall (Stateful domain list rules)** |
| "Centrally deploy and manage a strict set of VPC firewall rules across multiple AWS accounts in an Organization." | **AWS Firewall Manager + AWS Network Firewall** |
| "Block specific non-HTTP protocols, like SMB, from being routed over a Direct Connect connection." | **AWS Network Firewall (Protocol rules)** |
| "Filter allowed traffic based on deep packet inspection and regex pattern matching." | **AWS Network Firewall** |


##### References
