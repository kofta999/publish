2026-03-25 15:00
Tags: #cloud/aws/networking 
##### Content
AWS Direct Connect provides a dedicated, physical network connection from your on-premises data center directly to AWS, bypassing the public internet entirely.

#### Core Components & Features
*   **Virtual Private Gateway (VGW):** You must set up a VGW on your VPC to establish the connection.
*   **Resource Access:** A single connection allows you to access both **public resources** (like Amazon S3 or Glacier) and **private resources** (like EC2 instances).
*   **Encryption:** Data in transit over Direct Connect is private, but it is **not encrypted natively**. For an extra layer of security, you can combine Direct Connect with a Site-to-Site VPN to provide an IPsec-encrypted connection.
*   **Lead Time:** Unlike a VPN which can be set up in minutes, establishing a new Direct Connect connection involves physical infrastructure and often takes **longer than 1 month**.

![[Pasted image 20260325150118.png]]

#### Connection Types
*   **Dedicated Connections:** 1 Gbps, 10 Gbps, and 100 Gbps capacities. You get a physical ethernet port completely dedicated to your use, requested through AWS and fulfilled by a partner.
*   **Hosted Connections:** Speeds range from 50 Mbps up to 10 Gbps. These are made via AWS Direct Connect Partners, and the capacity can be added or removed on demand.

#### Advanced Direct Connect Architectures
*   **Direct Connect Gateway:** If you need to route your Direct Connect traffic to one or more VPCs located in **many different AWS regions** (within the same account), you must use a Direct Connect Gateway.
*   **Cross-Account Sharing:** You can share a Direct Connect connection between **multiple AWS accounts** by routing it through an AWS Transit Gateway and using the AWS Resource Access Manager (RAM).
*   **Resiliency & Failover:** To achieve maximum resilience for critical workloads, you should provision separate connections terminating on separate devices in more than one location. For a more cost-effective backup, you can use a regular **Site-to-Site VPN** as a fallback in case the Direct Connect line fails.


### SAA Exam "Scenario" Table

| If the requirement is...                                                                                        | Use This Strategy:                                      |
| :-------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| "Reduce network costs and increase bandwidth throughput for massive data sets moving to AWS."                   | **AWS Direct Connect**                                  |
| "Ensure a consistent network experience for applications using real-time data feeds without internet variance." | **AWS Direct Connect**                                  |
| "Connect an on-premises network to multiple VPCs located in several entirely different AWS Regions."            | **Direct Connect Gateway**                              |
| "Strict compliance requires data in transit to be completely encrypted over a dedicated private connection."    | **Direct Connect + Site-to-Site VPN (IPsec)**           |
| "Provide a cost-effective, highly available failover option if a physical Direct Connect connection goes down." | **AWS Site-to-Site VPN**                                |
| "Share a single on-premises Direct Connect line across VPCs owned by multiple different AWS accounts."          | **Transit Gateway + AWS Resource Access Manager (RAM)** |

##### References
