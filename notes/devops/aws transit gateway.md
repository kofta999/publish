2026-03-25 15:03
Tags: #cloud/aws/networking 
##### Content
AWS Transit Gateway allows you to establish **transitive peering** between thousands of VPCs and on-premises networks. It simplifies complex network topologies by acting as a central router in a **hub-and-spoke (star) connection** model.

#### Core Features & Architecture
*   **Scope:** It is a **regional resource**, but you can seamlessly peer Transit Gateways across different AWS regions.
*   **Cross-Account:** You can share a Transit Gateway across multiple AWS accounts using **AWS Resource Access Manager (RAM)**.
*   **Routing & Security:** You use Transit Gateway **Route Tables** to strictly limit and control which VPCs can communicate with each other.
*   **IP Multicast:** Transit Gateway supports IP Multicast, making it the **only** AWS service that supports this feature.

#### VPN & Bandwidth Scaling (ECMP)
Transit Gateway integrates natively with VPN connections and Direct Connect Gateways. A major advantage of attaching a Site-to-Site VPN to a Transit Gateway is the ability to use **ECMP (Equal-cost multi-path routing)**.
*   **How it works:** ECMP is a routing strategy that allows you to forward a packet over multiple "best paths".
*   **The Benefit:** A standard VPN connection has a bandwidth limit of 1.25 Gbps. By creating multiple Site-to-Site VPN connections and utilizing ECMP, you can aggregate these tunnels to drastically **increase the overall bandwidth** of your connection to AWS (e.g., combining tunnels to reach 2.5 Gbps, 5.0 Gbps, or 7.5 Gbps 


### SAA Exam "Scenario" Table

| If the requirement is...                                                                                     | Use This Strategy:                                                        |
| :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| "Connect hundreds of VPCs and on-premises data centers using a central hub-and-spoke network topology."      | **AWS Transit Gateway**                                                   |
| "Deploy an application in AWS that requires the IP Multicast protocol."                                      | **AWS Transit Gateway** *(It is the only AWS service that supports this)* |
| "Share a Transit Gateway or a Direct Connect connection with multiple different AWS accounts."               | **AWS Resource Access Manager (RAM)**                                     |
| "Significantly increase the bandwidth of a Site-to-Site VPN connection by aggregating multiple VPN tunnels." | **Transit Gateway + ECMP (Equal-cost multi-path routing)**                |
| "Strictly limit traffic between specific VPCs when they are all connected to a central networking hub."      | **Transit Gateway Route Tables**                                          |

##### References
