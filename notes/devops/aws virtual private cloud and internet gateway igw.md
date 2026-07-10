2026-03-25 14:07
Tags: #cloud/aws/networking 
##### Content
AWS VPC (Virtual Private Cloud) allows you to logically isolate a section of the AWS Cloud to launch resources in a virtual network.

#### Public vs. Private IPs (IPv4)
*   **Public IP:** The machine can be identified on the public internet, must be globally unique, and can be easily geo-located. By default, if an EC2 instance is stopped and then started, its public IP can change.
*   **Private IP:** The machine can only be identified within its private network. The IP must be unique across that specific network, but two entirely different private networks can use the exact same private IPs. Private machines connect to the internet using a NAT and an Internet Gateway.
*   **SSH Access:** You cannot use a private IP to SSH into an EC2 instance from outside the network; you must use the public IP.

#### VPC Basics & CIDR
*   **Default VPC:** All new AWS accounts come with a default VPC that already has internet connectivity. New EC2 instances are launched here by default (if no subnet is specified) and automatically receive public IPv4 addresses.
*   **VPC Limits:** You can have a maximum of 5 VPCs per region (soft limit) and a maximum of 5 CIDR blocks per VPC.
*   **CIDR Sizing:** The minimum size is `/28` (16 IP addresses) and the maximum size is `/16` (65,536 IP addresses).
*   **Allowed Ranges:** VPCs must use private IPv4 ranges: `10.0.0.0/8`, `172.16.0.0/12`, or `192.168.0.0/16`. Your VPC CIDR should **never overlap** with your other networks (like a corporate data center).

#### Subnets
Subnets partition your VPC network and are tied to a specific Availability Zone.
*   **AWS Reserved IPs:** AWS reserves exactly **5 IP addresses** (the first 4 and the last 1) in every subnet. These cannot be assigned to an EC2 instance.
*   *Example for CIDR `10.0.0.0/24`:*
    *   `10.0.0.0` - Network Address.
    *   `10.0.0.1` - Reserved for the VPC router.
    *   `10.0.0.2` - Reserved for Amazon-provided DNS mapping.
    *   `10.0.0.3` - Reserved for future use.
    *   `10.0.0.255` - Network Broadcast Address (VPCs do not support broadcast).

#### Internet Gateway (IGW)
An Internet Gateway allows resources inside a VPC (like EC2 instances) to connect to the public internet.
*   **Architecture:** It scales horizontally and is highly available and redundant.
*   **Attachment Limit:** Must be created separately from the VPC. One VPC can only be attached to **one** IGW, and one IGW can only be attached to one VPC.
*   **Routing Requirement:** Simply attaching an IGW does not automatically grant internet access; **Route Tables must also be edited** to direct traffic to the IGW.

### SAA Exam "Scenario" Table

| If the requirement is...                                                                            | Use This Strategy:                                                                                                    |
| :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| "You need a subnet that can host exactly 29 EC2 instances."                                         | **Choose a `/26` subnet (64 IPs)** *(A `/27` gives 32 IPs, but 32 - 5 reserved = 27 available, which is not enough)*. |
| "You want to SSH into a newly created EC2 instance from your home computer."                        | **Use the Public IP** *(You cannot use the Private IP because you are not in the same network)*.                      |
| "Instances in a public subnet cannot reach the internet despite having an IGW attached to the VPC." | **Update the Route Table** to route destination `0.0.0.0/0` to the `igw-id`.                                          |

##### References
