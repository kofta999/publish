2026-03-25 15:10
Tags: #cloud/aws/networking 
##### Content
### IPv6 in AWS VPC
IPv4 was designed to provide roughly 4.3 billion addresses and **cannot be disabled** for your VPCs and subnets. However, you can enable IPv6 to operate your networks in **dual-stack mode**. 

*   **Public Only:** Unlike IPv4, **every IPv6 address in AWS is public and Internet-routable** (there is no "private" IP range for IPv6).
*   **Dual-Stack Routing:** When enabled, your EC2 instances will receive at least one private internal IPv4 address and one public IPv6 address. They can communicate with the internet using either protocol through an Internet Gateway (IGW).
*   **Troubleshooting Instance Launches:** If you suddenly cannot launch an EC2 instance in a dual-stack subnet, it is *not* because you ran out of IPv6 addresses (the space is massive). It is because there are **no available IPv4 addresses** left in your subnet. The solution is to create a new IPv4 CIDR.


### Egress-only Internet Gateway
Because all IPv6 addresses are public and internet-routable, attaching a standard Internet Gateway makes those instances reachable from the outside world. 

*   **The Purpose:** An Egress-only Internet Gateway is used **for IPv6 only**. It allows instances in your VPC to initiate outbound connections over IPv6, while strictly **preventing the internet from initiating an IPv6 connection** to your instances.
*   **How to think about it:** It functions exactly like a NAT Gateway, but specifically for IPv6 targets.
*   **Configuration:** Simply creating the gateway is not enough; you **must update your Route Tables** to target the Egress-only Internet Gateway for outbound IPv6 traffic (e.g., routing `::/0` to the `eigw-id`).


### SAA Exam "Scenario" Table

| If the requirement is...                                                                              | Use This Strategy:                                                     |
| :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| "Allow EC2 instances to download updates over IPv6 while blocking all inbound IPv6 internet traffic." | **Egress-only Internet Gateway**.                                      |
| "Assign a private, internal-only IPv6 address to a database instance."                                | **Not possible** *(Every IPv6 address in AWS is public/routable)*.     |
| "You cannot launch a new EC2 instance in a subnet that has IPv6 enabled."                             | **Create a new IPv4 CIDR** *(You have exhausted your IPv4 addresses)*. |
| "Provide secure outbound internet access for instances using IPv4."                                   | **NAT Gateway** *(Do not use Egress-only IGW, which is IPv6 only)*.    |
| "Enable resources in a VPC to communicate over both IPv4 and IPv6."                                   | **Enable dual-stack mode**.                                            |

##### References
