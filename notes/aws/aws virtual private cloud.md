2025-02-14 16:32
Tags: #cloud/aws
##### Content
#### It's a
- Logically isolated portion (virtual network) of AWS cloud, within a region
- It's like a data center made for you
#### Notes 
- You have full control of IP management
- By default you can create up to 5 VPCs per region
- A default VPC is created in each region with a subnet in each AZ (can have private / public subnets)
- Communication is made using an internal router controlled by a routing table
- To connect a VPC to internet we use an internal Internet Gateway

##### **Internet Gateway & NAT Gateways**

- **Internet Gateways =** enable internet connectivity for instances in a VPC.
- **Public Subnets =** are configured with a route to the Internet Gateway for external access.
- **NAT Gateways (managed by AWS) and NAT Instances (managed by the user)** provide internet access to instances in Private Subnets while keeping them private.

Network ACL & Security Groups
    NACL (Network Access Control List):
        Acts as a firewall controlling traffic to and from a subnet.
        Supports both ALLOW and DENY rules.
        Attached at the subnet level.
        Rules are based solely on IP addresses.
    Security Groups:
        A firewall that controls traffic to and from an Elastic Network Interface (ENI) or an EC2 instance.
        Only ALLOW rules are supported.
        Rules can include IP addresses and other security groups.

##### References
https://youtu.be/tVuZSBrLM0A
